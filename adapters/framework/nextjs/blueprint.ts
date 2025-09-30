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
    },
    // Create Tailwind v4 configuration for shadcn/ui compatibility
    {
      type: 'CREATE_FILE',
      path: 'tailwind.config.js',
      template: 'templates/tailwind.config.js.tpl'
    },
    // Create components.json for shadcn/ui
    {
      type: 'CREATE_FILE',
      path: 'components.json',
      template: 'templates/components.json.tpl'
    },
    // Update globals.css for Tailwind v4 + shadcn/ui compatibility
    {
      type: 'ENHANCE_FILE',
      path: 'src/app/globals.css',
      modifier: 'css-enhancer',
      fallback: 'create',
      params: {
        content: `@import "tailwindcss";

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

@layer components {
  button {
    cursor: pointer;
  }
  [class*="border"] {
    @apply border-border;
  }
}`
      }
    }
  ]
}
