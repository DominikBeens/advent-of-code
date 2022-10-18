import { getInput } from '../../main.js';

const input = getInput();

const forwardKey = 'forward';
const downKey = 'down';
const upKey = 'up';

export function solveA() {
    let forward = 0;
    let depth = 0;

    input.forEach(x => {
        forward += tryGetValue(x, forwardKey);
        depth += tryGetValue(x, downKey);
        depth -= tryGetValue(x, upKey);
    });

    return forward * depth;
}

export function solveB() {
    let horizontal = 0;
    let depth = 0;
    let aim = 0;

    input.forEach(x => {
        let forward = tryGetValue(x, forwardKey);
        let down = tryGetValue(x, downKey);
        let up = tryGetValue(x, upKey);

        horizontal += forward;
        aim += down;
        aim -= up;

        depth += aim * forward;
    });

    return horizontal * depth;
}

const tryGetValue = (input, key) => {
    if (!input.includes(key)) { return 0; }
    let value = input.slice(key.length, input.length);
    return parseInt(value);
}
