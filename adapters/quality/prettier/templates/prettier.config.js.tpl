/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 100,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  plugins: [
    <% if (module.parameters.tailwind) { %>'prettier-plugin-tailwindcss',<% } %>
    'prettier-plugin-sort-imports',
    'prettier-plugin-organize-imports'
  ].filter(Boolean),
  // Import order configuration
  importOrder: [
    '^(react|react-dom)$',
    '^next',
    '<THIRD_PARTY_MODULES>',
    '^@/(.*)$',
    '^[./]'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
};
