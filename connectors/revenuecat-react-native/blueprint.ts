/**
 * RevenueCat React Native Connector Blueprint
 * 
 * Configures RevenueCat SDK for React Native applications with proper
 * initialization and integration with your auth system.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration } from '@thearchitech.xyz/marketplace/types';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'connectors/revenuecat-react-native'>
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];

  // Install RevenueCat React Native SDK
  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages: ['react-native-purchases'],
    isDev: false
  });

  // Generate initialization code
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.lib}/revenuecat/config.ts',
    template: 'templates/config.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  // Add environment variables
  actions.push({
    type: BlueprintActionType.ADD_ENV_VAR,
    key: 'REVENUECAT_API_KEY',
    value: '<%= module.parameters.apiKey %>',
    description: 'RevenueCat API key'
  });

  return actions;
}

