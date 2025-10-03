import React from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FormField } from './FormField';
import { cn } from '@/lib/utils';

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FormRadioProps<
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
  options: RadioOption[];
  orientation?: 'horizontal' | 'vertical';
}

export function FormRadio<
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
  options,
  orientation = 'vertical',
}: FormRadioProps<TFieldValues, TName>) {
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
        <RadioGroup
          value={field.value}
          onValueChange={field.onChange}
          disabled={disabled}
          className={cn(
            orientation === 'horizontal' ? 'flex flex-row space-x-4' : 'space-y-2'
          )}
        >
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.value}
                id={`${field.name}-${option.value}`}
                disabled={option.disabled}
                className={cn(
                  'transition-colors',
                  invalid && 'border-destructive'
                )}
              />
              <Label
                htmlFor={`${field.name}-${option.value}`}
                className={cn(
                  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                  invalid && 'text-destructive'
                )}
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}
    </FormField>
  );
}
