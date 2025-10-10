import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy, ModifierType, MergedConfiguration } from '@thearchitech.xyz/types';

export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  return [
    // Enhance existing Dockerfile for Next.js
    {
      type: BlueprintActionType.ENHANCE_FILE,
      path: 'Dockerfile',
      modifier: ModifierType.DOCKERFILE_MERGER,
      params: {
        mergePath: 'templates/nextjs-dockerfile.tpl'
      }
    },
    // Enhance existing .dockerignore for Next.js
    {
      type: BlueprintActionType.ENHANCE_FILE,
      path: '.dockerignore',
      modifier: ModifierType.DOCKERIGNORE_MERGER,
      params: {
        mergePath: 'templates/nextjs-dockerignore.tpl'
      }
    },
    // Create Next.js-specific Docker Compose
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'docker-compose.nextjs.yml',
      template: 'templates/docker-compose.nextjs.yml.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}