const fs = require("node:fs");
const readline = require("readline");

function getRaceOptions(time, distance) {
    let minLoad = getMin();
    let maxLoad = getMax();

    function getMin() {
        for (let i = 0; i <= time; i++) {
            if (i * (time - i) > distance) {
                return i;
            }
        }
    }

    function getMax() {
        for (let i = time; i >= 0; i--) {
            if (i * (time - i) > distance) {
                return i;
            }
        }
    }

    return maxLoad - minLoad === 0 ? 1 : maxLoad - minLoad + 1;
}

async function processLineByLine() {
    const fileStream = fs.createReadStream("./dec2023-06/input.txt");

    const rl = readline.createInterface({
        input: fileStream,
        //crlfDelay: Infinity,
    });

    const data = [];
    for await (const line of rl) {
        const raceNumber = line.match(/\d+/g).join("");
        data.push(parseInt(raceNumber));
    }

    const result = getRaceOptions(data[0], data[1]);
    console.log(result);
    return result;
}

processLineByLine();
