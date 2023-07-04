module.exports = {
  // Lint & Prettify TS and JS files
  '**/*.(ts|tsx|js)': () => [
    `yarn format:write`,
    `yarn lint`,
    `yarn lint:fix`,
    `yarn lint:strict`,
    `yarn typecheck`,
  ],

  // Prettify only Markdown and JSON files
  '**/*.(md|json)': () => `yarn format:write`,
};
