const fs = require("node:fs");
const readline = require("readline");

async function processLineByLine() {
    const fileStream = fs.createReadStream("./dec2023-04/input.txt");

    const rl = readline.createInterface({
        input: fileStream,
        //crlfDelay: Infinity,
    });
    const matchcards = [];
    let winners = [];
    let owned = [];

    for await (const line of rl) {
        let card = parseInt(line.match(/([\d])+(?=:)/));
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
        //console.log(wins);
        const matchcard = {
            card,
            copies: 1,
            wins,
        };
        matchcards.push(matchcard);
        //console.log(points);
    }

    for (let matchcard of matchcards) {
        if (matchcard.wins > 0) {
            for (let j = 1; j <= matchcard.copies; j++) {
                for (let i = 1; i <= matchcard.wins; i++) {
                    let idx = matchcards.findIndex(
                        (x) => x.card == matchcard.card + i
                    );
                    matchcards[idx].copies++;
                }
            }
        }
    }

    const result = matchcards.reduce((acc, curr) => acc + curr.copies, 0);
    console.log(result);
}

processLineByLine();
