import React from 'react';
import { FieldError } from 'react-hook-form';
import { cn } from '@/lib/utils';

export interface FormErrorProps {
  error?: FieldError;
  className?: string;
  showIcon?: boolean;
  icon?: React.ReactNode;
}

export function FormError({
  error,
  className,
  showIcon = true,
  icon,
}: FormErrorProps) {
  if (!error) return null;

  const defaultIcon = (
    <svg
      className="h-4 w-4 text-red-500"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start space-x-2 text-sm text-red-600 dark:text-red-400',
        className
      )}
    >
      {showIcon && (
        <div className="flex-shrink-0 mt-0.5">
          {icon || defaultIcon}
        </div>
      )}
      
      <div className="flex-1">
        <p className="font-medium">
          {error.message}
        </p>
        
        {error.type && (
          <p className="text-xs text-red-500 dark:text-red-400 mt-1">
            Error type: {error.type}
          </p>
        )}
      </div>
    </div>
  );
}

// Export default for easier imports
export default FormError;
