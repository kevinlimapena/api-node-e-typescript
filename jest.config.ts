export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json'],

  setupFilesAfterEnv: ['./tests/jest.setup.ts'],

  // Mude para preset padrão (CommonJS)
  preset: 'ts-jest',

  testEnvironment: 'node',

  // Configuração simplificada
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  testMatch: ['<rootDir>/tests/**/*.test.ts'],

  // Opcional: se usar paths no tsconfig
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};