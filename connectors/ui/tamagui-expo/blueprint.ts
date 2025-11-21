/**
 * Tamagui + Expo Connector Blueprint
 * 
 * Integrates Tamagui with Expo/React Native
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy, ModifierType } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'connectors/ui/tamagui-expo'>
): BlueprintAction[] {
  const { params } = extractTypedModuleParameters(config);
  const safeArea = params?.safeArea !== false;
  
  const actions: BlueprintAction[] = [];
  
  // Expo-specific Tamagui configuration
  // Use ui_library for UI modules (targets packages/ui/lib/)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.ui.src}tamagui/expo-config.ts',
    template: 'templates/expo-config.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Wrap root layout with TamaguiProvider (Expo uses _layout.tsx) - MOBILE-ONLY
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.mobile.app}_layout.tsx',
    template: 'templates/expo-layout.tsx.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  return actions;
}

