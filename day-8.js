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

  for (const [, digits] of input) {
    // console.log(`\nNew Line:`);
    for (const digit of digits) {
      if (digit.length === 2) {
        // console.log(`- ${digit} is a 1`);
        count++;
      } else if (digit.length === 4) {
        // console.log(`- ${digit} is a 4`);
        count++;
      } else if (digit.length === 3) {
        // console.log(`- ${digit} is a 7`);
        count++;
      } else if (digit.length === 7) {
        // console.log(`- ${digit} is a 8`);
        count++;
      }
    }
  }

  return count;
};

function test() {
  const input = getInput(testIputFilename);

  const count = countRecognizableDigits(input);

  assert.equal(count, 26);
}

function run() {
  const input = getInput(inputFilename);

  const count = countRecognizableDigits(input);

  console.log(`There are ${count} recognizable digits`);
}

test();

run();
