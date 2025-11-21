/**
 * Inngest Webhook Endpoint (Hono)
 * 
 * Handles Inngest webhook requests for function execution
 */

import { serve } from '@inngest/hono';
import { serveInngest } from '<%= importPath(paths.jobs) %>jobs/inngest/functions';

export const inngestHandler = serve({
  client: { id: process.env.INNGEST_APP_ID || '<%= project.name %>' },
  functions: serveInngest.functions,
  signingKey: process.env.INNGEST_SIGNING_KEY,
});



