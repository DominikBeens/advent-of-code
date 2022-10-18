import { readFileSync } from 'fs';
import { URL } from 'url';

const day = 16;

const part1 = process.argv.includes('part1');
const part2 = process.argv.includes('part2');
const test = process.argv.includes('test');

import(`./days/${day}/challenge.js`)
    .then(challenge => {
        if (part1) {
            const answer = challenge.solveA();
            console.log(`Day ${day} part 1: ${answer}`);
        }
        if (part2) {
            const answer = challenge.solveB();
            console.log(`Day ${day} part 2: ${answer}`);
        }
    });

export function getInput() {
    let inputFile = test ? 'testinput' : 'input';
    let localDirectory = new URL('', import.meta.url).pathname;
    let inputDirectory = `${localDirectory.slice(1, localDirectory.length).replace('/main.js', '')}/days/${day}/${inputFile}.txt`;
    const input = readFileSync(inputDirectory, 'utf-8').toString().split('\n');
    input.forEach((x, index) => input[index] = x.replace(/(\r\n|\n|\r)/gm, ''));
    return input;
}
