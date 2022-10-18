import { getInput } from '../../main.js';

let input = getInput();
input = input[0].replace('target area: ', '').replace('x=', '').replace('y=', '');

const [minX, maxX] = input.split(', ')[0].split('..');
const [maxY, minY] = input.split(', ')[1].split('..');

let area = { minX: parseInt(minX), maxX: parseInt(maxX), minY: parseInt(minY), maxY: parseInt(maxY) };

export function solveA() {
    let probes = launchProbes();
    probes = probes.filter(probe => probe.hit);
    probes = probes.sort((x, y) => y.startVelY - x.startVelY);
    return probes[0].highestY;
}

export function solveB() {
    let probes = launchProbes();
    probes = probes.filter(probe => probe.hit);
    return probes.length;
}

const launchProbes = () => {
    let probes = [];

    for (let x = 1; x < area.maxX + 1; x++) {
        for (let y = -1000; y < 1000; y++) {
            probes.push({
                x: 0,
                y: 0,
                startVelX: x,
                startVelY: y,
                velX: x,
                velY: y,
                highestY: 0,
                hit: false,
                done: false
            });
        }
    }

    while (probes.some(probe => !probe.done)) {
        probes.forEach(probe => {
            if (probe.hit) { return; }

            probe.x += probe.velX;
            probe.y += probe.velY;

            probe.highestY = probe.y > probe.highestY ? probe.y : probe.highestY;

            probe.velX = probe.velX === 0 ? probe.velX : probe.velX - 1;
            probe.velY -= 1;

            if (probe.x >= area.minX && probe.x <= area.maxX && probe.y <= area.minY && probe.y >= area.maxY) {
                probe.hit = true;
                probe.done = true;
            }

            if (probe.y < area.maxY) {
                probe.done = true;
            }
        })
    }

    return probes;
}
