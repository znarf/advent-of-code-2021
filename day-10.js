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

const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const openingChars = charPairs.map((p) => p[0]);

const closingChars = charPairs.map((p) => p[1]);

const getMatchingOpeningChar = (char) => {
  const pair = charPairs.find(([, closingChar]) => closingChar === char);

  return pair[0];
};

function getBreakingCharacters(input) {
  const breakingCharacters = [];
  for (const line of input) {
    // console.log(`Processing ${line}`);
    let breakingCharacter;
    const stack = [];
    const chars = line.split('');
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      if (openingChars.includes(char)) {
        stack.push(char);
      }
      if (closingChars.includes(char)) {
        if (getMatchingOpeningChar(char) === stack[stack.length - 1]) {
          stack.pop();
        } else {
          if (!breakingCharacter) {
            // console.log(`-> Nasty char ${char} at position ${i} in line ${line}`);
            breakingCharacter = char;
          }
        }
      }
    }
    if (breakingCharacter) {
      breakingCharacters.push(breakingCharacter);
    }
    if (stack.length > 0) {
      // console.log(`-> Line is incomplete.`);
    }
  }

  return breakingCharacters;
}

function computeScore(breakingCharacters) {
  return sum(breakingCharacters.map((char) => points[char]));
}

function test() {
  const input = getInput(testIputFilename);

  const breakingCharacters = getBreakingCharacters(input);

  assert.equal(computeScore(breakingCharacters), 26397);
}

function run() {
  const input = getInput(inputFilename);

  const breakingCharacters = getBreakingCharacters(input);

  console.log(`Part One) Score is ${computeScore(breakingCharacters)}`);
}

test();

run();
