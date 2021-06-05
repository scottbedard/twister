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
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    'import/order': 0,
    'import/prefer-default-export': 0,
    'max-len': ['error', { code: 120, ignoreComments: true }],
    'no-nested-ternary': 0,
  },
};
