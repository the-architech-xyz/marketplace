/**
 * Tailwind CSS Blueprint
 * 
 * Provides Tailwind CSS with optional plugins for typography, forms, and aspect ratio
 * Framework-agnostic CSS utilities that work with any project
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const tailwindBlueprint: Blueprint = {
  id: 'tailwind-setup',
  name: 'Tailwind CSS Setup',
  actions: [
    // Install Tailwind CSS
    {
      type: 'INSTALL_PACKAGES',
      packages: ['tailwindcss', 'postcss', 'autoprefixer'],
      isDev: true
    },
    // Install Tailwind plugins
    {
      type: 'INSTALL_PACKAGES',
      packages: ['@tailwindcss/typography'],
      isDev: true,
      condition: '{{#if module.parameters.typography}}'
    },
    {
      type: 'INSTALL_PACKAGES',
      packages: ['@tailwindcss/forms'],
      isDev: true,
      condition: '{{#if module.parameters.forms}}'
    },
    {
      type: 'INSTALL_PACKAGES',
      packages: ['@tailwindcss/aspect-ratio'],
      isDev: true,
      condition: '{{#if module.parameters.aspectRatio}}'
    },
    // Create Tailwind config
    {
      type: 'CREATE_FILE',
      path: 'tailwind.config.js',
      template: 'adapters/ui/tailwind/templates/tailwind.config.js.tpl',
      conflictResolution: {
        strategy: 'merge',
        mergeStrategy: 'js'
      },
      mergeInstructions: {
        modifier: 'js-config-merger',
        strategy: 'merge',
        params: {
          exportName: 'default',
          mergeStrategy: 'merge'
        }
      }
    },
    // Create PostCSS config
    {
      type: 'CREATE_FILE',
      path: 'postcss.config.js',
      template: 'adapters/ui/tailwind/templates/postcss.config.js.tpl'
    },
    // Create base CSS file
    {
      type: 'CREATE_FILE',
      path: 'src/app/globals.css',
      template: 'adapters/ui/tailwind/templates/globals.css.tpl',
      conflictResolution: {
        strategy: 'merge',
        mergeStrategy: 'css'
      },
      mergeInstructions: {
        modifier: 'css-enhancer',
        strategy: 'merge'
      }
    }
  ]
};
