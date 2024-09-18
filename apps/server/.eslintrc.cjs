/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@repo/eslint-config/index.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  overrides: [
    {
      files: ['tests/**/*'],
      plugins: ['jest'],
      env: {
        'jest/globals': true,
      },
    },
  ],
}
