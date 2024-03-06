/** @type { import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import('@trivago/prettier-plugin-sort-imports').PluginConfig } */
module.exports = {
  endOfLine: 'lf',
  semi: false,
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'es5',
  plugins: [
    'prettier-plugin-svelte',
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports',
  ],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
}
