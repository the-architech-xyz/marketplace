import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration } from '@thearchitech.xyz/marketplace/types';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'connectors/revenuecat-expo'>
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];

  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages: ['@revenuecat/purchases-expo'],
    isDev: false
  });

  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}revenuecat/config.ts',
    template: 'templates/config.ts.tpl',
    conflictResolution: { strategy: ConflictResolutionStrategy.SKIP, priority: 0 }
  });

  actions.push({
    type: BlueprintActionType.ADD_ENV_VAR,
    key: 'REVENUECAT_API_KEY',
    value: '<%= module.parameters.apiKey %>',
    description: 'RevenueCat API key'
  });

  return actions;
}

