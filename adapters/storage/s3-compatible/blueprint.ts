/**
 * S3-Compatible Storage Adapter Blueprint
 * 
 * Generates storage adapter for S3-compatible services (R2, S3, MinIO, etc.)
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'storage/s3-compatible'>
): BlueprintAction[] {
  const { params } = extractTypedModuleParameters(config);
  const provider = params?.provider || 'r2';
  
  const actions: BlueprintAction[] = [
    // Install AWS SDK packages (works with S3-compatible services)
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@aws-sdk/client-s3', '@aws-sdk/s3-request-presigner']
    },
    
    // Storage client
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}storage/client.ts',
      template: 'templates/client.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    
    // Upload utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}storage/upload.ts',
      template: 'templates/upload.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    
    // Storage types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}storage/types.ts',
      template: 'templates/types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    
    // Environment variables
    {
      type: BlueprintActionType.ADD_ENV_VAR,
      key: 'STORAGE_ACCESS_KEY_ID',
      value: '',
      description: 'Storage access key ID'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,
      key: 'STORAGE_SECRET_ACCESS_KEY',
      value: '',
      description: 'Storage secret access key'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,
      key: 'STORAGE_BUCKET',
      value: '',
      description: 'Storage bucket name'
    }
  ];
  
  // Add R2-specific environment variable
  if (provider === 'r2') {
    actions.push({
      type: BlueprintActionType.ADD_ENV_VAR,
      key: 'STORAGE_ENDPOINT',
      value: '',
      description: 'Cloudflare R2 endpoint URL (e.g., https://<account-id>.r2.cloudflarestorage.com)'
    });
  }
  
  return actions;
}



