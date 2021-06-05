module.exports = {
  env: {
    node: true,
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
  ],
  root: true,
  rules: {
    'import/prefer-default-export': 0,
  },
};
