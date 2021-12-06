const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-6.txt';
const testIputFilename = './day-6-test.txt';

const getInput = (filename) => fs.readFileSync(filename, 'utf8').trim().split(',').map(Number);

function computeDay(fishs) {
  let i = 0;
  while (fishs[i] !== undefined) {
    if (fishs[i] === 0) {
      fishs[i] = 6;
      fishs.push(9);
    } else {
      fishs[i]--;
    }
    i++;
  }
  return fishs;
}

function test() {
  let fishs = getInput(testIputFilename);
  console.log(`Initial state: ${fishs.join()}`);
  for (let day = 1; day <= 80; day++) {
    fishs = computeDay(fishs);
    if (day <= 18) {
      console.log(`After ${day} days: ${fishs.join()}`);
    }
    if (day === 18) {
      assert.equal(fishs.length, 26);
    }
    if (day === 80) {
      assert.equal(fishs.length, 5934);
    }
  }
}

test();

function run() {
  let fishs = getInput(inputFilename);
  for (let day = 1; day <= 80; day++) {
    fishs = computeDay(fishs);
    if (day === 80) {
      console.log(`After ${day} days, ${fishs.length} fishs.`);
    }
  }
}

run();
