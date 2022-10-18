import { getInput } from '../../main.js';

const input = getInput();

const open = ['[', '{', '(', '<'];
const close = [']', '}', ')', '>'];

export function solveA() {
    const corrupted = findCorruptedLines();
    const scores = [57, 1197, 3, 25137];

    let score = 0;
    close.forEach((symbol, index) => {
        score += corrupted.symbols.filter(x => x === symbol).length * scores[index];
    })
    return score;
}

export function solveB() {
    const corrupted = findCorruptedLines();
    const incomplete = input.filter(x => !corrupted.lines.includes(x));
    const leftovers = [];

    incomplete.forEach(line => {
        const openSymbols = [];

        line.split('').forEach(symbol => {
            if (isOpenSymbol(symbol)) {
                openSymbols.push(symbol);
            } else if (isCloseSymbol(symbol)) {
                const prev = openSymbols.at(-1);
                if (isSameSymbolPair(prev, symbol)) {
                    openSymbols.pop();
                }
            }
        })

        leftovers.push(openSymbols);
    })

    const scores = [2, 3, 1, 4];
    const totals = [];

    leftovers.forEach(symbols => {
        let score = 0;
        symbols.reverse().forEach(symbol => {
            score = (score * 5) + scores[open.indexOf(symbol)];
        })
        totals.push(score);
    })

    return totals.sort((x, y) => y - x)[Math.floor(totals.length / 2)];
}

const findCorruptedLines = () => {
    const corruptedLines = [];
    const corruptedSymbols = [];

    input.forEach(line => {
        const openSymbols = [];
        let corrupt = false;

        line.split('').forEach(symbol => {
            if (corrupt) { return; }

            if (isOpenSymbol(symbol)) {
                openSymbols.push(symbol);
            } else if (isCloseSymbol(symbol)) {
                const prev = openSymbols.at(-1);
                if (isSameSymbolPair(prev, symbol)) {
                    openSymbols.pop();
                    return;
                } else {
                    corrupt = true;
                    corruptedSymbols.push(symbol);
                    corruptedLines.push(line);
                    return;
                }
            }
        })
    })

    return {
        lines: corruptedLines,
        symbols: corruptedSymbols
    }
}

const isOpenSymbol = (x) => open.includes(x);
const isCloseSymbol = (x) => close.includes(x);
const isSameSymbolPair = (x, y) => open.indexOf(x) === close.indexOf(y);
