import { getInput } from '../../main.js';

let input = getInput();
input.forEach((line, index) => input[index] = line.split('').map(Number));

export function solveA() {
    let risk = lowestRisk();
    risk -= input[0][0];
    return risk;
}

export function solveB() {
    const rows = input.length;
    const cols = input[0].length;
    const iterations = 4;

    for (let i = 0; i < iterations; i++) {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const value = getNewValue(row, col, i);
                input[row].push(value);
            }
        }
    }

    for (let i = 0; i < iterations; i++) {
        for (let row = 0; row < rows; row++) {
            input.push([]);
            for (let col = 0; col < input[0].length; col++) {
                const value = getNewValue(row, col, i);
                input[input.length - 1].push(value);
            }
        }
    }

    let risk = lowestRisk();
    risk -= input[0][0];
    return risk;
}

const lowestRisk = () => {
    const rows = input.length;
    const cols = input[0].length;

    let dist = Array.from(Array(rows), () => Array(cols).fill(0));
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            dist[row][col] = Infinity;
        }
    }

    let stack = [];
    stack.push([0, 0, 0]);

    dist[0][0] = input[0][0];

    while (stack.length != 0) {
        const shortest = stack[0];
        stack.shift();

        const neighbours = getNeighbours(shortest[0], shortest[1]);
        neighbours.forEach(n => {
            const x = n[0];
            const y = n[1];

            const value = dist[shortest[0]][shortest[1]] + input[x][y];
            if (dist[x][y] > value) {
                dist[x][y] = value;
                stack.push([x, y, dist[x][y]]);
            }
        })

        stack.sort((a, b) => {
            if (a.distance == b.distance) {
                return a.x != b.x ? (a.x - b.x) : (a.y - b.y);
            }
            return (a.distance - b.distance);
        });
    }

    return dist[rows - 1][cols - 1];
}

const getNeighbours = (row, col) => {
    const neighbours = [];
    if (row - 1 >= 0) { neighbours.push([row - 1, col]); }
    if (row + 1 < input.length) { neighbours.push([row + 1, col]); }
    if (col - 1 >= 0) { neighbours.push([row, col - 1]); }
    if (col + 1 < input[0].length) { neighbours.push([row, col + 1]); }
    return neighbours;
}

const getNewValue = (row, col, iteration) => {
    let value = input[row][col];
    const targetValue = input[row][col] + (iteration + 1);
    const diff = targetValue - value;
    for (let i = 0; i < diff; i++) {
        value++;
        if (value > 9) {
            value = 1;
        }
    }
    return value;
}

// const step = (row, col, history) => {
//     const path = [...history, [row, col]];
//     const complete = row === input.length - 1 && col === input[0].length - 1;

//     if (complete) {
//         let risk = 0;
//         path.forEach((p, i) => {
//             if (i === 0) { return; }
//             risk += input[p[0]][p[1]];
//         })
//         if (risk < lowestPathRisk) {
//             lowestPathRisk = risk;
//             console.log(`Found new path with lowest risk: ${lowestPathRisk}`);
//         }
//         // console.log(`Completed path with risk ${risk}, lowest: ${lowestPathRisk}`);
//     } else {
//         let neighbours = getNeighbours(row, col);
//         neighbours = neighbours.sort((x, y) => input[x[0]][x[1]] - input[y[0]][y[1]]);

//         let stepped = 0;
//         neighbours.forEach(n => {
//             if (path.some(p => p[0] === n[0] && p[1] === n[1])) { return; }

//             const value = input[n[0]][n[1]];
//             if (value >= 8) { return; }

//             if (stepped > 1) { return; }
//             stepped++;

//             step(n[0], n[1], path);
//         })
//     }
// }
