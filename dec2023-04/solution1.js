const fs = require("node:fs");
const readline = require("readline");

async function processLineByLine() {
    const fileStream = fs.createReadStream("./dec2023-04/input.txt");

    const rl = readline.createInterface({
        input: fileStream,
        //crlfDelay: Infinity,
    });

    let winners = [];
    let owned = [];
    let points = 0;

    for await (const line of rl) {
        winners = line
            .match(/(?<=\| )([\s\d])+/)[0]
            .split(" ")
            .filter((x) => x !== "")
            .map((x) => parseInt(x));
        owned = line
            .match(/(?<=: )([\s\d])+(?= \|)/)[0]
            .split(" ")
            .filter((x) => x !== "")
            .map((x) => parseInt(x));
        const wins = owned.filter((x) => winners.includes(x)).length;
        if (wins) {
            points += Math.pow(2, wins - 1);
        }
    }
    console.log(points);
}

processLineByLine();
