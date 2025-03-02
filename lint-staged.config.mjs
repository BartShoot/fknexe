export default {
  "*": "astro check",
  "!(dist)/**/*.{cjs,mjs,js,jsx,ts,tsx,astro}": "eslint --fix",
  "*.{js,jsx,ts,tsx,css,astro,md,json}": "prettier --write",
};
