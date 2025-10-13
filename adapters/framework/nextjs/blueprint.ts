/**
 * Next.js 15+ Base Blueprint
 * 
 * Creates a modern Next.js 15+ project with React 19, App Router, and TypeScript
 * This blueprint provides the core foundation - UI and styling are handled by other modules
 */

import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

export const nextjsBlueprint: Blueprint = {
  id: 'nextjs-base-setup',
  name: 'Next.js 15+ Base Setup',
  description: 'Modern Next.js 15+ foundation with React 19, App Router, and TypeScript',
  actions: [
    // Create Next.js project with latest versions and dynamic parameters
    {
      type: BlueprintActionType.RUN_COMMAND,
      command: 'npx create-next-app@latest . --typescript{{#if module.parameters.eslint}} --eslint{{/if}} --app --src-dir --import-alias "{{module.parameters.importAlias}}" --yes'
    }
  ]
}
