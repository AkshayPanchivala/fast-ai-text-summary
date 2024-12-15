const fs = require('fs-extra');
const babelParser = require('@babel/parser');
const jestTemplate = require('../templates/jestTemplate');
const mochaTemplate = require('../templates/mochaTemplate');

async function generateTests(path, framework) {
  const code = await fs.readFile(path, 'utf-8');
  const ast = babelParser.parse(code, { sourceType: 'module', plugins: ['jsx'] });

  let testCases;
  if (framework === 'jest') {
    testCases = jestTemplate.generateTestCases(ast);
  } else {
    testCases = mochaTemplate.generateTestCases(ast);
  }

  const testFilePath = path.replace(/\.js$/, `.test.js`);
  await fs.writeFile(testFilePath, testCases);
}

module.exports = { generateTests };
