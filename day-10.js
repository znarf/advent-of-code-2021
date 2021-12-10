const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-10.txt';
const testIputFilename = './day-10-test.txt';

const sum = (arr) => arr.reduce((p, c) => p + c, 0);

const getInput = (filename) => fs.readFileSync(filename, 'utf8').trim().split('\n');

const charPairs = [
  ['(', ')'],
  ['[', ']'],
  ['{', '}'],
  ['<', '>'],
];

const pointsPartOne = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const pointsPartTwo = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

const openingChars = charPairs.map((p) => p[0]);

const closingChars = charPairs.map((p) => p[1]);

const getMatchingOpeningChar = (char) => charPairs.find(([, closingChar]) => closingChar === char)[0];

const getMatchingClosingChar = (char) => charPairs.find(([openingChar]) => openingChar === char)[1];

const computeScorePartOne = (chars) => sum(chars.map((char) => pointsPartOne[char]));

const computeScorePartTwo = (chars) => chars.reduce((score, char) => score * 5 + pointsPartTwo[char], 0);

function getBreakingCharacters(input) {
  const breakingCharacters = [];

  for (const line of input) {
    const stack = [];
    for (const char of line) {
      if (openingChars.includes(char)) {
        stack.push(char);
      }
      if (closingChars.includes(char)) {
        if (getMatchingOpeningChar(char) === stack[stack.length - 1]) {
          stack.pop();
        } else {
          breakingCharacters.push(char);
          break;
        }
      }
    }
  }

  return breakingCharacters;
}

function getIncompleteLines(input) {
  const incompleteLines = [];

  for (const line of input) {
    let breakingCharacter;
    const stack = [];
    for (const char of line) {
      if (openingChars.includes(char)) {
        stack.push(char);
      }
      if (closingChars.includes(char)) {
        if (getMatchingOpeningChar(char) === stack[stack.length - 1]) {
          stack.pop();
        } else {
          breakingCharacter = char;
          break;
        }
      }
    }
    if (!breakingCharacter && stack.length > 0) {
      incompleteLines.push({ line, stack });
    }
  }

  return incompleteLines;
}

function test() {
  const input = getInput(testIputFilename);

  const breakingCharacters = getBreakingCharacters(input);

  assert.equal(computeScorePartOne(breakingCharacters), 26397);

  const incompleteLines = getIncompleteLines(input);

  assert.equal(incompleteLines.length, 5);

  const scores = incompleteLines
    .map((line) => line.stack.reverse().map((char) => getMatchingClosingChar(char)))
    .map(computeScorePartTwo)
    .sort((a, b) => a - b);

  assert.deepEqual(scores, [294, 5566, 288957, 995444, 1480781]);

  const middleIndex = (scores.length - 1) / 2;

  assert.deepEqual(scores[middleIndex], 288957);
}

function run() {
  const input = getInput(inputFilename);

  const breakingCharacters = getBreakingCharacters(input);

  console.log(`Part One) Score is ${computeScorePartOne(breakingCharacters)}`);

  const scores = getIncompleteLines(input)
    .map((line) => line.stack.reverse().map((char) => getMatchingClosingChar(char)))
    .map(computeScorePartTwo)
    .sort((a, b) => a - b);

  const middleIndex = (scores.length - 1) / 2;

  console.log(`Part Two) Score is ${scores[middleIndex]}`);
}

test();

run();
