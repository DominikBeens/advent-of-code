import { getInput } from '../../main.js';

const input = getInput();

const entryLength = input[0].length;

export function solveA() {
    let gamma = '';
    let epsilon = '';
    for (let i = 0; i < entryLength; i++) {
        let zeroCount = 0;
        let oneCount = 0;

        input.forEach(x => {
            const value = x[i];
            zeroCount += value == 0 ? 1 : 0;
            oneCount += value == 1 ? 1 : 0;
        });

        if (zeroCount > oneCount) {
            gamma += '0';
            epsilon += '1';
        } else {
            gamma += '1';
            epsilon += '0';
        }
    }

    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

export function solveB() {
    let oxygen = input;
    for (let i = 0; i < entryLength; i++) {
        let zeros = oxygen.filter(x => x[i] == 0);
        let ones = oxygen.filter(x => x[i] == 1);
        oxygen = zeros.length <= ones.length ? ones : zeros;

        if (oxygen.length === 1) {
            break;
        }
    }

    let co2 = input;
    for (let i = 0; i < entryLength; i++) {
        let zeros = co2.filter(x => x[i] == 0);
        let ones = co2.filter(x => x[i] == 1);
        co2 = zeros.length <= ones.length ? zeros : ones;

        if (co2.length === 1) {
            break;
        }
    }

    return parseInt(oxygen, 2) * parseInt(co2, 2);
}
