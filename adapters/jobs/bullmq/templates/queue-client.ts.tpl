/**
 * BullMQ Queue Client
 * 
 * ⚠️ IMPORTANT: This is a CLIENT for ADDING jobs to queues.
 * Workers that CONSUME jobs should be separate services.
 * 
 * Use this to add jobs from your application backend.
 */

import { Queue } from 'bullmq';
import { redis } from './redis-client';
import type { JobOptions } from 'bullmq';

/**
 * Create or get a queue instance
 */
export function createQueue<T = any>(queueName: string): Queue<T> {
  return new Queue<T>(queueName, {
    connection: redis,
  });
}

/**
 * Add a job to a queue
 * 
 * @param queueName - Name of the queue
 * @param jobName - Name/type of the job
 * @param data - Job data
 * @param options - Job options (priority, delay, retry, etc.)
 */
export async function addJob<T = any>(
  queueName: string,
  jobName: string,
  data: T,
  options?: JobOptions
): Promise<string> {
  const queue = createQueue<T>(queueName);
  const job = await queue.add(jobName, data, options);
  return job.id!;
}

/**
 * Get default queue instance
 */
export const defaultQueue = createQueue('<%= params.defaultQueue || "default" %>');

/**
 * Helper to add job to default queue
 */
export async function addJobToDefault<T = any>(
  jobName: string,
  data: T,
  options?: JobOptions
): Promise<string> {
  return addJob('<%= params.defaultQueue || "default" %>', jobName, data, options);
}

