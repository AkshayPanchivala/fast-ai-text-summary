module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/testcase/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: {
          moduleResolution: 'node',
        },
      },
    ],
  },
  moduleNameMapper: {
    '^(\\./.*)\\.js$': '$1',
  },
};