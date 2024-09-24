module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node', // Use node environment for backend tests
    testMatch: ['<rootDir>/apps/server/src/**/__tests__/**/*.test.ts'], // Only run backend tests
  };
  