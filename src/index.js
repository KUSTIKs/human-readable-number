const numberNames = {
    0: "",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
};
const tensNames = {
    1: "ten",
    2: "twenty",
    3: "thirty",
    4: "forty",
    5: "fifty",
    6: "sixty",
    7: "seventy",
    8: "eighty",
    9: "ninety",
};
const numberRankNames = {
    0: "",
    1: "thousand",
    2: "million",
    3: "billion",
    4: "trillion",
    5: "quadrillion",
    6: "quintillion",
    7: "sextillion",
    8: "septillion",
};
Array.prototype.rChunks = function (size = 3) {
    const arr = this.reverse();
    const res = [];
    while (arr.length > 0) {
        res.push(arr.splice(0, size).reverse());
    }
    return res.reverse();
};
function getChunkName(chunk) {
    const [ones, tens, hundreds] = chunk.reverse();
    const res = [];
    if (numberNames[hundreds]) {
        res.push(...[numberNames[hundreds], "hundred"]);
    }
    if (tens == 1 && ones != 0) {
        res.push(numberNames[`${tens}${ones}`]);
    } else {
        res.push(...[tensNames[tens], numberNames[ones]]);
    }
    return res.filter(Boolean);
}

module.exports = function toReadable(number) {
    if (!Number.isInteger(number)) throw TypeError("Number must be an integer");
    const numberChunks = [...number.toString()].rChunks();
    return (
        numberChunks
            .reverse()
            .map((chunk, ind) => {
                return getChunkName(chunk).concat(numberRankNames[ind]);
            })
            .reverse()
            .flat()
            .filter(Boolean)
            .join(" ") || "zero"
    );
};
