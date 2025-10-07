'use client';

import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff, AlertCircle, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormMessage } from '@/components/ui/form';

const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-green-500 focus-visible:ring-green-500',
        warning: 'border-yellow-500 focus-visible:ring-yellow-500',
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface FormInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  warning?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  showSuccessIcon?: boolean;
  showErrorIcon?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  onClear?: () => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      className,
      variant,
      size,
      label,
      description,
      error,
      success,
      warning,
      required,
      leftIcon,
      rightIcon,
      showPasswordToggle = false,
      showSuccessIcon = false,
      showErrorIcon = true,
      containerClassName,
      labelClassName,
      inputClassName,
      onClear,
      onFocus,
      onBlur,
      onChange,
      type = 'text',
      disabled,
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // Determine the current variant based on state
    const currentVariant = error
      ? 'error'
      : success
      ? 'success'
      : warning
      ? 'warning'
      : 'default';

    // Determine the current type for password inputs
    const currentType = showPasswordToggle && type === 'password'
      ? isPasswordVisible
        ? 'text'
        : 'password'
      : type;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    };

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    const handleClear = () => {
      onClear?.();
    };

    const hasValue = props.value !== undefined && props.value !== '';

    return (
      <div className={cn('space-y-2', containerClassName)}>
        {/* Label */}
        {label && (
          <Label
            htmlFor={props.id}
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              error && 'text-destructive',
              success && 'text-green-600',
              warning && 'text-yellow-600',
              labelClassName
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <Input
            ref={ref}
            type={currentType}
            className={cn(
              inputVariants({ variant: currentVariant, size }),
              leftIcon && 'pl-10',
              (rightIcon || showPasswordToggle || showSuccessIcon || showErrorIcon || onClear) && 'pr-10',
              isFocused && 'ring-2 ring-ring ring-offset-2',
              inputClassName
            )}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />

          {/* Right Icons */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {/* Success Icon */}
            {success && showSuccessIcon && (
              <Check className="h-4 w-4 text-green-500" />
            )}

            {/* Error Icon */}
            {error && showErrorIcon && (
              <AlertCircle className="h-4 w-4 text-destructive" />
            )}

            {/* Warning Icon */}
            {warning && !error && (
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            )}

            {/* Password Toggle */}
            {showPasswordToggle && type === 'password' && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-transparent"
                onClick={togglePasswordVisibility}
                disabled={disabled}
              >
                {isPasswordVisible ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            )}

            {/* Clear Button */}
            {onClear && hasValue && !disabled && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-transparent"
                onClick={handleClear}
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </Button>
            )}

            {/* Custom Right Icon */}
            {rightIcon && !showPasswordToggle && !onClear && (
              <div className="text-muted-foreground">{rightIcon}</div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <FormMessage className="text-destructive text-sm">
            {error}
          </FormMessage>
        )}

        {/* Success Message */}
        {success && !error && (
          <p className="text-green-600 text-sm">{success}</p>
        )}

        {/* Warning Message */}
        {warning && !error && !success && (
          <p className="text-yellow-600 text-sm">{warning}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export { FormInput, inputVariants };