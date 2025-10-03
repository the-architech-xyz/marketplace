import React from 'react';
import { useForm, FieldValues, Path } from 'react-hook-form';
import { z } from 'zod';
import { FormInput } from './FormInput';
import { FormTextarea } from './FormTextarea';
import { FormSelect } from './FormSelect';
import { FormCheckbox } from './FormCheckbox';
import { FormRadio } from './FormRadio';
import { FormSwitch } from './FormSwitch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Form Builder Component
 * Dynamically builds forms based on configuration
 */

export interface FormFieldConfig {
  type: 'input' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'switch';
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  // Field-specific props
  inputType?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  rows?: number;
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
  orientation?: 'horizontal' | 'vertical';
}

export interface FormBuilderProps<T extends FieldValues> {
  schema: z.ZodSchema<T>;
  fields: FormFieldConfig[];
  defaultValues?: T;
  onSubmit: (data: T) => void | Promise<void>;
  submitLabel?: string;
  resetLabel?: string;
  showReset?: boolean;
  className?: string;
  title?: string;
  description?: string;
}

export function FormBuilder<T extends FieldValues>({
  schema,
  fields,
  defaultValues,
  onSubmit,
  submitLabel = 'Submit',
  resetLabel = 'Reset',
  showReset = true,
  className,
  title,
  description,
}: FormBuilderProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = form.handleSubmit(onSubmit);

  const renderField = (fieldConfig: FormFieldConfig) => {
    const { type, name, ...props } = fieldConfig;

    switch (type) {
      case 'input':
        return (
          <FormInput
            key={name}
            control={form.control}
            name={name as Path<T>}
            {...props}
          />
        );
      case 'textarea':
        return (
          <FormTextarea
            key={name}
            control={form.control}
            name={name as Path<T>}
            {...props}
          />
        );
      case 'select':
        return (
          <FormSelect
            key={name}
            control={form.control}
            name={name as Path<T>}
            {...props}
          />
        );
      case 'checkbox':
        return (
          <FormCheckbox
            key={name}
            control={form.control}
            name={name as Path<T>}
            {...props}
          />
        );
      case 'radio':
        return (
          <FormRadio
            key={name}
            control={form.control}
            name={name as Path<T>}
            {...props}
          />
        );
      case 'switch':
        return (
          <FormSwitch
            key={name}
            control={form.control}
            name={name as Path<T>}
            {...props}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {fields.map(renderField)}
          
          {form.formState.errors.root && (
            <div className="text-sm text-red-600">
              {form.formState.errors.root.message}
            </div>
          )}

          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="flex-1"
            >
              {form.formState.isSubmitting ? 'Submitting...' : submitLabel}
            </Button>
            
            {showReset && (
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={form.formState.isSubmitting}
                className="flex-1"
              >
                {resetLabel}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
