/**
 * Form Validation Examples
 * 
 * Comprehensive validation examples for React Hook Form + Zod
 * Provides common validation patterns and custom validators
 */

import { z } from 'zod';

/**
 * Common validation schemas
 */
export const ValidationSchemas = {
  // Email validation
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),

  // Password validation
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be less than 128 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),

  // Phone number validation
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits')
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),

  // URL validation
  url: z.string()
    .url('Please enter a valid URL')
    .max(2048, 'URL must be less than 2048 characters'),

  // Name validation
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

  // Username validation
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),

  // Age validation
  age: z.number()
    .min(13, 'You must be at least 13 years old')
    .max(120, 'Please enter a valid age'),

  // Date validation
  date: z.string()
    .min(1, 'Date is required')
    .refine((date) => !isNaN(Date.parse(date)), 'Please enter a valid date'),

  // File validation
  file: z.instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine((file) => ['image/jpeg', 'image/png', 'image/gif'].includes(file.type), 
            'File must be a JPEG, PNG, or GIF image'),

  // Array validation
  tags: z.array(z.string())
    .min(1, 'At least one tag is required')
    .max(10, 'Maximum 10 tags allowed'),

  // Conditional validation
  conditional: z.object({
    type: z.enum(['individual', 'company']),
    name: z.string().min(1, 'Name is required'),
    companyName: z.string().optional(),
  }).refine((data) => {
    if (data.type === 'company') {
      return data.companyName && data.companyName.length > 0;
    }
    return true;
  }, {
    message: 'Company name is required when type is company',
    path: ['companyName'],
  }),
};

/**
 * Custom validation functions
 */
export const CustomValidators = {
  /**
   * Check if password and confirm password match
   */
  passwordMatch: (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  },

  /**
   * Check if username is available
   */
  usernameAvailable: async (username: string) => {
    // This would check against your database
    // For now, we'll return a placeholder
    return username !== 'admin' && username !== 'test';
  },

  /**
   * Check if email is available
   */
  emailAvailable: async (email: string) => {
    // This would check against your database
    // For now, we'll return a placeholder
    return email !== 'admin@example.com' && email !== 'test@example.com';
  },

  /**
   * Check if value is unique in database
   */
  uniqueInDatabase: async (value: string, field: string, table: string) => {
    // This would check against your database
    // For now, we'll return a placeholder
    return true;
  },

  /**
   * Check if value exists in database
   */
  existsInDatabase: async (value: string, field: string, table: string) => {
    // This would check against your database
    // For now, we'll return a placeholder
    return true;
  },

  /**
   * Check if value is valid according to business rules
   */
  businessRule: (value: any, rule: string) => {
    switch (rule) {
      case 'positive_number':
        return typeof value === 'number' && value > 0;
      case 'future_date':
        return new Date(value) > new Date();
      case 'past_date':
        return new Date(value) < new Date();
      case 'weekday':
        return new Date(value).getDay() >= 1 && new Date(value).getDay() <= 5;
      default:
        return true;
    }
  },
};

/**
 * Form validation examples
 */
