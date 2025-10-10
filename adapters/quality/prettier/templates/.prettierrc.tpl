{
  "semi": {{#if context.hasSemi}}true{{else}}false{{/if}},
  "singleQuote": {{#if context.hasSingleQuote}}true{{else}}false{{/if}},
  "tabWidth": {{context.tabWidth}},
  "useTabs": {{#if context.hasUseTabs}}true{{else}}false{{/if}},
  "trailingComma": "{{context.trailingComma}}",
  "printWidth": {{context.printWidth}},
  "bracketSpacing": {{#if context.hasBracketSpacing}}true{{else}}false{{/if}},
  "arrowParens": "{{context.arrowParens}}",
  "endOfLine": "{{context.endOfLine}}",
  {{#if context.hasPlugins}}
  "plugins": [
    {{#each context.plugins}}
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
