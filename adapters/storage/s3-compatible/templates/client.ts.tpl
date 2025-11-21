/**
 * S3-Compatible Storage Client
 * 
 * Generic client for S3-compatible storage services (R2, S3, MinIO, etc.)
 */

import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';

const provider = '<%= params.provider || "r2" %>';

// Build S3 client configuration based on provider
const getS3Config = (): S3ClientConfig => {
  const config: S3ClientConfig = {
    region: process.env.STORAGE_REGION || '<%= params.region || "auto" %>',
    credentials: {
      accessKeyId: process.env.STORAGE_ACCESS_KEY_ID!,
      secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY!,
    },
  };

  // R2 requires custom endpoint
  if (provider === 'r2') {
    config.endpoint = process.env.STORAGE_ENDPOINT;
    config.region = 'auto'; // R2 doesn't use regions
  }

  // MinIO requires custom endpoint
  if (provider === 'minio') {
    config.endpoint = process.env.STORAGE_ENDPOINT || 'http://localhost:9000';
    config.forcePathStyle = true; // MinIO requires path-style addressing
  }

  // Wasabi requires specific endpoint format
  if (provider === 'wasabi') {
    const region = process.env.STORAGE_REGION || 'us-east-1';
    config.endpoint = `https://s3.${region}.wasabisys.com`;
  }

  // DigitalOcean Spaces requires specific endpoint format
  if (provider === 'digitalocean') {
    const region = process.env.STORAGE_REGION || 'nyc3';
    config.endpoint = `https://${region}.digitaloceanspaces.com`;
    config.forcePathStyle = false;
  }

  return config;
};

// Create S3 client instance
export const s3Client = new S3Client(getS3Config());

// Export bucket name helper
export const getBucketName = (): string => {
  return process.env.STORAGE_BUCKET || '';
};



