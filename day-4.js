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
    // TODO: implement column check
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

function game(numbers, grids) {
  for (let i = 1; i <= numbers.length; i++) {
    console.log(`Round ${i}`);
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

    for (const grid of grids) {
      const result = checkGrid(grid);
      if (result) {
        return { number, grid };
      }
    }
  }
}

function test() {
  const [numbers, grids] = getInput(testIputFilename);
  const { number, grid } = game(numbers, grids);
  const sum = sumOfAllUnmarkedNumbers(grid);
  assert.equal(sum, 188);
  assert.equal(number, 24);
  assert.equal(sum * number, 4512);
}

function run() {
  const [numbers, grids] = getInput(inputFilename);
  const { number, grid } = game(numbers, grids);
  const sum = sumOfAllUnmarkedNumbers(grid);
  console.log(`sum of all unmarked numbers is ${sum} `);
  console.log(`the number that was just called ${number}`);
  console.log(`multiplication is ${sum * number} `);
}

test();

run();
