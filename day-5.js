const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-5.txt';
const testIputFilename = './day-5-test.txt';

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

const isStraight = ([[x1, y1], [x2, y2]]) => x1 === x2 || y1 === y2;

function test() {
  const gridSize = 10;

  const input = getInput(testIputFilename);

  const grid = createGrid(gridSize);
  const computedGrid = computeGrid(grid, input.filter(isStraight));
  const overlappingPointsCount = countOverlappingPoints(computedGrid);

  assert.equal(overlappingPointsCount, 5);

  const secondGrid = createGrid(gridSize);
  const secondComputedGrid = computeGrid(secondGrid, input);
  const secondOverlappingPointsCount = countOverlappingPoints(secondComputedGrid);

  assert.equal(secondOverlappingPointsCount, 12);
}

function run() {
  const gridSize = 1000;

  const input = getInput(inputFilename);

  const grid = createGrid(gridSize);
  const computedGrid = computeGrid(grid, input.filter(isStraight));
  const overlappingPointsCount = countOverlappingPoints(computedGrid);

  console.log(`A) There is ${overlappingPointsCount} overlapping points.`);

  const secondGrid = createGrid(gridSize);
  const secondComputedGrid = computeGrid(secondGrid, input);
  const secondOverlappingPointsCount = countOverlappingPoints(secondComputedGrid);

  console.log(`B) There is ${secondOverlappingPointsCount} overlapping points.`);
}

test();

run();
