import { getInput } from '../../main.js';

const input = getInput();

const points = [];
const folds = [];

let board = [];

let maxX = 0
let maxY = 0;

input.forEach(line => {
    if (line === '') { return; }

    if (line.includes('fold')) {
        const [axis, value] = line.replace('fold along ', '').split('=');
        folds.push({ axis: axis, value: parseInt(value) });
    } else {
        const [x, y] = line.split(',').map(Number);
        if (x > maxX) { maxX = x; }
        if (y > maxY) { maxY = y; }
        points.push({ x: x, y: y });
    }
})

maxX++;
maxY++;

for (let y = 0; y < maxY; y++) {
    board[y] = [];
    for (let x = 0; x < maxX; x++) {
        const point = points.filter(point => point.x === x && point.y === y).length > 0;
        board[y].push(point ? '#' : '_');
    }
}

export function solveA() {
    foldBoard(1);
    logBoard();

    let points = 0;
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[0].length; x++) {
            points += board[y][x] === '#' ? 1 : 0;
        }
    }
    return points;
}

export function solveB() {
    foldBoard();
    logBoard();
    return 'PFKLKCFP';
}

const foldBoard = (count) => {
    count = count === undefined ? folds.length : count;
    for (let f = 0; f < count; f++) {
        const fold = folds[f];

        if (fold.axis === 'x') {
            for (let row = 0; row < board.length; row++) {
                for (let col = board[row].length - 1; col >= fold.value; col--) {
                    const diff = col - fold.value;
                    const target = fold.value - diff;
                    mergePoints(row, col, row, target);
                }
                board[row].splice(fold.value);
            }
        } else if (fold.axis === 'y') {
            for (let row = board.length - 1; row >= fold.value; row--) {
                for (let col = 0; col < board[row].length; col++) {
                    const diff = row - fold.value;
                    const target = fold.value - diff;
                    mergePoints(row, col, target, col);
                }
            }

            for (let row = 0; row < fold.value; row++) {
                board.splice(fold.value);
            }
        }

    }
}

const mergePoints = (row1, col1, row2, col2) => {
    if (board[row1][col1] === '#') {
        board[row2][col2] = '#';
    }
}

const logBoard = () => {
    const rows = [];
    board.forEach(row => {
        let string = '';
        row.forEach(value => string += `${value} `);
        rows.push(string);
    })
    rows.forEach(x => console.log(x));
}
