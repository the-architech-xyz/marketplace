/**
 * BullMQ Types
 * 
 * TypeScript type definitions for BullMQ queue client
 */

export type QueueName = string;
export type JobName = string;
export type JobId = string;

export interface JobData<T = any> {
  [key: string]: T;
}

export interface QueueJob<T = any> {
  id: JobId;
  name: JobName;
  data: T;
  queueName: QueueName;
}

