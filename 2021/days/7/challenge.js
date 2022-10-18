import { getInput } from '../../main.js';

let input = getInput();
input = input.join().split(',').map(Number);

export function solveA() {
    const results = [];

    for (let i = 0; i < 1000; i++) {
        let fuel = 0;
        input.forEach(x => {
            fuel += Math.abs(x - i);
        });
        results.push({ position: i, fuel: fuel, });
    }

    return results.reduce((previous, current) => previous.fuel < current.fuel ? previous : current);
}

export function solveB() {
    const results = [];

    for (let i = 0; i < 1000; i++) {
        let fuel = 0;
        input.forEach(x => {
            const change = Math.abs(x - i);
            for (let j = 0; j < change; j++) {
                fuel += (j + 1);
            }
        });
        results.push({ position: i, fuel: fuel, });
    }

    return results.reduce((previous, current) => previous.fuel < current.fuel ? previous : current);
}
