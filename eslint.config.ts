import js from '@eslint/js'
import globals from 'globals'
import ts from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'

export default ts.config(
  {
    ignores: [
      'dist',
      'docs/.vitepress/cache',
      'docs/.vitepress/dist',
      'node_modules',
      'CHANGELOG.md',
      'tsconfig.json',
      'package.json',
      'package-lock.json',
    ],
  },

  js.configs.recommended,
  ...ts.configs.recommended,
  ...vue.configs['flat/recommended'],
  stylistic.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
)
