const assert = require('assert');
const fs = require('fs');

const inputFilename = './day-14.txt';
const testInputFilename = './day-14-test.txt';

const clone = (object) => JSON.parse(JSON.stringify(object));

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

const getLinkedListTemplate = (template) => {
  const list = { first: {} };
  let current;
  for (const char of template) {
    const entry = { value: char };
    if (!current) {
      list.first = entry;
      current = list.first;
    } else {
      current.next = entry;
      current = current.next;
    }
  }
  return list;
};

function computeTemplate(template, rules, steps = 10) {
  const rulesIndex = getRulesIndex(rules);

  // console.log(`Template: ${template}`);

  for (let step = 1; step <= steps; step++) {
    // console.log(`Step: ${step}`);
    let current = template.first;
    while (current.next) {
      const sequence = current.value + current.next.value;
      // console.log(`sequence: ${sequence}`);
      if (rulesIndex[sequence]) {
        const entry = { value: rulesIndex[sequence], next: current.next };

        current.next = entry;

        current = current.next;
      }
      current = current.next;
    }
  }

  const templateArray = [];
  let current = template.first;
  while (current) {
    templateArray.push(current.value);
    current = current.next;
  }

  return templateArray;
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
  const linkedListTemplate1 = getLinkedListTemplate(clone(template));

  const computedTemplate1 = computeTemplate(linkedListTemplate1, rules, 1);
  assert.equal(computedTemplate1.join(''), 'NCNBCHB');

  const linkedListTemplate = getLinkedListTemplate(clone(template));

  const computedTemplate = computeTemplate(linkedListTemplate, rules, 10);

  const { minCount, maxCount } = computeCounts(computedTemplate);

  assert.equal(maxCount - minCount, 1588);
}

function run() {
  const [template, rules] = getInput(inputFilename);

  const linkedListTemplate = getLinkedListTemplate(clone(template));
  const computedTemplate = computeTemplate(linkedListTemplate, rules, 10);

  const { minCount, maxCount } = computeCounts(computedTemplate);

  console.log(`Part One) Answer is ${maxCount - minCount}`);

  const linkedListTemplate2 = getLinkedListTemplate(clone(template));
  const computedTemplate2 = computeTemplate(linkedListTemplate2, rules, 40);

  const { minCount2, maxCount2 } = computeCounts(computedTemplate2);

  console.log(`Part Two) Answer is ${maxCount2 - minCount2}`);
}

test();

run();
