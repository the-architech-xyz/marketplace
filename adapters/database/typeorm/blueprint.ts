/**
 * TypeORM Base Blueprint
 * 
 * Sets up TypeORM with minimal configuration
 * Advanced features are available as separate features
 */

import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

export const typeormBlueprint: Blueprint = {
  id: 'typeorm-base-setup',
  name: 'TypeORM Base Setup',
  actions: [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['typeorm', 'reflect-metadata', '${context..databaseType}']
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.database.src}config/typeorm.ts',
      template: 'templates/typeorm.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.database.src}config/entities/User.ts',
      template: 'templates/User.ts.tpl',
    }
  ]
};