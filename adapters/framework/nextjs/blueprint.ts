/**
 * Next.js 15 Base Blueprint
 * 
 * Creates a clean Next.js 15 project with App Router, TypeScript, and Tailwind CSS
 * This blueprint only handles the core Next.js setup - other features are handled by their respective modules
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const nextjsBlueprint: Blueprint = {
  id: 'nextjs-base-setup',
  name: 'Next.js 15 Base Setup',
  actions: [
    {
      type: 'RUN_COMMAND',
      command: 'npx create-next-app@latest . --typescript{{#if module.parameters.tailwind}} --tailwind{{/if}} --eslint --app --src-dir --import-alias "{{module.parameters.importAlias}}" --yes'
    }
  ]
};
