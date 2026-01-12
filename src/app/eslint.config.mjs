// eslint.config.js
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': ts,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json', // optional but good
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // The most important line → disable the problematic rule for R3F
      'react/no-unknown-property': 'off',

      // Optional: keep some safety but ignore Three.js props
      // 'react/no-unknown-property': ['error', {
      //   ignore: [
      //     'attach', 'args', 'position', 'intensity', 'metalness', 'roughness',
      //     'clearcoat', 'transmission', 'thickness', 'emissive', 'emissiveIntensity',
      //     'transparent', 'blending', 'linewidth', 'scale'
      //   ]
      // }],

      'react/prop-types': 'off', // if you're using TypeScript
    },
    settings: {
      react: { version: 'detect' },
    },
  },
];
