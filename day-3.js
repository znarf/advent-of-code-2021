const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-3.txt';
const testIputFilename = './day-3-test.txt';

const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

const getInput = (filename) => {
  return fs.readFileSync(filename, 'utf8').trim().split('\n');
};

const prepareInput = (input) => {
  return Array(input[0].length)
    .fill(null)
    .map((_, i) => input.map((line) => Number(line[i])));
};

const gamma = (entry) => (average(entry) >= 0.5 ? 1 : 0);

const epsilon = (entry) => (average(entry) >= 0.5 ? 0 : 1);

const computeRate = (input, func) => {
  const binary = prepareInput(input).map(func).join('');
  return parseInt(binary, 2);
};

const computeAdvancedRate = (input, func) => {
  let binary;
  let filteredInput = [...input];

  let i = 0;
  while (filteredInput.length > 1) {
    binary = prepareInput(filteredInput).map(func).join('');
    filteredInput = filteredInput.filter((entry) => entry[i] === binary[i]);
    i++;
  }

  return parseInt(filteredInput[0], 2);
};

const test = () => {
  const input = getInput(testIputFilename);
  const gammaRate = computeRate(input, gamma);
  const epsilonRate = computeRate(input, epsilon);
  assert.equal(gammaRate, 22);
  assert.equal(epsilonRate, 9);
  const oxygenRate = computeAdvancedRate(input, gamma);
  assert.equal(oxygenRate, 23);
  const co2Rate = computeAdvancedRate(input, epsilon);
  assert.equal(co2Rate, 10);
  assert.equal(oxygenRate * co2Rate, 230);
};

const run = () => {
  const input = getInput(inputFilename);

  const gammaRate = computeRate(input, gamma);
  const epsilonRate = computeRate(input, epsilon);
  console.log(`A) Gamma rate is ${gammaRate} and epsilon rate is ${epsilonRate}.`);
  console.log(`If you multiply, it's ${gammaRate * epsilonRate}`);
  const oxygenRate = computeAdvancedRate(input, gamma);
  const co2Rate = computeAdvancedRate(input, epsilon);
  console.log(`B) Oxygen rate is ${oxygenRate} and CO2 rate is ${co2Rate}.`);
  console.log(`If you multiply, it's ${oxygenRate * co2Rate}`);
};

test();

run();
