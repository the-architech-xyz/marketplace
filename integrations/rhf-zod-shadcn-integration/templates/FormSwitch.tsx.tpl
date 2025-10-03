import React from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Switch } from '@/components/ui/switch';
import { FormField } from './FormField';
import { cn } from '@/lib/utils';

interface FormSwitchProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

export function FormSwitch<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  description,
  disabled = false,
  className,
  required = false,
}: FormSwitchProps<TFieldValues, TName>) {
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
        <div className="flex items-center space-x-2">
          <Switch
            id={field.name}
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={disabled}
            className={cn(
              'transition-colors',
              invalid && 'border-destructive'
            )}
          />
          {label && (
            <label
              htmlFor={field.name}
              className={cn(
                'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                invalid && 'text-destructive'
              )}
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </label>
          )}
        </div>
      )}
    </FormField>
  );
}
