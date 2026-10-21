import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
  globalIgnores(['.next/**', 'out/**', 'build/**', 'dist/**', 'node_modules/**', 'next-env.d.ts']),
  // Next.js rules (includes react, react-hooks, jsx-a11y, @next/next and @typescript-eslint plugins)
  ...nextVitals,
  ...nextTs,
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.strict,
      tseslint.configs.stylistic
    ],
    languageOptions: {
      ecmaVersion: 2024,
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'generic'
        }
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
      'react/no-unescaped-entities': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-mixed-spaces-and-tabs': 0,
      semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
      quotes: ['error', 'single'],
      'comma-dangle': [
        'error',
        {
          arrays: 'never',
          objects: 'never',
          imports: 'never',
          exports: 'never',
          functions: 'never'
        }
      ],
      'jsx-quotes': ['error', 'prefer-single'],
      indent: ['error', 2],
      'semi-style': ['error', 'last'],
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],

      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react/self-closing-comp': 'error',

      // ES6+ only: arrow functions, no `function` keyword
      'func-style': ['error', 'expression'],
      'prefer-arrow-callback': 'error',
      'no-restricted-syntax': ['error', 'FunctionDeclaration', 'FunctionExpression']
    }
  }
])
