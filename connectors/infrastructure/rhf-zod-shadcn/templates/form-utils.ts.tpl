import { z } from 'zod';
import { FieldPath, FieldValues, PathValue } from 'react-hook-form';

// Common validation schemas
export const commonSchemas = {
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Please enter a valid phone number'),
  url: z.string().url('Please enter a valid URL'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Please enter a valid date'),
  number: z.string().refine((val) => !isNaN(Number(val)), 'Please enter a valid number'),
};

// Form validation utilities
export function createFormSchema<T extends FieldValues>(
  schema: z.ZodSchema<T>
) {
  return schema;
}

// Password confirmation validation
export const passwordConfirmationSchema = z.object({
  password: commonSchemas.password,
  confirmPassword: commonSchemas.confirmPassword,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Form field utilities
export function getFieldError<T extends FieldValues>(
  errors: any,
  fieldName: FieldPath<T>
): string | undefined {
  const fieldError = errors[fieldName];
  return fieldError?.message;
}

// Form submission utilities
export function handleFormSubmit<T extends FieldValues>(
  onSubmit: (data: T) => void | Promise<void>
) {
  return async (data: T) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    }
  };
}

// Form reset utilities
export function createFormReset<T extends FieldValues>(
  reset: (values?: Partial<T>) => void
) {
  return (defaultValues?: Partial<T>) => {
    reset(defaultValues);
  };
}
