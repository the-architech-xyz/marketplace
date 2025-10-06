import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

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
    
    // Create standardized auth hooks (REVOLUTIONARY!)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-auth.ts',
      template: 'templates/use-auth.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-sign-in.ts',
      template: 'templates/use-sign-in.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-sign-out.ts',
      template: 'templates/use-sign-out.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-sign-up.ts',
      template: 'templates/use-sign-up.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-user.ts',
      template: 'templates/use-user.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-session.ts',
      template: 'templates/use-session.ts.tpl'
    },
    
    // Create auth API service layer
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/auth/api.ts',
      template: 'templates/auth-api.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/auth/types.ts',
      template: 'templates/auth-types.ts.tpl'
    },
    
    // Create auth context and provider
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/providers/AuthProvider.tsx',
      template: 'templates/AuthProvider.tsx.tpl'
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
      template: 'templates/auth-route.ts.tpl'
    },
    
    // Create Next.js middleware
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/middleware.ts',
      condition: '{{#if integration.features.middleware}}',
      template: 'templates/middleware.ts.tpl'
    },

    // Create session management utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/auth/session-management.ts',
      template: 'templates/session-management.ts.tpl'
    },
    
    // Create Next.js auth components

  ]
};
