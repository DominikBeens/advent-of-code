import { getInput } from '../../main.js';

const input = getInput();

const lines = [];

const getPointObject = (x, y) => {
    return { x: x, y: y }
}

input.forEach((string, index) => {
    let points = string.split(' -> ');
    let pointA = points[0].split(',');
    let pointB = points[1].split(',');

    const line = {
        x1: parseInt(pointA[0]),
        y1: parseInt(pointA[1]),
        x2: parseInt(pointB[0]),
        y2: parseInt(pointB[1])
    }

    line.horizontal = line.x1 === line.x2;
    line.vertical = line.y1 === line.y2;

    let x = line.x1;
    let y = line.y1;

    line.points = [];
    line.points.push(getPointObject(x, y));

    while (x !== line.x2 || y !== line.y2) {
        let changeX = x < line.x2 ? 1 : x > line.x2 ? -1 : 0
        x += changeX;

        let changeY = y < line.y2 ? 1 : y > line.y2 ? -1 : 0
        y += changeY;

        if (changeX !== 0 || changeY !== 0) {
            line.points.push(getPointObject(x, y));
        }
    }

    lines.push(line);
});

export function solveA() {
    const points = [];
    lines.forEach(line => {
        line.points.forEach(point => {
            if (!line.horizontal && !line.vertical) { return; }

            const loggedPoint = points.find(p => p.x === point.x && p.y === point.y);
            if (loggedPoint) {
                loggedPoint.count++;
            } else {
                points.push({
                    x: point.x,
                    y: point.y,
                    count: 1
                })
            }
        })
    })

    return points.filter(point => point.count >= 2).length;
}

export function solveB() {
    const points = [];
    lines.forEach(line => {
        line.points.forEach(point => {
            const loggedPoint = points.find(p => p.x === point.x && p.y === point.y);
            if (loggedPoint) {
                loggedPoint.count++;
            } else {
                points.push({
                    x: point.x,
                    y: point.y,
                    count: 1
                })
            }
        })
    })

    return points.filter(point => point.count >= 2).length;
}
