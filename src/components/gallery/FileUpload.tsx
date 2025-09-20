'use client';

import { AlertCircle, CheckCircle2, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect,useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  selectedFile: File | null;
  error?: string;
  className?: string;
  disabled?: boolean;
}

export function FileUpload({
  onFileSelect,
  onFileRemove,
  selectedFile,
  error,
  className,
  disabled = false,
}: FileUploadProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      return;
    }

    const file = acceptedFiles[0];
    if (file && !disabled) {
      setIsUploading(true);
      setUploadProgress(0);

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsUploading(false);
              onFileSelect(file);
            }, 500); // Add small delay
            return 100;
          }
          return prev + Math.random() * 15 + 5;
        });
      }, 150);
    }
  }, [onFileSelect, disabled]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
    maxFiles: 1,
    maxSize: 1 * 1024 * 1024, // 1MB
    disabled,
  });

  // Generate preview URL when selectedFile changes
  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);

      // Cleanup
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl('');
    }
  }, [selectedFile]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  const handleRemoveFile = () => {
    setUploadProgress(0);
    setIsUploading(false);
    setPreviewUrl('');
    onFileRemove();
  }

  // Show uploading state
  if (isUploading) {
    return (
      <div className={cn('w-full', className)}>
        <div className='border-2 border-dashed rounded-lg p-8 text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4' />
          <p className='text-gray-600 mb-3'>Uploading thumbnail...</p>

          <div className='max-w-xs mx-auto'>
            <div className='flex justify-between test-sm mb-2'>
              <span>Progress</span>
              <span>{Math.round(uploadProgress)}%</span>
            </div>
            <Progress value={uploadProgress} className='h-3 rounded-full' />
          </div>
        </div>
      </div>
    );
  }

  // Show uploaded file
  if (selectedFile) {
    return (
      <div className={cn('w-full', className)}>
        <div className='rounded-lg border p-4'>
          <div className='mb-3 flex items-start justify-between'>
            <div className='flex items-center space-x-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full'>
                <CheckCircle2 className='h-5 w-5 text-green-600' />
              </div>

              <p className='max-w-[200px] truncate font-medium'>
                {selectedFile.name}
              </p>
              <p className='text-sm'>
                {formatFileSize(selectedFile.size)} • {selectedFile.type}
              </p>
            </div>
          </div>

          <Button
            type='button'
            variant='ghost'
            size='sm'
            onClick={handleRemoveFile}
            disabled={disabled}
          >
            <X className='h-4 w-4' />
          </Button>
        </div>
        {/* Preview */}
        {previewUrl && (
          <div className='mt-3 relative w-full h-40'>
            <Image
              src={previewUrl}
              alt='Thumbnail Preview'
              fill
              className='object-cover rounded'
            />
          </div>
        )}
      </div>
    );
  }

  // Show dropzone
  return (
    <div className={cn('w-full', className)}>
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer',
          isDragActive
            ? 'border-blue-500 bg-blue-50 scale-[1.02'
            : error
            ? 'border-red-500 bg-red-50'
              : 'border-gray-300 hover:border-gray-400',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
      >
        <input {...getInputProps()} />

        <Upload className={cn(
          'mx-auto h-12 w-12 mb-4',
          isDragActive ? 'text-blue-500' : 'text-gray-400'
        )} />

        {isDragActive ? (
          <div className='text-blue-600'>
            <p className='text-lg font-medium'>Drop the image here</p>
            <p className='text-sm mt-1'>Release to upload</p>
          </div>
        ) : (
            <>
              <div className='space-y-2'>
                <p className='text-gray-600'>
                  <span className='font-medium'>Drag and drop</span> an image here, or{' '}
                  <span className='text-blue-600 font-medium hover:text-blue-700'>
                    choose file
                  </span>
                </p>
                <p className='text-sm text-gray-500'>
                  PNG, JPG, JPEG up to 1MB
                </p>
              </div>

              <Button
                type='button'
                variant='outline'
                className='mt-4'
                disabled={disabled}
              >
                Choose File
              </Button>
            </>
        )}

        {error && (
          <div className='flex items-center justify-center mt-4 p-3 bg-red-100 border border-red-200 rounded'>
            <AlertCircle className='h-4 w-4 text-red-500 mr-2' />
            <span className='text-sm text-red-600'>{error}</span>
          </div>
        )}

      </div>
    </div>
  )
}