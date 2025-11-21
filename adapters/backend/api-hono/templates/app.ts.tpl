/**
 * Hono API Application
 * 
 * Main application instance with routes and middleware
 */

import { Hono } from 'hono';
import { cors } from '@hono/cors';
import { logger } from 'hono/logger';
import middleware from './middleware';

// Create Hono app
const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors({
  origin: process.env.CORS_ORIGIN || '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use('*', middleware);

// Health check
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
// Import and mount your feature routes here
// Feature routes are automatically mounted by the CLI based on enabled features
// Example (if synap/capture is enabled):
// import { thoughtsRouter } from './routes/thoughts';
// app.route('/api/thoughts', thoughtsRouter);

export default app;

