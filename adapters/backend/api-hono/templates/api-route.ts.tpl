/**
 * Vercel Edge Function Route Handler
 * 
 * Catches all API requests and routes them through Hono
 */

import app from '<%= importPath(paths.api) %>app';

<% if (params.runtime === 'edge') { %>
export const runtime = 'edge';
<% } %>

export default app;



