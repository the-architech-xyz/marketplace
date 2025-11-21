/**
 * Standalone Hono Server
 * 
 * Starts a Node.js HTTP server for development and production
 */

import { serve } from '@hono/node-server';
import app from './app';

const port = parseInt(process.env.API_PORT || '<%= params.port || 3001 %>', 10);

console.log(`🚀 Hono API server starting on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
}, (info) => {
  console.log(`✅ Server is running on http://localhost:${info.port}`);
});



