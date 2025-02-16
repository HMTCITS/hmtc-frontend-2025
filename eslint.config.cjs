/**
 * Flat ESLint configuration for a Next.js + TypeScript project.
 * This configuration replicates the settings from the previous eslintrc format.
 *
 * Dependencies yang diperlukan:
 * - @typescript-eslint/parser
 * - @typescript-eslint/eslint-plugin
 * - eslint-plugin-react
 * - eslint-plugin-jsx-a11y
 * - eslint-plugin-simple-import-sort
 * - eslint-plugin-unused-imports
 */

module.exports = [
  {
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        React: 'writable',
        JSX: 'readonly',
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      react: require('eslint-plugin-react'),
      'jsx-a11y': require('eslint-plugin-jsx-a11y'),
      'simple-import-sort': require('eslint-plugin-simple-import-sort'),
      'unused-imports': require('eslint-plugin-unused-imports'),
    },
    rules: {
      'no-unused-vars': 'off',
      'no-console': 'warn',
      'react/display-name': 'off',
      'react/react-in-jsx-scope': 'off',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
    // Gunakan properti "ignores" untuk menentukan file/folder yang akan diabaikan
    ignores: [
      '.lintstagedrc.js',
      '.prettierrc.js',
      'tailwind.config.js',
      'node_modules/',
      '.next/',
      'next.config.js',
    ],
  },
];
