import { getInput } from '../../main.js';

const input = getInput();
input.forEach((x, index) => input[index] = x.split('').map(Number));

const rows = input.length;
const columns = input[0].length;
const total = rows * columns;

let flashed = [];
let totalFlashed = 0;

export function solveA() {
    for (let i = 0; i < 100; i++) {
        step();
    }

    input.forEach(row => console.log(row.join()));
    return totalFlashed;
}

export function solveB() {
    let success = false;
    let steps = 0;

    while (!success) {
        steps++;
        step();

        if (flashed.length === total) {
            success = true;
        }
    }

    return steps;
}

const step = () => {
    flashed = [];

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < columns; y++) {
            increment(x, y, false);
        }
    }

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < columns; y++) {
            if (input[x][y] <= 9) { continue; }
            flash(x, y);
        }
    }

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < columns; y++) {
            if (!flashed.some(coords => coords.x === x && coords.y === y)) { continue; }
            input[x][y] = 0;
        }
    }

    totalFlashed += flashed.length;
}

const flash = (x, y) => {
    if (flashed.some(coords => coords.x === x && coords.y === y)) { return; }
    flashed.push({ x: x, y: y });

    increment(x - 1, y, true);
    increment(x + 1, y, true);
    increment(x, y - 1, true);
    increment(x, y + 1, true);
    increment(x - 1, y - 1, true);
    increment(x - 1, y + 1, true);
    increment(x + 1, y + 1, true);
    increment(x + 1, y - 1, true);
}

const increment = (x, y, canTriggerFlash) => {
    if (x < 0 || x >= rows) { return; }
    if (y < 0 || y >= columns) { return; }
    if (flashed.some(coords => coords.x === x && coords.y === y)) { return; }

    input[x][y]++;
    if (input[x][y] > 9 && canTriggerFlash) {
        flash(x, y);
    }
}
