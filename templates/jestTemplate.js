function generateTestCases(ast) {
  const functions = ast.program.body.filter(node => node.type === 'FunctionDeclaration');
  
  let tests = `const { describe, it, expect } = require('@jest/globals');\n\n`;

  functions.forEach(fn => {
    tests += `describe('${fn.id.name}', () => {\n`;

    // Basic test case
    tests += `  it('should return a valid result for valid input', () => {\n`;
    tests += `    expect(${fn.id.name}(1, 2)).toBeDefined();\n`;
    tests += `  });\n`;

    // Edge case
    tests += `  it('should handle null and undefined input', () => {\n`;
    tests += `    expect(${fn.id.name}(null, undefined)).toThrow();\n`;
    tests += `  });\n`;

    // Invalid input
    tests += `  it('should handle invalid input gracefully', () => {\n`;
    tests += `    expect(${fn.id.name}('string')).toThrow();\n`;
    tests += `  });\n`;

    // Boundary tests
    tests += `  it('should handle boundary conditions correctly', () => {\n`;
    tests += `    expect(${fn.id.name}(Number.MAX_VALUE, 100)).toBeDefined();\n`;
    tests += `  });\n`;

    tests += `});\n\n`;
  });

  return tests;
}

module.exports = { generateTestCases };
