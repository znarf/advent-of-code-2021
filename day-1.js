const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-1.txt';
const testIputFilename = './day-1-test.txt';

const prepareInput = (filename) => {
  return fs.readFileSync(filename, 'utf8').trim().split('\n').map(Number);
};

const countNumberOfTimesDepthMeasurementIncreases = (array) => {
  let count = 0;
  for (let i = 1; i < array.length; i++) {
    if (array[i] > array[i - 1]) {
      count++;
    }
  }
  return count;
};

const countNumberOfTimesDepthMeasurementIncreasesSlidingWindow = (array) => {
  let count = 0;
  let i = 0;
  while (array[i + 3]) {
    if (array[i + 1] + array[i + 2] + array[i + 3] > array[i] + array[i + 1] + array[i + 2]) {
      count++;
    }
    i++;
  }
  return count;
};

const test = () => {
  const testInput = prepareInput(testIputFilename);
  const count = countNumberOfTimesDepthMeasurementIncreases(testInput);
  assert.equal(count, 7);
  const countSlidingWindow = countNumberOfTimesDepthMeasurementIncreasesSlidingWindow(testInput);
  assert.equal(countSlidingWindow, 5);
};

const run = () => {
  const input = prepareInput(inputFilename);
  const count = countNumberOfTimesDepthMeasurementIncreases(input);
  console.log(`A) There are ${count} measurements that are larger than the previous measurement.`);
  const countSlidingWindow = countNumberOfTimesDepthMeasurementIncreasesSlidingWindow(input);
  console.log(`B) When using sliding window, there are ${countSlidingWindow}.`);
};

test();

run();
