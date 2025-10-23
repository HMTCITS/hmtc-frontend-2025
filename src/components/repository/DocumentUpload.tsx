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
  tone?: 'default' | 'glass';
  accept?: string;
  hint?: string;
}

export function DocumentUpload({
  onFileSelect,
  onFileRemove,
  selectedFile,
  error,
  disabled = false,
  className,
  tone = 'default',
  accept = '.pdf,.doc,.docx,.txt',
  hint,
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
        accept={accept}
        onChange={handleFileChange}
        className='hidden'
        disabled={disabled}
      />

      {selectedFile ? (
        <div
          className={cn(
            'flex w-full items-center gap-4 rounded-lg border p-3 sm:p-4',
            tone === 'glass'
              ? 'border-white/10 bg-white/6 backdrop-blur-sm'
              : 'border-green-200 bg-white/50',
            disabled && 'cursor-not-allowed opacity-60',
          )}
          role='group'
          aria-label='Selected document'
        >
          <div className='flex h-10 w-10 items-center justify-center rounded-md bg-white/6 sm:h-12 sm:w-12'>
            <FileText
              className={cn(
                'h-5 w-5',
                tone === 'glass' ? 'text-indigo-100' : 'text-green-700',
              )}
              aria-hidden
            />
          </div>

          <div className='min-w-0 flex-1'>
            <Typography
              as='p'
              variant='b4'
              className={cn(
                'truncate text-sm font-medium',
                tone === 'glass' ? 'text-white' : 'text-green-900',
              )}
              title={selectedFile.name}
            >
              {selectedFile.name}
            </Typography>
            <Typography
              as='p'
              variant='c0'
              className={cn(
                'mt-0.5 text-xs',
                tone === 'glass' ? 'text-indigo-100/90' : 'text-green-700',
              )}
            >
              {formatFileSize(selectedFile.size)}
            </Typography>
          </div>

          <div className='flex items-center gap-2'>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={handleClick}
              disabled={disabled}
              className={cn(
                'h-8 w-8 p-0',
                tone === 'glass' ? 'text-indigo-100' : 'text-gray-700',
              )}
              aria-label='Ganti file'
              title='Ganti file'
            >
              <Upload className='h-4 w-4' />
            </Button>

            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={handleRemove}
              disabled={disabled}
              className={cn('h-8 w-8 p-0 text-red-400 hover:bg-red-600/10')}
              aria-label='Hapus file'
              title='Hapus file'
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
        </div>
      ) : (
        <button
          type='button'
          onClick={handleClick}
          disabled={disabled}
          className={cn(
            'flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border p-6 transition-colors sm:p-8',
            tone === 'glass'
              ? 'border-white/12 bg-white/4 hover:border-indigo-300/60'
              : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100',
            disabled && 'cursor-not-allowed opacity-60',
            error &&
              (tone === 'glass'
                ? 'border-red-300/70 bg-red-500/10'
                : 'border-red-300 bg-red-50'),
          )}
          aria-disabled={disabled}
        >
          <Upload
            className={cn(
              'mb-3 h-10 w-10 sm:h-12 sm:w-12',
              error
                ? 'text-red-400'
                : tone === 'glass'
                  ? 'text-indigo-200'
                  : 'text-gray-400',
            )}
            aria-hidden
          />
          <Typography
            as='p'
            variant='b4'
            className={cn(
              'mb-1 font-medium',
              error
                ? tone === 'glass'
                  ? 'text-red-300'
                  : 'text-red-700'
                : tone === 'glass'
                  ? 'text-white'
                  : 'text-gray-800',
            )}
          >
            {hint ? hint : 'Klik untuk mengunggah dokumen'}
          </Typography>
          <Typography
            as='p'
            variant='c0'
            className={cn(
              'text-xs',
              error
                ? tone === 'glass'
                  ? 'text-red-300'
                  : 'text-red-500'
                : tone === 'glass'
                  ? 'text-indigo-100/90'
                  : 'text-gray-500',
            )}
          >
            {hint ?? 'PDF, DOC, DOCX, TXT (Max 10MB)'}
          </Typography>
        </button>
      )}
    </div>
  );
}
