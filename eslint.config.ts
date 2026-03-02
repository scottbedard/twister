import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import ts from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  {
    ignores: [
      'dist',
      'docs/.vitepress/cache',
      'docs/.vitepress/dist',
      '**/auto-imports.d.ts',
      'node_modules',
      'package-lock.json',
      'package.json',
      'tsconfig.json',
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
  {
    files: ['docs/**/*.vue', 'docs/**/*.ts'],
    rules: {
      'no-undef': 'off', // ts already checks this, and eslint conflicts with auto-imports
    },
  },
])
