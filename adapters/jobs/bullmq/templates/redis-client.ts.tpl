/**
 * Redis Client for BullMQ
 * 
 * Connection to Redis for BullMQ queues
 */

import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || '<%= params.redisUrl || "redis://localhost:6379" %>';

export const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

// Connection event handlers
redis.on('connect', () => {
  console.log('✅ Redis connected');
});

redis.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

export default redis;

