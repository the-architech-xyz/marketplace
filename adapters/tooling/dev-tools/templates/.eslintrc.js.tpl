{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "no-console": "warn",
    "prefer-const": "error"
  },
  "env": {
    "browser": true,
    "node": true,
    "es2021": true
  }
}`,
      condition: '{{#if module.parameters.eslint}}'
    },
    // Initialize Husky
    {
      type: 'RUN_COMMAND',
      command: 'npx husky install',
      condition: '{{#if module.parameters.husky}}'
    }
  ]
};
