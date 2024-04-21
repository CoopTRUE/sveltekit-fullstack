/** @type { import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions } */
module.exports = {
  endOfLine: 'lf',
  semi: false,
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'es5',
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
}
