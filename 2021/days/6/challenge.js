import { getInput } from '../../main.js';

let input = getInput();
input = input.join().split(',').map(Number);

export function solveA() {
    const fish = [...input];
    for (let i = 0; i < 80; i++) {
        fish.forEach((f, index) => {
            if (f === 0) {
                fish[index] = 6;
                fish.push(8);
            } else {
                fish[index] = f - 1;
            }
        })
    }

    return fish.length;
}

export function solveB() {
    const fish = [...input];

    let newFishCount = 0;
    let fishByTick = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    fish.forEach(x => fishByTick[x]++);

    for (let i = 0; i < 256; i++) {
        fishByTick[7] += fishByTick[0];
        newFishCount = fishByTick.shift();
        fishByTick.push(newFishCount);
    }

    return fishByTick.reduce((previous, current) => previous + current);
}
