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
      template: 'templates/.prettierrc.tpl',
      condition: '{{#if module.parameters.prettier}}'
    },
    // Create Prettier ignore file
    {
      type: 'CREATE_FILE',
      path: '.prettierignore',
      template: 'templates/.prettierignore.tpl',
      condition: '{{#if module.parameters.prettier}}'
    },
    // Create Husky pre-commit hook
    {
      type: 'CREATE_FILE',
      path: '.husky/pre-commit',
      template: 'templates/.husky/pre-commit.tpl',
      condition: '{{#if module.parameters.husky}}'
    },
    // Create lint-staged configuration
    {
      type: 'CREATE_FILE',
      path: '.lintstagedrc',
      template: 'templates/.lintstagedrc.tpl',
      condition: '{{#if module.parameters.lintStaged}}'
    },
    // Create commitlint configuration
    {
      type: 'CREATE_FILE',
      path: 'commitlint.config.js',
      template: 'templates/commitlint.config.js.tpl',
      condition: '{{#if module.parameters.commitlint}}'
    },
    // Create ESLint configuration
    {
      type: 'CREATE_FILE',
      path: '.eslintrc.js',
      template: 'templates/.eslintrc.js.tpl',
      condition: '{{#if module.parameters.eslint}}'
    },
    // Add scripts to package.json
    {
      type: 'ADD_SCRIPT',
      name: 'format',
      command: 'prettier --write .',
      condition: '{{#if module.parameters.prettier}}'
    },
    {
      type: 'ADD_SCRIPT',
      name: 'format:check',
      command: 'prettier --check .',
      condition: '{{#if module.parameters.prettier}}'
    },
    {
      type: 'ADD_SCRIPT',
      name: 'lint',
      command: 'eslint . --ext .js,.jsx,.ts,.tsx',
      condition: '{{#if module.parameters.eslint}}'
    },
    {
      type: 'ADD_SCRIPT',
      name: 'lint:fix',
      command: 'eslint . --ext .js,.jsx,.ts,.tsx --fix',
      condition: '{{#if module.parameters.eslint}}'
    },
    {
      type: 'ADD_SCRIPT',
      name: 'prepare',
      command: 'husky install',
      condition: '{{#if module.parameters.husky}}'
    }
  ]
};