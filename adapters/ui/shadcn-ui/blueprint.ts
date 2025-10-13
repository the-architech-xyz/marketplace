/**
 * Shadcn/ui Adapter Blueprint
 * 
 * Installs Shadcn/ui components with Tailwind CSS v4 setup
 * Handles all UI and styling configuration
 */

import { Blueprint, BlueprintActionType, ModifierType, EnhanceFileFallbackStrategy, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

const shadcnUiBlueprint: Blueprint = {
  id: 'shadcn-ui-installer',
  name: 'Shadcn/ui Component Installer',
  description: 'Installs Shadcn/ui components with Tailwind CSS v4 setup',
  actions: [
    // Install Tailwind CSS v4 and PostCSS plugin
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'tailwindcss@next',
        '@tailwindcss/postcss@next',
        'tailwindcss-animate'
      ]
    },   
    // Create PostCSS configuration for Tailwind CSS v4
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'postcss.config.mjs',
      conflictResolution: { strategy: ConflictResolutionStrategy.REPLACE },
      content: `const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;`
    },
    // Create Tailwind CSS v4 globals.css
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}globals.css',
      conflictResolution: { strategy: ConflictResolutionStrategy.REPLACE },
        content: `
@import "tailwindcss";

@plugin "tailwindcss-animate";

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
    border-color: hsl(var(--border));
  }
  
  *::before,
  *::after {
    border-color: hsl(var(--border));
  }
  
  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer components {
  button {
    cursor: pointer;
  }
  [class*="border"] {
    border-color: hsl(var(--border));
  }
}`
    },
    // Install core Shadcn/ui dependencies
    // Note: Shadcn will automatically install Radix UI dependencies for each component
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        '@radix-ui/react-slot@^1.0.2',
        'class-variance-authority@^0.7.0',
        'clsx@^2.0.0',
        'tailwind-merge@^2.0.0',
        'lucide-react@^0.294.0'
      ]
    },
    // Install additional utilities
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'cmdk@^0.2.0',
        'date-fns@^2.30.0',
        'react-day-picker@^8.9.1',
        'react-hook-form@^7.48.2',
        '@hookform/resolvers@^3.3.2',
        'zod@^3.22.4',
        'sonner@^1.2.4'
      ]
    },
    // Initialize Shadcn/ui (non-interactive, Tailwind v4 compatible)
    // Note: Removed --silent to see any errors during initialization
    // Using --pm npm to ensure npm is used (not yarn/pnpm)
    {
      type: BlueprintActionType.RUN_COMMAND,
      command: 'npx shadcn@latest init --yes --defaults --force --src-dir --css-variables --base-color slate'
    },
    // Install components from genome parameters
    // Shadcn will automatically install the required Radix UI dependencies for each component
    {
      type: BlueprintActionType.RUN_COMMAND,
      command: 'npx shadcn@latest add {{item}} --yes --overwrite',
      forEach: 'module.parameters.components',
      workingDir: '.'
    }
  ]
};

export default shadcnUiBlueprint;