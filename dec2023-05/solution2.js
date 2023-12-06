const fs = require("node:fs");
const readline = require("readline");

let almanac = [];
// indexes of maps:
// 0 seeds
// 1 seed-to-soil map
// 2 soil-to-fertilizer map
// 3 fertilizer-to-water map
// 4 water-to-light map
// 5 light-to-temperature map
// 6 temperature-to-humidity map
// 7 humidity-to-location map

let seeds = [];
let minValue = null;

function cascadeUp(number, i) {
    for (let arr of almanac[i]) {
        if (number >= arr[0] && arr[2] - 1 >= number - arr[0]) {
            return i === 0
                ? findSeed(number - arr[0] + arr[1])
                : cascadeUp(number - arr[0] + arr[1], i - 1);
        }
    }
    return i === 0 ? findSeed(number) : cascadeUp(number, i - 1);
}

function cascadeDown(num, i) {
    for (let arr of almanac[i]) {
        if (num >= arr[1] && num <= arr[1] + arr[2] - 1) {
            return i == almanac.length - 1
                ? num - arr[1] + arr[0]
                : cascadeDown(num - arr[1] + arr[0], i + 1);
        }
    }
    return i == almanac.length - 1 ? num : cascadeDown(num, i + 1);
}

function findSeed(number) {
    for (let i = 0; i < seeds.length; i++) {
        if (i % 2 === 0) {
            if (number >= seeds[i] && number <= seeds[i] + seeds[i + 1]) {
                return number;
            }
        }
    }
    return null;
}

async function processLineByLine() {
    const fileStream = fs.createReadStream("./dec2023-05/input.txt");

    const rl = readline.createInterface({
        input: fileStream,
        //crlfDelay: Infinity,
    });

    for await (const line of rl) {
        if (line.match(/:/)) {
            almanac.push([]);
        } else if (line !== "") {
            almanac[almanac.length - 1].push(line);
        }
        if (line.match(/seeds:/)) {
            seeds = line
                .match(/(?<=seeds: )([\s\d]+)/)[0]
                .split(" ")
                .map((x) => parseInt(x));
        }
    }

    almanac = almanac
        .filter((x) => x.length !== 0)
        .map((x) => x.map((x) => x.split(" ").map((x) => parseInt(x))));

    for (let i = 0; i < 100000000; i++) {
        const result = cascadeUp(i, almanac.length - 1);
        if (result !== null) {
            console.log(cascadeDown(result, 0));
            return cascadeDown(result, 0);
        }
    }

    return minValue;
}

processLineByLine();
