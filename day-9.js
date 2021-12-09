const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-9.txt';
const testIputFilename = './day-9-test.txt';

const sum = (arr) => arr.reduce((p, c) => p + c, 0);

const getInput = (filename) =>
  fs
    .readFileSync(filename, 'utf8')
    .trim()
    .split('\n')
    .map((line) => line.split('').map(Number));

const getRiskLevels = (input) => {
  const lowPoints = [];

  const xSize = input[0].length;
  const ySize = input.length;

  for (let y = 0; y < ySize; y++) {
    for (let x = 0; x < xSize; x++) {
      const point = input[y][x];
      const left = input[y][x - 1];
      const right = input[y][x + 1];
      const top = input[y - 1] ? input[y - 1][x] : null;
      const bottom = input[y + 1] ? input[y + 1][x] : null;

      if (point < Math.min(...[left, right, top, bottom].filter((el) => el || el === 0))) {
        lowPoints.push(point);
      }
    }
  }

  return lowPoints.map((lowPoint) => lowPoint + 1);
};

function test() {
  const input = getInput(testIputFilename);

  const riskLevels = getRiskLevels(input);

  assert.equal(sum(riskLevels), 15);
}

function run() {
  const input = getInput(inputFilename);

  const riskLevels = getRiskLevels(input);

  console.log(`Sum or risk levels is ${sum(riskLevels)}`);
}

test();

run();
