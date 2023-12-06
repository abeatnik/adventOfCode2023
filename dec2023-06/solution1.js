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
        data.push(line.match(/\d+/g).map((x) => parseInt(x)));
    }
    let [time, distance] = data;
    const options = [];

    for (let i = 0; i < time.length; i++) {
        options.push(getRaceOptions(time[i], distance[i]));
    }
    const result = options.reduce((acc, curr) => acc * curr);
    console.log(result);
    return result;
}

processLineByLine();
