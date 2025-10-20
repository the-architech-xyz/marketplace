'use client';

import { useForm, UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ReactNode } from 'react';

interface FormProps<T extends FieldValues> {
  schema: z.ZodSchema<T>;
  defaultValues?: Partial<T>;
  onSubmit: (data: T) => void | Promise<void>;
  children: (form: UseFormReturn<T>) => ReactNode;
  className?: string;
}

export function Form<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className = '',
}: FormProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  });

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children(form)}
    </form>
  );
}

// Form field wrapper component
interface FormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  children: (field: {
    field: any;
    fieldState: any;
    formState: any;
  }) => ReactNode;
}

export function FormField<T extends FieldValues>({
  form,
  name,
  children,
}: FormFieldProps<T>) {
  return (
    <>
      {form.register(name)}
      {children({
        field: form.register(name),
        fieldState: form.formState.errors[name],
        formState: form.formState,
      })}
    </>
  );
}
