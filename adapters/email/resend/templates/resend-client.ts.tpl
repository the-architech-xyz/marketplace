import { Resend } from 'resend';

/**
 * Pure Resend Client Wrapper
 * Tech-agnostic - only wraps the Resend SDK
 * Accepts pre-rendered HTML strings
 */

// Initialize Resend with API key from environment
export const resendClient = new Resend(process.env.RESEND_API_KEY);

/**
 * Validate Resend configuration
 */
export function validateResendConfig(): { valid: boolean; error?: string } {
  if (!process.env.RESEND_API_KEY) {
    return {
      valid: false,
      error: 'RESEND_API_KEY environment variable is not set'
    };
  }

  return { valid: true };
}

/**
 * Get Resend client instance
 * Validates configuration before returning client
 */
export function getResendClient(): Resend {
  const validation = validateResendConfig();
  
  if (!validation.valid) {
    throw new Error(`Resend configuration error: ${validation.error}`);
  }

  return resendClient;
}

