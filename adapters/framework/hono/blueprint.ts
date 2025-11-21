/**
 * Hono Framework Adapter Blueprint
 * 
 * Note: Hono setup is handled by backend/api-hono adapter.
 * This framework adapter only provides path resolution and context configuration.
 */

import { BlueprintAction, BlueprintActionType } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'framework/hono'>
): BlueprintAction[] {
  // Hono framework setup is handled by backend/api-hono adapter
  // This blueprint is minimal and only provides framework context
  const actions: BlueprintAction[] = [];
  
  // No actions needed - backend/api-hono handles the actual setup
  return actions;
}

