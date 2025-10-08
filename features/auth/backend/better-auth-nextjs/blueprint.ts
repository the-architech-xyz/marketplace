import { Blueprint, BlueprintActionType, ModifierType, ConflictResolutionStrategy } from '@thearchitech.xyz/marketplace/types';

export const blueprint: Blueprint = {
  id: 'better-auth-nextjs-integration',
  name: 'Better Auth Next.js Integration',
  description: 'Complete Next.js integration for Better Auth with cohesive AuthService implementation',
  version: '4.0.0',
  actions: [
    // Add Next.js specific environment variables
    {
      type: BlueprintActionType.ADD_ENV_VAR,
      key: 'BETTER_AUTH_SECRET',
      value: 'your-secret-key',
      description: 'Better Auth secret key for JWT signing'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,
      key: 'BETTER_AUTH_URL',
      value: 'http://localhost:3000',
      description: 'Better Auth base URL'
    },
    
    // Create the main AuthService that implements IAuthService
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/services/AuthService.ts',
      template: 'templates/AuthService.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE, 
        priority: 1
      }
    },
    
    // Create auth API service layer
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}auth/api.ts',
      template: 'templates/auth-api.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}auth/types.ts',
      template: 'templates/auth-types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    
    // Create auth provider component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}providers/AuthProvider.tsx',
      template: 'templates/AuthProvider.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    
    // Create auth API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/auth/route.ts',
      template: 'templates/auth-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    
    // Create middleware for auth
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/middleware.ts',
      template: 'templates/middleware.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    
    // Create session management utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}auth/session-management.ts',
      template: 'templates/session-management.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ]
};

export default blueprint;