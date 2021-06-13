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
    'class-methods-use-this': 0,
    'import/order': 0,
    'import/prefer-default-export': 0,
    'max-len': ['error', { code: 120, ignoreComments: true }],
    'no-nested-ternary': 0,
    'object-curly-newline': 0,
    'prefer-destructuring': 0,
    'quote-props': 0,
  },
};
