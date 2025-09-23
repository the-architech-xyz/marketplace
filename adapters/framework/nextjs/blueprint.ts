/**
 * Next.js 15+ Base Blueprint - Schema-Driven Version
 * 
 * Creates a modern Next.js 15+ project with React 19, App Router, TypeScript, and Tailwind CSS v4
 * This blueprint provides the core foundation - additional features are handled by optional features
 */

import { defineBlueprint, type BlueprintSchema } from '@thearchitech.xyz/types';

// Define valid import alias options
const IMPORT_ALIAS_OPTIONS = ['@/*', '~/*', '#/*'] as const;

// Define schema for the NextJS blueprint
const schema: BlueprintSchema = {
  parameters: {
    tailwind: {
      type: 'boolean',
      default: true,
      description: 'Enable Tailwind CSS'
    },
    eslint: {
      type: 'boolean',
      default: true,
      description: 'Enable ESLint'
    },
    importAlias: {
      type: 'string',
      enum: IMPORT_ALIAS_OPTIONS,
      default: '@/*',
      description: 'Import alias pattern for module imports'
    }
  },
  features: {
    appRouter: {
      type: 'boolean',
      default: true,
      description: 'Use Next.js App Router (vs Pages Router)'
    },
    typescript: {
      type: 'boolean',
      default: true,
      description: 'Use TypeScript'
    },
    srcDir: {
      type: 'boolean',
      default: true,
      description: 'Use src directory structure'
    }
  }
};

// Create the schema-driven blueprint
export const blueprint = defineBlueprint({
  id: 'nextjs-base-setup',
  name: 'Next.js 15+ Base Setup',
  description: 'Modern Next.js 15+ foundation with React 19, App Router, TypeScript, and Tailwind CSS v4',
  schema,
  actions: (params) => [
    // Create Next.js project with latest versions and validated parameters
    {
      type: 'RUN_COMMAND',
      command: `npx create-next-app@latest . --typescript${params.tailwind ? ' --tailwind' : ''}${params.eslint ? ' --eslint' : ''} --app --src-dir --import-alias "${params.importAlias}" --yes`
    },
    // Create Tailwind v4 configuration for shadcn/ui compatibility
    {
      type: 'CREATE_FILE',
      path: 'tailwind.config.js',
      template: 'adapters/framework/nextjs/templates/tailwind.config.js.tpl'
    },
    // Create components.json for shadcn/ui
    {
      type: 'CREATE_FILE',
      path: 'components.json',
      template: 'adapters/framework/nextjs/templates/components.json.tpl'
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
});