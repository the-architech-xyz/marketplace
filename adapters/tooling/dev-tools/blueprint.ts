/**
 * Development Tools Blueprint
 * 
 * Provides essential development tools for code quality, formatting, and git hooks
 * Framework-agnostic tools that work with any JavaScript/TypeScript project
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const devToolsBlueprint: Blueprint = {
  id: 'dev-tools-setup',
  name: 'Development Tools Setup',
  actions: [
    // Install Prettier
    {
      type: 'INSTALL_PACKAGES',
      packages: ['prettier'],
      isDev: true,
      condition: '{{#if module.parameters.prettier}}'
    },
    // Install Husky
    {
      type: 'INSTALL_PACKAGES',
      packages: ['husky'],
      isDev: true,
      condition: '{{#if module.parameters.husky}}'
    },
    // Install lint-staged
    {
      type: 'INSTALL_PACKAGES',
      packages: ['lint-staged'],
      isDev: true,
      condition: '{{#if module.parameters.lintStaged}}'
    },
    // Install commitlint
    {
      type: 'INSTALL_PACKAGES',
      packages: ['@commitlint/cli', '@commitlint/config-conventional'],
      isDev: true,
      condition: '{{#if module.parameters.commitlint}}'
    },
    // Install ESLint
    {
      type: 'INSTALL_PACKAGES',
      packages: ['eslint'],
      isDev: true,
      condition: '{{#if module.parameters.eslint}}'
    },
    // Create Prettier configuration
    {
      type: 'CREATE_FILE',
      path: '.prettierrc',
      content: `{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}`,
      condition: '{{#if module.parameters.prettier}}'
    },
    // Create Prettier ignore file
    {
      type: 'CREATE_FILE',
      path: '.prettierignore',
      content: `node_modules
dist
build
.next
.nuxt
.vuepress/dist
.serverless
.fusebox
.dynamodb
.tern-port
coverage
.nyc_output
.cache
.parcel-cache
.next
.nuxt
.vuepress/dist
.serverless
.fusebox
.dynamodb
.tern-port
coverage
.nyc_output
.cache
.parcel-cache
*.log
*.tgz
*.tar.gz
.DS_Store
.vscode
.idea
*.swp
*.swo
*~
`,
      condition: '{{#if module.parameters.prettier}}'
    },
    // Create Husky configuration
    {
      type: 'CREATE_FILE',
      path: '.husky/pre-commit',
      content: `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
`,
      condition: '{{#if module.parameters.husky}}'
    },
    // Create lint-staged configuration
    {
      type: 'CREATE_FILE',
      path: '.lintstagedrc',
      content: `{
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md,yml,yaml}": [
    "prettier --write"
  ]
}`,
      condition: '{{#if module.parameters.lintStaged}}'
    },
    // Create commitlint configuration
    {
      type: 'CREATE_FILE',
      path: '.commitlintrc.json',
      content: `{
  "extends": ["@commitlint/config-conventional"]
}`,
      condition: '{{#if module.parameters.commitlint}}'
    },
    // Create ESLint configuration
    {
      type: 'CREATE_FILE',
      path: '.eslintrc.json',
      content: `{
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
