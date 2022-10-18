import { getInput } from '../../main.js';

const input = getInput();

const caves = [];
input.forEach(line => {
    const split = line.split('-');
    split.forEach(cave => {
        if (!caves.find(x => x.id === cave)) {
            caves.push({
                id: cave,
                connections: split.filter(x => x !== cave)
            });
        } else {
            const existingCave = caves.find(x => x.id === cave);
            split.filter(x => x !== cave).forEach(x => {
                if (existingCave.connections.includes(x)) { return; }
                existingCave.connections.push(x);
            })
        }
    })
})

export function solveA() {
    let paths = [];

    const start = getCaveForId('start');
    visit(start, [], canVisitA, paths);

    paths.forEach(x => console.log(x.toString()));
    return paths.length;
}

export function solveB() {
    let paths = [];

    const start = getCaveForId('start');
    visit(start, [], canVisitB, paths);

    // paths.forEach(x => console.log(x.toString()));
    return paths.length;
}

const visit = (cave, history, canVisitFunc, paths) => {
    const path = [...history, cave.id];

    if (cave.id === 'end') {
        paths.push(path);
    } else {
        cave.connections.forEach(c => {
            if (!canVisitFunc(c, path)) { return; }
            const connection = getCaveForId(c);
            visit(connection, path, canVisitFunc, paths);
        })
    }
}

const getCaveForId = (id) => {
    return caves.find(x => x.id === id);
}

const canVisitA = (id, path) => {
    const cave = getCaveForId(id);
    const onlyOnce = cave.id.toLowerCase() === cave.id || cave.id === 'start' || cave.id === 'end';
    return onlyOnce ? !path.includes(id) : true;
}

const canVisitB = (id, path) => {
    if (id === 'start' || id === 'end') { return !path.includes(id); }
    if (id.toUpperCase() === id) { return true; }

    let foundDoubleSmallCave = false;
    let alreadyVisitedCount = 0;
    path.forEach(entry => {
        if (entry === 'start' || entry === 'end') { return; }
        if (entry.toUpperCase() === entry) { return; }

        const count = path.filter(x => x === entry).length;
        if (count > 1) {
            foundDoubleSmallCave = true;
        }
        if (entry === id) {
            alreadyVisitedCount = count;
        }
    })

    return foundDoubleSmallCave ? !path.includes(id) : alreadyVisitedCount < 2;
}
