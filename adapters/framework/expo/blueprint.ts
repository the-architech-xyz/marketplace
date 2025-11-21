/**
 * Expo Framework Adapter Blueprint
 * 
 * Sets up Expo for React Native mobile development with TypeScript.
 */

import { BlueprintAction, BlueprintActionType } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'framework/expo'>
): BlueprintAction[] {
  const { params } = extractTypedModuleParameters(config);
  const actions: BlueprintAction[] = [];

  // Create Expo app
  // NOTE: StructureInitializationLayer no longer creates files in app directories,
  // so create-expo-app can run without conflicts
  actions.push({
    type: BlueprintActionType.RUN_COMMAND,
    command: 'npx create-expo-app@latest . --template blank-typescript --yes'
  });
  
  return actions;
}

