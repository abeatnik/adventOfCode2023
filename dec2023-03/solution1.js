const fs = require("node:fs");
const readline = require("readline");

const matrix = [];
let sum = 0;

function hasAdjacentSymbol(x1, x2, y) {
    const adjacent = [];
    const xMin = x1 == 0 ? x1 : x1 - 1;
    const xMax = x2 == matrix[1].length - 1 ? x2 : x2 + 1;
    const yMin = y == 0 ? y : y - 1;
    const yMax = y == matrix.length - 1 ? y : y + 1;

    adjacent.push(matrix[y].substring(xMin, xMax));
    adjacent.push(matrix[yMin].substring(xMin, xMax));
    adjacent.push(matrix[yMax].substring(xMin, xMax));

    console.log(adjacent);
    return adjacent.some((string) => string.match(/[^a-zA-Z0-9.]+/));
}

function findAndAdd() {
    const expression = /[0-9]+/g;
    //what is with hash
    for (let i = 0; i < matrix.length; i++) {
        let current;
        while ((current = expression.exec(matrix[i])) !== null) {
            const hasSymbol = hasAdjacentSymbol(
                current.index,
                current.index + current[0].length,
                i
            );
            if (hasSymbol) {
                console.log();
                sum += parseInt(current[0]);
            }
        }
    }
    console.log(sum);
    return sum;
}

async function processLineByLine() {
    const fileStream = fs.createReadStream("./dec2023-03/input.txt");

    const rl = readline.createInterface({
        input: fileStream,
        //crlfDelay: Infinity,
    });

    for await (const line of rl) {
        matrix.push(line);
    }
    return findAndAdd();
}

processLineByLine();
