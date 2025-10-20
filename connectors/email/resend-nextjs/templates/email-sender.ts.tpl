import { getResendClient } from './resend-client';
import { EMAIL_CONFIG } from './email-config';
import type {
  EmailSendOptions,
  EmailSendResponse,
  EmailValidationResult,
  BulkEmailSendOptions,
  BulkEmailSendResponse
} from './email-types';

/**
 * Pure HTML Email Sender
 * Tech-agnostic - accepts pre-rendered HTML strings
 * NO React dependencies
 */

/**
 * Validate email address
 */
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate email send options
 */
export function validateEmailOptions(options: EmailSendOptions): EmailValidationResult {
  // Validate recipient
  if (!options.to) {
    return { valid: false, error: 'Recipient email is required' };
  }

  // Validate subject
  if (!options.subject || options.subject.trim() === '') {
    return { valid: false, error: 'Email subject is required' };
  }

  // Validate HTML content
  if (!options.html || options.html.trim() === '') {
    return { valid: false, error: 'Email HTML content is required' };
  }

  // Validate email addresses
  const recipients = Array.isArray(options.to) ? options.to : [options.to];
  for (const recipient of recipients) {
    const email = typeof recipient === 'string' ? recipient : recipient.email;
    if (!validateEmail(email)) {
      return { valid: false, error: `Invalid email address: ${email}` };
    }
  }

  return { valid: true };
}

/**
 * Send email using Resend
 * Accepts pre-rendered HTML string
 */
export async function sendEmail(options: EmailSendOptions): Promise<EmailSendResponse> {
  try {
    // Validate options
    const validation = validateEmailOptions(options);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error
      };
    }

    // Get Resend client
    const resend = getResendClient();

    // Prepare email data
    const emailData: any = {
      from: EMAIL_CONFIG.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    // Add optional fields
    if (options.text) emailData.text = options.text;
    if (options.cc) emailData.cc = options.cc;
    if (options.bcc) emailData.bcc = options.bcc;
    if (options.replyTo) emailData.replyTo = options.replyTo;
    if (options.attachments) emailData.attachments = options.attachments;
    if (options.tags) emailData.tags = options.tags;
    if (options.headers) emailData.headers = options.headers;

    // Send email via Resend
    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error('[Resend] Email send error:', error);
      return {
        success: false,
        error: error.message || 'Failed to send email'
      };
    }

    return {
      success: true,
      messageId: data?.id,
      metadata: { provider: 'resend' }
    };

  } catch (error: any) {
    console.error('[Resend] Unexpected error:', error);
    return {
      success: false,
      error: error.message || 'Unexpected error occurred'
    };
  }
}

/**
 * Send bulk emails
 * Processes emails in batches with optional delay
 */
export async function sendBulkEmails(options: BulkEmailSendOptions): Promise<BulkEmailSendResponse> {
  const { emails, batchSize = 10, batchDelay = 1000 } = options;
  
  const results: EmailSendResponse[] = [];
  let successful = 0;
  let failed = 0;

  // Process emails in batches
  for (let i = 0; i < emails.length; i += batchSize) {
    const batch = emails.slice(i, i + batchSize);
    
    // Send batch concurrently
    const batchResults = await Promise.all(
      batch.map(email => sendEmail(email))
    );

    // Aggregate results
    for (const result of batchResults) {
      results.push(result);
      if (result.success) {
        successful++;
      } else {
        failed++;
      }
    }

    // Delay between batches (except for last batch)
    if (i + batchSize < emails.length && batchDelay > 0) {
      await new Promise(resolve => setTimeout(resolve, batchDelay));
    }
  }

  return {
    total: emails.length,
    successful,
    failed,
    results
  };
}

/**
 * Send simple text email (convenience function)
 */
export async function sendSimpleEmail(
  to: string | string[],
  subject: string,
  html: string,
  text?: string
): Promise<EmailSendResponse> {
  return sendEmail({
    to,
    subject,
    html,
    text
  });
}

