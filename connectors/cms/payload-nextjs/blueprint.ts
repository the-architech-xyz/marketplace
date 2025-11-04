import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

/**
 * Dynamic Payload-NextJS Connector Blueprint
 * 
 * Complete Payload CMS 3.0 integration for Next.js App Router.
 * - Payload configuration
 * - Local API setup
 * - Collections
 * - Admin panel route
 * - Media management
 * - Auth integration
 */
export default function generateBlueprint(
  config: TypedMergedConfiguration<'connectors/cms/payload-nextjs'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  const actions: BlueprintAction[] = [
    // Install Payload CMS
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['payload@beta'],
      isDev: false
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@payloadcms/db-postgres'],
      isDev: false
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@payloadcms/plugin-seo'],
      isDev: false
    },

    // Create Payload configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.config}payload.config.ts',
      template: 'templates/payload.config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },

    // Create Payload initialization
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}payload/index.ts',
      template: 'templates/payload-init.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },

    // Create API route
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.app_root}api/payload/[[...segments]]/route.ts',
      template: 'templates/api-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
  ];

  // Add admin panel route if enabled
  if (params?.adminPanel !== false) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.app_root}admin/[[...segments]]/page.tsx',
      template: 'templates/admin-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }

  // Add collections if enabled
  if (params?.collections !== false) {
    actions.push(
      {
        type: BlueprintActionType.CREATE_FILE,
        path: '${paths.collections}Pages.ts',
        template: 'templates/collection-pages.ts.tpl',
        conflictResolution: {
          strategy: ConflictResolutionStrategy.SKIP,
          priority: 0
        }
      },
      {
        type: BlueprintActionType.CREATE_FILE,
        path: '${paths.collections}Posts.ts',
        template: 'templates/collection-posts.ts.tpl',
        conflictResolution: {
          strategy: ConflictResolutionStrategy.SKIP,
          priority: 0
        }
      }
    );
  }

  // Add media collection if enabled
  if (params?.media !== false) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.collections}Media.ts',
      template: 'templates/collection-media.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }

  // Add draft preview if enabled
  if (params?.draftPreview !== false) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.app_root}api/draft/route.ts',
      template: 'templates/draft-preview-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }

  // Add setup documentation
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.docs}payload-setup.md',
    template: 'templates/setup-guide.md.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  return actions;
}

