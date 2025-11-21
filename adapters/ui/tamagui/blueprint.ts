/**
 * Tamagui UI Adapter Blueprint
 * 
 * Sets up Tamagui universal component library with design tokens and theming
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'ui/tamagui'>
): BlueprintAction[] {
  const { params } = extractTypedModuleParameters(config);
  const theme = params?.theme || 'default';
  const platforms = params?.platforms || { web: true, mobile: false };
  
  const actions: BlueprintAction[] = [];
  
  // Install core Tamagui packages
  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages: [
      '@tamagui/core',
      '@tamagui/config',
      'tamagui'
    ]
  });
  
  // Platform-specific packages
  if (platforms.web) {
    actions.push({
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        '@tamagui/web'
      ]
    });
  }
  
  if (platforms.mobile) {
    actions.push({
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        '@tamagui/react-native-web',
        'react-native',
        'react-native-safe-area-context'
      ]
    });
  }
  
  // Install additional utilities
  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages: [
      '@tamagui/animations-react-native',
      '@tamagui/lucide-icons'
    ]
  });
  
  // Tamagui configuration
  // Remove extra ui/ segment - path key already includes packages/ui/src/
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.ui.src}tamagui/config.ts',
    template: 'templates/tamagui-config.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Theme configuration
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.ui.src}tamagui/theme.ts',
    template: 'templates/theme.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Provider component
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.ui.src}tamagui/provider.tsx',
    template: 'templates/provider.tsx.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Types
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.ui.src}tamagui/types.ts',
    template: 'templates/types.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Index file
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.ui.src}tamagui/index.ts',
    template: 'templates/index.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  return actions;
}

