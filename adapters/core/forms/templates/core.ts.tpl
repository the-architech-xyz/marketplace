/**
 * Forms Core Utilities
 * 
 * Golden Core form handling utilities with React Hook Form and Zod
 */

import { useForm, UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Generic form hook with Zod validation
export function useZodForm<T extends FieldValues>(
  schema: z.ZodSchema<T>,
  defaultValues?: Partial<T>
): UseFormReturn<T> {
  return useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
}

// Form hook with custom options
export function useFormWithOptions<T extends FieldValues>(
  schema: z.ZodSchema<T>,
  options: {
    defaultValues?: Partial<T>;
    mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
    reValidateMode?: 'onChange' | 'onBlur' | 'onSubmit';
    delayError?: number;
  } = {}
): UseFormReturn<T> {
  return useForm<T>({
    resolver: zodResolver(schema),
    ...options,
  });
}

// Form hook with async validation
export function useAsyncForm<T extends FieldValues>(
  schema: z.ZodSchema<T>,
  asyncValidation?: (data: T) => Promise<z.ZodError | null>,
  options: {
    defaultValues?: Partial<T>;
    mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
  } = {}
): UseFormReturn<T> & { isAsyncValidating: boolean } {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    ...options,
  });

  const [isAsyncValidating, setIsAsyncValidating] = useState(false);

  const handleAsyncValidation = useCallback(async (data: T) => {
    if (!asyncValidation) return;
    
    setIsAsyncValidating(true);
    try {
      const error = await asyncValidation(data);
      if (error) {
        form.setError('root', { message: error.message });
      }
    } catch (error) {
      form.setError('root', { message: 'Validation failed' });
    } finally {
      setIsAsyncValidating(false);
    }
  }, [asyncValidation, form]);

  return {
    ...form,
    isAsyncValidating,
    handleAsyncValidation,
  };
}

// Form field error component props
export interface FormFieldErrorProps {
  error?: string;
  className?: string;
}

// Form field error component
export function FormFieldError({ error, className = '' }: FormFieldErrorProps) {
  if (!error) return null;
  
  return (
    <p className={`text-sm text-red-600 mt-1 ${className}`} role="alert">
      {error}
    </p>
  );
}

// Form field wrapper component props
export interface FormFieldWrapperProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  required?: boolean;
  error?: string;
}

// Form field wrapper component
export function FormFieldWrapper({ 
  children, 
  className = '', 
  label, 
  required = false,
  error 
}: FormFieldWrapperProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && <FormFieldError error={error} />}
    </div>
  );
}

// Generic form component props
export interface FormProps<T extends FieldValues> {
  onSubmit: (data: T) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
  form: UseFormReturn<T>;
  isLoading?: boolean;
}

// Generic form component
export function Form<T extends FieldValues>({ 
  onSubmit, 
  children, 
  className = '', 
  form,
  isLoading = false
}: FormProps<T>) {
  const handleSubmit = form.handleSubmit;
  
  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className={`space-y-4 ${className}`}
      noValidate
    >
      {children}
      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
        </div>
      )}
    </form>
  );
}

// Form validation utilities
export const formValidation = {
  // Email validation
  email: z.string().email('Invalid email address'),
  
  // Password validation
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  
  // Name validation
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  
  // Phone validation
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  
  // URL validation
  url: z.string().url('Invalid URL'),
  
  // Required field
  required: z.string().min(1, 'This field is required'),
  
  // Optional field
  optional: z.string().optional(),
  
  // Confirm password
  confirmPassword: (passwordField: string) => z.string()
    .min(1, 'Please confirm your password')
    .refine((val) => val === passwordField, {
      message: 'Passwords do not match',
    }),
};

// Form error types
export class FormError extends Error {
  constructor(
    message: string,
    public field?: string,
    public code?: string
  ) {
    super(message);
    this.name = 'FormError';
  }
}

// Form success types
export interface FormSuccess<T = any> {
  data: T;
  message?: string;
}

// Form state types
export interface FormState<T = any> {
  isLoading: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
  errors: Record<string, string>;
  data: T;
}

// Form utilities
export const formUtils = {
  // Get field error
  getFieldError: (form: UseFormReturn<any>, field: string) => {
    return form.formState.errors[field]?.message;
  },
  
  // Check if field is dirty
  isFieldDirty: (form: UseFormReturn<any>, field: string) => {
    return form.formState.dirtyFields[field];
  },
  
  // Check if field is touched
  isFieldTouched: (form: UseFormReturn<any>, field: string) => {
    return form.formState.touchedFields[field];
  },
  
  // Reset form
  resetForm: (form: UseFormReturn<any>, values?: any) => {
    form.reset(values);
  },
  
  // Clear form
  clearForm: (form: UseFormReturn<any>) => {
    form.reset();
  },
  
  // Set form values
  setFormValues: (form: UseFormReturn<any>, values: any) => {
    form.reset(values);
  },
  
  // Set field value
  setFieldValue: (form: UseFormReturn<any>, field: string, value: any) => {
    form.setValue(field, value);
  },
  
  // Trigger validation
  triggerValidation: (form: UseFormReturn<any>, fields?: string[]) => {
    return form.trigger(fields);
  },
};
