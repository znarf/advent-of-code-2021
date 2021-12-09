const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-9.txt';
const testIputFilename = './day-9-test.txt';

const sum = (arr) => arr.reduce((p, c) => p + c, 0);

const multiply = (arr) => arr.reduce((p, c) => p * c, 1);

const getInput = (filename) =>
  fs
    .readFileSync(filename, 'utf8')
    .trim()
    .split('\n')
    .map((line) => line.split('').map(Number));

const getLowPoints = (input) => {
  const lowPoints = [];

  const xSize = input[0].length;
  const ySize = input.length;

  for (let y = 0; y < ySize; y++) {
    for (let x = 0; x < xSize; x++) {
      const value = input[y][x];

      const adjacentPoints = getAdjacentPoints(input, x, y).map((p) => p.value);

      if (value < Math.min(...adjacentPoints)) {
        lowPoints.push({ x, y, value });
      }
    }
  }

  return lowPoints;
};

const getAdjacentPoints = (input, x, y) => {
  return (
    [
      { y, x: x - 1 }, // left
      { y, x: x + 1 }, // right
      { y: y - 1, x }, // top
      { y: y + 1, x }, // bottom
    ]
      // Add their values if any
      .map(({ x, y }) => ({ x, y, value: input[y] && (input[y][x] || input[y][x] === 0) ? input[y][x] : null }))
      // Filter existing
      .filter((np) => np.value || np.value === 0)
  );
};

const computeBasins = (input) => {
  const lowPoints = getLowPoints(input);

  const basins = [];

  for (const lowPoint of lowPoints) {
    const basin = [lowPoint];

    let newPoints;
    do {
      for (const { x, y, value } of basin) {
        newPoints = getAdjacentPoints(input, x, y)
          // Remove lower points and 9
          .filter((np) => np.value && np.value > value && np.value !== 9)
          // Remove points already registered
          .filter((np) => !basin.find((p) => p.x === np.x && p.y === np.y));

        basin.push(...newPoints);
      }
    } while (newPoints.length > 0);

    basins.push(basin);
  }

  return basins;
};

const computeAnswer = (basins) =>
  multiply(
    basins
      .map((basin) => basin.length)
      .sort((a, b) => b - a)
      .slice(0, 3),
  );

function test() {
  const input = getInput(testIputFilename);

  const lowPoints = getLowPoints(input);

  const riskLevels = lowPoints.map((lowPoint) => lowPoint.value + 1);
  assert.equal(sum(riskLevels), 15);

  const basins = computeBasins(input);

  assert.equal(computeAnswer(basins), 1134);
}

function run() {
  const input = getInput(inputFilename);

  const lowPoints = getLowPoints(input);

  const riskLevels = lowPoints.map((lowPoint) => lowPoint.value + 1);
  console.log(`One) Sum of risk levels is ${sum(riskLevels)}`);

  const basins = computeBasins(input);

  console.log(`Two) Answer is ${computeAnswer(basins)}`);
}

test();

run();
