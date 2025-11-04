import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration } from '@thearchitech.xyz/marketplace/types';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'connectors/revenuecat-web'>
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];

  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages: ['@revenuecat/purchases-js'],
    isDev: false
  });

  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.lib}/revenuecat/config.ts',
    template: 'templates/config.ts.tpl',
    conflictResolution: { strategy: ConflictResolutionStrategy.SKIP, priority: 0 }
  });

  actions.push({
    type: BlueprintActionType.ADD_ENV_VAR,
    key: 'NEXT_PUBLIC_REVENUECAT_API_KEY',
    value: '<%= module.parameters.apiKey %>',
    description: 'RevenueCat API key (public for web)'
  });

  return actions;
}

