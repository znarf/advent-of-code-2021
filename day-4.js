const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-4.txt';
const testIputFilename = './day-4-test.txt';

const sum = (arr) => arr.reduce((p, c) => p + c, 0);

const getInput = (filename) => {
  const blocks = fs.readFileSync(filename, 'utf8').trim().split('\n\n');

  const numbers = blocks.shift().trim().split(',').map(Number);

  const grids = blocks.map((block) =>
    block.split('\n').map((line) =>
      line
        .trim()
        .replace(/  +/g, ' ')
        .split(' ')
        .map(Number)
        .map((number) => ({ value: number, marked: false })),
    ),
  );

  return [numbers, grids];
};

function checkGrid(grid) {
  for (const line of grid) {
    if (line.length === line.filter((entry) => entry.marked === true).length) {
      return true;
    }
  }
  const columnCount = grid[0].length;
  for (let column = 0; column < columnCount; column++) {
    const columnEntries = grid.map((line) => line[column]);
    if (columnEntries.length === columnEntries.filter((entry) => entry.marked === true).length) {
      return true;
    }
  }
}

function sumOfAllUnmarkedNumbers(grid) {
  return sum(
    grid
      .flat()
      .filter((entry) => entry.marked === false)
      .map((entry) => entry.value),
  );
}

function game(numbers, grids, type = 'returnWining') {
  for (let i = 1; i <= numbers.length; i++) {
    // console.log(`Round ${i}`);
    const number = numbers[i - 1];
    for (const grid of grids) {
      for (const line of grid) {
        for (const entry of line) {
          if (entry.value === number) {
            // console.log('Number found in grid ', grid, number);
            entry.marked = true;
          }
        }
      }
    }

    for (let i = 0; i < grids.length; i++) {
      const grid = grids[i];
      const result = checkGrid(grid);
      if (result) {
        if (type === 'returnWining') {
          return { number, grid };
        }
        if (type === 'returnLosing') {
          if (grids.length === 1) {
            return { number, grid };
          }
          grids.splice(i, 1);
          i--;
        }
      }
    }
  }
}

function test() {
  const [numbers, grids] = getInput(testIputFilename);
  const { number, grid } = game(numbers, grids, 'returnWining');
  const sum = sumOfAllUnmarkedNumbers(grid);
  assert.equal(sum, 188);
  assert.equal(number, 24);
  assert.equal(sum * number, 4512);
  const { number: numberLosing, grid: gridLosing } = game(numbers, grids, 'returnLosing');
  const sumLosing = sumOfAllUnmarkedNumbers(gridLosing);
  assert.equal(sumLosing, 148);
  assert.equal(numberLosing, 13);
  assert.equal(sumLosing * numberLosing, 1924);
}

function run() {
  const [numbers, grids] = getInput(inputFilename);
  const { number, grid } = game(numbers, grids, 'returnWining');
  const sum = sumOfAllUnmarkedNumbers(grid);
  console.log(`A) sum of all unmarked numbers is ${sum} `);
  console.log(` the number that was just called ${number}`);
  console.log(` multiplication is ${sum * number} `);
  const { number: numberLosing, grid: gridLosing } = game(numbers, grids, 'returnLosing');
  const sumLosing = sumOfAllUnmarkedNumbers(gridLosing);
  console.log(`B) sum of all unmarked numbers is ${sumLosing} `);
  console.log(` the number that was just called ${numberLosing}`);
  console.log(` multiplication is ${sumLosing * numberLosing} `);
}

test();

run();
