const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-5.txt';
const testIputFilename = './day-5-test.txt';

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

const getInput = (filename) =>
  fs
    .readFileSync(filename, 'utf8')
    .trim()
    .split('\n')
    .map((line) => line.split(' -> '))
    .map((parts) => parts.map((part) => part.split(',').map(Number)));

const createGrid = (gridSize = 10) =>
  Array(gridSize)
    .fill(null)
    .map(() => Array(gridSize).fill(0));

const computeGrid = (grid, input) => {
  for (const [[x1, y1], [x2, y2]] of input) {
    const xIterate = x1 === x2 ? 0 : x2 > x1 ? 1 : -1;
    const yIterate = y1 === y2 ? 0 : y2 > y1 ? 1 : -1;
    const countIterate = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    let xPosition = x1;
    let yPosition = y1;
    for (let i = 0; i <= countIterate; i++) {
      grid[yPosition][xPosition]++;
      // drawGrid(grid);
      xPosition = xPosition + xIterate;
      yPosition = yPosition + yIterate;
    }
  }
  return grid;
};

// const drawGrid = (grid) => {
//   console.log('\n');
//   grid.map((line) => console.log(line.join('')));
//   console.log('\n');
// };

const countOverlappingPoints = (grid) => {
  let count = 0;
  for (const line of grid) {
    for (const point of line) {
      if (point >= 2) {
        count++;
      }
    }
  }
  return count;
};

const isDiagonal = (entry) => {
  const [[x1, y1], [x2, y2]] = entry;

  const xDiff = x1 - x2;
  const yDiff = y1 - y2;

  return Math.abs(xDiff / yDiff) === 1;
};

const isStraight = (entry) => {
  const [[x1, y1], [x2, y2]] = entry;
  return x1 === x2 || y1 === y2;
};

function test() {
  const input = getInput(testIputFilename);

  const filteredInput = input.filter(isStraight);

  const grid = createGrid(10);
  const computedGrid = computeGrid(grid, filteredInput);
  const overlappingPointsCount = countOverlappingPoints(computedGrid);

  assert.equal(overlappingPointsCount, 5);

  const secondFilteredInput = input.filter((entry) => isStraight(entry) || isDiagonal(entry));

  const secondGrid = createGrid(10);
  const secondComputedGrid = computeGrid(secondGrid, secondFilteredInput);
  const secondOverlappingPointsCount = countOverlappingPoints(secondComputedGrid);

  assert.equal(secondOverlappingPointsCount, 12);
}

function run() {
  const input = getInput(inputFilename);

  const filteredInput = input.filter(isStraight);

  const grid = createGrid(1000);
  const computedGrid = computeGrid(grid, filteredInput);
  const overlappingPointsCount = countOverlappingPoints(computedGrid);

  console.log(`A) There ${overlappingPointsCount} is overlapping points.`);

  const secondFilteredInput = input.filter((entry) => isStraight(entry) || isDiagonal(entry));

  const secondGrid = createGrid(1000);
  const secondComputedGrid = computeGrid(secondGrid, secondFilteredInput);
  const secondOverlappingPointsCount = countOverlappingPoints(secondComputedGrid);

  console.log(`B) There ${secondOverlappingPointsCount} is overlapping points.`);
}

test();

run();
