const fs = require("node:fs");
const readline = require("readline");

function compareHands(handA, handB) {
    let [cardsA, jokerA] = getCardsCount(handA);
    let [cardsB, jokerB] = getCardsCount(handB);

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            cardsA[0] += jokerA;
            cardsB[0] += jokerB;
        }
        if (cardsB[i] > cardsA[i]) {
            return -1;
        } else if (cardsB[i] < cardsA[i]) {
            return 1;
        }
        if (i + 1 >= cardsA.length || i + 1 >= cardsB.length) {
            return getSortValues(handA) - getSortValues(handB);
        }
    }
    return getSortValues(handA) - getSortValues(handB);
}

function getSortValues(hand) {
    //converts card order to hexadecimal and then to decimal
    const ranking = "0J23456789TQKA";
    let sortString = "";
    for (let i = 0; i < hand.length; i++) {
        sortString += ranking.indexOf(hand[i]).toString(16);
    }
    return parseInt(sortString, 16);
}

function getCardsCount(hand) {
    const cardMap = {};
    let joker = 0;
    hand.split("").forEach((char) => {
        if (char === "J") {
            // calculates num of jokers separately to avoid double occupancy
            joker++;
        } else if (cardMap[char]) {
            cardMap[char]++;
        } else {
            cardMap[char] = 1;
        }
    });

    //sort to compare strength of hand
    const values = Object.values(cardMap).sort((a, b) => b - a);

    if (values.length === 0) {
        values.push(0);
    }
    return [values, joker];
}

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

    let order = Object.keys(cardDeck).sort(compareHands);

    const sum = order.reduce((acc, curr, idx) => {
        return acc + (idx + 1) * cardDeck[curr];
    }, 0);
    console.log(sum);
    return sum;
}

processLineByLine();
