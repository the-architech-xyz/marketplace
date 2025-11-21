/**
 * Inngest Functions
 * 
 * Export all Inngest functions here.
 * Functions are defined in separate files and imported here.
 */

import { serve } from 'inngest/next'; // or from 'inngest/hono' for Hono
import { inngest } from '../client';

// Import your functions here
// Example:
// import { analyzeThought } from './analyze-thought';

// Export all functions
export const inngestFunctions = [
  // Add your functions here
  // Example:
  // analyzeThought,
];

// Create serve handler
export const serveInngest = serve({
  client: inngest,
  functions: inngestFunctions,
});



