/**
 * Shadcn Form Select Component
 * 
 * Shadcn UI select component for forms
 */

'use client';

import { forwardRef } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ShadcnFormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export const ShadcnFormSelect = forwardRef<HTMLSelectElement, ShadcnFormSelectProps>(
  ({ label, error, required, className, options, placeholder = 'Select an option', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={props.id} className={cn(required && 'after:content-["*"] after:ml-0.5 after:text-destructive')}>
            {label}
          </Label>
        )}
        <Select>
          <SelectTrigger className={cn(
            error && 'border-destructive focus:ring-destructive',
            className
          )}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

ShadcnFormSelect.displayName = 'ShadcnFormSelect';

export default ShadcnFormSelect;
