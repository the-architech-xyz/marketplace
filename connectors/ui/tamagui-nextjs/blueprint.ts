/**
 * Tamagui + Next.js Connector Blueprint
 * 
 * Integrates Tamagui with Next.js, handling SSR and provider setup
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy, ModifierType } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'connectors/ui/tamagui-nextjs'>
): BlueprintAction[] {
  const { params } = extractTypedModuleParameters(config);
  const ssr = params?.ssr !== false;
  
  const actions: BlueprintAction[] = [];
  
  // Next.js specific Tamagui configuration
  // Path key already includes packages/ui/src/, so just use tamagui/ (not ui/tamagui/)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.ui.src}tamagui/nextjs-config.ts',
    template: 'templates/nextjs-config.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Wrap app layout with TamaguiProvider - WEB-ONLY (Next.js App Router layout is web-specific)
  if (ssr) {
    actions.push({
      type: BlueprintActionType.ENHANCE_FILE,
      path: '${paths.apps.web.src}app/layout.tsx',
      modifier: ModifierType.JSX_CHILDREN_WRAPPER,
      params: {
        providers: [
          {
            component: 'TamaguiProvider',
            import: {
              name: 'TamaguiProvider',
              from: '@/lib/ui/tamagui/provider'
            },
            props: {
              defaultTheme: 'light'
            }
          }
        ],
        targetElement: 'body'
      }
    });
  }
  
  // Add Tamagui CSS import to globals.css or layout
  // Path key already includes packages/ui/src/, so just use tamagui/ (not ui/tamagui/)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.ui.src}tamagui/styles.css',
    template: 'templates/styles.css.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  return actions;
}

