/**
 * Expo Framework Adapter Blueprint
 * 
 * Sets up Expo for React Native mobile development with TypeScript.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'framework/expo'>
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];

  // Create Expo app
  actions.push({
    type: BlueprintActionType.RUN_COMMAND,
    command: 'npx create-expo-app@latest . --template blank-typescript --yes'
  });

  return actions;
}

