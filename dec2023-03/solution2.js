const fs = require("node:fs");
const readline = require("readline");

const matrix = [];
let sum = 0;

function findAdjacentNumbers(x, y) {
    const exp = new RegExp("[0-9]");
    const xMin = x == 0 ? x : x - 1;
    const xMax = x == matrix[0].length - 1 ? x : x + 1;
    const above = y == 0 ? "" : matrix[y - 1].substring(xMin, xMax + 1);
    const below =
        y == matrix.length - 1 ? "" : matrix[y + 1].substring(xMin, xMax + 1);
    const left = matrix[y].substring(xMin, x);
    const right = matrix[y].substring(x + 1, xMax + 1);
    const neighbors = [above, right, below, left];
    const haveNumbers = neighbors.map((string) => exp.test(string));
    let a, b;
    [a, b] = findNumbers(x, y, haveNumbers);
    return a * b;
}

function findNumbers(x, y, haveNumbers) {
    let values = [];
    const numGlobal = new RegExp("[0-9]+", "g");
    if (haveNumbers[0] == true) {
        //above
        let current;
        while ((current = numGlobal.exec(matrix[y - 1])) !== null) {
            const right = current.index + current[0].length - 1;
            const left = current.index;
            if (right >= x - 1 && left <= x + 1) {
                values.push(current[0]);
            }
        }
    }
    if (haveNumbers[1] == true) {
        //right
        let result = matrix[y].substring(x + 1).match(/^[0-9]+/);
        values.push(result[0]);
    }
    if (haveNumbers[2] == true) {
        //below
        let current;
        while ((current = numGlobal.exec(matrix[y + 1])) !== null) {
            const right = current.index + current[0].length - 1;
            const left = current.index;
            if (right >= x - 1 && left <= x + 1) {
                //console.log(left, right, x);
                values.push(current[0]);
            }
        }
    }
    if (haveNumbers[3] == true) {
        //left
        let result = matrix[y].substring(0, x).match(/[0-9]+$/);
        values.push(result[0]);
    }

    values = values.length < 2 ? [0, 0] : values.map((x) => parseInt(x));
    console.log(values);
    return values;
}

function findAndAdd() {
    const expression = /[*]/g;
    for (let i = 0; i < matrix.length; i++) {
        let current;
        while ((current = expression.exec(matrix[i])) !== null) {
            sum += findAdjacentNumbers(current.index, i);
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
