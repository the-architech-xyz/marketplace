/**
 * Form Hooks
 * 
 * Custom hooks for form handling with React Hook Form
 */

import { useCallback, useEffect, useState } from 'react';
import { useForm, UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Form hook with auto-save
export function useAutoSaveForm<T extends FieldValues>(
  schema: z.ZodSchema<T>,
  onSave: (data: T) => Promise<void>,
  options: {
    defaultValues?: Partial<T>;
    saveDelay?: number;
    enabled?: boolean;
  } = {}
): UseFormReturn<T> & { isSaving: boolean; lastSaved: Date | null } {
  const { defaultValues, saveDelay = 2000, enabled = true } = options;
  
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  
  const saveData = useCallback(async (data: T) => {
    if (!enabled) return;
    
    setIsSaving(true);
    try {
      await onSave(data);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsSaving(false);
    }
  }, [onSave, enabled]);
  
  useEffect(() => {
    if (!enabled) return;
    
    const subscription = form.watch((data) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      const newTimeoutId = setTimeout(() => {
        saveData(data as T);
      }, saveDelay);
      
      setTimeoutId(newTimeoutId);
    });
    
    return () => {
      subscription.unsubscribe();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [form, saveData, saveDelay, enabled, timeoutId]);
  
  return {
    ...form,
    isSaving,
    lastSaved,
  };
}

// Form hook with step validation
export function useStepForm<T extends FieldValues>(
  steps: Array<{
    name: string;
    schema: z.ZodSchema<any>;
    fields: string[];
  }>,
  options: {
    defaultValues?: Partial<T>;
    onStepChange?: (step: number) => void;
  } = {}
): {
  form: UseFormReturn<T>;
  currentStep: number;
  totalSteps: number;
  nextStep: () => Promise<boolean>;
  prevStep: () => void;
  goToStep: (step: number) => Promise<boolean>;
  isFirstStep: boolean;
  isLastStep: boolean;
  canGoNext: boolean;
  canGoPrev: boolean;
  stepErrors: Record<string, string>;
} {
  const { defaultValues, onStepChange } = options;
  
  const form = useForm<T>({
    defaultValues,
    mode: 'onChange',
  });
  
  const [currentStep, setCurrentStep] = useState(0);
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  
  const totalSteps = steps.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  
  const validateStep = useCallback(async (step: number) => {
    const stepSchema = steps[step].schema;
    const stepFields = steps[step].fields;
    
    try {
      const data = form.getValues();
      const stepData = stepFields.reduce((acc, field) => {
        acc[field] = data[field];
        return acc;
      }, {} as any);
      
      await stepSchema.parseAsync(stepData);
      setStepErrors(prev => ({ ...prev, [step]: '' }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.reduce((acc, err) => {
          acc[err.path.join('.')] = err.message;
          return acc;
        }, {} as Record<string, string>);
        
        setStepErrors(prev => ({ ...prev, [step]: Object.values(errors)[0] || 'Invalid data' }));
      }
      return false;
    }
  }, [form, steps]);
  
  const nextStep = useCallback(async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && !isLastStep) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      onStepChange?.(newStep);
    }
    return isValid;
  }, [currentStep, isLastStep, validateStep, onStepChange]);
  
  const prevStep = useCallback(() => {
    if (!isFirstStep) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      onStepChange?.(newStep);
    }
  }, [currentStep, isFirstStep, onStepChange]);
  
  const goToStep = useCallback(async (step: number) => {
    if (step < 0 || step >= totalSteps) return false;
    
    // Validate all previous steps
    for (let i = 0; i < step; i++) {
      const isValid = await validateStep(i);
      if (!isValid) return false;
    }
    
    setCurrentStep(step);
    onStepChange?.(step);
    return true;
  }, [totalSteps, validateStep, onStepChange]);
  
  const canGoNext = !isLastStep;
  const canGoPrev = !isFirstStep;
  
  return {
    form,
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep,
    isLastStep,
    canGoNext,
    canGoPrev,
    stepErrors,
  };
}

