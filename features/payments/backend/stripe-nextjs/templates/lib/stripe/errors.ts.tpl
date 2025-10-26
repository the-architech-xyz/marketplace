/**
 * Stripe Error Handling
 * 
 * Centralized error handling for Stripe operations with organization billing.
 * Provides consistent error responses and logging.
 */

import { StripeError, BillingError, BillingPermission } from './types';

// ============================================================================
// ERROR CLASSES
// ============================================================================

export class StripeAPIError extends Error implements StripeError {
  public readonly code: string;
  public readonly type: 'card_error' | 'invalid_request_error' | 'api_error' | 'authentication_error';
  public readonly decline_code?: string;
  public readonly param?: string;

  constructor(
    message: string,
    code: string,
    type: 'card_error' | 'invalid_request_error' | 'api_error' | 'authentication_error',
    decline_code?: string,
    param?: string
  ) {
    super(message);
    this.name = 'StripeAPIError';
    this.code = code;
    this.type = type;
    this.decline_code = decline_code;
    this.param = param;
  }
}

export class BillingPermissionError extends Error implements BillingError {
  public readonly code: string;
  public readonly type: 'permission_error';
  public readonly organizationId?: string;
  public readonly userId?: string;

  constructor(
    message: string,
    organizationId?: string,
    userId?: string
  ) {
    super(message);
    this.name = 'BillingPermissionError';
    this.code = 'BILLING_PERMISSION_DENIED';
    this.type = 'permission_error';
    this.organizationId = organizationId;
    this.userId = userId;
  }
}

export class BillingValidationError extends Error implements BillingError {
  public readonly code: string;
  public readonly type: 'validation_error';
  public readonly organizationId?: string;

  constructor(
    message: string,
    organizationId?: string
  ) {
    super(message);
    this.name = 'BillingValidationError';
    this.code = 'BILLING_VALIDATION_ERROR';
    this.type = 'validation_error';
    this.organizationId = organizationId;
  }
}

export class BillingBusinessError extends Error implements BillingError {
  public readonly code: string;
  public readonly type: 'business_error';
  public readonly organizationId?: string;

  constructor(
    message: string,
    code: string,
    organizationId?: string
  ) {
    super(message);
    this.name = 'BillingBusinessError';
    this.code = code;
    this.type = 'business_error';
    this.organizationId = organizationId;
  }
}

// ============================================================================
// ERROR FACTORY FUNCTIONS
// ============================================================================

export function createStripeError(error: any): StripeAPIError {
  if (error.type === 'StripeCardError') {
    return new StripeAPIError(
      error.message,
      error.code,
      'card_error',
      error.decline_code,
      error.param
    );
  }
  
  if (error.type === 'StripeInvalidRequestError') {
    return new StripeAPIError(
      error.message,
      error.code,
      'invalid_request_error',
      undefined,
      error.param
    );
  }
  
  if (error.type === 'StripeAPIError') {
    return new StripeAPIError(
      error.message,
      error.code,
      'api_error'
    );
  }
  
  if (error.type === 'StripeAuthenticationError') {
    return new StripeAPIError(
      error.message,
      error.code,
      'authentication_error'
    );
  }
  
  // Default to API error
  return new StripeAPIError(
    error.message || 'Unknown Stripe error',
    error.code || 'unknown_error',
    'api_error'
  );
}

export function createPermissionError(
  permission: BillingPermission,
  organizationId?: string,
  userId?: string
): BillingPermissionError {
  return new BillingPermissionError(
    `Insufficient permissions: ${permission} required`,
    organizationId,
    userId
  );
}

export function createValidationError(
  message: string,
  organizationId?: string
): BillingValidationError {
  return new BillingValidationError(message, organizationId);
}

export function createBusinessError(
  message: string,
  code: string,
  organizationId?: string
): BillingBusinessError {
  return new BillingBusinessError(message, code, organizationId);
}

// ============================================================================
// ERROR HANDLING UTILITIES
// ============================================================================

export function isStripeError(error: any): error is StripeAPIError {
  return error instanceof StripeAPIError;
}

export function isBillingError(error: any): error is BillingError {
  return error instanceof BillingPermissionError ||
         error instanceof BillingValidationError ||
         error instanceof BillingBusinessError;
}

export function getErrorStatusCode(error: any): number {
  if (error instanceof BillingPermissionError) {
    return 403;
  }
  
  if (error instanceof BillingValidationError) {
    return 400;
  }
  
  if (error instanceof BillingBusinessError) {
    return 422;
  }
  
  if (error instanceof StripeAPIError) {
    switch (error.type) {
      case 'card_error':
        return 402;
      case 'invalid_request_error':
        return 400;
      case 'authentication_error':
        return 401;
      case 'api_error':
      default:
        return 500;
    }
  }
  
  return 500;
}

export function getErrorResponse(error: any) {
  const statusCode = getErrorStatusCode(error);
  
  if (isStripeError(error)) {
    return {
      error: {
        code: error.code,
        message: error.message,
        type: error.type,
        decline_code: error.decline_code,
        param: error.param,
      },
    };
  }
  
  if (isBillingError(error)) {
    return {
      error: {
        code: error.code,
        message: error.message,
        type: error.type,
        organizationId: error.organizationId,
        userId: error.userId,
      },
    };
  }
  
  return {
    error: {
      code: 'INTERNAL_ERROR',
      message: error.message || 'Internal server error',
      type: 'system_error',
    },
  };
}

// ============================================================================
// LOGGING UTILITIES
// ============================================================================

export function logError(error: any, context?: Record<string, any>) {
  const logData = {
    timestamp: new Date().toISOString(),
    error: {
      name: error.name,
      message: error.message,
      code: error.code,
      type: error.type,
      stack: error.stack,
    },
    context,
  };
  
  if (process.env.NODE_ENV === 'production') {
    // In production, use structured logging
    console.error(JSON.stringify(logData));
  } else {
    // In development, use readable logging
    console.error('Error occurred:', logData);
  }
}

export function logStripeError(error: StripeAPIError, context?: Record<string, any>) {
  logError(error, {
    ...context,
    stripeError: true,
    declineCode: error.decline_code,
    param: error.param,
  });
}

export function logBillingError(error: BillingError, context?: Record<string, any>) {
  logError(error, {
    ...context,
    billingError: true,
    organizationId: error.organizationId,
    userId: error.userId,
  });
}
