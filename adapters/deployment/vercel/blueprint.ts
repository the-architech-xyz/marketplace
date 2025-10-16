import { Blueprint, BlueprintActionType, ModifierType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

const vercelDeploymentBlueprint: Blueprint = {
  id: 'vercel-deployment',
  name: 'Vercel Deployment Configuration',
  description: 'Pure Vercel deployment configuration for any framework',
  version: '1.0.0',
  actions: [
    // Create vercel.json configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'vercel.json',
      template: 'templates/vercel.json.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }},
    // Create .vercelignore file
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '.vercelignore',
      template: 'templates/vercelignore.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }},
    // Create environment variables template
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.env}}.example',
      template: 'templates/env.example.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.MERGE,
        priority: 0
      }},
    // Create Vercel deployment scripts
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.scripts}}deploy.sh',
      template: 'templates/deploy.sh.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE, 
        priority: 0
      }},
    // Add Vercel CLI to package.json scripts
    {
      type: BlueprintActionType.ENHANCE_FILE,

      path: 'package.json',
      modifier: ModifierType.PACKAGE_JSON_MERGER,
      params: {
        scripts: {
          'deploy': 'vercel --prod',
          'deploy:preview': 'vercel',
          'vercel:dev': 'vercel dev'
        },
        devDependencies: {
          'vercel': 'latest'
        }
      }
    }
  ]
};

export default vercelDeploymentBlueprint;
