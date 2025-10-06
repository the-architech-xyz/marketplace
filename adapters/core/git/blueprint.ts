/**
 * Git Adapter Blueprint
 * 
 * Provides local git repository management functionality
 */

import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

export const gitBlueprint: Blueprint = {
  id: 'git-setup',
  name: 'Git Repository Setup',
  actions: [
    // Install simple-git dependency
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['simple-git']
    },
    
    // Create Git client configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}/git/config.ts',
      template: 'templates/git-config.ts.tpl'
    },
    
    // Create main Git client
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}/git/client.ts',
      template: 'templates/git-client.ts.tpl'
    },
    
    // Create repository operations
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}/git/repository.ts',
      template: 'templates/git-repository.ts.tpl'
    },
    
    // Create commit operations
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}/git/commits.ts',
      template: 'templates/git-commits.ts.tpl'
    },
    
    // Create branch operations
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}/git/branches.ts',
      template: 'templates/git-branches.ts.tpl'
    },
    
    // Create remote operations
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}/git/remotes.ts',
      template: 'templates/git-remotes.ts.tpl'
    },
    
    // Create types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}/git/types.ts',
      template: 'templates/git-types.ts.tpl'
    },
    
    // Create main index file
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}/git/index.ts',
      template: 'templates/git-index.ts.tpl'
    },
    
    // Add environment variables
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'GIT_USER_NAME',
      value: '{{module.parameters.userName}}',
      description: 'Git user name for commits'
    },
    
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'GIT_USER_EMAIL',
      value: '{{module.parameters.userEmail}}',
      description: 'Git user email for commits'
    },
    
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'GIT_DEFAULT_BRANCH',
      value: '{{module.parameters.defaultBranch}}',
      description: 'Default branch name for new repositories'
    }
  ]
};

export default gitBlueprint;
