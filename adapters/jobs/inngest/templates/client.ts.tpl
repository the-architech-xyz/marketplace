/**
 * Inngest Client
 * 
 * Client for sending events and managing jobs
 */

import { Inngest } from 'inngest';
import { INNGEST_CONFIG } from './config';

// Create Inngest client
export const inngest = new Inngest({
  id: INNGEST_CONFIG.appId,
  eventKey: process.env.INNGEST_EVENT_KEY,
});

// Helper to send events
export async function sendEvent<T = Record<string, unknown>>(
  name: string,
  data: T
): Promise<void> {
  await inngest.send({
    name,
    data,
  });
}

// Helper to send multiple events
export async function sendEvents(
  events: Array<{ name: string; data: unknown }>
): Promise<void> {
  await inngest.send(events);
}



