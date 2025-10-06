/**
 * Tailwind CSS Blueprint
 * 
 * Provides Tailwind CSS with optional plugins for typography, forms, and aspect ratio
 * Framework-agnostic CSS utilities that work with any project
 */

import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

export const tailwindBlueprint: Blueprint = {
  id: 'tailwind-setup',
  name: 'Tailwind CSS Setup',
  actions: [
    // Install Tailwind CSS
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['tailwindcss', 'postcss', 'autoprefixer'],
      isDev: true
    },
    // Install Tailwind plugins
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@tailwindcss/typography'],
      isDev: true,
      condition: '{{#if module.parameters.typography}}'
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@tailwindcss/forms'],
      isDev: true,
      condition: '{{#if module.parameters.forms}}'
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@tailwindcss/aspect-ratio'],
      isDev: true,
      condition: '{{#if module.parameters.aspectRatio}}'
    },
    // Create Tailwind config
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'tailwind.config.js',
      template: 'templates/tailwind.config.js.tpl',
    },
    // Create PostCSS config
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'postcss.config.js',
      template: 'templates/postcss.config.js.tpl'
    },
    // Create base CSS file
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/globals.css',
      template: 'templates/globals.css.tpl',
    }
  ]
};
