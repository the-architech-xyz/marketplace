/**
 * Inngest Webhook Endpoint (Next.js)
 * 
 * Handles Inngest webhook requests for function execution
 */

import { serve } from '@inngest/next';
import { serveInngest } from '<%= importPath(paths.jobs) %>jobs/inngest/functions';

export const { GET, POST } = serve({
  client: { id: process.env.INNGEST_APP_ID || '<%= project.name %>' },
  functions: serveInngest.functions,
  signingKey: process.env.INNGEST_SIGNING_KEY,
});



