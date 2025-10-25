// @ts-nocheck
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  extends: ['@nuxt/eslint-config', 'prettier'],
  ignores: ['.nuxt', 'node_modules', 'dist', 'generated', '*.config.js', '*.config.mjs'],
});
