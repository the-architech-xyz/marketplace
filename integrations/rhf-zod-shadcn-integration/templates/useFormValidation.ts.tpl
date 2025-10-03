import { useForm, UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCallback, useMemo } from 'react';

/**
 * Enhanced form validation hook
 * Provides additional validation utilities for React Hook Form + Zod
 */

interface UseFormValidationOptions<T extends FieldValues> {
  schema: z.ZodSchema<T>;
  defaultValues?: T;
  mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
  reValidateMode?: 'onChange' | 'onBlur' | 'onSubmit';
  onError?: (errors: any) => void;
  onSuccess?: (data: T) => void;
}

export function useFormValidation<T extends FieldValues>({
  schema,
  defaultValues,
  mode = 'onChange',
  reValidateMode = 'onChange',
  onError,
  onSuccess,
}: UseFormValidationOptions<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode,
    reValidateMode,
  });

  // Enhanced validation
  const validateField = useCallback(
    async (fieldName: Path<T>) => {
      const isValid = await form.trigger(fieldName);
      return isValid;
    },
    [form]
  );

  const validateAllFields = useCallback(async () => {
    const isValid = await form.trigger();
    return isValid;
  }, [form]);

  // Enhanced submission
  const handleSubmit = useCallback(
    (onSubmit: (data: T) => void | Promise<void>) => {
      return form.handleSubmit(
        async (data) => {
          try {
            await onSubmit(data);
            onSuccess?.(data);
          } catch (error) {
            onError?.(error);
          }
        },
        (errors) => {
          onError?.(errors);
        }
      );
    },
    [form, onError, onSuccess]
  );

  // Field utilities
  const getFieldError = useCallback(
    (fieldName: Path<T>) => {
      const error = form.formState.errors[fieldName];
      return error?.message;
    },
    [form.formState.errors]
  );

  const hasFieldError = useCallback(
    (fieldName: Path<T>) => {
      return !!form.formState.errors[fieldName];
    },
    [form.formState.errors]
  );

  const isFieldDirty = useCallback(
    (fieldName: Path<T>) => {
      return form.formState.dirtyFields[fieldName] || false;
    },
    [form.formState.dirtyFields]
  );

  const isFieldTouched = useCallback(
    (fieldName: Path<T>) => {
      return form.formState.touchedFields[fieldName] || false;
    },
    [form.formState.touchedFields]
  );

  // Form state summary
  const formStateSummary = useMemo(() => {
    const errorCount = Object.keys(form.formState.errors).length;
    const dirtyFieldCount = Object.keys(form.formState.dirtyFields).length;
    const touchedFieldCount = Object.keys(form.formState.touchedFields).length;

    return {
      isValid: form.formState.isValid,
      isDirty: form.formState.isDirty,
      isSubmitting: form.formState.isSubmitting,
      errorCount,
      dirtyFieldCount,
      touchedFieldCount,
    };
  }, [form.formState]);

  // Reset form with validation
  const resetForm = useCallback(
    (values?: T) => {
      form.reset(values);
    },
    [form]
  );

  // Clear errors
  const clearErrors = useCallback(() => {
    form.clearErrors();
  }, [form]);

  // Set field value with validation
  const setFieldValue = useCallback(
    (fieldName: Path<T>, value: any, options?: { shouldValidate?: boolean; shouldDirty?: boolean }) => {
      form.setValue(fieldName, value, options);
    },
    [form]
  );

  // Set form error
  const setFormError = useCallback(
    (fieldName: Path<T>, message: string) => {
      form.setError(fieldName, { message });
    },
    [form]
  );

  // Set root error
  const setRootError = useCallback(
    (message: string) => {
      form.setError('root', { message });
    },
    [form]
  );

  return {
    ...form,
    // Enhanced methods
    validateField,
    validateAllFields,
    handleSubmit,
    getFieldError,
    hasFieldError,
    isFieldDirty,
    isFieldTouched,
    formStateSummary,
    resetForm,
    clearErrors,
    setFieldValue,
    setFormError,
    setRootError,
  };
}
