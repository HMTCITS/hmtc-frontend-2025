'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, ImageIcon, LinkIcon, Save, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  type GalleryFormData,
  galleryFormSchema,
} from '@/lib/validation/gallery';

import { FileUpload } from './FileUpload';

interface GalleryFormProps {
  onSubmit: (data: GalleryFormData) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<GalleryFormData>;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
}

export function GalleryForm({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
  mode = 'create',
}: GalleryFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<GalleryFormData>({
    resolver: zodResolver(galleryFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      date: initialData?.date || new Date().toISOString().split('T')[0],
      link: initialData?.link || '',
    },
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setValue('thumbnail', file, { shouldValidate: true });
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setValue('thumbnail', undefined as any, { shouldValidate: true });
  };

  const handleFormSubmit = async (data: GalleryFormData) => {
    try {
      await onSubmit(data);
      if (mode === 'create') {
        reset();
        setSelectedFile(null);
      }
    } catch (error) {
      toast.error(`Failed to ${mode === 'create' ? 'create' : 'update'} gallery item. ${(error as Error).message}`);
    }
  };

  const isFormLoading = isLoading || isSubmitting;

  return (
    <div className='mx-auto w-full font-satoshi'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <ImageIcon className='h-5 w-5 text-blue-600' />
            {mode === 'create' ? 'Add New Gallery Item' : 'Edit Gallery Item'}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-6'>
            {/* Title Field */}
            <div className='space-y-2'>
              <Label
                htmlFor='title'
                className='flex items-center gap-2 text-sm font-medium'
              >
                Title <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='title'
                placeholder='Enter gallery title (minimum 3 characters)'
                {...register('title')}
                disabled={isFormLoading}
                className={cn(
                  'transition-colors',
                  errors.title &&
                    'border-red-500 focus:border-red-500 focus:ring-red-500',
                )}
              />
              {errors.title && (
                <p className='flex items-center gap-1 text-sm text-red-600'>
                  <X className='h-3 w-3' />
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Date Field */}
            <div className='space-y-2'>
              <Label
                htmlFor='date'
                className='flex items-center gap-2 text-sm font-medium'
              >
                <CalendarIcon className='h-4 w-4' />
                Date <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='date'
                type='date'
                {...register('date')}
                disabled={isFormLoading}
                className={cn(
                  'transition-colors',
                  errors.date &&
                    'border-red-500 focus:border-red-500 focus:ring-red-500',
                )}
              />
              {errors.date && (
                <p className='flex items-center gap-1 text-sm text-red-600'>
                  <X className='h-3 w-3' />
                  {errors.date.message}
                </p>
              )}
            </div>

            {/* Google Drive Link Field */}
            <div className='space-y-2'>
              <Label
                htmlFor='link'
                className='flex items-center gap-2 text-sm font-medium'
              >
                <LinkIcon className='h-4 w-4' />
                Link (Google Drive) <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='link'
                placeholder='https://drive.google.com/file/d/...'
                {...register('link')}
                disabled={isFormLoading}
                className={cn(
                  'transition-colors',
                  errors.link &&
                    'border-red-500 focus:border-red-500 focus:ring-red-500',
                )}
              />
              {errors.link && (
                <p className='flex items-center gap-1 text-sm text-red-600'>
                  <X className='h-3 w-3' />
                  {errors.link.message}
                </p>
              )}
            </div>

            {/* Thumbnail Upload Field */}
            <div className='space-y-2'>
              <Label className='flex items-center gap-2 text-sm font-medium'>
                <ImageIcon className='h-4 w-4' />
                Thumbnail Image <span className='text-red-500'>*</span>
              </Label>
              <FileUpload
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
                selectedFile={selectedFile}
                error={errors.thumbnail?.message}
                disabled={isFormLoading}
              />
              <p className='text-xs text-gray-500'>
                Upload a thumbnail image for preview. Max size: 1MB. Formats:
                JPG, JPEG, PNG.
              </p>
            </div>

            {/* Description Field */}
            <div className='space-y-2'>
              <Label htmlFor='description' className='text-sm font-medium'>
                Description (Optional)
              </Label>
              <Textarea
                id='description'
                placeholder='Enter a description for this gallery item...'
                rows={3}
                disabled={isFormLoading}
                className='resize-none'
              />
            </div>

            {/* Form Actions */}
            <div className='flex gap-3 border-t pt-4'>
              <Button type='submit' disabled={isFormLoading} className='flex-1'>
                {isFormLoading ? (
                  <>
                    <div className='mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white' />
                    {mode === 'create' ? 'Creating...' : 'Updating...'}
                  </>
                ) : (
                  <>
                    <Save className='mr-2 h-4 w-4' />
                    {mode === 'create'
                      ? 'Create Gallery Item'
                      : 'Update Gallery Item'}
                  </>
                )}
              </Button>

              <Button
                type='button'
                variant='outline'
                onClick={onCancel}
                disabled={isFormLoading}
                className='px-8'
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
