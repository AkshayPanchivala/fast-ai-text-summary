function generateTestCases(ast) {
    const functions = ast.program.body.filter(node => node.type === 'FunctionDeclaration');
    
    let tests = `const { describe, it, expect } = require('@jest/globals');\n\n`;
  
    functions.forEach(fn => {
      tests += `describe('${fn.id.name}', () => {\n`;
      tests += `  it('should work correctly', () => {\n`;
      tests += `    // Add test logic for ${fn.id.name}\n`;
      tests += `  });\n`;
      tests += `});\n\n`;
    });
  
    return tests;
  }
  
  module.exports = { generateTestCases };
  