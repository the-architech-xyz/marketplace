'use client';

import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, User, Camera, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

export interface AvatarUploadProps {
  currentAvatar?: string;
  onUpload: (file: File) => Promise<string>;
  onRemove?: () => Promise<void>;
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
  className?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showRemoveButton?: boolean;
  fallbackText?: string;
}

const sizeClasses = {
  sm: 'h-16 w-16',
  md: 'h-24 w-24',
  lg: 'h-32 w-32',
  xl: 'h-40 w-40',
};

const iconSizes = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-10 w-10',
};

export function AvatarUpload({
  currentAvatar,
  onUpload,
  onRemove,
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className,
  disabled = false,
  size = 'md',
  showRemoveButton = true,
  fallbackText = 'Upload',
}: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Validate file size
      if (file.size > maxSize) {
        toast({
          title: 'File too large',
          description: `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`,
          variant: 'destructive',
        });
        return;
      }

      // Validate file type
      if (!acceptedTypes.includes(file.type)) {
        toast({
          title: 'Invalid file type',
          description: `Please upload a ${acceptedTypes.join(', ')} file`,
          variant: 'destructive',
        });
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload file
      try {
        setIsUploading(true);
        const avatarUrl = await onUpload(file);
        setPreview(null);
        toast({
          title: 'Avatar updated',
          description: 'Your profile picture has been updated successfully.',
        });
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: 'Upload failed',
          description: 'Failed to upload avatar. Please try again.',
          variant: 'destructive',
        });
        setPreview(null);
      } finally {
        setIsUploading(false);
      }
    },
    [onUpload, maxSize, acceptedTypes]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    multiple: false,
    disabled: disabled || isUploading,
  });

  const handleRemove = useCallback(async () => {
    if (!onRemove) return;

    try {
      setIsRemoving(true);
      await onRemove();
      toast({
        title: 'Avatar removed',
        description: 'Your profile picture has been removed.',
      });
    } catch (error) {
      console.error('Remove error:', error);
      toast({
        title: 'Remove failed',
        description: 'Failed to remove avatar. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsRemoving(false);
    }
  }, [onRemove]);

  const handleClick = useCallback(() => {
    if (disabled || isUploading) return;
    fileInputRef.current?.click();
  }, [disabled, isUploading]);

  const displayImage = preview || currentAvatar;

  return (
    <div className={cn('relative inline-block', className)}>
      {/* Avatar */}
      <div
        {...getRootProps()}
        className={cn(
          'relative cursor-pointer rounded-full border-2 border-dashed transition-all duration-200',
          sizeClasses[size],
          isDragActive && 'border-primary bg-primary/5',
          disabled && 'cursor-not-allowed opacity-50',
          isUploading && 'cursor-wait',
          'hover:border-primary/50 hover:bg-muted/50'
        )}
        onClick={handleClick}
      >
        <input {...getInputProps()} ref={fileInputRef} />
        
        <Avatar className={cn('h-full w-full', sizeClasses[size])}>
          <AvatarImage src={displayImage} alt="Profile picture" />
          <AvatarFallback className="bg-muted">
            {isUploading ? (
              <Loader2 className={cn('animate-spin text-muted-foreground', iconSizes[size])} />
            ) : (
              <User className={cn('text-muted-foreground', iconSizes[size])} />
            )}
          </AvatarFallback>
        </Avatar>

        {/* Upload overlay */}
        {!isUploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity hover:opacity-100">
            <Camera className={cn('text-white', iconSizes[size])} />
          </div>
        )}

        {/* Upload indicator */}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
            <Loader2 className={cn('animate-spin text-white', iconSizes[size])} />
          </div>
        )}
      </div>

      {/* Upload button */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
        onClick={handleClick}
        disabled={disabled || isUploading}
      >
        <Upload className="h-4 w-4" />
      </Button>

      {/* Remove button */}
      {showRemoveButton && currentAvatar && onRemove && (
        <Button
          type="button"
          variant="destructive"
          size="sm"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
          onClick={handleRemove}
          disabled={disabled || isRemoving || isUploading}
        >
          {isRemoving ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <X className="h-3 w-3" />
          )}
        </Button>
      )}

      {/* Drag and drop indicator */}
      {isDragActive && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-primary/10 border-2 border-primary">
          <div className="text-center">
            <Upload className={cn('mx-auto text-primary', iconSizes[size])} />
            <p className="text-xs text-primary font-medium">Drop image here</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Hook for avatar upload logic
export function useAvatarUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const uploadAvatar = useCallback(async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch('/api/profile/avatar', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload avatar');
      }

      const data = await response.json();
      return data.url;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const removeAvatar = useCallback(async (): Promise<void> => {
    setIsRemoving(true);
    try {
      const response = await fetch('/api/profile/avatar', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove avatar');
      }
    } finally {
      setIsRemoving(false);
    }
  }, []);

  return {
    uploadAvatar,
    removeAvatar,
    isUploading,
    isRemoving,
  };
}