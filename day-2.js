const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-2.txt';
const testIputFilename = './day-2-test.txt';

const getInput = (filename) => {
  return fs
    .readFileSync(filename, 'utf8')
    .trim()
    .split('\n')
    .map((l) => l.split(' '))
    .map(([verb, units]) => [verb, Number(units)]);
};

const computeHorizontalPositionAndDepth = (input) => {
  let horizontalPosition = 0;
  let depth = 0;
  for (const [verb, units] of input) {
    switch (verb) {
      case 'forward':
        horizontalPosition += units;
        break;
      case 'up':
        depth -= units;
        break;
      case 'down':
        depth += units;
        break;
    }
  }
  return [horizontalPosition, depth];
};

const computeHorizontalPositionAndDepthWithAim = (input) => {
  let horizontalPosition = 0;
  let depth = 0;
  let aim = 0;
  for (const [verb, units] of input) {
    switch (verb) {
      case 'forward':
        horizontalPosition += units;
        depth += aim * units;
        break;
      case 'up':
        aim -= units;
        break;
      case 'down':
        aim += units;
        break;
    }
  }
  return [horizontalPosition, depth];
};

const test = () => {
  const testInput = getInput(testIputFilename);
  const [horizontalPosition, depth] = computeHorizontalPositionAndDepth(testInput);
  assert.equal(horizontalPosition, 15);
  assert.equal(depth, 10);
  assert.equal(horizontalPosition * depth, 150);
  const [horizontalPositionWithAim, depthwithAim] = computeHorizontalPositionAndDepthWithAim(testInput);
  assert.equal(horizontalPositionWithAim, 15);
  assert.equal(depthwithAim, 60);
  assert.equal(horizontalPositionWithAim * depthwithAim, 900);
};

const run = () => {
  const input = getInput(inputFilename);
  const [horizontalPosition, depth] = computeHorizontalPositionAndDepth(input);
  console.log(`A) Horizontal position is ${horizontalPosition} and depth is ${depth}.`);
  console.log(`If you multiply, it's ${horizontalPosition * depth}`);
  const [horizontalPositionWithAim, depthwithAim] = computeHorizontalPositionAndDepthWithAim(input);
  console.log(`B) With aim, Horizontal position is ${horizontalPositionWithAim} and depth is ${depthwithAim}.`);
  console.log(`If you multiply, it's ${horizontalPositionWithAim * depthwithAim}`);
};

test();

run();
