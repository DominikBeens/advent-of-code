import { getInput } from '../../main.js';

const input = getInput();

export function solveA() {
    let previousValue;
    let count = 0;
    input.forEach(x => {
        if (previousValue && previousValue < parseInt(x)) {
            count++;
        }
        previousValue = x;
    });

    return count;
}

export function solveB() {
    let results = [];

    input.forEach((x, index) => {
        let value = parseInt(x);
        value += index + 1 < input.length ? parseInt(input[index + 1]) : 0;
        value += index + 2 < input.length ? parseInt(input[index + 2]) : 0;
        results.push(value);
    });

    let previousValue;
    let count = 0;
    results.forEach(x => {
        if (previousValue && previousValue < parseInt(x)) {
            count++;
        }
        previousValue = x;
    });

    return count;
}
