/**
 * Storage Upload Utilities
 * 
 * Functions for generating presigned URLs and uploading files
 */

import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client, getBucketName } from './client';
import type { PresignedUrlOptions, UploadFileOptions } from './types';

/**
 * Generate a presigned URL for uploading a file
 */
export async function generatePresignedUploadUrl(
  key: string,
  options: PresignedUrlOptions = {}
): Promise<string> {
  const {
    contentType,
    expiresIn = 3600, // 1 hour default
    metadata,
  } = options;

  const command = new PutObjectCommand({
    Bucket: getBucketName(),
    Key: key,
    ContentType: contentType,
    Metadata: metadata,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn });
  return url;
}

/**
 * Generate a presigned URL for downloading a file
 */
export async function generatePresignedDownloadUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: getBucketName(),
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn });
  return url;
}

/**
 * Upload file directly to storage
 */
export async function uploadFile(
  key: string,
  file: Buffer | Uint8Array,
  options: UploadFileOptions = {}
): Promise<{ key: string; url?: string }> {
  const {
    contentType,
    metadata,
  } = options;

  const command = new PutObjectCommand({
    Bucket: getBucketName(),
    Key: key,
    Body: file,
    ContentType: contentType,
    Metadata: metadata,
  });

  await s3Client.send(command);

  // Return key and optionally generate a public URL
  return {
    key,
    url: options.generateUrl ? await generatePresignedDownloadUrl(key) : undefined,
  };
}



