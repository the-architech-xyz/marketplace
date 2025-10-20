'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { FieldPath, FieldValues } from 'react-hook-form';
import { ReactNode } from 'react';

interface FormFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  children: (field: {
    field: any;
    fieldState: any;
    formState: any;
  }) => ReactNode;
}

export function FormField<T extends FieldValues>({
  name,
  children,
}: FormFieldProps<T>) {
  const form = useFormContext<T>();
  
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState, formState }) => (
        <div className="space-y-2">
          {children({ field, fieldState, formState })}
          {fieldState.error && (
            <p className="text-sm text-red-600">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}

// Form label component
interface FormLabelProps {
  children: ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
}

export function FormLabel({ 
  children, 
  htmlFor, 
  required = false,
  className = '' 
}: FormLabelProps) {
  return (
    <label 
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 ${className}`}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

// Form error component
interface FormErrorProps {
  error?: string;
  className?: string;
}

export function FormError({ error, className = '' }: FormErrorProps) {
  if (!error) return null;
  
  return (
    <p className={`text-sm text-red-600 ${className}`}>
      {error}
    </p>
  );
}
