const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-3.txt';
const testIputFilename = './day-3-test.txt';

const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

const prepareInput = (filename) => {
  const input = fs.readFileSync(filename, 'utf8').trim().split('\n');

  return Array(input[0].length)
    .fill(null)
    .map((_, i) => input.map((line) => Number(line[i])));
};

const gamma = (entry) => (average(entry) > 0.5 ? 1 : 0);

const epsilon = (entry) => (average(entry) > 0.5 ? 0 : 1);

const computeRate = (input, func) => {
  const binary = input.map(func).join('');
  return parseInt(binary, 2);
};

const test = () => {
  const testInput = prepareInput(testIputFilename);
  const gammaRate = computeRate(testInput, gamma);
  const epsilonRate = computeRate(testInput, epsilon);
  assert.equal(gammaRate, 22);
  assert.equal(epsilonRate, 9);
};

const run = () => {
  const input = prepareInput(inputFilename);
  const gammaRate = computeRate(input, gamma);
  const epsilonRate = computeRate(input, epsilon);
  console.log(`Gamma rate is ${gammaRate} and epsilon rate is ${epsilonRate}.`);
  console.log(`If you multiply, it's ${gammaRate * epsilonRate}`);
};

test();

run();