export const FormExamples = {
  /**
   * Login form validation
   */
  loginForm: z.object({
    email: ValidationSchemas.email,
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().optional(),
  }),

  /**
   * Registration form validation
   */
  registrationForm: z.object({
    firstName: ValidationSchemas.name,
    lastName: ValidationSchemas.name,
    email: ValidationSchemas.email,
    username: ValidationSchemas.username,
    password: ValidationSchemas.password,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    agreeToTerms: z.boolean().refine((val) => val === true, 'You must agree to the terms'),
  }).refine((data) => CustomValidators.passwordMatch(data.password, data.confirmPassword), {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }),

  /**
   * Profile form validation
   */
  profileForm: z.object({
    firstName: ValidationSchemas.name,
    lastName: ValidationSchemas.name,
    email: ValidationSchemas.email,
    phone: ValidationSchemas.phone.optional(),
    bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
    website: ValidationSchemas.url.optional(),
    dateOfBirth: ValidationSchemas.date.optional(),
    avatar: ValidationSchemas.file.optional(),
  }),

  /**
   * Contact form validation
   */
  contactForm: z.object({
    name: ValidationSchemas.name,
    email: ValidationSchemas.email,
    subject: z.string().min(5, 'Subject must be at least 5 characters').max(100, 'Subject must be less than 100 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
    priority: z.enum(['low', 'medium', 'high']).optional(),
  }),

  /**
   * Product form validation
   */
  productForm: z.object({
    name: z.string().min(1, 'Product name is required').max(100, 'Product name must be less than 100 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description must be less than 1000 characters'),
    price: z.number().min(0, 'Price must be positive').max(999999, 'Price must be less than 999999'),
    category: z.string().min(1, 'Category is required'),
    tags: ValidationSchemas.tags,
    images: z.array(ValidationSchemas.file).min(1, 'At least one image is required').max(5, 'Maximum 5 images allowed'),
    inStock: z.boolean(),
    stockQuantity: z.number().min(0, 'Stock quantity must be positive').optional(),
  }),

  /**
   * Address form validation
   */
  addressForm: z.object({
    street: z.string().min(1, 'Street address is required').max(100, 'Street address must be less than 100 characters'),
    city: z.string().min(1, 'City is required').max(50, 'City must be less than 50 characters'),
    state: z.string().min(1, 'State is required').max(50, 'State must be less than 50 characters'),
    zipCode: z.string().min(5, 'ZIP code must be at least 5 characters').max(10, 'ZIP code must be less than 10 characters'),
    country: z.string().min(1, 'Country is required').max(50, 'Country must be less than 50 characters'),
    isDefault: z.boolean().optional(),
  }),

  /**
   * Search form validation
   */
  searchForm: z.object({
    query: z.string().min(1, 'Search query is required').max(100, 'Search query must be less than 100 characters'),
    category: z.string().optional(),
    minPrice: z.number().min(0, 'Minimum price must be positive').optional(),
    maxPrice: z.number().min(0, 'Maximum price must be positive').optional(),
    sortBy: z.enum(['relevance', 'price', 'name', 'date']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  }).refine((data) => {
    if (data.minPrice && data.maxPrice) {
      return data.minPrice <= data.maxPrice;
    }
    return true;
  }, {
    message: 'Minimum price must be less than or equal to maximum price',
    path: ['minPrice'],
  }),
};

/**
 * Validation error messages
 */
export const ValidationMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be less than ${max} characters`,
  min: (min: number) => `Must be at least ${min}`,
  max: (max: number) => `Must be less than ${max}`,
  pattern: 'Please enter a valid format',
  url: 'Please enter a valid URL',
  date: 'Please enter a valid date',
  file: 'Please select a valid file',
  array: 'Please select at least one item',
  boolean: 'Please select an option',
  number: 'Please enter a valid number',
  integer: 'Please enter a whole number',
  positive: 'Please enter a positive number',
  negative: 'Please enter a negative number',
  future: 'Please enter a future date',
  past: 'Please enter a past date',
  weekday: 'Please select a weekday',
  weekend: 'Please select a weekend day',
};

/**
 * Validation utilities
 */
export class ValidationUtils {
  /**
   * Get validation error message
   */
  static getErrorMessage(error: any, field: string): string {
    if (error && error.message) {
      return error.message;
    }
    
    return ValidationMessages.required;
  }

  /**
   * Check if field has error
   */
  static hasError(errors: any, field: string): boolean {
    return !!(errors && errors[field]);
  }

  /**
   * Get field error
   */
  static getFieldError(errors: any, field: string): string | undefined {
    if (errors && errors[field]) {
      return errors[field].message;
    }
    return undefined;
  }

  /**
   * Check if form is valid
   */
  static isFormValid(errors: any): boolean {
    return !errors || Object.keys(errors).length === 0;
  }

  /**
   * Get all form errors
   */
  static getAllErrors(errors: any): string[] {
    if (!errors) return [];
    
    return Object.values(errors).map((error: any) => error.message || 'Invalid value');
  }

  /**
   * Clear field error
   */
  static clearFieldError(errors: any, field: string): any {
    if (errors && errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      return newErrors;
    }
    return errors;
  }

  /**
   * Clear all errors
   */
  static clearAllErrors(): any {
    return {};
  }
}
