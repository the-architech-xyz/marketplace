import { Blueprint } from '@thearchitech.xyz/types';

const {featureName}Blueprint: Blueprint = {
  id: '{feature-name}-{stack}',
  name: '{Feature Name} ({Stack})',
  description: '{Feature description} with {stack} implementation',
  version: '1.0.0',
  actions: [
    // Create main feature component
    {
      type: 'CREATE_FILE',
      path: 'src/components/{feature}/{FeatureName}.tsx',
      template: 'templates/{FeatureName}.tsx.tpl'
    },
    // Create supporting components
    {
      type: 'CREATE_FILE',
      path: 'src/components/{feature}/{FeatureName}Form.tsx',
      template: 'templates/{FeatureName}Form.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/{feature}/{FeatureName}List.tsx',
      template: 'templates/{FeatureName}List.tsx.tpl'
    },
    // Create feature-specific utilities
    {
      type: 'CREATE_FILE',
      path: 'src/features/{feature}/utils.ts',
      template: 'templates/utils.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/features/{feature}/constants.ts',
      template: 'templates/constants.ts.tpl'
    },
    // Create feature-specific types
    {
      type: 'CREATE_FILE',
      path: 'src/features/{feature}/types.ts',
      template: 'templates/types.ts.tpl'
    }
  ]
};

export default {featureName}Blueprint;
