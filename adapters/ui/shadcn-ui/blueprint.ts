/**
 * Shadcn/ui Adapter Blueprint
 * 
 * Installs Shadcn/ui components with Tailwind CSS v4 setup
 * Handles all UI and styling configuration
 */

import { Blueprint } from '@thearchitech.xyz/types';

const shadcnUiBlueprint: Blueprint = {
  id: 'shadcn-ui-installer',
  name: 'Shadcn/ui Component Installer',
  description: 'Installs Shadcn/ui components with Tailwind CSS v4 setup',
  actions: [
    // Install Tailwind CSS v4 and PostCSS plugin
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        'tailwindcss@next',
        '@tailwindcss/postcss@next'
      ]
    },   
    // Create PostCSS configuration for Tailwind CSS v4
    {
      type: 'CREATE_FILE',
      path: 'postcss.config.mjs',
      content: `const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;`
    },
    // Create Tailwind CSS v4 globals.css
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
    },
    // Install core Shadcn/ui dependencies
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        '@radix-ui/react-slot@^1.0.2',
        'class-variance-authority@^0.7.0',
        'clsx@^2.0.0',
        'tailwind-merge@^2.0.0',
        'lucide-react@^0.294.0'
      ]
    },
    // Install core Radix UI primitives
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        '@radix-ui/react-dialog@^1.0.5',
        '@radix-ui/react-dropdown-menu@^2.0.6',
        '@radix-ui/react-label@^2.0.2',
        '@radix-ui/react-select@^2.0.0',
        '@radix-ui/react-separator@^1.0.3',
        '@radix-ui/react-switch@^1.0.3',
        '@radix-ui/react-tabs@^1.0.4',
        '@radix-ui/react-tooltip@^1.0.7',
        '@radix-ui/react-accordion@^1.1.2',
        '@radix-ui/react-alert-dialog@^1.0.5',
        '@radix-ui/react-avatar@^1.0.4',
        '@radix-ui/react-checkbox@^1.0.4',
        '@radix-ui/react-collapsible@^1.0.3',
        '@radix-ui/react-context-menu@^2.1.5',
        '@radix-ui/react-hover-card@^1.0.7',
        '@radix-ui/react-menubar@^1.0.4',
        '@radix-ui/react-navigation-menu@^1.1.4',
        '@radix-ui/react-popover@^1.0.7',
        '@radix-ui/react-progress@^1.0.3',
        '@radix-ui/react-radio-group@^1.1.3',
        '@radix-ui/react-scroll-area@^1.0.5',
        '@radix-ui/react-slider@^1.1.2',
        '@radix-ui/react-toggle@^1.0.3',
        '@radix-ui/react-toggle-group@^1.0.4'
      ]
    },
    // Install additional utilities
    {
      type: 'INSTALL_PACKAGES',
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
    // Set npm to use legacy peer deps for React 19 compatibility
    {
      type: 'RUN_COMMAND',
      command: 'npm config set legacy-peer-deps true'
    },

    // Initialize Shadcn/ui (non-interactive, Tailwind v4 compatible)
    {
      type: 'RUN_COMMAND',
      command: 'npx shadcn@latest init --yes --defaults --force --silent --src-dir --css-variables --base-color slate'
    },
    // Install components from genome parameters using forEach pattern
    // This will be dynamically expanded by the BlueprintExecutor
    {
      type: 'RUN_COMMAND',
      command: 'npx shadcn@latest add {{item}} --yes --overwrite',
      forEach: 'module.parameters.components',
      workingDir: '.'
    }
  ]
};

export default shadcnUiBlueprint;