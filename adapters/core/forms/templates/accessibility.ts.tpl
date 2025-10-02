/**
 * Form Accessibility Utilities
 * 
 * Accessibility helpers for form components
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { FieldValues, Path } from 'react-hook-form';

// Accessibility hook for form fields
export function useFormAccessibility<T extends FieldValues>(
  form: any,
  options: {
    announceErrors?: boolean;
    announceSuccess?: boolean;
    focusOnError?: boolean;
  } = {}
) {
  const { announceErrors = true, announceSuccess = false, focusOnError = true } = options;
  
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  
  // Announce errors
  const announceError = useCallback((message: string) => {
    if (announceErrors) {
      setAnnouncements(prev => [...prev, message]);
    }
  }, [announceErrors]);
  
  // Announce success
  const announceSuccess = useCallback((message: string) => {
    if (announceSuccess) {
      setAnnouncements(prev => [...prev, message]);
    }
  }, [announceSuccess]);
  
  // Focus on error field
  const focusOnErrorField = useCallback((fieldName: Path<T>) => {
    if (focusOnError) {
      const field = document.querySelector(`[name="${fieldName}"]`) as HTMLElement;
      if (field) {
        field.focus();
      }
    }
  }, [focusOnError]);
  
  // Get field error message
  const getFieldError = useCallback((fieldName: Path<T>) => {
    const error = form.formState.errors[fieldName];
    return error?.message;
  }, [form]);
  
  // Get field accessibility props
  const getFieldProps = useCallback((fieldName: Path<T>, label: string) => {
    const error = getFieldError(fieldName);
    const isInvalid = !!error;
    const isRequired = form.formState.dirtyFields[fieldName];
    
    return {
      'aria-label': label,
      'aria-required': isRequired,
      'aria-invalid': isInvalid,
      'aria-describedby': error ? `${fieldName}-error` : undefined,
    };
  }, [form, getFieldError]);
  
  // Get error message props
  const getErrorProps = useCallback((fieldName: Path<T>) => {
    const error = getFieldError(fieldName);
    
    return {
      id: `${fieldName}-error`,
      role: 'alert',
      'aria-live': 'polite',
      ref: errorRef,
    };
  }, [getFieldError]);
  
  // Get success message props
  const getSuccessProps = useCallback((fieldName: Path<T>) => {
    return {
      id: `${fieldName}-success`,
      role: 'status',
      'aria-live': 'polite',
      ref: successRef,
    };
  }, []);
  
  // Clear announcements
  const clearAnnouncements = useCallback(() => {
    setAnnouncements([]);
  }, []);
  
  return {
    announcements,
    announceError,
    announceSuccess,
    focusOnErrorField,
    getFieldError,
    getFieldProps,
    getErrorProps,
    getSuccessProps,
    clearAnnouncements,
  };
}

// Accessibility hook for form validation
export function useFormValidationAccessibility<T extends FieldValues>(
  form: any,
  options: {
    announceValidation?: boolean;
    focusOnFirstError?: boolean;
  } = {}
) {
  const { announceValidation = true, focusOnFirstError = true } = options;
  
  const [validationState, setValidationState] = useState<{
    isValidating: boolean;
    isValid: boolean;
    errors: Record<string, string>;
  }>({
    isValidating: false,
    isValid: true,
    errors: {},
  });
  
  // Validate form with accessibility
  const validateForm = useCallback(async () => {
    setValidationState(prev => ({ ...prev, isValidating: true }));
    
    try {
      const isValid = await form.trigger();
      const errors = form.formState.errors;
      
      setValidationState({
        isValidating: false,
        isValid,
        errors: errors as Record<string, string>,
      });
      
      if (!isValid && focusOnFirstError) {
        const firstErrorField = Object.keys(errors)[0];
        if (firstErrorField) {
          const field = document.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
          if (field) {
            field.focus();
          }
        }
      }
      
      return isValid;
    } catch (error) {
      setValidationState(prev => ({
        ...prev,
        isValidating: false,
        isValid: false,
      }));
      return false;
    }
  }, [form, focusOnFirstError]);
  
  // Get validation status
  const getValidationStatus = useCallback(() => {
    return validationState;
  }, [validationState]);
  
  // Get field validation status
  const getFieldValidationStatus = useCallback((fieldName: Path<T>) => {
    const error = validationState.errors[fieldName];
    return {
      isValid: !error,
      error: error,
      isInvalid: !!error,
    };
  }, [validationState]);
  
  return {
    validateForm,
    getValidationStatus,
    getFieldValidationStatus,
    validationState,
  };
}

// Accessibility hook for form submission
export function useFormSubmissionAccessibility<T extends FieldValues>(
  form: any,
  onSubmit: (data: T) => Promise<void>,
  options: {
    announceSubmission?: boolean;
    announceSuccess?: boolean;
    announceError?: boolean;
  } = {}
) {
  const { announceSubmission = true, announceSuccess = true, announceError = true } = options;
  
  const [submissionState, setSubmissionState] = useState<{
    isSubmitting: boolean;
    isSuccess: boolean;
    error: string | null;
  }>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  });
  
  const [announcements, setAnnouncements] = useState<string[]>([]);
  
  // Submit form with accessibility
  const submitForm = useCallback(async () => {
    setSubmissionState(prev => ({ ...prev, isSubmitting: true, error: null }));
    
    if (announceSubmission) {
      setAnnouncements(prev => [...prev, 'Submitting form...']);
    }
    
    try {
      const data = form.getValues();
      await onSubmit(data);
      
      setSubmissionState({
        isSubmitting: false,
        isSuccess: true,
        error: null,
      });
      
      if (announceSuccess) {
        setAnnouncements(prev => [...prev, 'Form submitted successfully']);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Submission failed';
      
      setSubmissionState({
        isSubmitting: false,
        isSuccess: false,
        error: errorMessage,
      });
      
      if (announceError) {
        setAnnouncements(prev => [...prev, errorMessage]);
      }
    }
  }, [form, onSubmit, announceSubmission, announceSuccess, announceError]);
  
  // Get submission status
  const getSubmissionStatus = useCallback(() => {
    return submissionState;
  }, [submissionState]);
  
  // Get submission button props
  const getSubmissionButtonProps = useCallback(() => {
    return {
      disabled: submissionState.isSubmitting,
      'aria-describedby': submissionState.error ? 'submission-error' : undefined,
      'aria-invalid': !!submissionState.error,
    };
  }, [submissionState]);
  
  // Get error message props
  const getErrorProps = useCallback(() => {
    return {
      id: 'submission-error',
      role: 'alert',
      'aria-live': 'polite',
    };
  }, []);
  
  // Clear announcements
  const clearAnnouncements = useCallback(() => {
    setAnnouncements([]);
  }, []);
  
  return {
    submitForm,
    getSubmissionStatus,
    getSubmissionButtonProps,
    getErrorProps,
    clearAnnouncements,
    announcements,
    submissionState,
  };
}

// Accessibility hook for form navigation
export function useFormNavigationAccessibility<T extends FieldValues>(
  form: any,
  options: {
    announceNavigation?: boolean;
    focusOnNavigation?: boolean;
  } = {}
) {
  const { announceNavigation = true, focusOnNavigation = true } = options;
  
  const [currentField, setCurrentField] = useState<Path<T> | null>(null);
  const [navigationHistory, setNavigationHistory] = useState<Path<T>[]>([]);
  
  // Navigate to field
  const navigateToField = useCallback((fieldName: Path<T>) => {
    setCurrentField(fieldName);
    setNavigationHistory(prev => [...prev, fieldName]);
    
    if (focusOnNavigation) {
      const field = document.querySelector(`[name="${fieldName}"]`) as HTMLElement;
      if (field) {
        field.focus();
      }
    }
    
    if (announceNavigation) {
      const field = document.querySelector(`[name="${fieldName}"]`);
      const label = field?.getAttribute('aria-label') || fieldName;
      // Announce navigation (you might want to use a screen reader API here)
      console.log(`Navigated to ${label}`);
    }
  }, [announceNavigation, focusOnNavigation]);
  
  // Navigate to next field
  const navigateToNext = useCallback(() => {
    const fields = form.getValues();
    const fieldNames = Object.keys(fields) as Path<T>[];
    const currentIndex = fieldNames.indexOf(currentField!);
    
    if (currentIndex < fieldNames.length - 1) {
      navigateToField(fieldNames[currentIndex + 1]);
    }
  }, [currentField, form, navigateToField]);
  
  // Navigate to previous field
  const navigateToPrevious = useCallback(() => {
    const fields = form.getValues();
    const fieldNames = Object.keys(fields) as Path<T>[];
    const currentIndex = fieldNames.indexOf(currentField!);
    
    if (currentIndex > 0) {
      navigateToField(fieldNames[currentIndex - 1]);
    }
  }, [currentField, form, navigateToField]);
  
  // Get navigation status
  const getNavigationStatus = useCallback(() => {
    const fields = form.getValues();
    const fieldNames = Object.keys(fields) as Path<T>[];
    const currentIndex = fieldNames.indexOf(currentField!);
    
    return {
      currentField,
      currentIndex,
      totalFields: fieldNames.length,
      canGoNext: currentIndex < fieldNames.length - 1,
      canGoPrevious: currentIndex > 0,
      navigationHistory,
    };
  }, [currentField, form, navigationHistory]);
  
  return {
    navigateToField,
    navigateToNext,
    navigateToPrevious,
    getNavigationStatus,
    currentField,
    navigationHistory,
  };
}
