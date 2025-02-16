module.exports = {
  '**/*.{ts,tsx,js}': (files) => [
    `pnpm lint:strict ${files.join(' ')}`,
    `pnpm format:write ${files.join(' ')}`,
  ],
  '**/*.{md,json}': (files) => `pnpm format:write ${files.join(' ')}`,
};
