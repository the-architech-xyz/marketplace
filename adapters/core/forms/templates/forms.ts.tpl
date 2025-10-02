import { z } from 'zod';
import { useForm, UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * Generic form hook with Zod validation
 */
export function useZodForm<T extends FieldValues>(
  schema: z.ZodSchema<T>,
  defaultValues?: Partial<T>
): UseFormReturn<T> {
  return useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });
}

/**
 * Common form validation schemas
 */
export const commonSchemas = {
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  url: z.string().url('Invalid URL'),
  required: z.string().min(1, 'This field is required'),
  optional: z.string().optional(),
};

/**
 * Form field error component props
 */
export interface FormFieldErrorProps {
  error?: string;
  className?: string;
}

/**
 * Form field error component
 */
export function FormFieldError({ error, className = '' }: FormFieldErrorProps) {
  if (!error) return null;
  
  return (
    <p className={`text-sm text-red-600 mt-1 ${className}`}>
      {error}
    </p>
  );
}

/**
 * Form field wrapper component props
 */
export interface FormFieldWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Form field wrapper component
 */
export function FormFieldWrapper({ children, className = '' }: FormFieldWrapperProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Generic form component props
 */
export interface FormProps<T extends FieldValues> {
  onSubmit: (data: T) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
  form: UseFormReturn<T>;
}

/**
 * Generic form component
 */
export function Form<T extends FieldValues>({ 
  onSubmit, 
  children, 
  className = '', 
  form 
}: FormProps<T>) {
  const handleSubmit = form.handleSubmit;
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-6 ${className}`}>
      {children}
    </form>
  );
}

/**
 * Form input component props
 */
export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

/**
 * Form input component
 */
export function FormInput({ 
  label, 
  error, 
  className = '', 
  ...props 
}: FormInputProps) {
  return (
    <FormFieldWrapper>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        {...props}
      />
      <FormFieldError error={error} />
    </FormFieldWrapper>
  );
}

/**
 * Form textarea component props
 */
export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
}

/**
 * Form textarea component
 */
export function FormTextarea({ 
  label, 
  error, 
  className = '', 
  ...props 
}: FormTextareaProps) {
  return (
    <FormFieldWrapper>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        {...props}
      />
      <FormFieldError error={error} />
    </FormFieldWrapper>
  );
}

/**
 * Form select component props
 */
export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  className?: string;
  options: { value: string; label: string }[];
}

/**
 * Form select component
 */
export function FormSelect({ 
  label, 
  error, 
  className = '', 
  options,
  ...props 
}: FormSelectProps) {
  return (
    <FormFieldWrapper>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FormFieldError error={error} />
    </FormFieldWrapper>
  );
}

