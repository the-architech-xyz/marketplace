/**
 * Form Types
 * 
 * TypeScript definitions for form components and utilities
 */

import { FieldValues, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

// Base form types
export type FormData = FieldValues;
export type FormSchema<T extends FormData> = z.ZodSchema<T>;
export type FormReturn<T extends FormData> = UseFormReturn<T>;

// Form field types
export type FormFieldName<T extends FormData> = keyof T;
export type FormFieldValue<T extends FormData, K extends FormFieldName<T>> = T[K];

// Form validation types
export interface FormValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: FormValidationError[];
}

// Form state types
export interface FormState<T extends FormData = FormData> {
  isLoading: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
  isTouched: boolean;
  errors: Record<string, string>;
  values: T;
  defaultValues: Partial<T>;
}

// Form submission types
export interface FormSubmissionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string>;
}

export interface FormSubmissionOptions {
  validateOnSubmit?: boolean;
  resetOnSuccess?: boolean;
  showSuccessMessage?: boolean;
  showErrorMessage?: boolean;
}

// Form field types
export interface FormFieldProps<T extends FormData = FormData> {
  name: FormFieldName<T>;
  label?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  errorClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
}

// Form input types
export interface FormInputProps<T extends FormData = FormData> extends FormFieldProps<T> {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  inputClassName?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

// Form textarea types
export interface FormTextareaProps<T extends FormData = FormData> extends FormFieldProps<T> {
  placeholder?: string;
  rows?: number;
  textareaClassName?: string;
  maxLength?: number;
  minLength?: number;
}

// Form select types
export interface FormSelectProps<T extends FormData = FormData> extends FormFieldProps<T> {
  options: FormSelectOption[];
  placeholder?: string;
  selectClassName?: string;
  multiple?: boolean;
}

export interface FormSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

// Form checkbox types
export interface FormCheckboxProps<T extends FormData = FormData> extends FormFieldProps<T> {
  checkboxClassName?: string;
  checked?: boolean;
  indeterminate?: boolean;
}

// Form radio types
export interface FormRadioProps<T extends FormData = FormData> extends FormFieldProps<T> {
  options: FormRadioOption[];
  radioClassName?: string;
  orientation?: 'horizontal' | 'vertical';
}

export interface FormRadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Form file types
export interface FormFileProps<T extends FormData = FormData> extends FormFieldProps<T> {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  fileClassName?: string;
  onFileChange?: (files: FileList | null) => void;
}

// Form date types
export interface FormDateProps<T extends FormData = FormData> extends FormFieldProps<T> {
  dateClassName?: string;
  min?: string;
  max?: string;
  step?: number;
}

// Form time types
export interface FormTimeProps<T extends FormData = FormData> extends FormFieldProps<T> {
  timeClassName?: string;
  min?: string;
  max?: string;
  step?: number;
}

// Form datetime types
export interface FormDateTimeProps<T extends FormData = FormData> extends FormFieldProps<T> {
  datetimeClassName?: string;
  min?: string;
  max?: string;
  step?: number;
}

// Form range types
export interface FormRangeProps<T extends FormData = FormData> extends FormFieldProps<T> {
  min?: number;
  max?: number;
  step?: number;
  rangeClassName?: string;
  showValue?: boolean;
  valueLabel?: string;
}

// Form color types
export interface FormColorProps<T extends FormData = FormData> extends FormFieldProps<T> {
  colorClassName?: string;
  showSwatch?: boolean;
}

// Form switch types
export interface FormSwitchProps<T extends FormData = FormData> extends FormFieldProps<T> {
  switchClassName?: string;
  checked?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// Form rating types
export interface FormRatingProps<T extends FormData = FormData> extends FormFieldProps<T> {
  max?: number;
  ratingClassName?: string;
  showValue?: boolean;
  allowHalf?: boolean;
  readonly?: boolean;
}

// Form autocomplete types
export interface FormAutocompleteProps<T extends FormData = FormData> extends FormFieldProps<T> {
  options: FormAutocompleteOption[];
  placeholder?: string;
  autocompleteClassName?: string;
  multiple?: boolean;
  searchable?: boolean;
  creatable?: boolean;
  onSearch?: (query: string) => void;
  onSelect?: (option: FormAutocompleteOption) => void;
  onCreate?: (value: string) => FormAutocompleteOption;
}

export interface FormAutocompleteOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

// Form tag input types
export interface FormTagInputProps<T extends FormData = FormData> extends FormFieldProps<T> {
  tagInputClassName?: string;
  placeholder?: string;
  maxTags?: number;
  allowDuplicates?: boolean;
  onTagAdd?: (tag: string) => void;
  onTagRemove?: (tag: string) => void;
  onTagChange?: (tags: string[]) => void;
}

// Form rich text types
export interface FormRichTextProps<T extends FormData = FormData> extends FormFieldProps<T> {
  richTextClassName?: string;
  placeholder?: string;
  toolbar?: string[];
  maxLength?: number;
  minLength?: number;
  onContentChange?: (content: string) => void;
}

// Form signature types
export interface FormSignatureProps<T extends FormData = FormData> extends FormFieldProps<T> {
  signatureClassName?: string;
  width?: number;
  height?: number;
  penColor?: string;
  backgroundColor?: string;
  onSignatureChange?: (signature: string) => void;
}

// Form validation types
export interface FormValidationRule {
  required?: boolean | string;
  min?: number | { value: number; message: string };
  max?: number | { value: number; message: string };
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  validate?: (value: any) => boolean | string;
}

// Form error types
export class FormError extends Error {
  constructor(
    message: string,
    public field?: string,
    public code?: string
  ) {
    super(message);
    this.name = 'FormError';
  }
}

// Form success types
export interface FormSuccess<T = any> {
  data: T;
  message?: string;
  timestamp?: Date;
}

// Form context types
export interface FormContextValue<T extends FormData = FormData> {
  form: UseFormReturn<T>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
  errors: Record<string, string>;
  values: T;
}

// Form provider types
export interface FormProviderProps<T extends FormData = FormData> {
  form: UseFormReturn<T>;
  children: React.ReactNode;
  isSubmitting?: boolean;
}

// Form hook types
export interface UseFormOptions<T extends FormData = FormData> {
  defaultValues?: Partial<T>;
  mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
  reValidateMode?: 'onChange' | 'onBlur' | 'onSubmit';
  delayError?: number;
  shouldFocusError?: boolean;
  shouldUnregister?: boolean;
  shouldUseNativeValidation?: boolean;
  criteriaMode?: 'firstError' | 'all';
}

// Form submission hook types
export interface UseFormSubmissionOptions<T extends FormData = FormData> {
  onSubmit: (data: T) => Promise<void>;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  validateOnSubmit?: boolean;
  resetOnSuccess?: boolean;
  showSuccessMessage?: boolean;
  showErrorMessage?: boolean;
}

// Form validation hook types
export interface UseFormValidationOptions<T extends FormData = FormData> {
  schema: z.ZodSchema<T>;
  mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
  reValidateMode?: 'onChange' | 'onBlur' | 'onSubmit';
  delayError?: number;
}

// Form field array types
export interface FormFieldArrayProps<T extends FormData = FormData> {
  name: FormFieldName<T>;
  minItems?: number;
  maxItems?: number;
  children: (index: number, field: any, remove: () => void, move: (from: number, to: number) => void) => React.ReactNode;
  addButtonText?: string;
  removeButtonText?: string;
  className?: string;
}

// Form step types
export interface FormStepProps<T extends FormData = FormData> {
  name: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  validation?: z.ZodSchema<any>;
  isOptional?: boolean;
  isCompleted?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
}

// Form wizard types
export interface FormWizardProps<T extends FormData = FormData> {
  steps: FormStepProps<T>[];
  currentStep: number;
  onStepChange: (step: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onComplete: (data: T) => void;
  className?: string;
  showProgress?: boolean;
  showNavigation?: boolean;
  allowSkip?: boolean;
}

// Form layout types
export interface FormLayoutProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg';
  columns?: 1 | 2 | 3 | 4;
  responsive?: boolean;
}

// Form section types
export interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

// Form group types
export interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg';
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}
