import React from 'react';
import { UseFormRegister, FieldError, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';

export interface RadioOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface FormRadioProps<T extends Record<string, any>> {
  name: Path<T>;
  label: string;
  options: RadioOption[];
  register: UseFormRegister<T>;
  error?: FieldError;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  radioClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  description?: string;
  orientation?: 'horizontal' | 'vertical';
  autoFocus?: boolean;
}

export function FormRadio<T extends Record<string, any>>({
  name,
  label,
  options,
  register,
  error,
  disabled = false,
  required = false,
  className,
  radioClassName,
  labelClassName,
  errorClassName,
  description,
  orientation = 'vertical',
  autoFocus = false,
}: FormRadioProps<T>) {
  const fieldsetId = `fieldset-${name}`;
  const errorId = `error-${name}`;
  const descriptionId = `description-${name}`;

  return (
    <fieldset className={cn('space-y-2', className)}>
      <legend
        className={cn(
          'block text-sm font-medium text-gray-700 dark:text-gray-300',
          required && 'after:content-["*"] after:ml-1 after:text-red-500',
          disabled && 'text-gray-400 dark:text-gray-600',
          labelClassName
        )}
      >
        {label}
      </legend>
      
      {description && (
        <p
          id={descriptionId}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          {description}
        </p>
      )}
      
      <div
        className={cn(
          'space-y-2',
          orientation === 'horizontal' && 'flex flex-wrap gap-4'
        )}
        role="radiogroup"
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={cn(
          error ? errorId : undefined,
          description ? descriptionId : undefined
        )}
      >
        {options.map((option, index) => {
          const radioId = `radio-${name}-${option.value}`;
          const isFirst = index === 0;
          
          return (
            <div key={option.value} className="flex items-center">
              <input
                id={radioId}
                type="radio"
                value={option.value}
                disabled={disabled || option.disabled}
                autoFocus={autoFocus && isFirst}
                className={cn(
                  'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300',
                  'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
                  'dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-blue-400',
                  error && 'border-red-500 focus:ring-red-500',
                  'dark:error:border-red-400 dark:error:focus:ring-red-400',
                  radioClassName
                )}
                {...register(name, {
                  required: required ? `${label} is required` : false,
                })}
              />
              
              <label
                htmlFor={radioId}
                className={cn(
                  'ml-2 text-sm font-medium text-gray-700 dark:text-gray-300',
                  (disabled || option.disabled) && 'text-gray-400 dark:text-gray-600',
                  'cursor-pointer'
                )}
              >
                {option.label}
              </label>
            </div>
          );
        })}
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
    </fieldset>
  );
}

// Export default for easier imports
export default FormRadio;
