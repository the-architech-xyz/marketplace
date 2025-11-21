import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

/**
 * Dynamic SEO-NextJS Connector Blueprint
 * 
 * Enhances SEO adapter with NextJS-specific implementations:
 * - Next.js Metadata API integration
 * - Sitemap generation (sitemap.ts)
 * - Robots.txt generation (robots.ts)
 * - Structured data components
 */
export default function generateBlueprint(
  config: TypedMergedConfiguration<'connectors/seo/seo-nextjs'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  const actions: BlueprintAction[] = [
    // Install next-sitemap for sitemap generation
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['next-sitemap'],
      isDev: false
    },

  ];
  
  // Generate sitemap.ts (Next.js App Router sitemap)
  if (params?.sitemap !== false) {
    actions.push(
      {
        type: BlueprintActionType.CREATE_FILE,
        path: '${paths.apps.web.app}sitemap.ts',
        template: 'templates/sitemap.ts.tpl',
        conflictResolution: {
          strategy: ConflictResolutionStrategy.SKIP,
          priority: 0
        }
      },
      {
        type: BlueprintActionType.CREATE_FILE,
        path: '${paths.workspace.config}next-sitemap.config.js',
        template: 'templates/next-sitemap.config.js.tpl',
        conflictResolution: {
          strategy: ConflictResolutionStrategy.SKIP,
          priority: 0
        }
      }
    );
  }

  // Generate robots.ts (Next.js App Router robots.txt)
  if (params?.robots !== false) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.app}robots.ts',
      template: 'templates/robots.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }

  // Generate metadata utilities
  if (params?.dynamicMetadata !== false) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}seo/metadata.ts',
      template: 'templates/metadata.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }

  // Generate structured data component - ALL FRONTEND (React component, universal)
  if (params?.structuredData !== false) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.frontend.components}seo/StructuredData.tsx',
      template: 'templates/structured-data-component.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }

  // Generate root layout metadata (template/documentation)
  if (params?.defaultMetadata !== false) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.workspace.docs}seo-integration.md',
      template: 'templates/layout-integration.md.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }

  return actions;
}

