/**
 * Form Field Component
 * 
 * Generic form field wrapper with accessibility and validation
 */

import React, { forwardRef } from 'react';
import { useFormField } from './FormProvider';
import { FormFieldError } from './core';

// Form field props
interface FormFieldProps<T extends FieldValues = FieldValues> {
  name: keyof T;
  label?: string;
  description?: string;
  required?: boolean;
  children: (field: any, error?: string, isDirty?: boolean, isTouched?: boolean) => React.ReactNode;
  className?: string;
  errorClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
}

// Form field component
export const FormField = forwardRef<HTMLDivElement, FormFieldProps<any>>(
  ({
    name,
    label,
    description,
    required = false,
    children,
    className = '',
    errorClassName = '',
    labelClassName = '',
    descriptionClassName = '',
  }, ref) => {
    const { field, error, isDirty, isTouched } = useFormField(name);
    
    return (
      <div ref={ref} className={`space-y-2 ${className}`}>
        {label && (
          <label 
            htmlFor={field.name}
            className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        {description && (
          <p className={`text-sm text-gray-500 ${descriptionClassName}`}>
            {description}
          </p>
        )}
        
        {children(field, error, isDirty, isTouched)}
        
        {error && (
          <FormFieldError 
            error={error} 
            className={errorClassName}
          />
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

// Form field with input
interface FormFieldInputProps<T extends FieldValues = FieldValues> {
  name: keyof T;
  label?: string;
  description?: string;
  required?: boolean;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  errorClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

export const FormFieldInput = forwardRef<HTMLInputElement, FormFieldInputProps<any>>(
  ({
    name,
    label,
    description,
    required = false,
    type = 'text',
    placeholder,
    className = '',
    inputClassName = '',
    errorClassName = '',
    labelClassName = '',
    descriptionClassName = '',
    disabled = false,
    readOnly = false,
  }, ref) => {
    return (
      <FormField
        name={name}
        label={label}
        description={description}
        required={required}
        className={className}
        errorClassName={errorClassName}
        labelClassName={labelClassName}
        descriptionClassName={descriptionClassName}
      >
        {(field, error, isDirty, isTouched) => (
          <input
            {...field}
            ref={ref}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            className={`
              block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
              read-only:bg-gray-50 read-only:text-gray-500
              ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}
              ${inputClassName}
            `}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
          />
        )}
      </FormField>
    );
  }
);

FormFieldInput.displayName = 'FormFieldInput';

// Form field with textarea
interface FormFieldTextareaProps<T extends FieldValues = FieldValues> {
  name: keyof T;
  label?: string;
  description?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  className?: string;
  textareaClassName?: string;
  errorClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

export const FormFieldTextarea = forwardRef<HTMLTextAreaElement, FormFieldTextareaProps<any>>(
  ({
    name,
    label,
    description,
    required = false,
    placeholder,
    rows = 4,
    className = '',
    textareaClassName = '',
    errorClassName = '',
    labelClassName = '',
    descriptionClassName = '',
    disabled = false,
    readOnly = false,
  }, ref) => {
    return (
      <FormField
        name={name}
        label={label}
        description={description}
        required={required}
        className={className}
        errorClassName={errorClassName}
        labelClassName={labelClassName}
        descriptionClassName={descriptionClassName}
      >
        {(field, error, isDirty, isTouched) => (
          <textarea
            {...field}
            ref={ref}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            readOnly={readOnly}
            className={`
              block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
              read-only:bg-gray-50 read-only:text-gray-500
              ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}
              ${textareaClassName}
            `}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
          />
        )}
      </FormField>
    );
  }
);

FormFieldTextarea.displayName = 'FormFieldTextarea';

// Form field with select
interface FormFieldSelectProps<T extends FieldValues = FieldValues> {
  name: keyof T;
  label?: string;
  description?: string;
  required?: boolean;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
  className?: string;
  selectClassName?: string;
  errorClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  disabled?: boolean;
}

export const FormFieldSelect = forwardRef<HTMLSelectElement, FormFieldSelectProps<any>>(
  ({
    name,
    label,
    description,
    required = false,
    options,
    placeholder,
    className = '',
    selectClassName = '',
    errorClassName = '',
    labelClassName = '',
    descriptionClassName = '',
    disabled = false,
  }, ref) => {
    return (
      <FormField
        name={name}
        label={label}
        description={description}
        required={required}
        className={className}
        errorClassName={errorClassName}
        labelClassName={labelClassName}
        descriptionClassName={descriptionClassName}
      >
        {(field, error, isDirty, isTouched) => (
          <select
            {...field}
            ref={ref}
            disabled={disabled}
            className={`
              block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
              ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}
              ${selectClassName}
            `}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
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
        )}
      </FormField>
    );
  }
);

FormFieldSelect.displayName = 'FormFieldSelect';

// Form field with checkbox
interface FormFieldCheckboxProps<T extends FieldValues = FieldValues> {
  name: keyof T;
  label?: string;
  description?: string;
  required?: boolean;
  className?: string;
  checkboxClassName?: string;
  errorClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  disabled?: boolean;
}

export const FormFieldCheckbox = forwardRef<HTMLInputElement, FormFieldCheckboxProps<any>>(
  ({
    name,
    label,
    description,
    required = false,
    className = '',
    checkboxClassName = '',
    errorClassName = '',
    labelClassName = '',
    descriptionClassName = '',
    disabled = false,
  }, ref) => {
    return (
      <FormField
        name={name}
        label={label}
        description={description}
        required={required}
        className={className}
        errorClassName={errorClassName}
        labelClassName={labelClassName}
        descriptionClassName={descriptionClassName}
      >
        {(field, error, isDirty, isTouched) => (
          <div className="flex items-center space-x-2">
            <input
              {...field}
              ref={ref}
              type="checkbox"
              disabled={disabled}
              className={`
                h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded
                disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                ${error ? 'border-red-300 focus:ring-red-500' : ''}
                ${checkboxClassName}
              `}
              aria-invalid={!!error}
              aria-describedby={error ? `${name}-error` : undefined}
            />
            {label && (
              <label
                htmlFor={field.name}
                className={`text-sm font-medium text-gray-700 ${labelClassName}`}
              >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}
          </div>
        )}
      </FormField>
    );
  }
);

FormFieldCheckbox.displayName = 'FormFieldCheckbox';

// Form field with radio
interface FormFieldRadioProps<T extends FieldValues = FieldValues> {
  name: keyof T;
  label?: string;
  description?: string;
  required?: boolean;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  className?: string;
  radioClassName?: string;
  errorClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  disabled?: boolean;
}

export const FormFieldRadio = forwardRef<HTMLInputElement, FormFieldRadioProps<any>>(
  ({
    name,
    label,
    description,
    required = false,
    options,
    className = '',
    radioClassName = '',
    errorClassName = '',
    labelClassName = '',
    descriptionClassName = '',
    disabled = false,
  }, ref) => {
    return (
      <FormField
        name={name}
        label={label}
        description={description}
        required={required}
        className={className}
        errorClassName={errorClassName}
        labelClassName={labelClassName}
        descriptionClassName={descriptionClassName}
      >
        {(field, error, isDirty, isTouched) => (
          <div className="space-y-2">
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <input
                  {...field}
                  ref={ref}
                  type="radio"
                  value={option.value}
                  disabled={disabled || option.disabled}
                  className={`
                    h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300
                    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                    ${error ? 'border-red-300 focus:ring-red-500' : ''}
                    ${radioClassName}
                  `}
                  aria-invalid={!!error}
                  aria-describedby={error ? `${name}-error` : undefined}
                />
                <label
                  htmlFor={`${field.name}-${option.value}`}
                  className={`text-sm font-medium text-gray-700 ${labelClassName}`}
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </FormField>
    );
  }
);

FormFieldRadio.displayName = 'FormFieldRadio';

export default FormField;
