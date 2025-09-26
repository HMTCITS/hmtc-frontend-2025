'use client';

import { FileText, Upload, X } from 'lucide-react';
import React, { useRef } from 'react';

import Typography from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DocumentUploadProps {
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  selectedFile: File | null;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function DocumentUpload({
  onFileSelect,
  onFileRemove,
  selectedFile,
  error,
  disabled = false,
  className,
}: DocumentUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileRemove();
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn('w-full', className)}>
      <input
        ref={inputRef}
        type='file'
        accept='.pdf,.doc,.docx,.txt'
        onChange={handleFileChange}
        className='hidden'
        disabled={disabled}
      />

      {selectedFile ? (
        <div
          className={cn(
            'flex items-center gap-3 rounded-lg border-2 border-dashed p-4',
            'border-green-300 bg-green-50',
            disabled && 'cursor-not-allowed opacity-50',
          )}
        >
          <FileText className='h-8 w-8 text-green-600' />
          <div className='min-w-0 flex-1'>
            <Typography
              as='p'
              variant='b4'
              className={cn('truncate text-sm font-medium text-green-800')}
            >
              {selectedFile.name}
            </Typography>
            <Typography as='p' variant='c0' className='text-xs text-green-600'>
              {formatFileSize(selectedFile.size)}
            </Typography>
          </div>
          <Button
            type='button'
            variant='ghost'
            size='sm'
            onClick={handleRemove}
            disabled={disabled}
            className='h-8 w-8 p-0 text-green-600 hover:bg-green-100 hover:text-green-800'
          >
            <X className='h-4 w-4' />
          </Button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className={cn(
            'flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8',
            'cursor-pointer border-gray-300 bg-gray-50 transition-colors',
            'hover:border-gray-400 hover:bg-gray-100',
            disabled &&
              'cursor-not-allowed opacity-50 hover:border-gray-300 hover:bg-gray-50',
            error && 'border-red-300 bg-red-50',
          )}
        >
          <Upload
            className={cn(
              'mb-4 h-12 w-12',
              error ? 'text-red-400' : 'text-gray-400',
            )}
          />
          <Typography
            as='p'
            variant='b4'
            className={cn(
              'mb-1 font-medium',
              error ? 'text-red-700' : 'text-gray-700',
            )}
          >
            Click to upload document
          </Typography>
          <Typography
            as='p'
            variant='c0'
            className={cn('text-xs', error ? 'text-red-500' : 'text-gray-500')}
          >
            PDF, DOC, DOCX, TXT (Max 10MB)
          </Typography>
        </div>
      )}
    </div>
  );
}
