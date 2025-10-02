/**
 * Forms Index
 * 
 * Centralized exports for all form utilities and components
 */

// Core utilities
export { useZodForm, useFormWithOptions, useAsyncForm } from './core';
export { FormFieldError, FormFieldWrapper, Form } from './core';
export { formValidation, FormError, FormSuccess, FormState, formUtils } from './core';

// Validation utilities
export { commonSchemas, formSchemas, validationUtils, errorMessages } from './validation';

// Form hooks
export { useAutoSaveForm, useStepForm, useFieldArrayForm, useConditionalForm, useBlurValidationForm } from './hooks';

// Accessibility utilities
export { useFormAccessibility, useFormValidationAccessibility, useFormSubmissionAccessibility, useFormNavigationAccessibility } from './accessibility';

// Form provider and context
export { FormProvider } from './FormProvider';
export { useFormContext, useFormState, useFormActions, useFormField } from './FormProvider';
export { useFormValidation, useFormSubmission, useFormReset, useFormWatch } from './FormProvider';
export { useFormSetValue, useFormGetValues, useFormClearErrors, useFormSetError } from './FormProvider';

// Form components
export { FormField, FormFieldInput, FormFieldTextarea, FormFieldSelect } from './FormField';
export { FormFieldCheckbox, FormFieldRadio } from './FormField';

// Form types
export type { FormData, FormSchema, FormReturn, FormFieldName, FormFieldValue } from './types';
export type { FormValidationError, FormValidationResult, FormState, FormSubmissionResult } from './types';
export type { FormFieldProps, FormInputProps, FormTextareaProps, FormSelectProps } from './types';
export type { FormCheckboxProps, FormRadioProps, FormFileProps, FormDateProps } from './types';
export type { FormTimeProps, FormDateTimeProps, FormRangeProps, FormColorProps } from './types';
export type { FormSwitchProps, FormRatingProps, FormAutocompleteProps, FormTagInputProps } from './types';
export type { FormRichTextProps, FormSignatureProps, FormValidationRule } from './types';
export type { FormError, FormSuccess, FormContextValue, FormProviderProps } from './types';
export type { UseFormOptions, UseFormSubmissionOptions, UseFormValidationOptions } from './types';
export type { FormFieldArrayProps, FormStepProps, FormWizardProps, FormLayoutProps } from './types';
export type { FormSectionProps, FormGroupProps } from './types';

// Re-export React Hook Form types
export type { UseFormReturn, FieldValues, FieldError, FieldErrors } from 'react-hook-form';

// Re-export Zod types
export type { ZodSchema, ZodError, ZodType } from 'zod';

// Default exports
export { useZodForm as default } from './core';
