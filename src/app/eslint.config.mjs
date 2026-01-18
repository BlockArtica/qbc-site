// eslint.config.mjs
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': ts,
      prettier,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Critical: disable for React Three Fiber
      'react/no-unknown-property': 'off',
      // Allow type assertions in TSX
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      // Disable React import requirement (Next.js handles it)
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      // Prettier integration
      'prettier/prettier': 'error',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
];
