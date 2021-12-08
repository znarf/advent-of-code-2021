const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-8.txt';
const testIputFilename = './day-8-test.txt';

const getInput = (filename) =>
  fs
    .readFileSync(filename, 'utf8')
    .trim()
    .split('\n')
    .map((line) => line.split('|').map((s) => s.trim().split(' ')));

const countRecognizableDigits = (input) => {
  let count = 0;

  for (const [signalStrings, digitStrings] of input) {
    const detectedDigits = detectDigits(signalStrings);
    for (const digitString of digitStrings) {
      if (sameCharacters(digitString, detectedDigits[1])) {
        // console.log(`- ${digitString} is a 1`);
        count++;
      } else if (sameCharacters(digitString, detectedDigits[4])) {
        // console.log(`- ${digitString} is a 4`);
        count++;
      } else if (sameCharacters(digitString, detectedDigits[7])) {
        // console.log(`- ${digitString} is a 7`);
        count++;
      } else if (sameCharacters(digitString, detectedDigits[8])) {
        // console.log(`- ${digitString} is a 8`);
        count++;
      }
    }
  }

  return count;
};

const containsCharacters = (string, characters) => {
  return characters.split('').filter((c) => !string.includes(c)).length === 0;
};

const sameCharacters = (string, characters) => {
  return characters.length === string.length && characters.split('').filter((c) => !string.includes(c)).length === 0;
};

const detectDigits = (strings) => {
  const digits = Array(9).fill(null);

  digits[1] = strings.find((s) => s.length === 2);
  digits[4] = strings.find((s) => s.length === 4);
  digits[7] = strings.find((s) => s.length === 3);
  digits[8] = strings.find((s) => s.length === 7);

  digits[3] = strings.find((s) => s.length === 5 && containsCharacters(s, digits[7]));

  digits[9] = strings.find((s) => s.length === 6 && containsCharacters(s, digits[3]));
  digits[0] = strings.find((s) => s.length === 6 && s !== digits[9] && containsCharacters(s, digits[1]));
  digits[6] = strings.find((s) => s.length === 6 && s !== digits[9] && s !== digits[0]);

  digits[5] = strings.find((s) => s.length === 5 && containsCharacters(digits[6], s));
  digits[2] = strings.find((s) => s.length === 5 && s !== digits[3] && s !== digits[5]);

  return digits;
};

const computeTotal = (input) => {
  let total = 0;

  for (const [signalStrings, digitStrings] of input) {
    const detectedDigits = detectDigits(signalStrings);

    const convertedDigits = digitStrings.map((digitString) =>
      detectedDigits.findIndex((detectedDigit) => sameCharacters(digitString, detectedDigit)),
    );

    const convertDigitsAsNumber = Number(convertedDigits.join(''));

    total += convertDigitsAsNumber;
  }

  return total;
};

function test() {
  const input = getInput(testIputFilename);

  const count = countRecognizableDigits(input);

  assert.equal(count, 26);

  const total = computeTotal(input);

  assert.equal(total, 61229);
}

function run() {
  const input = getInput(inputFilename);

  const count = countRecognizableDigits(input);

  console.log(`One) There are ${count} recognizable digits`);

  const total = computeTotal(input);

  console.log(`Two) Total is ${total} `);
}

test();

run();
