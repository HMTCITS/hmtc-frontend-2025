'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageIcon, LinkIcon, Save, X } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import Typography from '@/components/Typography';
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
import { DatePicker } from '@/components/ui/date-picker';

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
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<GalleryFormData>({
    resolver: zodResolver(galleryFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      // avoid computing a date on the server to prevent hydration mismatch;
      // start undefined and set on client mount below
      date: initialData?.date || undefined,
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
      toast.error(
        `Failed to ${mode === 'create' ? 'create' : 'update'} gallery item. ${(error as Error).message}`,
      );
    }
  };

  const isFormLoading = isLoading || isSubmitting;
  const router = useRouter();

  // set default date on client after mount to avoid SSR/client mismatch
  React.useEffect(() => {
    if (!initialData?.date) {
      const todayIso = new Date().toISOString().split('T')[0];
      setValue('date', todayIso, { shouldValidate: false, shouldDirty: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // suppressHydrationWarning: some children (date display, extension-injected attrs)
    // may differ between server and client; ignore hydration warnings for this subtree.
    <div suppressHydrationWarning className='mx-auto w-full font-satoshi'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Typography
              font='satoshi'
              weight='medium'
              variant='h1'
              className='mb-2.5 w-full border-b-2 border-black-50 pb-5'
            >
              Gallery Detail
            </Typography>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Typography
            font='satoshi'
            weight='medium'
            variant='i2'
            className='mb-2.5'
          >
            Information
          </Typography>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className='flex flex-col gap-2.5'
          >
            {/* Title Field */}
            <div className='flex flex-col gap-2.5 md:flex-row'>
              <Label
                htmlFor='title'
                className='flex w-full items-center gap-2 text-base font-medium text-black-200 md:w-1/3'
              >
                Judul
              </Label>
              <div className='w-full md:w-2/3'>
                <Input
                  id='title'
                  placeholder='Masukkan judul galeri (minimal 3 karakter)'
                  {...register('title')}
                  disabled={isFormLoading}
                  className={cn(
                    'w-full transition-colors',
                    errors.title &&
                      'border-red-500 focus:border-red-500 focus:ring-red-500',
                  )}
                />
                {errors.title && (
                  <p className='mt-1 flex items-center gap-1 text-sm text-red-600'>
                    <X className='h-3 w-3' />
                    {errors.title.message}
                  </p>
                )}
              </div>
            </div>

            {/* Date Field */}
            <div className='flex flex-col gap-2.5 md:flex-row'>
              <Label
                htmlFor='date'
                className='flex w-full items-center gap-2 text-base font-medium text-black-200 md:w-1/3'
              >
                Date <span className='text-red-500'>*</span>
              </Label>
              <div className='w-full md:w-2/3'>
                <Controller
                  name='date'
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      id='date'
                      value={field.value}
                      onChange={(v) => field.onChange(v)}
                      disabled={isFormLoading}
                      className={cn(
                        'w-full transition-colors',
                        errors.date &&
                          'border-red-500 focus:border-red-500 focus:ring-red-500',
                      )}
                    />
                  )}
                />
                {errors.date && (
                  <p className='mt-1 flex items-center gap-1 text-sm text-red-600'>
                    <X className='h-3 w-3' />
                    {errors.date.message}
                  </p>
                )}
              </div>
            </div>

            {/* Google Drive Link Field */}
            <div className='flex flex-col gap-2.5 md:flex-row'>
              <Label
                htmlFor='link'
                className='flex w-full items-center gap-2 text-base font-medium text-black-200 md:w-1/3'
              >
                <LinkIcon className='h-4 w-4' />
                Link (Google Drive) <span className='text-red-500'>*</span>
              </Label>
              <div className='w-full md:w-2/3'>
                <Input
                  id='link'
                  placeholder='https://drive.google.com/file/d/...'
                  {...register('link')}
                  disabled={isFormLoading}
                  className={cn(
                    'w-full transition-colors',
                    errors.link &&
                      'border-red-500 focus:border-red-500 focus:ring-red-500',
                  )}
                />
                {errors.link && (
                  <p className='mt-1 flex items-center gap-1 text-sm text-red-600'>
                    <X className='h-3 w-3' />
                    {errors.link.message}
                  </p>
                )}
              </div>
            </div>

            {/* Thumbnail Upload Field */}
            <div className='flex flex-col gap-2.5 md:flex-row'>
              <Label className='flex w-full items-center gap-2 text-base font-medium text-black-200 md:w-1/3'>
                <ImageIcon className='h-4 w-4' />
                Thumbnail Image <span className='text-red-500'>*</span>
              </Label>
              <div className='flex w-full flex-col gap-2 md:w-2/3'>
                <FileUpload
                  onFileSelect={handleFileSelect}
                  onFileRemove={handleFileRemove}
                  selectedFile={selectedFile}
                  error={errors.thumbnail?.message}
                  disabled={isFormLoading}
                />
                {errors.thumbnail && (
                  <p className='mt-1 flex items-center gap-1 text-sm text-red-600'>
                    <X className='h-3 w-3' />
                    {errors.thumbnail.message}
                  </p>
                )}
                <p className='text-xs text-gray-500'>
                  Upload a thumbnail image for preview. Max size: 1MB. Formats:
                  JPG, JPEG, PNG.
                </p>
              </div>
            </div>

            {/* Description Field */}
            <div className='flex flex-col gap-2.5 md:flex-row'>
              <Label
                htmlFor='description'
                className='flex w-full items-center gap-2 text-base font-medium text-black-200 md:w-1/3'
              >
                Description (Optional)
              </Label>
              <div className='w-full md:w-2/3'>
                <Textarea
                  id='description'
                  name='description'
                  placeholder='Enter a description for this gallery item...'
                  rows={3}
                  disabled={isFormLoading}
                  className='w-full resize-none'
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className='flex flex-col-reverse gap-3 border-t pt-4 md:flex-row'>
              <Button
                type='submit'
                disabled={isFormLoading}
                className='w-full md:flex-1'
              >
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
                onClick={() => {
                  // let parent decide where to navigate; this component only calls onCancel
                  try {
                    onCancel();
                  } catch (err) {
                    // swallow parent errors
                  }
                }}
                disabled={isFormLoading}
                className='w-full md:w-auto md:px-8'
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
