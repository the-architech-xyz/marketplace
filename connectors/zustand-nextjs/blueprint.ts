import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

export const blueprint: Blueprint = {
  id: 'connector:zustand-nextjs',
  name: 'Zustand NextJS Connector',
  description: 'Zustand state management setup and configuration for NextJS applications',
  version: '1.0.0',
  actions: [
    // Create Zustand store utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}store/create-store.ts',
      template: 'templates/create-store.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create store hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}store/use-store.ts',
      template: 'templates/use-store.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create persistence utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}store/persistence.ts',
      template: 'templates/persistence.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create devtools integration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}store/devtools.ts',
      template: 'templates/devtools.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ]
};
