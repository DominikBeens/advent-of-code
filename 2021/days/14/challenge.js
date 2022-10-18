import { getInput } from '../../main.js';

let template;
let rules = [];

const input = getInput();
input.forEach((line, index) => {
    if (line === '') { return; }
    if (index === 0) {
        template = line;
    } else {
        const [from, to] = line.split(' -> ');
        rules.push({ from: from, to: to });
    }
})

export function solveA() {
    let charCount = [];

    const registerChar = (char, arr) => {
        const i = arr.findIndex(x => x.char === char);
        if (i < 0) {
            arr.push({ char: char, count: 1 });
        } else {
            arr[i].count++;
        }
    }

    template.split('').forEach(c => registerChar(c, charCount));

    for (let i = 0; i < 10; i++) {
        let steps = [];
        rules.forEach(rule => {
            template.split('').forEach((c, i) => {
                if (i === template.length - 1) { return; }
                const combo = c + template.split('')[i + 1];
                if (combo !== rule.from) { return; }
                steps.push({ rule: rule, index: i });
            })
        })

        steps = steps.sort((x, y) => x.index - y.index);
        steps.forEach((step, stepIndex) => {
            const index = step.index + 1 + stepIndex;
            template = `${template.slice(0, index)}${step.rule.to}${template.slice(index)}`;
            registerChar(step.rule.to, charCount);
        })
    }

    charCount = charCount.sort((x, y) => y.count - x.count);
    return charCount[0].count - charCount.at(-1).count;
}

export function solveB() {
    let dict = {};
    let sum = {};

    const start = template.split('');
    start.forEach((char, i) => {
        if (dict[char] === undefined) {
            dict[char] = {};
        }

        sum[char] = (sum[char] + 1) || 1;

        if (i === template.length - 1) { return; }

        const connection = start[i + 1];
        dict[char][connection] = dict[char][connection] + 1 || 1;
    });

    for (let i = 0; i < 40; i++) {
        const validRules = [];
        rules.forEach(rule => {
            const [left, right] = rule.from.split('');
            if (dict[left] === undefined) { return; }
            if (dict[left][right] === undefined) { return; }
            validRules.push(rule);
        })

        let toAdd = [];
        let toDelete = [];

        validRules.forEach(rule => {
            const [left, right] = rule.from.split('');
            const count = dict[left][right];

            if (dict[rule.to] === undefined) {
                dict[rule.to] = {};
            }

            toAdd.push({ left: left, right: rule.to, count: count });
            toAdd.push({ left: rule.to, right: right, count: count });
            toDelete.push({ left: left, right: right, count: count });
        })

        toAdd.forEach(x => {
            dict[x.left][x.right] = (dict[x.left][x.right] || 0) + x.count;
            sum[x.right] = (sum[x.right] || 0) + x.count;
        })

        toDelete.forEach(x => {
            dict[x.left][x.right] -= x.count;
            if (dict[x.left][x.right] <= 0) {
                delete dict[x.left][x.right];
            }
            sum[x.right] -= x.count;
        })
    }

    const max = Object.entries(sum).reduce((a, b) => a[1] > b[1] ? a : b)[1];
    const min = Object.entries(sum).reduce((a, b) => a[1] < b[1] ? a : b)[1];
    return max - min;
}
