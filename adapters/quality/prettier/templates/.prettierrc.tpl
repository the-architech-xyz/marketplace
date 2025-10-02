{
  "semi": {{#if module.parameters.semi}}true{{else}}false{{/if}},
  "singleQuote": {{#if module.parameters.singleQuote}}true{{else}}false{{/if}},
  "tabWidth": {{module.parameters.tabWidth}},
  "useTabs": {{#if module.parameters.useTabs}}true{{else}}false{{/if}},
  "trailingComma": "{{module.parameters.trailingComma}}",
  "printWidth": {{module.parameters.printWidth}},
  "bracketSpacing": {{#if module.parameters.bracketSpacing}}true{{else}}false{{/if}},
  "arrowParens": "{{module.parameters.arrowParens}}",
  "endOfLine": "{{module.parameters.endOfLine}}",
  {{#if module.parameters.plugins}}
  "plugins": [
    {{#each module.parameters.plugins}}
    "{{this}}"{{#unless @last}},{{/unless}}
    {{/each}}
  ],
  {{/if}}
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
