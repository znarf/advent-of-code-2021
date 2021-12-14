const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-14.txt';
const testInputFilename = './day-14-test.txt';

const getInput = (filename) => {
  const [inputPartA, inputPartB] = fs.readFileSync(filename, 'utf8').trim().split('\n\n');

  const template = inputPartA.split('');

  const rules = inputPartB.split('\n').map((line) => line.split(' -> '));

  return [template, rules];
};

const getRulesIndex = (rules) => {
  const rulesIndex = {};
  for (const [pattern, element] of rules) {
    rulesIndex[pattern] = element;
  }
  return rulesIndex;
};

function computeTemplate(template, rules, steps = 10) {
  const rulesIndex = getRulesIndex(rules);

  // console.log(`Template: ${template}`);

  for (let step = 1; step <= steps; step++) {
    for (let i = 0; i < template.length - 1; i++) {
      const sequence = template[i] + template[i + 1];
      if (rulesIndex[sequence]) {
        template.splice(i + 1, 0, rulesIndex[sequence]);
        i++;
      }
    }
    // if (step <= 4) {
    //   console.log(`After step ${step}: ${template.join('')}`);
    // } else {
    //   console.log(`After step ${step}: ${template.length} length`);
    // }
  }

  return template;
}

function computeCounts(template) {
  const totalCounts = template.reduce((counts, value) => {
    counts[value] = counts[value] ? counts[value] + 1 : 1;
    return counts;
  }, {});

  const minCount = Math.min(...Object.values(totalCounts));
  const maxCount = Math.max(...Object.values(totalCounts));

  return { totalCounts, minCount, maxCount };
}

function test() {
  const [template, rules] = getInput(testInputFilename);

  const computedTemplate = computeTemplate(template, rules, 10);

  const { minCount, maxCount } = computeCounts(computedTemplate);

  assert.equal(maxCount - minCount, 1588);
}

function run() {
  const [template, rules] = getInput(inputFilename);

  const computedTemplate = computeTemplate(template, rules, 10);

  const { minCount, maxCount } = computeCounts(computedTemplate);

  console.log(`Part One) Answer is ${maxCount - minCount}`);
}

test();

run();
