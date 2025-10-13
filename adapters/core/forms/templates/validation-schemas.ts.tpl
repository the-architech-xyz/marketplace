/**
 * Configurable Validation Schemas
 * 
 * Provides both simple and advanced validation patterns
 * Use the 'advanced-validation' feature to enable stricter rules
 */

import { z } from 'zod';

// ============================================================================
// VALIDATION CONFIGURATION
// ============================================================================

const VALIDATION_CONFIG = {
  // Simple validation (default)
  password: {
    minLength: <% if (module.parameters.hasAdvancedValidation) { %>8<% } else { %>6<% } %>,
    requireUppercase: <% if (module.parameters.hasAdvancedValidation) { %>true<% } else { %>false<% } %>,
    requireLowercase: <% if (module.parameters.hasAdvancedValidation) { %>true<% } else { %>false<% } %>,
    requireNumbers: <% if (module.parameters.hasAdvancedValidation) { %>true<% } else { %>false<% } %>,
    requireSpecialChars: <% if (module.parameters.hasAdvancedValidation) { %>true<% } else { %>false<% } %>
  },
  email: {
    strict: <% if (module.parameters.hasAdvancedValidation) { %>true<% } else { %>false<% } %>
  }
};

// ============================================================================
// PASSWORD VALIDATION
// ============================================================================

/**
 * Simple password validation (default)
 */
export const simplePasswordSchema = z.string()
  .min(VALIDATION_CONFIG.password.minLength, `Password must be at least ${VALIDATION_CONFIG.password.minLength} characters`);

/**
 * Advanced password validation (when advanced-validation feature is enabled)
 */
export const advancedPasswordSchema = z.string()
  .min(VALIDATION_CONFIG.password.minLength, `Password must be at least ${VALIDATION_CONFIG.password.minLength} characters`)
  <% if (module.parameters.hasAdvancedValidation) { %>
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/\d/, 'Password must contain at least one number')
  .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
  <% } %>;

// Export the appropriate password schema based on configuration
export const passwordSchema = <% if (module.parameters.hasAdvancedValidation) { %>advancedPasswordSchema<% } else { %>simplePasswordSchema<% } %>;

// ============================================================================
// EMAIL VALIDATION
// ============================================================================

/**
 * Simple email validation (default)
 */
export const simpleEmailSchema = z.string()
  .email('Please enter a valid email address');

/**
 * Advanced email validation (when advanced-validation feature is enabled)
 */
export const advancedEmailSchema = z.string()
  .email('Please enter a valid email address')
  <% if (module.parameters.hasAdvancedValidation) { %>
  .refine(
    (email) => {
      // Additional checks for advanced validation
      const domain = email.split('@')[1];
      return domain && domain.includes('.') && !domain.startsWith('.') && !domain.endsWith('.');
    },
    'Please enter a valid email address with a proper domain'
  )
  <% } %>;

// Export the appropriate email schema based on configuration
export const emailSchema = <% if (module.parameters.hasAdvancedValidation) { %>advancedEmailSchema<% } else { %>simpleEmailSchema<% } %>;

// ============================================================================
// COMMON FORM SCHEMAS
// ============================================================================

/**
 * Basic contact form schema
 */
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: emailSchema,
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
});

/**
 * Login form schema
 */
export const loginFormSchema = z.object({
  email: emailSchema,
  password: z.string()
    .min(1, 'Password is required')
});

/**
 * Registration form schema
 */
export const registrationFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string()
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  }
);

/**
 * Profile update form schema
 */
export const profileUpdateSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: emailSchema,
  bio: z.string()
    .max(500, 'Bio must be less than 500 characters')
    .optional()
});

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Create a custom validation schema with configurable rules
 */
export function createValidationSchema(config: {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  patternMessage?: string;
  required?: boolean;
}) {
  let schema = z.string();

  if (config.required !== false) {
    schema = schema.min(1, 'This field is required');
  }

  if (config.minLength) {
    schema = schema.min(config.minLength, `Must be at least ${config.minLength} characters`);
  }

  if (config.maxLength) {
    schema = schema.max(config.maxLength, `Must be less than ${config.maxLength} characters`);
  }

  if (config.pattern) {
    schema = schema.regex(config.pattern, config.patternMessage || 'Invalid format');
  }

  return schema;
}

/**
 * Get validation configuration
 */
export function getValidationConfig() {
  return VALIDATION_CONFIG;
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type LoginFormData = z.infer<typeof loginFormSchema>;
export type RegistrationFormData = z.infer<typeof registrationFormSchema>;
export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;
