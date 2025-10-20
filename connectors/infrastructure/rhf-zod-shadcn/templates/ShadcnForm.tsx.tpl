/**
 * Shadcn Form Component
 * 
 * Shadcn UI integration for core forms system
 */

'use client';

import { useForm, UseFormReturn, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ShadcnFormProps<T extends FieldValues> {
  schema: z.ZodSchema<T>;
  defaultValues?: Partial<T>;
  onSubmit: (data: T) => void | Promise<void>;
  children: (form: UseFormReturn<T>) => ReactNode;
  className?: string;
}

export function ShadcnForm<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className = '',
}: ShadcnFormProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  });

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      {children(form)}
    </form>
  );
}

// Shadcn form field wrapper component
interface ShadcnFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: keyof T;
  children: (field: {
    field: any;
    fieldState: any;
    formState: any;
  }) => ReactNode;
  className?: string;
}

export function ShadcnFormField<T extends FieldValues>({
  form,
  name,
  children,
  className = '',
}: ShadcnFormFieldProps<T>) {
  return (
    <div className={cn('space-y-2', className)}>
      {children({
        field: form.register(name as any),
        fieldState: form.formState.errors[name],
        formState: form.formState,
      })}
    </div>
  );
}

// Shadcn form error component
interface ShadcnFormErrorProps {
  error?: string;
  className?: string;
}

export function ShadcnFormError({ error, className = '' }: ShadcnFormErrorProps) {
  if (!error) return null;
  
  return (
    <p className={cn('text-sm text-destructive mt-1', className)} role="alert">
      {error}
    </p>
  );
}

// Shadcn form label component
interface ShadcnFormLabelProps {
  children: ReactNode;
  required?: boolean;
  className?: string;
}

export function ShadcnFormLabel({ 
  children, 
  required = false, 
  className = '' 
}: ShadcnFormLabelProps) {
  return (
    <label className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)}>
      {children}
      {required && <span className="text-destructive ml-1">*</span>}
    </label>
  );
}

export default ShadcnForm;
