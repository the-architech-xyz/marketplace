/**
 * Form Validation Utilities
 * 
 * Zod-based validation schemas and utilities for forms
 */

import { z } from 'zod';

// Common validation schemas
export const commonSchemas = {
  // Email validation
  email: z.string().email('Invalid email address'),
  
  // Password validation with strength requirements
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  
  // Strong password validation
  strongPassword: z.string()
    .min(12, 'Password must be at least 12 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  
  // Name validation
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  
  // Username validation
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  
  // Phone validation
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  
  // URL validation
  url: z.string().url('Invalid URL'),
  
  // Required field
  required: z.string().min(1, 'This field is required'),
  
  // Optional field
  optional: z.string().optional(),
  
  // Number validation
  number: z.number().min(0, 'Number must be positive'),
  
  // Positive number
  positiveNumber: z.number().positive('Number must be positive'),
  
  // Integer validation
  integer: z.number().int('Number must be an integer'),
  
  // Date validation
  date: z.date().min(new Date('1900-01-01'), 'Date must be after 1900'),
  
  // Future date validation
  futureDate: z.date().min(new Date(), 'Date must be in the future'),
  
  // Past date validation
  pastDate: z.date().max(new Date(), 'Date must be in the past'),
  
  // Age validation
  age: z.number().min(0).max(150, 'Age must be between 0 and 150'),
  
  // Color validation (hex)
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color format'),
  
  // Slug validation
  slug: z.string()
    .min(3, 'Slug must be at least 3 characters')
    .max(50, 'Slug must be less than 50 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  
  // UUID validation
  uuid: z.string().uuid('Invalid UUID format'),
  
  // IP address validation
  ipAddress: z.string().ip('Invalid IP address'),
  
  // Credit card validation
  creditCard: z.string()
    .regex(/^[0-9]{13,19}$/, 'Invalid credit card number')
    .refine((val) => {
      // Luhn algorithm validation
      let sum = 0;
      let isEven = false;
      for (let i = val.length - 1; i >= 0; i--) {
        let digit = parseInt(val[i]);
        if (isEven) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        }
        sum += digit;
        isEven = !isEven;
      }
      return sum % 10 === 0;
    }, 'Invalid credit card number'),
  
  // CVV validation
  cvv: z.string().regex(/^[0-9]{3,4}$/, 'Invalid CVV'),
  
  // Expiry date validation
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid expiry date format (MM/YY)')
    .refine((val) => {
      const [month, year] = val.split('/');
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
      return expiryDate > new Date();
    }, 'Card has expired'),
};

// Form-specific schemas
export const formSchemas = {
  // Contact form schema
  contact: z.object({
    name: commonSchemas.name,
    email: commonSchemas.email,
    phone: commonSchemas.phone.optional(),
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
  }),
  
  // Login form schema
  login: z.object({
    email: commonSchemas.email,
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().optional(),
  }),
  
  // Registration form schema
  register: z.object({
    name: commonSchemas.name,
    email: commonSchemas.email,
    username: commonSchemas.username,
    password: commonSchemas.password,
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, 'You must accept the terms'),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }),
  
  // Password reset schema
  passwordReset: z.object({
    email: commonSchemas.email,
  }),
  
  // Change password schema
  changePassword: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: commonSchemas.password,
    confirmPassword: z.string(),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }),
  
  // Profile update schema
  profileUpdate: z.object({
    name: commonSchemas.name,
    email: commonSchemas.email,
    phone: commonSchemas.phone.optional(),
    bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
    website: commonSchemas.url.optional(),
  }),
  
  // Address schema
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
    country: z.string().min(1, 'Country is required'),
  }),
  
  // Product schema
  product: z.object({
    name: z.string().min(1, 'Product name is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    price: commonSchemas.positiveNumber,
    category: z.string().min(1, 'Category is required'),
    tags: z.array(z.string()).optional(),
    inStock: z.boolean(),
    quantity: commonSchemas.integer.min(0),
  }),
};

// Validation utilities
export const validationUtils = {
  // Create custom validation
  createValidation: (validator: (value: any) => boolean, message: string) => {
    return z.any().refine(validator, message);
  },
  
  // Create async validation
  createAsyncValidation: (validator: (value: any) => Promise<boolean>, message: string) => {
    return z.any().refine(validator, message);
  },
  
  // Validate file size
  fileSize: (maxSize: number) => {
    return z.any().refine(
      (file) => file?.size <= maxSize,
      `File size must be less than ${maxSize / 1024 / 1024}MB`
    );
  },
  
  // Validate file type
  fileType: (allowedTypes: string[]) => {
    return z.any().refine(
      (file) => allowedTypes.includes(file?.type),
      `File type must be one of: ${allowedTypes.join(', ')}`
    );
  },
  
  // Validate array length
  arrayLength: (min: number, max?: number) => {
    return z.array(z.any()).refine(
      (arr) => arr.length >= min && (max === undefined || arr.length <= max),
      `Array must have between ${min} and ${max || 'unlimited'} items`
    );
  },
  
  // Validate unique values
  uniqueValues: (message: string = 'Values must be unique') => {
    return z.array(z.any()).refine(
      (arr) => new Set(arr).size === arr.length,
      message
    );
  },
  
  // Validate password strength
  passwordStrength: (minScore: number = 3) => {
    return z.string().refine((password) => {
      let score = 0;
      if (password.length >= 8) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[a-z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;
      return score >= minScore;
    }, `Password strength must be at least ${minScore}/5`);
  },
};

// Error message utilities
export const errorMessages = {
  // Get field error message
  getFieldError: (errors: any, field: string) => {
    return errors[field]?.message;
  },
  
  // Get all error messages
  getAllErrors: (errors: any) => {
    return Object.values(errors).map((error: any) => error.message);
  },
  
  // Format error message
  formatError: (error: any) => {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    return 'An error occurred';
  },
  
  // Create custom error message
  createError: (message: string, field?: string) => {
    return { message, field };
  },
};
