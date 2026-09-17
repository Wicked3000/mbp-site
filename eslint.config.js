import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: tsparser,
    },
    plugins: {
      // eslint-plugin-next will be auto-loaded by eslint-config-next
    },
    rules: {
      // Rules from eslint-config-next will be applied
    },
  },
  {
    ignores: ['**/node_modules/**', '**/.next/**', 'dist/**'],
  },
];