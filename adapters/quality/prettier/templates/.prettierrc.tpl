{
  "semi": <%= module.parameters.semi || true %>,
  "singleQuote": <%= module.parameters.singleQuote || true %>,
  "tabWidth": <%= module.parameters.tabWidth || 2 %>,
  "useTabs": <%= module.parameters.useTabs || false %>,
  "trailingComma": "<%= module.parameters.trailingComma || 'es5' %>",
  "printWidth": <%= module.parameters.printWidth || 80 %>,
  "bracketSpacing": <%= module.parameters.bracketSpacing || true %>,
  "arrowParens": "<%= module.parameters.arrowParens || 'avoid' %>",
  "endOfLine": "<%= module.parameters.endOfLine || 'lf' %>",
  <% if (module.parameters.plugins && module.parameters.plugins.length > 0) { %>
  "plugins": [
    <% module.parameters.plugins.forEach((plugin, index) => { %>
    "<%= plugin %>"<%= index < module.parameters.plugins.length - 1 ? ',' : '' %>
    <% }); %>
  ],
  <% } %>
  "overrides": [
    {
      "files": "*.json",
      "options": {
        "printWidth": 120
      }
    },
    {
      "files": "*.md",
      "options": {
        "printWidth": 80,
        "proseWrap": "always"
      }
    },
    {
      "files": "*.yml",
      "options": {
        "printWidth": 120,
        "tabWidth": 2
      }
    }
  ]
}
