/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../src',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  verbose: true,
  globalSetup: '<rootDir>/../test/mg-memory-server/globalSetup.ts',
  globalTeardown: '<rootDir>/../test/mg-memory-server/globalTeardown.ts',
  setupFilesAfterEnv: ['<rootDir>/../test/setup-tests.ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
