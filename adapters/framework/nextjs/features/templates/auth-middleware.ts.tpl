import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Auth middleware utilities
export class AuthMiddleware {
  static async requireAuth(
    request: NextRequest,
    redirectTo: string = '/auth/signin'
  ): Promise<NextResponse | null> {
    try {
      const token = await getToken({ req: request });
      
      if (!token) {
        const url = new URL(redirectTo, request.url);
        url.searchParams.set('callbackUrl', request.nextUrl.pathname);
        return NextResponse.redirect(url);
      }
      
      return null; // User is authenticated
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
  }

  static async requireRole(
    request: NextRequest,
    requiredRole: string,
    redirectTo: string = '/unauthorized'
  ): Promise<NextResponse | null> {
    try {
      const token = await getToken({ req: request });
      
      if (!token) {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
      }
      
      const userRole = token.role || 'user';
      
      if (userRole !== requiredRole && userRole !== 'admin') {
        return NextResponse.redirect(new URL(redirectTo, request.url));
      }
      
      return null; // User has required role
    } catch (error) {
      console.error('Role middleware error:', error);
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  static async requirePermissions(
    request: NextRequest,
    requiredPermissions: string[],
    redirectTo: string = '/unauthorized'
  ): Promise<NextResponse | null> {
    try {
      const token = await getToken({ req: request });
      
      if (!token) {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
      }
      
      const userPermissions = token.permissions || [];
      
      const hasPermission = requiredPermissions.every(permission =>
        userPermissions.includes(permission)
      );
      
      if (!hasPermission) {
        return NextResponse.redirect(new URL(redirectTo, request.url));
      }
      
      return null; // User has required permissions
    } catch (error) {
      console.error('Permission middleware error:', error);
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  static addUserToHeaders(
    request: NextRequest,
    response: NextResponse
  ): NextResponse {
    getToken({ req: request }).then(token => {
      if (token) {
        response.headers.set('x-user-id', token.sub || '');
        response.headers.set('x-user-email', token.email || '');
        response.headers.set('x-user-role', token.role || 'user');
      }
    });
    
    return response;
  }
}
    },
    {
