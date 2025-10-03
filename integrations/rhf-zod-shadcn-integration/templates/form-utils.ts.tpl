import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

/**
 * Form utilities for React Hook Form + Zod + Shadcn
 * Provides common utilities for form handling
 */

// Form validation utilities
export class FormUtils {
  // Validate form data with Zod schema
  static validateFormData<T extends FieldValues>(
    data: T,
    schema: z.ZodSchema<T>
  ): { success: boolean; data?: T; errors?: z.ZodError } {
    try {
      const validatedData = schema.parse(data);
      return { success: true, data: validatedData };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, errors: error };
      }
      throw error;
    }
  }

  // Get field error message
  static getFieldError<T extends FieldValues>(
    form: UseFormReturn<T>,
    fieldName: Path<T>
  ): string | undefined {
    const error = form.formState.errors[fieldName];
    return error?.message;
  }

  // Check if field has error
  static hasFieldError<T extends FieldValues>(
    form: UseFormReturn<T>,
    fieldName: Path<T>
  ): boolean {
    return !!form.formState.errors[fieldName];
  }

  // Set field value
  static setFieldValue<T extends FieldValues>(
    form: UseFormReturn<T>,
    fieldName: Path<T>,
    value: PathValue<T, Path<T>>
  ): void {
    form.setValue(fieldName, value);
  }

  // Reset form to default values
  static resetForm<T extends FieldValues>(
    form: UseFormReturn<T>,
    defaultValues?: T
  ): void {
    form.reset(defaultValues);
  }

  // Clear form errors
  static clearErrors<T extends FieldValues>(
    form: UseFormReturn<T>
  ): void {
    form.clearErrors();
  }

  // Trigger field validation
  static triggerField<T extends FieldValues>(
    form: UseFormReturn<T>,
    fieldName: Path<T>
  ): Promise<boolean> {
    return form.trigger(fieldName);
  }

  // Trigger all field validation
  static triggerAllFields<T extends FieldValues>(
    form: UseFormReturn<T>
  ): Promise<boolean> {
    return form.trigger();
  }

  // Check if form is valid
  static isFormValid<T extends FieldValues>(
    form: UseFormReturn<T>
  ): boolean {
    return form.formState.isValid;
  }

  // Check if form is dirty
  static isFormDirty<T extends FieldValues>(
    form: UseFormReturn<T>
  ): boolean {
    return form.formState.isDirty;
  }

  // Check if form is submitting
  static isFormSubmitting<T extends FieldValues>(
    form: UseFormReturn<T>
  ): boolean {
    return form.formState.isSubmitting;
  }

  // Get form values
  static getFormValues<T extends FieldValues>(
    form: UseFormReturn<T>
  ): T {
    return form.getValues();
  }

  // Get form default values
  static getFormDefaultValues<T extends FieldValues>(
    form: UseFormReturn<T>
  ): T {
    return form.formState.defaultValues as T;
  }

  // Watch field value
  static watchField<T extends FieldValues>(
    form: UseFormReturn<T>,
    fieldName: Path<T>
  ): PathValue<T, Path<T>> {
    return form.watch(fieldName);
  }

  // Watch all form values
  static watchAllFields<T extends FieldValues>(
    form: UseFormReturn<T>
  ): T {
    return form.watch();
  }

  // Set form errors
  static setFormErrors<T extends FieldValues>(
    form: UseFormReturn<T>,
    errors: Partial<Record<Path<T>, string>>
  ): void {
    Object.entries(errors).forEach(([field, message]) => {
      form.setError(field as Path<T>, { message });
    });
  }

  // Set form error
  static setFormError<T extends FieldValues>(
    form: UseFormReturn<T>,
    fieldName: Path<T>,
    message: string
  ): void {
    form.setError(fieldName, { message });
  }

  // Set root form error
  static setRootError<T extends FieldValues>(
    form: UseFormReturn<T>,
    message: string
  ): void {
    form.setError('root', { message });
  }

  // Get root form error
  static getRootError<T extends FieldValues>(
    form: UseFormReturn<T>
  ): string | undefined {
    return form.formState.errors.root?.message;
  }

  // Check if field is dirty
  static isFieldDirty<T extends FieldValues>(
    form: UseFormReturn<T>,
    fieldName: Path<T>
  ): boolean {
    return form.formState.dirtyFields[fieldName] || false;
  }

  // Check if field is touched
  static isFieldTouched<T extends FieldValues>(
    form: UseFormReturn<T>,
    fieldName: Path<T>
  ): boolean {
    return form.formState.touchedFields[fieldName] || false;
  }

  // Get form state summary
  static getFormStateSummary<T extends FieldValues>(
    form: UseFormReturn<T>
  ): {
    isValid: boolean;
    isDirty: boolean;
    isSubmitting: boolean;
    errorCount: number;
    dirtyFieldCount: number;
    touchedFieldCount: number;
  } {
    const { formState } = form;
    const errorCount = Object.keys(formState.errors).length;
    const dirtyFieldCount = Object.keys(formState.dirtyFields).length;
    const touchedFieldCount = Object.keys(formState.touchedFields).length;

    return {
      isValid: formState.isValid,
      isDirty: formState.isDirty,
      isSubmitting: formState.isSubmitting,
      errorCount,
      dirtyFieldCount,
      touchedFieldCount,
    };
  }
}
