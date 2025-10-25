import withNuxt from './.nuxt/eslint.config.mjs';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';

export default withNuxt({
  languageOptions: {
    parser: vueParser,
    parserOptions: {
      parser: tsParser,
      project: ['./tsconfig.eslint.json'],
      tsconfigRootDir: import.meta.dirname,
      extraFileExtensions: ['.vue'],
    },
  },
  plugins: {
    eslintPluginPrettier,
  },
  rules: {
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',

    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: { attributes: false },
      },
    ],
    'vue/html-self-closing': 'off',
    'vue/no-multiple-template-root': [
      'off',
      {
        disallowComments: false,
      },
    ],
    '@stylistic/arrow-parens': 'off',
    '@stylistic/operator-linebreak': 'off',
    '@stylistic/quote-props': 'off',
  },
  ignores: ['.nuxt', 'node_modules', 'dist', 'generated', '*.config.{js,ts,mjs}'],
});
