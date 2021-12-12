const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-12.txt';
const testInputFilename = './day-12-test.txt';
const testInputFilename2 = './day-12-test-2.txt';
const testInputFilename3 = './day-12-test-3.txt';

const START = 'start';
const END = 'end';

const clone = (object) => JSON.parse(JSON.stringify(object));

const last = (array) => array[array.length - 1];

const isUppercase = (string) => string === string.toUpperCase();

const hasDuplicates = (arr) => new Set(arr).size !== arr.length;

// const printPaths = (paths) => {
//   console.log(
//     paths
//       .map((nodes) => nodes.join(','))
//       .sort()
//       .join('\n'),
//   );
// };

const getInput = (filename) =>
  fs
    .readFileSync(filename, 'utf8')
    .trim()
    .split('\n')
    .map((line) => line.split('-'));

const getIndex = (input) => {
  const index = {};

  for (const [start, end] of input) {
    if (end !== START) {
      if (!index[start]) {
        index[start] = [end];
      } else {
        index[start].push(end);
      }
    }
    if (start !== START) {
      if (!index[end]) {
        index[end] = [start];
      } else {
        index[end].push(start);
      }
    }
  }

  return index;
};

const explorePath = (index, path, nodeAllowance = 0) => {
  const paths = [];

  // Make sure nodeAllowance is only used once
  if (nodeAllowance > 0) {
    if (hasDuplicates(path.filter((node) => !isUppercase(node)))) {
      nodeAllowance = 0;
    }
  }

  const lastNode = last(path);

  if (index[lastNode]) {
    for (const node of index[lastNode]) {
      const countNode = path.filter((n) => n === node).length;
      if (isUppercase(node) || countNode <= nodeAllowance) {
        const newPath = clone(path);
        newPath.push(node);
        paths.push(newPath);
      }
    }
  }

  return paths;
};

const findPaths = (input, nodeAllowance = 0) => {
  const index = getIndex(input);

  let paths = [[START]];

  let hasNewPaths;
  do {
    hasNewPaths = false;
    const updatedPaths = [];
    for (const path of paths) {
      if (last(path) === END) {
        updatedPaths.push(path);
      } else {
        const exploredPaths = explorePath(index, path, nodeAllowance);
        if (exploredPaths.length > 0) {
          hasNewPaths = true;
          updatedPaths.push(...exploredPaths);
        }
      }
    }
    paths = updatedPaths;
  } while (hasNewPaths);

  return paths;
};

function test() {
  const input = getInput(testInputFilename);
  const input2 = getInput(testInputFilename2);
  const input3 = getInput(testInputFilename3);

  const paths = findPaths(input);
  assert.equal(paths.length, 10);

  const paths2 = findPaths(input2);
  assert.equal(paths2.length, 19);

  const paths3 = findPaths(input3);
  assert.equal(paths3.length, 226);

  const pathsTwo = findPaths(input, 1);
  assert.equal(pathsTwo.length, 36);

  const paths2Two = findPaths(input2, 1);
  assert.equal(paths2Two.length, 103);

  const paths3Two = findPaths(input3, 1);
  assert.equal(paths3Two.length, 3509);
}

function run() {
  const input = getInput(inputFilename);
  const paths = findPaths(input);

  console.log(`Part One) There are ${paths.length} pathes.`);

  const pathsTwo = findPaths(input, 1);

  console.log(`Part Two) There are ${pathsTwo.length} pathes.`);
}

test();

run();
