const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-7.txt';
const testIputFilename = './day-7-test.txt';

const getIndexedInput = (filename) => {
  const positions = fs.readFileSync(filename, 'utf8').trim().split(',').map(Number);

  const max = Math.max(...positions);

  return positions.reduce((acc, value) => {
    acc[value]++;
    return acc;
  }, Array(max + 1).fill(0));
};

function computeBestPosition(indexedInput) {
  const positionFuels = {};
  for (let i = 0; i < indexedInput.length; i++) {
    let fuel = 0;
    for (let j = 0; j < indexedInput.length; j++) {
      const value = indexedInput[j];
      fuel += Math.abs(i - j) * value;
    }
    positionFuels[i] = fuel;
    // console.log(`Fuel for position ${i} is ${fuel}`);
  }

  const minimumFuel = Math.min(...Object.values(positionFuels));

  const minimumPosition = Object.keys(positionFuels).find((key) => positionFuels[key] === minimumFuel);

  return [minimumFuel, minimumPosition];
}

function test() {
  const indexedInput = getIndexedInput(testIputFilename);

  const [minimumFuel, minimumPosition] = computeBestPosition(indexedInput);

  assert.equal(minimumFuel, 37);
  assert.equal(minimumPosition, 2);
}

function run() {
  const indexedInput = getIndexedInput(inputFilename);

  const [minimumFuel, minimumPosition] = computeBestPosition(indexedInput);

  console.log(`Minimum fuel is ${minimumFuel} at position ${minimumPosition}`);
}

test();

run();
