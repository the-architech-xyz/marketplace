/**
 * Shadcn Form Radio Component
 * 
 * Shadcn UI radio component for forms
 */

'use client';

import { forwardRef } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ShadcnFormRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
  options: Array<{ value: string; label: string }>;
  description?: string;
}

export const ShadcnFormRadio = forwardRef<HTMLInputElement, ShadcnFormRadioProps>(
  ({ label, error, required, className, options, description, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <Label className={cn(
            'text-sm font-medium leading-none',
            required && 'after:content-["*"] after:ml-0.5 after:text-destructive'
          )}>
            {label}
          </Label>
        )}
        <RadioGroup
          className={cn(
            error && 'text-destructive',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem 
                value={option.value} 
                id={`${props.id}-${option.value}`}
                ref={ref}
              />
              <Label 
                htmlFor={`${props.id}-${option.value}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
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

ShadcnFormRadio.displayName = 'ShadcnFormRadio';

export default ShadcnFormRadio;
