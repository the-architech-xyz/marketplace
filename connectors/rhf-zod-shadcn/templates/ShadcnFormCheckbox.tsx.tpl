/**
 * Shadcn Form Checkbox Component
 * 
 * Shadcn UI checkbox component for forms
 */

'use client';

import { forwardRef } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ShadcnFormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
  description?: string;
}

export const ShadcnFormCheckbox = forwardRef<HTMLInputElement, ShadcnFormCheckboxProps>(
  ({ label, error, required, className, description, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            ref={ref}
            id={props.id}
            className={cn(
              error && 'border-destructive data-[state=checked]:bg-destructive',
              className
            )}
            {...props}
          />
          {label && (
            <Label 
              htmlFor={props.id} 
              className={cn(
                'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                required && 'after:content-["*"] after:ml-0.5 after:text-destructive'
              )}
            >
              {label}
            </Label>
          )}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

ShadcnFormCheckbox.displayName = 'ShadcnFormCheckbox';

export default ShadcnFormCheckbox;
