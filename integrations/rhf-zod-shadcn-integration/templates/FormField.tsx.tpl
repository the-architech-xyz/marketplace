import React from 'react';
import { useController, Control, FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { FormMessage } from '@/components/ui/form';

interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  description?: string;
  children: (field: {
    field: any;
    fieldState: any;
    formState: any;
  }) => React.ReactNode;
  className?: string;
  required?: boolean;
}

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  description,
  children,
  className,
  required = false,
}: FormFieldProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error, invalid },
    formState: { isSubmitting },
  } = useController({
    control,
    name,
  });

  const fieldId = `field-${name}`;
  const errorId = `error-${name}`;
  const descriptionId = `description-${name}`;

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label 
          htmlFor={fieldId}
          className={cn(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            invalid && 'text-destructive'
          )}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      
      {description && (
        <p 
          id={descriptionId}
          className="text-sm text-muted-foreground"
        >
          {description}
        </p>
      )}

      <div className="relative">
        {children({
          field: {
            ...field,
            id: fieldId,
            'aria-describedby': cn(
              errorId,
              descriptionId
            ),
            'aria-invalid': invalid,
            'aria-required': required,
            disabled: isSubmitting,
          },
          fieldState: {
            error,
            invalid,
            isDirty: field.value !== undefined,
            isTouched: field.value !== undefined,
          },
          formState: {
            isSubmitting,
          },
        })}
      </div>

      {error && (
        <FormMessage 
          id={errorId}
          className="text-sm font-medium text-destructive"
        >
          {error.message}
        </FormMessage>
      )}
    </div>
  );
}
