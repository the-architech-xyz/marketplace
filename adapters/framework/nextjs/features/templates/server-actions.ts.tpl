/**
 * Server Actions utilities for Next.js 15+
 */

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * Server Action result types
 */
export interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

/**
 * Server Action error class
 */
export class ServerActionError extends Error {
  constructor(
    message: string,
    public code: string = 'SERVER_ACTION_ERROR',
    public statusCode: number = 400
  ) {
    super(message);
    this.name = 'ServerActionError';
  }
}

/**
 * Server Actions utility class
 */
export class ServerActions {
  /**
   * Create a successful result
   */
  static success<T>(data: T): ActionResult<T> {
    return {
      success: true,
      data,
    };
  }

  /**
   * Create an error result
   */
  static error(error: string, fieldErrors?: Record<string, string[]>): ActionResult {
    return {
      success: false,
      error,
      fieldErrors,
    };
  }

  /**
   * Handle server action errors
   */
  static handleError(error: unknown): ActionResult {
    if (error instanceof ServerActionError) {
      return {
        success: false,
        error: error.message,
      };
    }

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }

  /**
   * Validate required fields
   */
  static validateRequired(
    data: Record<string, any>,
    requiredFields: string[]
  ): Record<string, string[]> | null {
    const errors: Record<string, string[]> = {};

    requiredFields.forEach(field => {
      if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
        errors[field] = ['This field is required'];
      }
    });

    return Object.keys(errors).length > 0 ? errors : null;
  }

  /**
   * Sanitize input data
   */
  static sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, ''); // Remove event handlers
  }

  /**
   * Revalidate paths after action
   */
  static revalidatePaths(paths: string[]): void {
    paths.forEach(path => revalidatePath(path));
  }

  /**
   * Revalidate tags after action
   */
  static revalidateTags(tags: string[]): void {
    tags.forEach(tag => revalidateTag(tag));
  }

  /**
   * Redirect after successful action
   */
  static redirectTo(path: string): never {
    redirect(path);
  }
}

/**
 * Form validation utilities
 */
export const formValidation = {
  /**
   * Validate email format
   */
  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate password strength
   */
  validatePassword: (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate URL format
   */
  validateUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Validate phone number
   */
  validatePhone: (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },
};

/**
 * Rate limiting for server actions
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export const rateLimit = {
  /**
   * Check if action is rate limited
   */
  isRateLimited: (identifier: string, maxRequests: number = 10, windowMs: number = 60000): boolean => {
    const now = Date.now();
    const record = rateLimitMap.get(identifier);

    if (!record || now > record.resetTime) {
      rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
      return false;
    }

    if (record.count >= maxRequests) {
      return true;
    }

    record.count++;
    return false;
  },

  /**
   * Clear rate limit for identifier
   */
  clear: (identifier: string): void => {
    rateLimitMap.delete(identifier);
  },
};
    },
    // Create example server actions
    {
