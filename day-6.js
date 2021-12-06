const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-6.txt';
const testIputFilename = './day-6-test.txt';

const getInput = (filename) => fs.readFileSync(filename, 'utf8').trim().split(',').map(Number);

const sum = (arr) => arr.reduce((p, c) => p + c, 0);

const getOptimisedInput = (filename) =>
  fs
    .readFileSync(filename, 'utf8')
    .trim()
    .split(',')
    .map(Number)
    .reduce((acc, value) => {
      acc[value]++;
      return acc;
    }, Array(9).fill(0));

function computeDay(fishs) {
  let i = 0;
  while (fishs[i] !== undefined) {
    if (fishs[i] === 0) {
      fishs[i] = 6;
      fishs.push(9);
    } else {
      fishs[i]--;
    }
    i++;
  }
  return fishs;
}

function computeOptimisedDay(fishs) {
  const zeroCount = fishs.shift();
  fishs.push(0);
  fishs[6] = fishs[6] + zeroCount;
  fishs[8] = zeroCount;
  return fishs;
}

function test() {
  console.log(`TEST\n----`);
  let fishs = getInput(testIputFilename);
  let fishsOptimised = getOptimisedInput(testIputFilename);
  console.log(`Initial state: ${fishs.join()}`);
  for (let day = 1; day <= 256; day++) {
    if (day <= 80) {
      fishs = computeDay(fishs);
    }
    fishsOptimised = computeOptimisedDay(fishsOptimised);
    if (day <= 18) {
      console.log(`After ${day} days: ${fishs.join()}`);
    }
    if (day === 18) {
      assert.equal(fishs.length, 26);
      assert.equal(sum(fishsOptimised), 26);
    }
    if (day === 80) {
      assert.equal(fishs.length, 5934);
      assert.equal(sum(fishsOptimised), 5934);
    }
    if (day === 256) {
      assert.equal(sum(fishsOptimised), 26984457539);
    }
  }
}

test();

function run() {
  console.log(`\nRUN\n---`);
  let fishs = getInput(inputFilename);
  let fishsOptimised = getOptimisedInput(inputFilename);
  for (let day = 1; day <= 256; day++) {
    if (day <= 80) {
      fishs = computeDay(fishs);
    }
    fishsOptimised = computeOptimisedDay(fishsOptimised);
    if (day === 80) {
      console.log(`A) After ${day} days, ${fishs.length} fishs.`);
    }
    if (day === 256) {
      console.log(`B) After ${day} days, ${sum(fishsOptimised)} fishs.`);
    }
  }
}

run();
