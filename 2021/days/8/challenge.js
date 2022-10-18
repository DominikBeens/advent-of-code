import { getInput } from '../../main.js';

const input = getInput();

const codes = [];
input.forEach(x => {
    const split = x.split(' | ');
    codes.push({
        signals: split[0].split(' '),
        output: split[1].split(' ')
    })
});

export function solveA() {
    // Segments               0, 1, 2, 3, 4, 5, 6, 7
    const segmentsToNumber = [0, 0, 1, 7, 4, 0, 0, 8]

    let count = 0;
    codes.forEach(code => {
        code.output.forEach(output => {
            if (segmentsToNumber[output.length] !== 0) {
                count++;
            }
        })
    })
    return count;
}

export function solveB() {
    let count = [];
    codes.forEach(code => {
        const digits = ['', '', '', '', '', '', '', '', '', ''];

        // Find 4,7,8
        code.signals.forEach(signal => {
            if (signal.length === 2) { digits[1] = signal; }
            if (signal.length === 4) { digits[4] = signal; }
            if (signal.length === 3) { digits[7] = signal; }
            if (signal.length === 7) { digits[8] = signal; }
        })

        // Find 6
        code.signals.forEach(signal => {
            if (digits.includes(signal)) { return; }
            if (signal.length !== 6) { return; }

            const diff = [];
            digits[8].split('').forEach(x => {
                if (!signal.includes(x)) {
                    diff.push(x);
                }
            })

            if (diff.length === 1 && digits[1].includes(diff[0])) {
                digits[6] = signal;
            }
        })

        // Find 0
        code.signals.forEach(signal => {
            if (digits.includes(signal)) { return; }
            if (signal.length !== 6) { return; }

            const diff = [];
            digits[8].split('').forEach(x => {
                if (!signal.includes(x)) {
                    diff.push(x);
                }
            })

            if (diff.length === 1 && digits[4].includes(diff[0])) {
                digits[0] = signal;
            }
        })

        // Find 9
        code.signals.forEach(signal => {
            if (digits.includes(signal)) { return; }
            if (signal.length !== 6) { return; }
            digits[9] = signal;
        })

        // Find 5
        code.signals.forEach(signal => {
            if (digits.includes(signal)) { return; }
            if (signal.length !== 5) { return; }

            const diff = [];
            digits[6].split('').forEach(x => {
                if (!signal.includes(x)) {
                    diff.push(x);
                }
            })

            if (diff.length === 1 && digits[8].includes(diff[0]) && !digits[9].includes(diff[0])) {
                digits[5] = signal;
            }
        })

        // Find 3
        code.signals.forEach(signal => {
            if (digits.includes(signal)) { return; }
            if (signal.length !== 5) { return; }

            const diff = [];
            digits[8].split('').forEach(x => {
                if (!signal.includes(x)) {
                    diff.push(x);
                }
            })

            if (diff.length === 2 && !digits[1].includes(diff[0]) && !digits[1].includes(diff[1])) {
                digits[3] = signal;
            }
        })

        // Find 2
        code.signals.forEach(signal => {
            if (digits.includes(signal)) { return; }
            if (signal.length !== 5) { return; }
            digits[2] = signal;
        })

        let c = '';
        code.output.forEach(output => {
            digits.forEach((digit, index) => {
                if (output.length !== digit.length) { return; }
                const success = output.split('').every(x => digit.includes(x));
                if (success) {
                    c += index.toString();
                }
            })
        })
        count.push(c);
    })

    return count.map(Number).reduce((previous, current) => previous + current);
}
