import React from 'react';
import { UseFormRegister, FieldError, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';

export interface FormCheckboxProps<T extends Record<string, any>> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  checkboxClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  description?: string;
  value?: string | number;
  checked?: boolean;
  autoFocus?: boolean;
}

export function FormCheckbox<T extends Record<string, any>>({
  name,
  label,
  register,
  error,
  disabled = false,
  required = false,
  className,
  checkboxClassName,
  labelClassName,
  errorClassName,
  description,
  value,
  checked,
  autoFocus = false,
}: FormCheckboxProps<T>) {
  const checkboxId = `checkbox-${name}`;
  const errorId = `error-${name}`;
  const descriptionId = `description-${name}`;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={checkboxId}
            type="checkbox"
            value={value}
            checked={checked}
            disabled={disabled}
            autoFocus={autoFocus}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={cn(
              error ? errorId : undefined,
              description ? descriptionId : undefined
            )}
            className={cn(
              'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded',
              'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
              'dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-blue-400',
              error && 'border-red-500 focus:ring-red-500',
              'dark:error:border-red-400 dark:error:focus:ring-red-400',
              checkboxClassName
            )}
            {...register(name, {
              required: required ? `${label} is required` : false,
            })}
          />
        </div>
        
        <div className="ml-3 text-sm">
          <label
            htmlFor={checkboxId}
            className={cn(
              'font-medium text-gray-700 dark:text-gray-300',
              required && 'after:content-["*"] after:ml-1 after:text-red-500',
              disabled && 'text-gray-400 dark:text-gray-600',
              'cursor-pointer',
              labelClassName
            )}
          >
            {label}
          </label>
          
          {description && (
            <p
              id={descriptionId}
              className="text-gray-500 dark:text-gray-400 mt-1"
            >
              {description}
            </p>
          )}
        </div>
      </div>
      
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
export default FormCheckbox;
