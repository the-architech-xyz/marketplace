/**
 * Docker Deployment Blueprint
 * 
 * Sets up Docker containerization for web applications
 * Creates Dockerfile, docker-compose.yml, and deployment configuration
 */

import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

export const dockerBlueprint: Blueprint = {
  id: 'docker-base-setup',
  name: 'Docker Base Setup',
  actions: [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'Dockerfile',
      template: 'templates/Dockerfile.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '.dockerignore',
      template: 'templates/.dockerignore.tpl'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,

      name: 'docker:build',
      command: 'docker build -t {{project.name}}:latest .'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,

      name: 'docker:run',
      command: 'docker run -p 3000:3000 --env-file .env.local {{project.name}}:latest'
    }
  ]
};
