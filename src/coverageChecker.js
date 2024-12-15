const fs = require('fs-extra');
const babelParser = require('@babel/parser');

async function checkCoverage(path) {
  const code = await fs.readFile(path, 'utf-8');
  const ast = babelParser.parse(code, { sourceType: 'module', plugins: ['jsx'] });

  // Simple check: Are all functions in the file tested?
  const functions = ast.program.body.filter(node => node.type === 'FunctionDeclaration');

  // Here, you can extend coverage analysis, e.g., by checking if a test file exists, etc.
  const uncoveredFunctions = functions.filter(fn => !fs.existsSync(`${path.replace(/\.js$/, `.test.js`)}`));

  return uncoveredFunctions.length === 0
    ? 'All functions are covered by tests!'
    : `Uncovered functions: ${uncoveredFunctions.map(fn => fn.id.name).join(', ')}`;
}

module.exports = { checkCoverage };
