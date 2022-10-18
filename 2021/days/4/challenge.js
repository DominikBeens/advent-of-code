import { getInput } from '../../main.js';

const input = getInput();

const draws = input[0];
const boards = [];

const addNewBoard = () => {
    boards.push({
        'complete': false,
        'result': 0,
        'rows': [...rows]
    });
    rows = [];
}

let rows = [];
input.forEach((x, index) => {
    if (x === draws) { return; }
    if (x === '') {
        if (rows.length === 0) { return; }
        addNewBoard();
        return;
    }

    let row = [];
    x.split(' ').forEach(x => {
        if (x === '') { return; }
        row.push({
            'number': x,
            'marked': false
        });
    });
    rows.push(row);

    if (index === input.length - 1) {
        addNewBoard();
    }
});

export function solveA() {
    let complete = false;
    let winningBoard = [];
    let bingoNumber = -1;

    draws.split(',').forEach(draw => {
        if (complete) { return; }

        boards.forEach(board => {
            if (complete) { return; }

            board.rows.forEach(row => {
                if (complete) { return; }

                row.forEach(entry => entry.marked = entry.number === draw ? true : entry.marked);
                complete = row.every(x => x.marked);
                winningBoard = complete ? board : winningBoard;
                bingoNumber = complete ? draw : bingoNumber;
            });
        });
    });

    let result = 0;
    winningBoard.rows.forEach(row => row.forEach(entry => result += entry.marked === false ? parseInt(entry.number) : 0));
    result *= bingoNumber;
    return result;
}

export function solveB() {
    let latestBingoBoard;
    draws.split(',').forEach(draw => {
        boards.forEach(board => {
            board.rows.forEach(row => {
                row.forEach(entry => entry.marked = parseInt(entry.number) === parseInt(draw) ? true : entry.marked);
            });
        });

        boards.forEach(board => {
            board.rows.forEach((row, index) => {
                const bingo = row.every(entry => entry.marked);
                if (bingo && !board.complete) {
                    board.complete = true;
                }
            });

            board.rows[0].forEach((entry, index) => {
                const bingo = board.rows.every(row => row[index].marked);
                if (bingo && !board.complete) {
                    board.complete = true;
                }
            });


            if (board.complete && board.result === 0) {
                board.rows.forEach(row => row.forEach(entry => {
                    board.result += entry.marked === false ? parseInt(entry.number) : 0;
                }));
                board.result *= draw;

                latestBingoBoard = board;
                console.log(`bingo at draw: ${draw}`);
            }
        });
    });

    return latestBingoBoard.result;
}