// Form hook with field arrays
export function useFieldArrayForm<T extends FieldValues>(
  schema: z.ZodSchema<T>,
  options: {
    defaultValues?: Partial<T>;
    arrayFields: Array<{
      name: Path<T>;
      minItems?: number;
      maxItems?: number;
    }>;
  }
): UseFormReturn<T> & {
  addItem: (fieldName: Path<T>, item: any) => void;
  removeItem: (fieldName: Path<T>, index: number) => void;
  moveItem: (fieldName: Path<T>, from: number, to: number) => void;
  getArrayField: (fieldName: Path<T>) => any[];
  canAddItem: (fieldName: Path<T>) => boolean;
  canRemoveItem: (fieldName: Path<T>) => boolean;
} {
  const { defaultValues, arrayFields } = options;
  
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  });
  
  const addItem = useCallback((fieldName: Path<T>, item: any) => {
    const currentValue = form.getValues(fieldName) || [];
    form.setValue(fieldName, [...currentValue, item] as any);
  }, [form]);
  
  const removeItem = useCallback((fieldName: Path<T>, index: number) => {
    const currentValue = form.getValues(fieldName) || [];
    const newValue = currentValue.filter((_: any, i: number) => i !== index);
    form.setValue(fieldName, newValue as any);
  }, [form]);
  
  const moveItem = useCallback((fieldName: Path<T>, from: number, to: number) => {
    const currentValue = form.getValues(fieldName) || [];
    const newValue = [...currentValue];
    const [movedItem] = newValue.splice(from, 1);
    newValue.splice(to, 0, movedItem);
    form.setValue(fieldName, newValue as any);
  }, [form]);
  
  const getArrayField = useCallback((fieldName: Path<T>) => {
    return form.getValues(fieldName) || [];
  }, [form]);
  
  const canAddItem = useCallback((fieldName: Path<T>) => {
    const fieldConfig = arrayFields.find(f => f.name === fieldName);
    if (!fieldConfig) return true;
    
    const currentValue = form.getValues(fieldName) || [];
    return fieldConfig.maxItems ? currentValue.length < fieldConfig.maxItems : true;
  }, [form, arrayFields]);
  
  const canRemoveItem = useCallback((fieldName: Path<T>) => {
    const fieldConfig = arrayFields.find(f => f.name === fieldName);
    if (!fieldConfig) return true;
    
    const currentValue = form.getValues(fieldName) || [];
    return fieldConfig.minItems ? currentValue.length > fieldConfig.minItems : true;
  }, [form, arrayFields]);
  
  return {
    ...form,
    addItem,
    removeItem,
    moveItem,
    getArrayField,
    canAddItem,
    canRemoveItem,
  };
}

// Form hook with conditional fields
export function useConditionalForm<T extends FieldValues>(
  schema: z.ZodSchema<T>,
  conditions: Array<{
    field: Path<T>;
    condition: (data: T) => boolean;
    requiredFields: Path<T>[];
  }>,
  options: {
    defaultValues?: Partial<T>;
  } = {}
): UseFormReturn<T> & {
  getConditionalFields: () => Path<T>[];
  isFieldRequired: (field: Path<T>) => boolean;
  getFieldVisibility: (field: Path<T>) => boolean;
} {
  const { defaultValues } = options;
  
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  });
  
  const getConditionalFields = useCallback(() => {
    const data = form.getValues();
    const visibleFields = new Set<Path<T>>();
    
    conditions.forEach(({ field, condition, requiredFields }) => {
      if (condition(data)) {
        requiredFields.forEach(f => visibleFields.add(f));
      }
    });
    
    return Array.from(visibleFields);
  }, [form, conditions]);
  
  const isFieldRequired = useCallback((field: Path<T>) => {
    const conditionalFields = getConditionalFields();
    return conditionalFields.includes(field);
  }, [getConditionalFields]);
  
  const getFieldVisibility = useCallback((field: Path<T>) => {
    const conditionalFields = getConditionalFields();
    return conditionalFields.includes(field);
  }, [getConditionalFields]);
  
  return {
    ...form,
    getConditionalFields,
    isFieldRequired,
    getFieldVisibility,
  };
}

// Form hook with validation on blur
export function useBlurValidationForm<T extends FieldValues>(
  schema: z.ZodSchema<T>,
  options: {
    defaultValues?: Partial<T>;
    validateOnBlur?: boolean;
  } = {}
): UseFormReturn<T> & {
  validateField: (field: Path<T>) => Promise<boolean>;
  validateAllFields: () => Promise<boolean>;
} {
  const { defaultValues, validateOnBlur = true } = options;
  
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: validateOnBlur ? 'onBlur' : 'onChange',
  });
  
  const validateField = useCallback(async (field: Path<T>) => {
    try {
      await form.trigger(field);
      return true;
    } catch (error) {
      return false;
    }
  }, [form]);
  
  const validateAllFields = useCallback(async () => {
    try {
      await form.trigger();
      return true;
    } catch (error) {
      return false;
    }
  }, [form]);
  
  return {
    ...form,
    validateField,
    validateAllFields,
  };
}
