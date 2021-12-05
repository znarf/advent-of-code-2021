const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-5.txt';
const testIputFilename = './day-5-test.txt';

const X_SIZE = 1000;
const Y_SIZE = 1000;

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

const createGrid = () =>
  Array(Y_SIZE)
    .fill(null)
    .map(() => Array(X_SIZE).fill(0));

const computeGrid = async (grid, input) => {
  for (const [[x1, y1], [x2, y2]] of input) {
    for (let x = x1; x2 > x1 ? x <= x2 : x >= x2; x2 > x1 ? x++ : x--) {
      for (let y = y1; y2 > y1 ? y <= y2 : y >= y2; y2 > y1 ? y++ : y--) {
        grid[y][x]++;
        // await sleep(300);
        // drawGrid(grid);
      }
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

async function test() {
  const input = getInput(testIputFilename);

  // For now, only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2.
  const filteredInput = input.filter(([[x1, y1], [x2, y2]]) => x1 === x2 || y1 === y2);

  const grid = createGrid();
  const computedGrid = await computeGrid(grid, filteredInput);
  const overlappingPointsCount = countOverlappingPoints(computedGrid);

  assert(overlappingPointsCount, 5);
}

async function run() {
  const input = getInput(inputFilename);

  // For now, only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2.
  const filteredInput = input.filter(([[x1, y1], [x2, y2]]) => x1 === x2 || y1 === y2);

  const grid = createGrid();
  const computedGrid = await computeGrid(grid, filteredInput);
  const overlappingPointsCount = countOverlappingPoints(computedGrid);

  console.log(`There ${overlappingPointsCount} is overlapping points.`);
}

test();

run();
