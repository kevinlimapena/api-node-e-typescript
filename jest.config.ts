

export default {

  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,


  coverageDirectory: 'coverage',


  coverageProvider: 'v8',

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    'json'
  ],

  setupFilesAfterEnv: [
    './tests/jest.setup.ts'
  ],


  testMatch: [
    '<rootDir>/tests/**/*.test.ts'
  ],


};