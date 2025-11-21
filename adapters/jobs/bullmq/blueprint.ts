/**
 * BullMQ Job Queue Adapter Blueprint
 * 
 * Generates BullMQ CLIENT for adding jobs to queues
 * ⚠️ IMPORTANT: This is a CLIENT only, not a worker. Workers are separate services.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'jobs/bullmq'>
): BlueprintAction[] {
  const { params } = extractTypedModuleParameters(config);
  const redisUrl = params?.redisUrl || 'redis://localhost:6379';
  const defaultQueue = params?.defaultQueue || 'default';
  const features = params?.features || {};
  
  const actions: BlueprintAction[] = [];
  
  // Install BullMQ and Redis packages
  // Note: bullmq includes its own TypeScript types, no @types/bullmq needed
  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages: ['bullmq', 'ioredis']
  });
  
  // Redis client
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}jobs/bullmq/redis-client.ts',
    template: 'templates/redis-client.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Queue client (for adding jobs)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}jobs/bullmq/queue-client.ts',
    template: 'templates/queue-client.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Queue definition helper
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}jobs/bullmq/queue-definition.ts',
    template: 'templates/queue-definition.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Types
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}jobs/bullmq/types.ts',
    template: 'templates/types.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Index file
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}jobs/bullmq/index.ts',
    template: 'templates/index.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Environment variables
  actions.push({
    type: BlueprintActionType.ADD_ENV_VAR,
    key: 'REDIS_URL',
    value: redisUrl,
    description: 'Redis connection string for BullMQ'
  });
  
  return actions;
}

