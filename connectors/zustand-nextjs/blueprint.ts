import { BlueprintAction, BlueprintActionType, ModifierType, ConflictResolutionStrategy, EnhanceFileFallbackStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../types/blueprint-config-types.js';

/**
 * Dynamic Zustand-NextJS Connector Blueprint
 * 
 * Enhances Zustand state management with Next.js-specific optimizations.
 * This connector enhances the core Zustand adapter instead of duplicating functionality.
 */
export default function generateBlueprint(
  config: TypedMergedConfiguration<'connectors/zustand-nextjs'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  return [
    // Enhance the core store creation with Next.js optimizations
    {
      type: BlueprintActionType.ENHANCE_FILE,
      path: '{{paths.shared_library}}store/create-store.ts',
      modifier: ModifierType.TS_MODULE_ENHANCER,
      fallback: EnhanceFileFallbackStrategy.SKIP,
      params: {
        enhancements: [
          {
            type: 'addImport',
            module: 'react',
            name: '{ useState, useEffect }',
          },
          {
            type: 'addInterfaceProperty',
            interface: 'StoreConfig',
            property: 'ssr?: boolean; // Next.js SSR support',
          },
          {
            type: 'addInterfaceProperty',
            interface: 'StoreConfig',
            property: 'hydration?: boolean; // Next.js hydration support',
          },
          {
            type: 'addFunction',
            name: 'createSSRStore',
            content: `// Next.js SSR-safe store creator
export function createSSRStore<T>(
  storeCreator: StateCreator<T, [], [], T>,
  config: StoreConfig = { name: 'ssr-store' }
) {
  // Only create store on client-side for SSR safety
  if (typeof window === 'undefined') {
    return null as any;
  }
  
  return createStore(storeCreator, {
    ...config,
    ssr: true,
    hydration: true,
  });
}`,
          },
          {
            type: 'addFunction',
            name: 'useHydration',
            content: `// Next.js hydration utilities
export function useHydration<T>(store: any) {
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsHydrated(true);
    }
  }, []);
  
  return isHydrated;
}`,
          },
        ],
      },
    },
    
    // Create Next.js-specific store utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}store/nextjs-utils.ts',
      template: 'templates/nextjs-utils.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 1
      }
    },
    
    // Create Next.js-specific store provider
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}store/NextJSStoreProvider.tsx',
      template: 'templates/NextJSStoreProvider.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 1
      }
    },
    
    // Enhance the main store index with Next.js exports
    {
      type: BlueprintActionType.ENHANCE_FILE,
      path: '{{paths.shared_library}}store/index.ts',
      modifier: ModifierType.TS_MODULE_ENHANCER,
      fallback: EnhanceFileFallbackStrategy.SKIP,
      params: {
        enhancements: [
          {
            type: 'addExport',
            module: './nextjs-utils',
            name: '{ createSSRStore, useHydration, useSSRStore }',
          },
          {
            type: 'addExport',
            module: './NextJSStoreProvider',
            name: '{ NextJSStoreProvider }',
          },
        ],
      },
    }
  ];
}
