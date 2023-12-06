const fs = require("node:fs");
const readline = require("readline");

const getId = (string) => {
    const id = parseInt(string.match(/(?<=Game )([0-9])*/)[0]);
    return id;
};

const getColor = (color) => (string) => {
    const expression = `([0-9])+(?= ${color})`;
    const regex = new RegExp(expression, "g");
    let occurrences = string.match(regex);
    if (occurrences == null) return 0;
    const count = occurrences
        .map((num) => parseInt(num))
        .reduce((curr, acc) => acc + curr, 0);

    return count;
};

const getRed = getColor("red");
const getGreen = getColor("green");
const getBlue = getColor("blue");

const getMax = (arr) => Math.max(...arr);

async function processLineByLine() {
    const fileStream = fs.createReadStream("./dec2023-02/input.txt");

    const rl = readline.createInterface({
        input: fileStream,
        //crlfDelay: Infinity,
    });

    let result = 0;

    for await (const line of rl) {
        const sets = line.split(";");
        const red = sets.map(getRed);
        const green = sets.map(getGreen);
        const blue = sets.map(getBlue);

        result += getMax(red) * getMax(green) * getMax(blue);
    }
    console.log(result);
    return result;
}

processLineByLine();
