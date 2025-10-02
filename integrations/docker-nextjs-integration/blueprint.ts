import { Blueprint } from '@thearchitech.xyz/types';

export const blueprint: Blueprint = {
  id: 'docker-nextjs-integration',
  name: 'Docker Next.js Integration',
  description: 'Complete Next.js integration for Docker',
  version: '1.0.0',
  actions: [
    // Enhance existing Dockerfile for Next.js
    {
      type: 'ENHANCE_FILE',
      path: 'Dockerfile',
      modifier: 'dockerfile-merger',
      params: {
        mergePath: 'templates/nextjs-dockerfile.tpl'
      }
    },
    // Enhance existing .dockerignore for Next.js
    {
      type: 'ENHANCE_FILE',
      path: '.dockerignore',
      modifier: 'dockerignore-merger',
      params: {
        mergePath: 'templates/nextjs-dockerignore.tpl'
      }
    },
    // Create Next.js-specific Docker Compose
    {
      type: 'CREATE_FILE',
      path: 'docker-compose.nextjs.yml',
      template: 'templates/docker-compose.nextjs.yml.tpl'
    }
  ]
};