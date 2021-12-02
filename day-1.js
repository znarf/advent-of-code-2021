const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-1.txt';
const testIputFilename = './day-1-test.txt';

const input = fs.readFileSync(inputFilename, 'utf8').trim().split('\n').map(Number);

const testInput = fs.readFileSync(testIputFilename, 'utf8').trim().split('\n').map(Number);

const countNumberOfTimesDepthMeasurementIncreases = array => {
  let count = 0;
  for (let i = 1; i < array.length; i++) {
    if (array[i] > array[i - 1]) {
      count++;
    }
  }
  return count;
};

const test = () => {
  const count = countNumberOfTimesDepthMeasurementIncreases(testInput);
  assert.equal(count, 7);
};

const run = () => {
  const count = countNumberOfTimesDepthMeasurementIncreases(input);
  console.log(`There are ${count} measurements that are larger than the previous measurement.`);
};

test();

run();
