const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-12.txt';
const testInputFilename = './day-12-test.txt';
const testInputFilename2 = './day-12-test-2.txt';
const testInputFilename3 = './day-12-test-3.txt';

const clone = (object) => JSON.parse(JSON.stringify(object));

const last = (array) => array[array.length - 1];

const isUppercase = (string) => string === string.toUpperCase();

const getInput = (filename) =>
  fs
    .readFileSync(filename, 'utf8')
    .trim()
    .split('\n')
    .map((line) => line.split('-'));

const getIndex = (input) => {
  const index = {};

  for (const [start, end] of input) {
    if (!index[start]) {
      index[start] = [end];
    } else {
      index[start].push(end);
    }
    if (start !== 'start') {
      if (!index[end]) {
        index[end] = [start];
      } else {
        index[end].push(start);
      }
    }
  }

  return index;
};

const explorePath = (index, path) => {
  const paths = [];

  const lastNode = last(path);

  if (index[lastNode]) {
    for (const node of index[lastNode]) {
      if (isUppercase(node) || !path.includes(node)) {
        const newPath = clone(path);
        newPath.push(node);
        paths.push(newPath);
      }
    }
  }

  return paths;
};

const findPaths = (input) => {
  const index = getIndex(input);

  let paths = [['start']];

  let hasNewPaths;
  do {
    hasNewPaths = false;
    const updatedPaths = [];
    for (const path of paths) {
      if (last(path) === 'end') {
        updatedPaths.push(path);
      } else {
        const exploredPaths = explorePath(index, path);
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
  const paths = findPaths(input);
  assert.equal(paths.length, 10);

  const input2 = getInput(testInputFilename2);
  const paths2 = findPaths(input2);
  assert.equal(paths2.length, 19);

  const input3 = getInput(testInputFilename3);
  const paths3 = findPaths(input3);
  assert.equal(paths3.length, 226);
}

function run() {
  const input = getInput(inputFilename);
  const paths = findPaths(input);

  console.log(`There are ${paths.length} pathes.`);
}

test();

run();
