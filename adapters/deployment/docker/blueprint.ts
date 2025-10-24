/**
 * Docker Deployment Blueprint
 * 
 * Sets up Docker containerization for web applications
 * Creates Dockerfile, docker-compose.yml, and deployment configuration
 */

import { Blueprint, BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'deployment/docker'>
): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'Dockerfile',
      template: 'templates/Dockerfile.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '.dockerignore',
      template: 'templates/.dockerignore.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }},
    {
      type: BlueprintActionType.ADD_SCRIPT,

      name: 'docker:build',
      command: 'docker build -t ${project.name}:latest .'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,

      name: 'docker:run',
      command: 'docker run -p 3000:3000 --env-file .env.local ${project.name}:latest'
    }
  ]
};

