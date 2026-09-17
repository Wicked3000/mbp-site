import tsparser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: tsparser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Rules from eslint-config-next will be applied
    },
  },
  {
    ignores: ['**/node_modules/**', '**/.next/**', 'dist/**'],
  },
];