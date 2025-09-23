/**
 * Docker Deployment Blueprint
 * 
 * Sets up Docker containerization for web applications
 * Creates Dockerfile, docker-compose.yml, and deployment configuration
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const dockerBlueprint: Blueprint = {
  id: 'docker-base-setup',
  name: 'Docker Base Setup',
  actions: [
    {
      type: 'CREATE_FILE',
      path: 'Dockerfile',
      template: 'adapters/deployment/docker/templates/Dockerfile.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: '.dockerignore',
      template: 'adapters/deployment/docker/templates/.dockerignore.tpl'
    },
    {
      type: 'ADD_SCRIPT',
      name: 'docker:build',
      command: 'docker build -t {{project.name}}:latest .'
    },
    {
      type: 'ADD_SCRIPT',
      name: 'docker:run',
      command: 'docker run -p 3000:3000 --env-file .env.local {{project.name}}:latest'
    }
  ]
};
