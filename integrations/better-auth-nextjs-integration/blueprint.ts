import { Blueprint, BlueprintActionType, ModifierType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

export const blueprint: Blueprint = {
  id: 'better-auth-nextjs-integration',
  name: 'Better Auth Next.js Integration',
  description: 'Complete Next.js integration for Better Auth with standardized auth hooks',
  version: '3.0.0',
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
    
    // Create streamlined auth hooks (SIMPLE & GRANULAR!)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/hooks/auth.ts',
      template: 'templates/auth-hooks.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE, 
        priority: 1
      }
    },
    
    // Create auth API service layer
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/auth/api.ts',
      template: 'templates/auth-api.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/auth/types.ts',
      template: 'templates/auth-types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    
    // Create auth context and provider
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/providers/AuthProvider.tsx',
      template: 'templates/AuthProvider.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    
    // PURE MODIFIER: Enhance the auth config with Next.js specific features
    {
      type: BlueprintActionType.ENHANCE_FILE,

      path: 'src/lib/auth/config.ts',
      modifier: ModifierType.TS_MODULE_ENHANCER,
      params: {
        importsToAdd: [
          { name: 'NextRequest', from: 'next/server', type: 'import' },
          { name: 'NextResponse', from: 'next/server', type: 'import' }
        ],
        statementsToAppend: [
          {
            type: 'raw',
            content: `// Next.js specific auth handler
export async function authHandler(request: NextRequest) {
  try {
    const response = await auth.handler(request);
    return response;
  } catch (error) {
    console.error('Auth handler error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

// Next.js specific middleware
export function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/forgot-password', '/'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  if (isPublicRoute) {
    return NextResponse.next();
  }
  
  // Check authentication for protected routes
  const sessionToken = request.cookies.get('better-auth.session_token')?.value;
  
  if (!sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}`
          }
        ]
      }
    },
    
    // Create Next.js API route for auth
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/auth/[...all]/route.ts',
      condition: '{{#if integration.features.apiRoutes}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      },
      template: 'templates/auth-route.ts.tpl'
    },
    
    // Create Next.js middleware
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/middleware.ts',
      condition: '{{#if integration.features.middleware}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      },
      template: 'templates/middleware.ts.tpl'
    },

    // Create session management utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/auth/session-management.ts',
      template: 'templates/session-management.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    
    // Create Next.js auth components

  ]
};
