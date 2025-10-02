/**
 * Form Provider
 * 
 * Context provider for form state and utilities
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';

// Form context interface
interface FormContextValue<T extends FieldValues = FieldValues> {
  form: UseFormReturn<T>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
  errors: Record<string, string>;
  values: T;
}

// Create form context
const FormContext = createContext<FormContextValue | null>(null);

// Form provider props
interface FormProviderProps<T extends FieldValues = FieldValues> {
  form: UseFormReturn<T>;
  children: ReactNode;
  isSubmitting?: boolean;
}

// Form provider component
export function FormProvider<T extends FieldValues = FieldValues>({
  form,
  children,
  isSubmitting = false,
}: FormProviderProps<T>) {
  const value: FormContextValue<T> = {
    form,
    isSubmitting,
    isValid: form.formState.isValid,
    isDirty: form.formState.isDirty,
    errors: form.formState.errors as Record<string, string>,
    values: form.getValues(),
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
}

// Hook to use form context
export function useFormContext<T extends FieldValues = FieldValues>(): FormContextValue<T> {
  const context = useContext(FormContext);
  
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  
  return context as FormContextValue<T>;
}

// Hook to use form state
export function useFormState<T extends FieldValues = FieldValues>() {
  const { form, isSubmitting, isValid, isDirty, errors, values } = useFormContext<T>();
  
  return {
    form,
    isSubmitting,
    isValid,
    isDirty,
    errors,
    values,
  };
}

// Hook to use form actions
export function useFormActions<T extends FieldValues = FieldValues>() {
  const { form } = useFormContext<T>();
  
  return {
    handleSubmit: form.handleSubmit,
    reset: form.reset,
    setValue: form.setValue,
    getValues: form.getValues,
    trigger: form.trigger,
    clearErrors: form.clearErrors,
    setError: form.setError,
  };
}

// Hook to use form field
export function useFormField<T extends FieldValues = FieldValues>(fieldName: keyof T) {
  const { form } = useFormContext<T>();
  
  const field = form.register(fieldName as any);
  const error = form.formState.errors[fieldName];
  const isDirty = form.formState.dirtyFields[fieldName];
  const isTouched = form.formState.touchedFields[fieldName];
  
  return {
    field,
    error: error?.message,
    isDirty: !!isDirty,
    isTouched: !!isTouched,
    value: form.getValues(fieldName),
  };
}

// Hook to use form validation
export function useFormValidation<T extends FieldValues = FieldValues>() {
  const { form } = useFormContext<T>();
  
  const validateField = async (fieldName: keyof T) => {
    return form.trigger(fieldName as any);
  };
  
  const validateAllFields = async () => {
    return form.trigger();
  };
  
  const getFieldError = (fieldName: keyof T) => {
    return form.formState.errors[fieldName]?.message;
  };
  
  const hasErrors = Object.keys(form.formState.errors).length > 0;
  
  return {
    validateField,
    validateAllFields,
    getFieldError,
    hasErrors,
    errors: form.formState.errors,
  };
}

// Hook to use form submission
export function useFormSubmission<T extends FieldValues = FieldValues>(
  onSubmit: (data: T) => Promise<void>
) {
  const { form, isSubmitting } = useFormContext<T>();
  
  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    }
  });
  
  return {
    handleSubmit,
    isSubmitting,
  };
}

// Hook to use form reset
export function useFormReset<T extends FieldValues = FieldValues>() {
  const { form } = useFormContext<T>();
  
  const reset = (values?: Partial<T>) => {
    form.reset(values);
  };
  
  const resetToDefault = () => {
    form.reset();
  };
  
  return {
    reset,
    resetToDefault,
  };
}

// Hook to use form watch
export function useFormWatch<T extends FieldValues = FieldValues>(fieldName?: keyof T) {
  const { form } = useFormContext<T>();
  
  const watch = fieldName ? form.watch(fieldName as any) : form.watch();
  
  return watch;
}

// Hook to use form set value
export function useFormSetValue<T extends FieldValues = FieldValues>() {
  const { form } = useFormContext<T>();
  
  const setValue = (fieldName: keyof T, value: any, options?: any) => {
    form.setValue(fieldName as any, value, options);
  };
  
  return {
    setValue,
  };
}

// Hook to use form get values
export function useFormGetValues<T extends FieldValues = FieldValues>() {
  const { form } = useFormContext<T>();
  
  const getValues = (fieldName?: keyof T) => {
    return fieldName ? form.getValues(fieldName as any) : form.getValues();
  };
  
  return {
    getValues,
  };
}

// Hook to use form clear errors
export function useFormClearErrors<T extends FieldValues = FieldValues>() {
  const { form } = useFormContext<T>();
  
  const clearErrors = (fieldName?: keyof T) => {
    if (fieldName) {
      form.clearErrors(fieldName as any);
    } else {
      form.clearErrors();
    }
  };
  
  return {
    clearErrors,
  };
}

// Hook to use form set error
export function useFormSetError<T extends FieldValues = FieldValues>() {
  const { form } = useFormContext<T>();
  
  const setError = (fieldName: keyof T, error: { type: string; message: string }) => {
    form.setError(fieldName as any, error);
  };
  
  return {
    setError,
  };
}

export default FormProvider;
