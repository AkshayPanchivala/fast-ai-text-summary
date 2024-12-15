const fs = require('fs-extra');
const babelParser = require('@babel/parser');
const jestTemplate = require('../templates/jestTemplate');
// const mochaTemplate = require('../templates/mochaTemplate');

async function generateTests(path, framework) {
  const code = await fs.readFile(path, 'utf-8');
  const ast = babelParser.parse(code, { sourceType: 'module', plugins: ['jsx'] });

  let testCases;
  if (framework === 'jest') {
    testCases = generateJestTestCases(ast);
  } else {
    testCases = generateJestTestCases(ast);
    // testCases = generateMochaTestCases(ast);
  }

  const testFilePath = path.replace(/\.js$/, `.test.js`);
  await fs.writeFile(testFilePath, testCases);
}

function generateJestTestCases(ast) {
  let tests = `const { describe, it, expect } = require('@jest/globals');\n\n`;

  const functions = ast.program.body.filter(node => node.type === 'FunctionDeclaration');

  functions.forEach(fn => {
    tests += `describe('${fn.id.name}', () => {\n`;

    // Add basic test cases
    tests += `  it('should return a valid result for valid input', () => {\n`;
    tests += `    expect(${fn.id.name}(1, 2)).toBeDefined();\n`;  // Example
    tests += `  });\n`;

    // Add edge case tests
    tests += `  it('should handle edge cases with null or undefined input', () => {\n`;
    tests += `    expect(${fn.id.name}(null, undefined)).toThrow();\n`;  // Example of error handling
    tests += `  });\n`;

    // Add invalid input test
    tests += `  it('should return an error for invalid input', () => {\n`;
    tests += `    expect(${fn.id.name}('string', 'input')).toThrow();\n`;
    tests += `  });\n`;

    // Add boundary test cases
    tests += `  it('should handle large numbers correctly', () => {\n`;
    tests += `    expect(${fn.id.name}(Number.MAX_VALUE, 100)).toBeDefined();\n`;  // Example boundary case
    tests += `  });\n`;

    tests += `});\n\n`;
  });

  return tests;
}

function generateMochaTestCases(ast) {
  let tests = `const { expect } = require('chai');\n\n`;

  const functions = ast.program.body.filter(node => node.type === 'FunctionDeclaration');

  functions.forEach(fn => {
    tests += `describe('${fn.id.name}', () => {\n`;

    // Add basic test cases
    tests += `  it('should return a valid result for valid input', () => {\n`;
    tests += `    expect(${fn.id.name}(1, 2)).to.exist;\n`;  // Example
    tests += `  });\n`;

    // Add edge case tests
    tests += `  it('should handle edge cases with null or undefined input', () => {\n`;
    tests += `    expect(() => ${fn.id.name}(null, undefined)).to.throw();\n`;  // Example of error handling
    tests += `  });\n`;

    // Add invalid input test
    tests += `  it('should return an error for invalid input', () => {\n`;
    tests += `    expect(() => ${fn.id.name}('string', 'input')).to.throw();\n`;
    tests += `  });\n`;

    // Add boundary test cases
    tests += `  it('should handle large numbers correctly', () => {\n`;
    tests += `    expect(${fn.id.name}(Number.MAX_VALUE, 100)).to.exist;\n`;  // Example boundary case
    tests += `  });\n`;

    tests += `});\n\n`;
  });

  return tests;
}

module.exports = { generateTests };
