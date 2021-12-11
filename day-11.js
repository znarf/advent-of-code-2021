const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-11.txt';
const testIputFilename = './day-11-test.txt';

const getInput = (filename) =>
  fs
    .readFileSync(filename, 'utf8')
    .trim()
    .split('\n')
    .map((line) => line.split('').map(Number));

// const drawGrid = (grid) => {
//   // console.log('\n');
//   grid.map((line) => console.log(line.join('')));
//   console.log('\n');
// };

const getAdjacentPoints = (input, x, y) => {
  return [
    { y: y - 1, x }, // north
    { y: y - 1, x: x + 1 }, // north east
    { y, x: x + 1 }, // east
    { y: y + 1, x: x + 1 }, // south east
    { y: y + 1, x }, // south
    { y: y + 1, x: x - 1 }, // south west
    { y, x: x - 1 }, // west
    { y: y - 1, x: x - 1 }, // north west
  ] // Filter existing
    .filter((point) => input[point.y] && input[point.y][point.x] !== undefined);
};

function flash(input, x, y) {
  input[y][x] = 0;

  const adjacentPoints = getAdjacentPoints(input, x, y);

  for (const point of adjacentPoints) {
    if (input[point.y][point.x] !== 0) {
      input[point.y][point.x]++;
    }
  }
}

function play(input) {
  let countFlashes = 0;

  // Increment 1
  for (let y = 0; y < input.length; y++) {
    const line = input[y];
    for (let x = 0; x < line.length; x++) {
      input[y][x]++;
    }
  }
  // Flash over 9
  let hasFlashed;
  do {
    hasFlashed = false;
    for (let y = 0; y < input.length; y++) {
      const line = input[y];
      for (let x = 0; x < line.length; x++) {
        if (input[y][x] > 9) {
          flash(input, x, y);
          hasFlashed = true;
          countFlashes++;
        }
      }
    }
  } while (hasFlashed);

  return countFlashes;
}

function test() {
  const input = getInput(testIputFilename);

  let countFlashes = 0;
  for (let i = 1; i <= 100; i++) {
    // console.log(`After step ${i}`);
    countFlashes += play(input);
    // drawGrid(input);
  }

  assert.equal(countFlashes, 1656);
}

function run() {
  const input = getInput(inputFilename);

  let countFlashes = 0;
  for (let i = 1; i <= 100; i++) {
    countFlashes += play(input);
  }

  console.log(`Part One) ${countFlashes} flashes.`);
}

test();

run();
