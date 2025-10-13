/**
 * Email Types
 * Tech-agnostic type definitions for email sending
 */

/**
 * Email address type
 */
export type EmailAddress = string | { email: string; name?: string };

/**
 * Email send options (accepts pre-rendered HTML)
 */
export interface EmailSendOptions {
  /** Recipient email address(es) */
  to: EmailAddress | EmailAddress[];
  
  /** Email subject */
  subject: string;
  
  /** Pre-rendered HTML content */
  html: string;
  
  /** Optional plain text version */
  text?: string;
  
  /** Optional CC recipients */
  cc?: EmailAddress | EmailAddress[];
  
  /** Optional BCC recipients */
  bcc?: EmailAddress | EmailAddress[];
  
  /** Optional reply-to address */
  replyTo?: EmailAddress;
  
  /** Optional attachments */
  attachments?: EmailAttachment[];
  
  /** Optional tags for categorization */
  tags?: { name: string; value: string }[];
  
  /** Optional headers */
  headers?: Record<string, string>;
}

/**
 * Email attachment
 */
export interface EmailAttachment {
  /** Attachment filename */
  filename: string;
  
  /** Attachment content (Buffer or base64 string) */
  content: Buffer | string;
  
  /** Content type (MIME type) */
  contentType?: string;
}

/**
 * Email send response
 */
export interface EmailSendResponse {
  /** Success status */
  success: boolean;
  
  /** Message ID from provider */
  messageId?: string;
  
  /** Error message if failed */
  error?: string;
  
  /** Additional metadata */
  metadata?: Record<string, any>;
}

/**
 * Email validation result
 */
export interface EmailValidationResult {
  /** Validation status */
  valid: boolean;
  
  /** Error message if invalid */
  error?: string;
}

/**
 * Bulk email send options
 */
export interface BulkEmailSendOptions {
  /** Array of email send options */
  emails: EmailSendOptions[];
  
  /** Optional batch size */
  batchSize?: number;
  
  /** Optional delay between batches (ms) */
  batchDelay?: number;
}

/**
 * Bulk email send response
 */
export interface BulkEmailSendResponse {
  /** Total emails processed */
  total: number;
  
  /** Successfully sent emails */
  successful: number;
  
  /** Failed emails */
  failed: number;
  
  /** Array of individual responses */
  results: EmailSendResponse[];
}
