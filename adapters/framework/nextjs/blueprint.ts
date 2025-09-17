/**
 * Next.js 15+ Base Blueprint
 * 
 * Creates a modern Next.js 15+ project with React 19, App Router, TypeScript, and Tailwind CSS v4
 * This blueprint provides the core foundation - additional features are handled by optional features
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const nextjsBlueprint: Blueprint = {
  id: 'nextjs-base-setup',
  name: 'Next.js 15+ Base Setup',
  description: 'Modern Next.js 15+ foundation with React 19, App Router, TypeScript, and Tailwind CSS v4',
  actions: [
    // Create Next.js project with latest versions and dynamic parameters
    {
      type: 'RUN_COMMAND',
      command: 'npx create-next-app@latest . --typescript{{#if module.parameters.tailwind}} --tailwind{{/if}}{{#if module.parameters.eslint}} --eslint{{/if}} --app --src-dir --import-alias "{{module.parameters.importAlias}}" --yes'
    }
  ]
}
