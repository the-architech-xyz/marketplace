import { Blueprint, BlueprintActionType, ModifierType } from '@thearchitech.xyz/types';

const zustandNextjsIntegrationBlueprint: Blueprint = {
  id: 'zustand-nextjs-integration',
  name: 'Zustand Next.js Integration',
  description: 'Golden Core integrator that configures Zustand for Next.js applications with SSR support',
  version: '1.0.0',
  actions: [
    // Create Zustand store configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/store-config.ts',
      template: 'templates/store-config.ts.tpl'
    },
    // Create SSR utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/store-ssr.ts',
      template: 'templates/store-ssr.ts.tpl'
    },
    // Create hydration utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/store-hydration.ts',
      template: 'templates/store-hydration.ts.tpl'
    },
    // Create store provider
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/providers/StoreProvider.tsx',
      template: 'templates/StoreProvider.tsx.tpl'
    },
    // Create store hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/useStore.ts',
      template: 'templates/useStore.ts.tpl'
    },
    // Create store utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/store-utils.ts',
      template: 'templates/store-utils.ts.tpl'
    },
    // Create example store
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/stores/example-store.ts',
      template: 'templates/example-store.ts.tpl'
    },
    // Update root layout with StoreProvider
    {
      type: BlueprintActionType.ENHANCE_FILE,

      path: 'src/app/layout.tsx',
      modifier: ModifierType.TS_MODULE_ENHANCER,
      params: {
        importsToAdd: [
          { name: 'StoreProvider', from: '@/components/providers/StoreProvider', type: 'import' }
        ],
        statementsToAppend: [
          {
            type: 'raw',
            content: `// Wrap app with StoreProvider for Zustand
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}`
          }
        ]
      }
    }
  ]
};

export default zustandNextjsIntegrationBlueprint;
