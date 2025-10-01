import { Blueprint } from '@thearchitech.xyz/types';

export const blueprint: Blueprint = {
  id: 'better-auth-nextjs-integration',
  name: 'Better Auth Next.js Integration',
  description: 'Complete Next.js integration for Better Auth',
  version: '2.0.0',
  actions: [
    // Add Next.js specific environment variables
    {
      type: 'ADD_ENV_VAR',
      key: 'BETTER_AUTH_SECRET',
      value: 'your-secret-key',
      description: 'Better Auth secret key for JWT signing'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'BETTER_AUTH_URL',
      value: 'http://localhost:3000',
      description: 'Better Auth base URL'
    },
    
    // PURE MODIFIER: Enhance the auth config with Next.js specific features
    {
      type: 'ENHANCE_FILE',
      path: 'src/lib/auth/config.ts',
      modifier: 'ts-module-enhancer',
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
      type: 'CREATE_FILE',
      path: 'src/app/api/auth/[...all]/route.ts',
      condition: '{{#if integration.features.apiRoutes}}',
      template: 'templates/auth-route.ts.tpl'
    },
    
    // Create Next.js middleware
    {
      type: 'CREATE_FILE',
      path: 'src/middleware.ts',
      condition: '{{#if integration.features.middleware}}',
      template: 'templates/middleware.ts.tpl'
    },

    // Create Next.js auth components
    {
      type: 'CREATE_FILE',
      path: 'src/components/auth/auth-provider.tsx',
      condition: '{{#if integration.features.uiComponents}}',
      template: 'templates/auth-provider.tsx.tpl'
    },

  ]
};
