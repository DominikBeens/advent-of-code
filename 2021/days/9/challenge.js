import { getInput } from '../../main.js';

const input = getInput();

const heightmap = [];
input.forEach(x => heightmap.push(x.split('').map(Number)));

const rows = heightmap.length - 1;
const columns = heightmap[0].length - 1;

export function solveA() {
    let total = 0;
    heightmap.forEach((row, rowIndex) => {
        row.forEach((number, colIndex) => {
            const left = colIndex - 1 >= 0 ? heightmap[rowIndex][colIndex - 1] : 99;
            const right = colIndex + 1 < row.length ? heightmap[rowIndex][colIndex + 1] : 99;
            const up = rowIndex - 1 >= 0 ? heightmap[rowIndex - 1][colIndex] : 99;
            const down = rowIndex + 1 < heightmap.length ? heightmap[rowIndex + 1][colIndex] : 99;
            if (left > number && right > number && up > number && down > number) {
                total += number + 1;
            }
        })
    })
    return total;
}

export function solveB() {
    const basins = [];

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < columns; y++) {
            floodToX(x, y, heightmap[x][y]);
        }
    }

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < columns; y++) {
            const count = floodToY(x, y);
            if (count !== 0) {
                basins.push(count);
            }
        }
    }

    heightmap.forEach(row => console.log(row.join()));

    return basins.sort((x, y) => y - x).slice(0, 3).reduce((prev, cur) => prev * cur);
}

const floodToX = (row, col, target) => {
    if (row < 0 || row > rows) { return; }
    if (col < 0 || col > columns) { return; }

    const value = heightmap[row][col];

    if (value === 9) { return; }
    if (value === 'X') { return; }

    if (value === target) {
        heightmap[row][col] = 'X';

        floodToX(row - 1, col, value - 1);
        floodToX(row + 1, col, value - 1);
        floodToX(row, col - 1, value - 1);
        floodToX(row, col + 1, value - 1);

        floodToX(row - 1, col, value + 1);
        floodToX(row + 1, col, value + 1);
        floodToX(row, col - 1, value + 1);
        floodToX(row, col + 1, value + 1);
    }
}

const floodToY = (row, col) => {
    let counter = 0;

    const flood = (row, col) => {
        if (row < 0 || row > rows) { return; }
        if (col < 0 || col > columns) { return; }

        const value = heightmap[row][col];

        if (value === 'Y') { return; }

        if (value === 'X') {
            heightmap[row][col] = 'Y';
            counter++;

            flood(row - 1, col);
            flood(row + 1, col);
            flood(row, col - 1);
            flood(row, col + 1);

            flood(row - 1, col);
            flood(row + 1, col);
            flood(row, col - 1);
            flood(row, col + 1);
        }
    }

    flood(row, col);
    return counter;
}
