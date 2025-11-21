/**
 * Hono API Types
 */

import type { Context } from 'hono';

export type { Context, Next } from 'hono';

// Custom context type with app-specific data
export interface AppContext extends Context {
  // Add your custom context properties here
  // Example:
  // user?: User;
}



