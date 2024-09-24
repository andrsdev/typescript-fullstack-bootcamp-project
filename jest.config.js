module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom', // Required for React DOM testing
  setupFilesAfterEnv: ['<rootDir>/apps/client/src/setupTests.ts'], // Ensure the correct path to setupTests.ts
};
