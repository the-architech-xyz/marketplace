import { FieldValues, Path, PathValue } from 'react-hook-form';
import { z } from 'zod';

/**
 * Form types for React Hook Form + Zod + Shadcn integration
 */

// Base form field types
export type FormFieldType = 'input' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'switch';

export interface BaseFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface InputFormFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: 'input';
  inputType?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
}

export interface TextareaFormFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: 'textarea';
  placeholder?: string;
  rows?: number;
}

export interface SelectFormFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: 'select';
  placeholder?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
}

export interface CheckboxFormFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: 'checkbox';
}

export interface RadioFormFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: 'radio';
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  orientation?: 'horizontal' | 'vertical';
}

export interface SwitchFormFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: 'switch';
}

export type FormFieldProps<T extends FieldValues> =
  | InputFormFieldProps<T>
  | TextareaFormFieldProps<T>
  | SelectFormFieldProps<T>
  | CheckboxFormFieldProps<T>
  | RadioFormFieldProps<T>
  | SwitchFormFieldProps<T>;

// Form validation types
export interface FormValidationOptions {
  mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
  reValidateMode?: 'onChange' | 'onBlur' | 'onSubmit';
  delayError?: number;
}

export interface FormValidationResult<T extends FieldValues> {
  isValid: boolean;
  data?: T;
  errors?: z.ZodError<T>;
}

// Form state types
export interface FormStateSummary {
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
  errorCount: number;
  dirtyFieldCount: number;
  touchedFieldCount: number;
}

// Form builder types
export interface FormBuilderConfig<T extends FieldValues> {
  schema: z.ZodSchema<T>;
  fields: FormFieldProps<T>[];
  defaultValues?: T;
  validation?: FormValidationOptions;
}

// Form submission types
export interface FormSubmissionOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  validateOnSubmit?: boolean;
}

// Form field error types
export interface FormFieldError {
  message: string;
  type: string;
}

export interface FormFieldState {
  isDirty: boolean;
  isTouched: boolean;
  error?: FormFieldError;
}

// Form validation schema types
export type FormSchema<T extends FieldValues> = z.ZodSchema<T>;

export type FormFieldSchema<T extends FieldValues> = z.ZodTypeAny;

// Form hook types
export interface UseFormValidationOptions<T extends FieldValues> {
  schema: z.ZodSchema<T>;
  defaultValues?: T;
  mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
  reValidateMode?: 'onChange' | 'onBlur' | 'onSubmit';
  onError?: (errors: any) => void;
  onSuccess?: (data: T) => void;
}

// Form component props types
export interface FormComponentProps<T extends FieldValues> {
  control: any;
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

// Form field component props types
export interface FormFieldComponentProps<T extends FieldValues> extends FormComponentProps<T> {
  children: (field: {
    field: any;
    fieldState: FormFieldState;
    formState: any;
  }) => React.ReactNode;
}

// Form validation error types
export interface FormValidationError {
  field: string;
  message: string;
  code: string;
}

export interface FormValidationErrors {
  [key: string]: FormValidationError;
}

// Form submission types
export interface FormSubmissionResult<T extends FieldValues> {
  success: boolean;
  data?: T;
  errors?: FormValidationErrors;
}

// Form field configuration types
export interface FormFieldConfiguration {
  type: FormFieldType;
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean | string;
  };
}

// Form builder configuration types
export interface FormBuilderConfiguration<T extends FieldValues> {
  title?: string;
  description?: string;
  fields: FormFieldConfiguration[];
  schema: z.ZodSchema<T>;
  defaultValues?: T;
  submitLabel?: string;
  resetLabel?: string;
  showReset?: boolean;
  className?: string;
}
