module.exports = {
  '**/*.(ts|tsx)': () => 'pnpm typecheck', // Lakukan pengecekan tipe pada file TypeScript (ts, tsx)
  '**/*.(ts|tsx|js)': () => ['pnpm lint:strict', 'pnpm format:write'], // Lakukan linting dan formatting pada file TS, TSX, dan JS
  '**/*.(md|json)': () => 'pnpm format:write', // Lakukan formatting pada file Markdown dan JSON
};
