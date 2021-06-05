module.exports = {
  env: {
    node: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'jest',
  ],
  root: true,
  rules: {
    'import/prefer-default-export': 0,
  },
};
