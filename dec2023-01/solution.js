const fs = require("node:fs");
const readline = require("readline");

function makeDigits(string) {
    let digitsOnly = string;
    const pattern = {
        one: "1",
        two: "2",
        three: "3",
        four: "4",
        five: "5",
        six: "6",
        seven: "7",
        eight: "8",
        nine: "9",
    };
    let maxIndex = string.split("").findIndex(isDigit);
    let minIndex = string.split("").findLastIndex(isDigit);

    function findFirst(string) {
        for (let i = 1; i <= maxIndex; i++) {
            for (const [key, value] of Object.entries(pattern)) {
                if (string.substring(0, i).match(key) !== null) {
                    let newString = string.substring(0, i);
                    newString = newString.replace(key, value);
                    console.log(string, "replacing beginning: " + key);
                    console.log(newString + string.substring(i));
                    return newString + string.substring(i);
                }
            }
        }
        return string;
    }

    function findLast(string) {
        //console.log(string);
        for (let i = string.length; i >= minIndex; i--) {
            for (const [key, value] of Object.entries(pattern)) {
                //console.log(string.substring(i - 1));
                if (string.substring(i - 1).match(key) !== null) {
                    let newString = string.substring(i - 1);
                    newString = newString.replace(key, value);
                    console.log(string, "replacing end: " + key);
                    console.log(string.substring(0, i - 1) + newString);
                    return string.substring(0, i - 1) + newString;
                }
            }
        }
        return string;
    }
    digitsOnly = findLast(digitsOnly);
    digitsOnly = findFirst(digitsOnly);
    return digitsOnly;
}

function isDigit(char) {
    return char.match(/[0-9]/) ? true : false;
}

function getDigits(line) {
    const it = line.split("");
    const digit = it.find(isDigit) + it.findLast(isDigit);

    return parseInt(digit);
}

async function processLineByLine() {
    const fileStream = fs.createReadStream("./dec2023-01/input.txt");

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    let result = 0;
    for await (const line of rl) {
        console.log(line, makeDigits(line), getDigits(makeDigits(line)));
        result += getDigits(makeDigits(line));
    }
    console.log(result);
    return result;
}

processLineByLine();
