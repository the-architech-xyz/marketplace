/**
 * Storage Types
 */

export interface PresignedUrlOptions {
  contentType?: string;
  expiresIn?: number; // seconds
  metadata?: Record<string, string>;
}

export interface UploadFileOptions {
  contentType?: string;
  metadata?: Record<string, string>;
  generateUrl?: boolean;
}

export interface StorageFile {
  key: string;
  url: string;
  contentType?: string;
  size?: number;
  metadata?: Record<string, string>;
  uploadedAt?: Date;
}



