module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/apps/client/src/setupTests.ts'],
  testMatch: ['<rootDir>/apps/client/src/**/__tests__/**/*.test.tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/apps/client/src/$1'
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: '<rootDir>/apps/client/tsconfig.json'
    }]
  },
  moduleDirectories: ['node_modules', 'apps/client/src']
};