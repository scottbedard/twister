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
      'docs/.vitepress/auto-imports.d.ts',
      'docs/.vitepress/cache',
      'docs/.vitepress/dist',
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
    rules: {
      'vue/attributes-order': ['error', {
        alphabetical: true,
        order: [
          ['CONDITIONALS', 'CONTENT', 'LIST_RENDERING', 'OTHER_DIRECTIVES', 'RENDER_MODIFIERS', 'SLOT', 'TWO_WAY_BINDING'],
          ['ATTR_STATIC', 'ATTR_SHORTHAND_BOOL'],
          'ATTR_DYNAMIC',
          'EVENTS',
        ],
      }],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          multiline: 'never',
          selfClosingTag: {
            multiline: 'never',
            singleline: 'never',
          },
          singleline: 'never',
        },
      ],
      'vue/html-closing-bracket-spacing': ['error', {
        endTag: 'never',
        selfClosingTag: 'always',
        startTag: 'never',
      }],
      'vue/padding-line-between-tags': ['error', [
        { blankLine: 'always', next: '*', prev: '*' },
      ]],
      'vue/v-bind-style': ['error', 'shorthand', {
        sameNameShorthand: 'always',
      }],
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    files: ['**/*.vue', '**/*.ts'],
    rules: {
      'no-undef': 'off', // ts already checks this, and eslint conflicts with auto-imports
    },
  },
])
