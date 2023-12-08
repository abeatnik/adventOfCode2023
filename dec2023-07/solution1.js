const fs = require("node:fs");
const readline = require("readline");

const cardCompare = (cardA, cardB) => {
    const countsA = getCardsCount(cardA);
    const countsB = getCardsCount(cardB);

    for (let i = 0; i < 2; i++) {
        if (countsB[i] > countsA[i]) {
            return -1;
        } else if (countsB[i] < countsA[i]) {
            return 1;
        }
    }
    return getSortValues(cardA) - getSortValues(cardB);
};

const getSortValues = (card) => {
    const ranking = "0123456789TJQKA";
    let sortString = "";
    for (let i = 0; i < card.length; i++) {
        sortString += ranking.indexOf(card[i]).toString(16);
    }
    return parseInt(sortString, 16);
};

const getCardsCount = (card) => {
    const cardMap = {};
    card.split("").forEach((char) => {
        if (cardMap[char]) {
            cardMap[char]++;
        } else {
            cardMap[char] = 1;
        }
    });
    const values = Object.values(cardMap).sort((a, b) => b - a);
    return values;
};

async function processLineByLine() {
    const fileStream = fs.createReadStream("./dec2023-07/input.txt");

    const rl = readline.createInterface({
        input: fileStream,
        //crlfDelay: Infinity,
    });

    const cardDeck = {};

    for await (const line of rl) {
        let cardString = line.match(/[\w]+/)[0];
        let bid = parseInt(line.match(/(?<=\s)\d+/)[0]);
        cardDeck[cardString] = bid;
    }

    let order = Object.keys(cardDeck).sort(cardCompare);

    const sum = order.reduce(
        (acc, curr, idx) => acc + (idx + 1) * cardDeck[curr],
        0
    );

    console.log(sum);
    return sum;
}
//not 6654743778

processLineByLine();
