

export default {

  clearMocks: true,

  collectCoverage: true,


  coverageDirectory: 'coverage',


  coverageProvider: 'v8',

  coverageReporters: [
    'json'
  ],

  setupFilesAfterEnv: [
    './tests/jest.setup.ts'
  ],

  preset: 'ts-jest/presets/default-esm',

  testEnvironment: 'node',

  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: 'tsconfig.json',
    },
  },

  testMatch: [
    '<rootDir>/tests/**/*.test.ts'
  ],


};