const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-13.txt';
const testInputFilename = './day-13-test.txt';
const testGridFilename = './day-13-grid.txt';
const testGridFolded1Filename = './day-13-grid-folded-1.txt';
const testGridFolded2Filename = './day-13-grid-folded-2.txt';

const clone = (object) => JSON.parse(JSON.stringify(object));

const drawGrid = (grid) => grid.map((line) => line.join('')).join('\n');

const getInput = (filename) => {
  const [inputPartA, inputPartB] = fs.readFileSync(filename, 'utf8').trim().split('\n\n');

  const coordinates = inputPartA.split('\n').map((line) => line.split(',').map(Number));

  const foldInstructions = inputPartB.split('\n').map((line) => line.replace('fold along ', '').split('='));

  return [coordinates, foldInstructions];
};

const computeGrid = (coordinates) => {
  const xMax = Math.max(...coordinates.map(([x]) => x));
  const yMax = Math.max(...coordinates.map(([, y]) => y));

  const grid = Array(yMax + 1)
    .fill(null)
    .map(() => Array(xMax + 1).fill('.'));

  for (const [x, y] of coordinates) {
    grid[y][x] = '#';
  }

  return grid;
};

const fold = (grid, foldInstruction) => {
  const newGrid = clone(grid);

  const xLength = grid[0].length;
  const yLength = grid.length;

  const axis = foldInstruction[0];

  if (axis === 'y') {
    const line = Number(foldInstruction[1]);
    for (let y = line + 1; y < yLength; y++) {
      const yDecrement = (line - y) * 2;
      for (let x = 0; x < xLength; x++) {
        if (grid[y][x] === '#') {
          // console.log(`Writing a # at position ${x},${y + yDecrement}`);
          newGrid[y + yDecrement][x] = grid[y][x];
        }
      }
    }
    return newGrid.filter((_, index) => index < line);
  }

  if (axis === 'x') {
    const column = Number(foldInstruction[1]);
    for (let x = column + 1; x < xLength; x++) {
      const xDecrement = (column - x) * 2;
      for (let y = 0; y < yLength; y++) {
        if (grid[y][x] === '#') {
          // console.log(`Writing a # at position ${x + xDecrement},${y}`);
          newGrid[y][x + xDecrement] = grid[y][x];
        }
      }
    }
    return newGrid.map((line) => line.filter((_, index) => index < column));
  }
};

function test() {
  const [coordinates, foldInstructions] = getInput(testInputFilename);

  const grid = computeGrid(coordinates);
  const referenceGrid = fs.readFileSync(testGridFilename, 'utf8').trim();
  assert.equal(drawGrid(grid), referenceGrid);

  const folded1Grid = fold(grid, foldInstructions[0]);
  // console.log(drawGrid(folded1Grid));
  const referenceFolded1Grid = fs.readFileSync(testGridFolded1Filename, 'utf8').trim();
  assert.equal(drawGrid(folded1Grid), referenceFolded1Grid);

  const points = folded1Grid.map((line) => line.filter((el) => el === '#')).flat();
  assert.equal(points.length, 17);

  const foldedGrid2 = fold(folded1Grid, foldInstructions[1]);
  // console.log(drawGrid(foldedGrid2));
  const referenceFoldedGrid2 = fs.readFileSync(testGridFolded2Filename, 'utf8').trim();
  assert.equal(drawGrid(foldedGrid2), referenceFoldedGrid2);
}

function run() {
  const [coordinates, foldInstructions] = getInput(inputFilename);

  const grid = computeGrid(coordinates);

  const foldedGrid = fold(grid, foldInstructions[0]);

  const points = foldedGrid.map((line) => line.filter((el) => el === '#')).flat();

  console.log(`Part One) Answer is ${points.length}`);
}

test();

run();
