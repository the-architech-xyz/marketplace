import React from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormField } from './FormField';
import { cn } from '@/lib/utils';

interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  description?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

export function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  description,
  placeholder,
  type = 'text',
  disabled = false,
  className,
  required = false,
}: FormInputProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      label={label}
      description={description}
      required={required}
      className={className}
    >
      {({ field, fieldState: { invalid } }) => (
        <Input
          {...field}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'transition-colors',
            invalid && 'border-destructive focus-visible:ring-destructive'
          )}
        />
      )}
    </FormField>
  );
}
