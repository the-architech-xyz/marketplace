import { Blueprint } from '@thearchitech.xyz/types';

export const blueprint: Blueprint = {
  id: 'shadcn-nextjs-integration',
  name: 'Shadcn Next.js Integration',
  description: 'Configuration and integration glue for Shadcn/ui within Next.js projects (Tailwind v4 compatible)',
  version: '1.1.0',
  actions: [
    
    // V1 MODIFIER: Enhance TypeScript config with path mapping using json-merger
    {
      type: 'ENHANCE_FILE',
      path: 'tsconfig.json',
      modifier: 'json-merger',
      params: {
        merge: {
          compilerOptions: {
            baseUrl: '.',
            paths: {
              '@/*': ['./src/*']
            }
          }
        },
        strategy: 'deep'
      }
    },
    
    // V1 MODIFIER: Enhance globals.css with Shadcn CSS variables using css-enhancer
    {
      type: 'ENHANCE_FILE',
      path: 'src/app/globals.css',
      modifier: 'css-enhancer',
      params: {
        content: `@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`
      }
    },
    
    // V1 MODIFIER: Enhance components.json with Next.js specific configuration using json-merger
    {
      type: 'ENHANCE_FILE',
      path: 'components.json',
      modifier: 'json-merger',
      params: {
        merge: {
          style: 'default',
          rsc: true,
          tsx: true,
          tailwind: {
            config: '',
            css: 'src/app/globals.css',
            baseColor: 'slate',
            cssVariables: true,
            prefix: ''
          },
          aliases: {
            components: '@/components',
            utils: '@/lib/utils',
            ui: '@/components/ui',
            lib: '@/lib',
            hooks: '@/hooks'
          }
        },
        strategy: 'deep'
      }
    },
    
    // V1 MODIFIER: Add ThemeProvider to layout using jsx-children-wrapper
    {
      type: 'ENHANCE_FILE',
      path: 'src/app/layout.tsx',
      modifier: 'jsx-children-wrapper',
      params: {
        providers: [
          {
            component: 'ThemeProvider',
            import: {
              name: 'ThemeProvider',
              from: 'next-themes'
            },
            props: {
              attribute: 'class',
              defaultTheme: 'system',
              enableSystem: true,
              disableTransitionOnChange: false
            }
          }
        ],
        targetElement: 'body'
      }
    }
  ]
};