import React from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { FormField } from './FormField';
import { cn } from '@/lib/utils';

interface FormTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  rows?: number;
}

export function FormTextarea<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  description,
  placeholder,
  disabled = false,
  className,
  required = false,
  rows = 4,
}: FormTextareaProps<TFieldValues, TName>) {
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
        <Textarea
          {...field}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className={cn(
            'transition-colors resize-none',
            invalid && 'border-destructive focus-visible:ring-destructive'
          )}
        />
      )}
    </FormField>
  );
}
