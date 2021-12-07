const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-7.txt';
const testIputFilename = './day-7-test.txt';

// const sum = (arr) => arr.reduce((p, c) => p + c, 0);

const getIndexedInput = (filename) => {
  const positions = fs.readFileSync(filename, 'utf8').trim().split(',').map(Number);

  const max = Math.max(...positions);

  return positions.reduce((acc, value) => {
    acc[value]++;
    return acc;
  }, Array(max + 1).fill(0));
};

const fuelForDistanceIndex = {};

function computeFuelForDistance(distance) {
  // Cache
  if (fuelForDistanceIndex[distance] !== undefined) {
    return fuelForDistanceIndex[distance];
  }

  let fuel = 0;
  for (let i = 0; i < distance; i++) {
    fuel += i + 1;
  }

  fuelForDistanceIndex[distance] = fuel;

  return fuel;

  // Alternative algorithm, slower
  // const steps = Array.from({ length: distance }, (_, i) => i + 1);
  // fuelForDistanceIndex[distance] = sum(steps);
  // return fuelForDistanceIndex[distance];
}

function computeBestPosition(indexedInput, version = 'a') {
  const positionFuels = {};
  for (let i = 0; i < indexedInput.length; i++) {
    let fuel = 0;
    for (let j = 0; j < indexedInput.length; j++) {
      const value = indexedInput[j];
      const distance = Math.abs(i - j);
      if (version === 'a') {
        fuel += distance * value;
      } else {
        fuel += computeFuelForDistance(distance) * value;
      }
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

  const [minimumFuel, minimumPosition] = computeBestPosition(indexedInput, 'a');

  assert.equal(minimumFuel, 37);
  assert.equal(minimumPosition, 2);

  assert.equal(computeFuelForDistance(11), 66);
  assert.equal(computeFuelForDistance(5), 15);
  assert.equal(computeFuelForDistance(3), 6);
  assert.equal(computeFuelForDistance(1), 1);
  assert.equal(computeFuelForDistance(2), 3);
  assert.equal(computeFuelForDistance(4), 10);
  assert.equal(computeFuelForDistance(9), 45);

  const [minimumFuelB, minimumPositionB] = computeBestPosition(indexedInput, 'b');

  assert.equal(minimumFuelB, 168);
  assert.equal(minimumPositionB, 5);
}

function run() {
  const indexedInput = getIndexedInput(inputFilename);

  const [minimumFuel, minimumPosition] = computeBestPosition(indexedInput, 'a');

  console.log(`A) Minimum fuel is ${minimumFuel} at position ${minimumPosition}`);

  const [minimumFuelB, minimumPositionB] = computeBestPosition(indexedInput, 'b');

  console.log(`B) Minimum fuel is ${minimumFuelB} at position ${minimumPositionB}`);
}

test();

run();
