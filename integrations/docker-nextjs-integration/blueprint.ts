import { Blueprint } from '@thearchitech.xyz/types';

export const blueprint: Blueprint = {
  id: 'docker-nextjs-integration',
  name: 'Docker Next.js Integration',
  description: 'Complete Next.js integration for Docker',
  version: '1.0.0',
  actions: [
    // Create Dockerfile - only if it doesn't exist
    {
      type: 'CREATE_FILE',
      path: 'Dockerfile',
      template: 'integrations/docker-nextjs-integration/templates/Dockerfile.tpl'
    },
    // Create .dockerignore
    {
      type: 'CREATE_FILE',
      path: '.dockerignore',
      template: 'integrations/docker-nextjs-integration/templates/.dockerignore.tpl'
    }
  ]
};