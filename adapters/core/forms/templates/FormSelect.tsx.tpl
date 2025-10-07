import React from 'react';
import { UseFormRegister, FieldError, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface FormSelectProps<T extends Record<string, any>> {
  name: Path<T>;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  selectClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  description?: string;
  multiple?: boolean;
  size?: number;
  autoFocus?: boolean;
}

export function FormSelect<T extends Record<string, any>>({
  name,
  label,
  options,
  placeholder,
  register,
  error,
  disabled = false,
  required = false,
  className,
  selectClassName,
  labelClassName,
  errorClassName,
  description,
  multiple = false,
  size,
  autoFocus = false,
}: FormSelectProps<T>) {
  const selectId = `select-${name}`;
  const errorId = `error-${name}`;
  const descriptionId = `description-${name}`;

  return (
    <div className={cn('space-y-2', className)}>
      <label
        htmlFor={selectId}
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
      
      <select
        id={selectId}
        multiple={multiple}
        size={size}
        disabled={disabled}
        autoFocus={autoFocus}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={cn(
          error ? errorId : undefined,
          description ? descriptionId : undefined
        )}
        className={cn(
          'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
          'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
          'dark:bg-gray-800 dark:border-gray-600 dark:text-white',
          'dark:focus:ring-blue-400 dark:focus:border-blue-400',
          error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
          'dark:error:border-red-400 dark:error:focus:ring-red-400 dark:error:focus:border-red-400',
          selectClassName
        )}
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      
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
export default FormSelect;
