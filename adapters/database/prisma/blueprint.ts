/**
 * Prisma Base Blueprint
 * 
 * Sets up Prisma with minimal configuration
 * Advanced features are available as separate features
 */

import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

export const prismaBlueprint: Blueprint = {
  id: 'prisma-base-setup',
  name: 'Prisma Base Setup',
  actions: [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['prisma', '@prisma/client']
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.database_config}}/prisma.ts',
      template: 'templates/prisma.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'prisma/schema.prisma',
      template: 'templates/schema.prisma.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    }
  ]
};
