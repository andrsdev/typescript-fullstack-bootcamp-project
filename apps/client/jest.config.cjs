/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/src/utils/Integration Tests/setupTests.ts'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  roots: ['<rootDir>/src'],
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {  '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/styleMock.js',},
};
