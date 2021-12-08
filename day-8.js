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

const detectors = {
  1: (digitStrings) => digitStrings.find((digitString) => digitString.length === 2),
  4: (digitStrings) => digitStrings.find((digitString) => digitString.length === 4),
  7: (digitStrings) => digitStrings.find((digitString) => digitString.length === 3),
  8: (digitStrings) => digitStrings.find((digitString) => digitString.length === 7),
  // Depend on 7 (length 5, contains 7)
  3: (digitStrings) =>
    digitStrings.find(
      (digitString) => digitString.length === 5 && containsCharacters(digitString, detectors[7](digitStrings)),
    ),
  // - Depend on 3 (length 6, contains 3)
  9: (digitStrings) =>
    digitStrings.find(
      (digitString) => digitString.length === 6 && containsCharacters(digitString, detectors[3](digitStrings)),
    ),
  // - Depend on 9 and 1 (length 6, not 9, not contains 1)
  6: (digitStrings) =>
    digitStrings.find(
      (digitString) =>
        digitString.length === 6 &&
        !containsCharacters(digitString, detectors[1](digitStrings)) &&
        digitString !== detectors[9](digitStrings),
    ),
  // - Depend on 9 and 1 (length 6, not 9, contains 1)
  0: (digitStrings) =>
    digitStrings.find(
      (digitString) =>
        digitString.length === 6 &&
        containsCharacters(digitString, detectors[1](digitStrings)) &&
        digitString !== detectors[9](digitStrings),
    ),
  // - Depend on 6 (length 5, contained in 6)
  5: (digitStrings) =>
    digitStrings.find(
      (digitString) => digitString.length === 5 && containsCharacters(detectors[6](digitStrings), digitString),
    ),
  // Depend on 5 and 3 (length 5, not 5, not 3)
  2: (digitStrings) =>
    digitStrings.find(
      (digitString) =>
        digitString.length === 5 &&
        digitString !== detectors[3](digitStrings) &&
        digitString !== detectors[5](digitStrings),
    ),
};

const detectDigits = (digitStrings) => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => detectors[value](digitStrings));
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
