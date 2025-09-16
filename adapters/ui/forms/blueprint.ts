/**
 * Forms Blueprint
 * 
 * Provides form handling with validation using Zod and React Hook Form
 * Framework-agnostic form utilities that work with any React project
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const formsBlueprint: Blueprint = {
  id: 'forms-setup',
  name: 'Forms Setup',
  actions: [
    // Install Zod
    {
      type: 'INSTALL_PACKAGES',
      packages: ['zod'],
      condition: '{{#if module.parameters.zod}}'
    },
    // Install React Hook Form
    {
      type: 'INSTALL_PACKAGES',
      packages: ['react-hook-form'],
      condition: '{{#if module.parameters.reactHookForm}}'
    },
    // Install resolvers
    {
      type: 'INSTALL_PACKAGES',
      packages: ['@hookform/resolvers'],
      condition: '{{#if module.parameters.resolvers}}'
    },
    // Create form utilities
    {
      type: 'CREATE_FILE',
      path: 'src/lib/forms.ts',
      content: `import { z } from 'zod';
import { useForm, UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * Generic form hook with Zod validation
 */
export function useZodForm<T extends FieldValues>(
  schema: z.ZodSchema<T>,
  defaultValues?: Partial<T>
): UseFormReturn<T> {
  return useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });
}

/**
 * Common form validation schemas
 */
export const commonSchemas = {
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\\+?[1-9]\\d{1,14}$/, 'Invalid phone number'),
  url: z.string().url('Invalid URL'),
  required: z.string().min(1, 'This field is required'),
  optional: z.string().optional(),
};

/**
 * Form field error component props
 */
export interface FormFieldErrorProps {
  error?: string;
  className?: string;
}

/**
 * Form field error component
 */
export function FormFieldError({ error, className = '' }: FormFieldErrorProps) {
  if (!error) return null;
  
  return (
    <p className={\`text-sm text-red-600 mt-1 \${className}\`}>
      {error}
    </p>
  );
}

/**
 * Form field wrapper component props
 */
export interface FormFieldWrapperProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Form field wrapper component
 */
export function FormFieldWrapper({ 
  label, 
  error, 
  required = false, 
  children, 
  className = '' 
}: FormFieldWrapperProps) {
  return (
    <div className={\`space-y-2 \${className}\`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      <FormFieldError error={error} />
    </div>
  );
}
`,
      condition: '{{#if module.parameters.zod}}'
    },
    // Create example form components
    {
      type: 'CREATE_FILE',
      path: 'src/components/forms/ContactForm.tsx',
      content: `import React from 'react';
import { useZodForm, commonSchemas, FormFieldWrapper } from '@/lib/forms';
import { z } from 'zod';

const contactSchema = z.object({
  name: commonSchemas.name,
  email: commonSchemas.email,
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  className?: string;
}

export function ContactForm({ onSubmit, className = '' }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useZodForm(contactSchema);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={\`space-y-6 \${className}\`}>
      <FormFieldWrapper
        label="Name"
        error={errors.name?.message}
        required
      >
        <input
          {...register('name')}
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Your name"
        />
      </FormFieldWrapper>

      <FormFieldWrapper
        label="Email"
        error={errors.email?.message}
        required
      >
        <input
          {...register('email')}
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="your@email.com"
        />
      </FormFieldWrapper>

      <FormFieldWrapper
        label="Message"
        error={errors.message?.message}
        required
      >
        <textarea
          {...register('message')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Your message"
        />
      </FormFieldWrapper>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
`,
      condition: '{{#if module.parameters.reactHookForm}}'
    }
  ]
};
