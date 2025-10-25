const config = {
  // --- 1️⃣ Type-check only relevant Nuxt code (skip node_modules, .nuxt, dist) ---
  '**/*.{ts,vue}': () => 'nuxt typecheck',

  // --- 2️⃣ Lint & format script files ---
  '**/*.{ts,js,vue}': (filenames) => [
    // eslint ignores build/system folders automatically
    `eslint --fix ${filenames.join(' ')}`,
    `prettier --write ${filenames.join(' ')}`,
  ],

  // --- 3️⃣ Format all other files safely ---
  '**/*.{json,md,yml,yaml,css,scss,html}': (filenames) => `prettier --write ${filenames.join(' ')}`,
};

export default config;
