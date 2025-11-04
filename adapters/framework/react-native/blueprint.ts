/**
 * React Native Framework Adapter Blueprint
 * 
 * Sets up React Native for mobile development with TypeScript.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'framework/react-native'>
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];

  // Create React Native app
  actions.push({
    type: BlueprintActionType.RUN_COMMAND,
    command: 'npx react-native@latest init <%= project.name %> --template react-native-template-typescript --skip-install'
  });

  return actions;
}

