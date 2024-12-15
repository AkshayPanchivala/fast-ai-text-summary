#!/usr/bin/env node

const { Command } = require('commander');
const testGenerator = require('./testGenerator');
const coverageChecker = require('./coverageChecker');
const program = new Command();

program
  .name('ai-test-writer')
  .description('Generate unit tests automatically for your Node.js code')
  .version('1.0.0');

// Generate tests command
program
  .command('generate')
  .description('Generate unit tests for the provided source file or directory')
  .argument('<path>', 'Path to the source file or directory')
  .option('--jest', 'Generate tests in Jest format')
  .action(async (path, options) => {
    try {
      await testGenerator.generateTests(path, options.jest ? 'jest' : 'mocha');
      console.log('Tests generated successfully!');
    } catch (error) {
      console.error('Error:', error.message);
    }
  });

// Check coverage command
program
  .command('coverage')
  .description('Check test coverage and identify untested areas')
  .argument('<path>', 'Path to the source file or directory')
  .action(async (path) => {
    const report = await coverageChecker.checkCoverage(path);
    console.log('Coverage Report:', report);
  });

program.parse(process.argv);
