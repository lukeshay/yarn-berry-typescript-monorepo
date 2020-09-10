module.exports = {
  resetMocks: true,
  testRegex: 'src/.*\\.(spec|e2e)\\.tsx?$',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverage: true,
  coverageReporters: ['lcov', 'text', 'cobertura'],
  reporters: ['default', 'jest-junit'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*', '!**/__tests__/**/*', '!src/index.ts'],
};
