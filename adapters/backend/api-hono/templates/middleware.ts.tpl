/**
 * Hono Middleware
 * 
 * Custom middleware for authentication, error handling, etc.
 */

import { Context, Next } from 'hono';

// Example: Authentication middleware
export async function authMiddleware(c: Context, next: Next) {
  // Add your authentication logic here
  // Example:
  // const token = c.req.header('Authorization');
  // if (!token) {
  //   return c.json({ error: 'Unauthorized' }, 401);
  // }
  await next();
}

// Example: Error handling middleware
export async function errorHandler(c: Context, next: Next) {
  try {
    await next();
  } catch (error) {
    console.error('Error:', error);
    return c.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Export default middleware stack
export default async function middleware(c: Context, next: Next) {
  // Chain middleware here
  // await authMiddleware(c, next);
  await errorHandler(c, next);
}



