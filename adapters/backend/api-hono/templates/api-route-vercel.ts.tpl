/**
 * Vercel Edge Function Route Handler (Optional)
 * 
 * Only generated if mode includes 'vercel-edge'
 * Catches all API requests and routes them through Hono
 */

import app from '<%= importPath(paths.api) %>app';

export const runtime = 'edge';

export default app;



