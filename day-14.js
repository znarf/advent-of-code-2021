const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-14.txt';
const testInputFilename = './day-14-test.txt';

const placeholder = '_';

const clone = (object) => JSON.parse(JSON.stringify(object));

const getInput = (filename) => {
  const [inputPartA, inputPartB] = fs.readFileSync(filename, 'utf8').trim().split('\n\n');

  const template = inputPartA.split('');

  const rules = inputPartB.split('\n').map((line) => line.split(' -> '));

  return [template, rules];
};

const getTemplateIndex = (template) => {
  const index = {};

  for (let i = 0; i < template.length - 1; i++) {
    const sequence = template[i] + template[i + 1];
    if (index[sequence]) {
      index[sequence]++;
    } else {
      index[sequence] = 1;
    }
  }

  index[placeholder + template[0]] = 1;
  index[template[template.length - 1] + placeholder] = 1;

  return index;
};

function compute(template, rules, steps = 10) {
  const templateIndex = getTemplateIndex(template);

  for (let step = 1; step <= steps; step++) {
    const stepIndex = clone(templateIndex);
    for (const [sequence, element] of rules) {
      if (stepIndex[sequence]) {
        const count = stepIndex[sequence];
        const leftSequence = sequence[0] + element;
        const rightSequence = element + sequence[1];
        templateIndex[sequence] = templateIndex[sequence] ? templateIndex[sequence] - count : -count;
        templateIndex[leftSequence] = templateIndex[leftSequence] ? templateIndex[leftSequence] + count : count;
        templateIndex[rightSequence] = templateIndex[rightSequence] ? templateIndex[rightSequence] + count : count;
      }
    }
  }

  return templateIndex;
}

function computeCounts(result) {
  let totalCounts = {};

  for (const [pattern, count] of Object.entries(result)) {
    const [left, right] = pattern.split('');
    totalCounts[left] = totalCounts[left] ? totalCounts[left] + count : count;
    totalCounts[right] = totalCounts[right] ? totalCounts[right] + count : count;
  }

  delete totalCounts[placeholder];

  totalCounts = Object.keys(totalCounts).map((count) => totalCounts[count] / 2);

  const minCount = Math.min(...Object.values(totalCounts));
  const maxCount = Math.max(...Object.values(totalCounts));

  return { totalCounts, minCount, maxCount };
}

function test() {
  const [template, rules] = getInput(testInputFilename);

  const result10 = compute(template, rules, 10);

  const { minCount, maxCount } = computeCounts(result10);

  assert.equal(maxCount - minCount, 1588);

  const result40 = compute(template, rules, 40);

  const { minCount: minCount40, maxCount: maxCount40 } = computeCounts(result40);

  assert.equal(maxCount40 - minCount40, 2188189693529);
}

function run() {
  const [template, rules] = getInput(inputFilename);

  const result10 = compute(template, rules, 10);

  const { minCount, maxCount } = computeCounts(result10);

  assert.equal(maxCount - minCount, 4244);

  console.log(`Part One) Answer is ${maxCount - minCount}`);

  const result40 = compute(template, rules, 40);

  const { minCount: minCount40, maxCount: maxCount40 } = computeCounts(result40);

  assert.equal(maxCount40 - minCount40, 4807056953866);

  console.log(`Part Two) Answer is ${maxCount40 - minCount40}`);
}

test();

run();
