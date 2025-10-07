import React from 'react';
import { UseFormRegister, FieldError, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';

export interface FormTextareaProps<T extends Record<string, any>> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  textareaClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  description?: string;
  rows?: number;
  cols?: number;
  maxLength?: number;
  minLength?: number;
  autoFocus?: boolean;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

export function FormTextarea<T extends Record<string, any>>({
  name,
  label,
  placeholder,
  register,
  error,
  disabled = false,
  required = false,
  className,
  textareaClassName,
  labelClassName,
  errorClassName,
  description,
  rows = 4,
  cols,
  maxLength,
  minLength,
  autoFocus = false,
  resize = 'vertical',
}: FormTextareaProps<T>) {
  const textareaId = `textarea-${name}`;
  const errorId = `error-${name}`;
  const descriptionId = `description-${name}`;

  return (
    <div className={cn('space-y-2', className)}>
      <label
        htmlFor={textareaId}
        className={cn(
          'block text-sm font-medium text-gray-700 dark:text-gray-300',
          required && 'after:content-["*"] after:ml-1 after:text-red-500',
          disabled && 'text-gray-400 dark:text-gray-600',
          labelClassName
        )}
      >
        {label}
      </label>
      
      {description && (
        <p
          id={descriptionId}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          {description}
        </p>
      )}
      
      <textarea
        id={textareaId}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        cols={cols}
        maxLength={maxLength}
        minLength={minLength}
        autoFocus={autoFocus}
        style={{ resize }}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={cn(
          error ? errorId : undefined,
          description ? descriptionId : undefined
        )}
        className={cn(
          'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm',
          'placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
          'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
          'dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500',
          'dark:focus:ring-blue-400 dark:focus:border-blue-400',
          error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
          'dark:error:border-red-400 dark:error:focus:ring-red-400 dark:error:focus:border-red-400',
          textareaClassName
        )}
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
      />
      
      {error && (
        <p
          id={errorId}
          role="alert"
          className={cn(
            'text-sm text-red-600 dark:text-red-400',
            errorClassName
          )}
        >
          {error.message}
        </p>
      )}
    </div>
  );
}

// Export default for easier imports
export default FormTextarea;
