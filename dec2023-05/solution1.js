const fs = require("node:fs");
const readline = require("readline");

async function processLineByLine() {
    const fileStream = fs.createReadStream("./dec2023-05/input.txt");

    const rl = readline.createInterface({
        input: fileStream,
        //crlfDelay: Infinity,
    });

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

    let current = [];

    for await (const line of rl) {
        if (line.match(/:/)) {
            almanac.push([]);
        } else if (line !== "") {
            almanac[almanac.length - 1].push(line);
        }
        if (line.match(/seeds:/)) {
            current = line
                .match(/(?<=seeds: )([\s\d]+)/)[0]
                .split(" ")
                .map((x) => parseInt(x));
        }
    }

    almanac = almanac
        .filter((x) => x.length !== 0)
        .map((x) => x.map((x) => x.split(" ").map((x) => parseInt(x))));

    for (let i = 0; i < almanac.length; i++) {
        current = current.map((x) => {
            for (let arr of almanac[i]) {
                // console.log(
                //     { x },
                //     { min: arr[1] },
                //     { range: arr[2] },
                //     { max: arr[1] + arr[2] },
                //     { diffMin: x - arr[1] },
                //     { diffMax: arr[1] + arr[2] - x }
                // );
                if (x >= arr[1] && x <= arr[1] + arr[2]) {
                    return x - arr[1] + arr[0];
                }
            }
            return x;
            //console.log({ i }, { x });
        });
        //console.log(current);
        //console.log(next);
        //console.log(current);
    }
    console.log(current);
    console.log(Math.min(...current));
    return Math.min(...current);
}

processLineByLine();
