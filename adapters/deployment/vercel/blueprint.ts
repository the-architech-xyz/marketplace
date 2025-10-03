import { Blueprint } from '@thearchitech.xyz/types';

const vercelDeploymentBlueprint: Blueprint = {
  id: 'vercel-deployment',
  name: 'Vercel Deployment Configuration',
  description: 'Pure Vercel deployment configuration for any framework',
  version: '1.0.0',
  actions: [
    // Create vercel.json configuration
    {
      type: 'CREATE_FILE',
      path: 'vercel.json',
      template: 'templates/vercel.json.tpl'
    },
    // Create .vercelignore file
    {
      type: 'CREATE_FILE',
      path: '.vercelignore',
      template: 'templates/vercelignore.tpl'
    },
    // Create environment variables template
    {
      type: 'CREATE_FILE',
      path: '.env.example',
      template: 'templates/env.example.tpl'
    },
    // Create Vercel deployment scripts
    {
      type: 'CREATE_FILE',
      path: 'scripts/deploy.sh',
      template: 'templates/deploy.sh.tpl'
    },
    // Add Vercel CLI to package.json scripts
    {
      type: 'ENHANCE_FILE',
      path: 'package.json',
      modifier: 'package-json-merger',
      params: {
        scripts: {
          'deploy': 'vercel --prod',
          'deploy:preview': 'vercel',
          'vercel:dev': 'vercel dev'
        },
        devDependencies: {
          '@vercel/cli': 'latest'
        }
      }
    }
  ]
};

export default vercelDeploymentBlueprint;
