'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Typography from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  type RepositoryFormData,
  repositoryFormSchema,
} from '@/lib/validation/repository.schema';

interface RepositoryFormProps {
  onSubmit: (data: RepositoryFormData) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<RepositoryFormData>;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
}

export function RepositoryForm({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
  mode = 'create',
}: RepositoryFormProps) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSaveConfirmOpen, setIsSaveConfirmOpen] = useState(false);
  const [pendingFormData, setPendingFormData] =
    useState<RepositoryFormData | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<RepositoryFormData>({
    resolver: zodResolver(repositoryFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      writer: initialData?.writer || '',
      description: initialData?.description || '',
      publishDate: initialData?.publishDate || undefined,
      supervisor: initialData?.supervisor || '',
      laboratory: initialData?.laboratory || '',
    },
  });

  const handleFormSubmit = (data: RepositoryFormData) => {
    setPendingFormData(data);
    setIsSaveConfirmOpen(true);
  };

  const handleConfirmSave = async () => {
    if (!pendingFormData) return;

    try {
      await onSubmit(pendingFormData);

      // Success toast
      toast.success(
        `Repository ${mode === 'create' ? 'created' : 'updated'} successfully!`,
        {
          description: `${pendingFormData.title} has been ${mode === 'create' ? 'created' : 'updated'}.`,
        },
      );

      if (mode === 'create') {
        reset();
      }
      setIsSaveConfirmOpen(false);
      setPendingFormData(null);
    } catch (error) {
      toast.error(
        `Failed to ${mode === 'create' ? 'create' : 'update'} repository`,
        {
          description: (error as Error).message,
        },
      );
    }
  };

  const handleCancelSave = () => {
    setIsSaveConfirmOpen(false);
    setPendingFormData(null);
  };

  const handleCancel = () => {
    if (isDirty) {
      setIsConfirmModalOpen(true);
    } else {
      onCancel();
    }
  };

  const handleConfirmCancel = () => {
    reset();
    setIsConfirmModalOpen(false);
    onCancel();
  };

  const handleCancelConfirm = () => {
    setIsConfirmModalOpen(false);
  };

  const isFormLoading = isLoading || isSubmitting;

  // Set default date on client after mount to avoid SSR/client mismatch
  React.useEffect(() => {
    if (!initialData?.publishDate) {
      const todayIso = new Date().toISOString().split('T')[0];
      setValue('publishDate', todayIso, {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
              {mode === 'create' ? 'Create Repository' : 'Edit Repository'}
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
                Title <span className='text-red-500'>*</span>
              </Label>
              <div className='w-full md:w-2/3'>
                <Input
                  id='title'
                  placeholder='Enter repository title (min 3 characters)'
                  {...register('title')}
                  disabled={isFormLoading}
                  autoFocus={mode === 'create'}
                  aria-invalid={errors.title ? 'true' : 'false'}
                  aria-describedby={errors.title ? 'title-error' : undefined}
                  className={cn(
                    'w-full font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                    errors.title &&
                      'border-red-500 focus:border-red-500 focus:ring-red-500',
                  )}
                />
                {errors.title && (
                  <p
                    id='title-error'
                    className='mt-1 flex items-center gap-1 text-sm text-red-600'
                    role='alert'
                  >
                    <X className='h-3 w-3' />
                    {errors.title.message}
                  </p>
                )}
              </div>
            </div>

            {/* Writer Field */}
            <div className='flex flex-col gap-2.5 md:flex-row'>
              <Label
                htmlFor='writer'
                className='flex w-full items-center gap-2 text-base font-medium text-black-200 md:w-1/3'
              >
                Writer <span className='text-red-500'>*</span>
              </Label>
              <div className='w-full md:w-2/3'>
                <Input
                  id='writer'
                  placeholder='Enter writer name'
                  {...register('writer')}
                  disabled={isFormLoading}
                  aria-invalid={errors.writer ? 'true' : 'false'}
                  aria-describedby={errors.writer ? 'writer-error' : undefined}
                  className={cn(
                    'w-full font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                    errors.writer &&
                      'border-red-500 focus:border-red-500 focus:ring-red-500',
                  )}
                />
                {errors.writer && (
                  <p
                    id='writer-error'
                    className='mt-1 flex items-center gap-1 text-sm text-red-600'
                    role='alert'
                  >
                    <X className='h-3 w-3' />
                    {errors.writer.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description Field */}
            <div className='flex flex-col gap-2.5 md:flex-row'>
              <Label
                htmlFor='description'
                className='flex w-full items-center gap-2 text-base font-medium text-black-200 md:w-1/3'
              >
                Description <span className='text-red-500'>*</span>
              </Label>
              <div className='w-full md:w-2/3'>
                <Textarea
                  id='description'
                  placeholder='Enter detailed description (min 10 characters)'
                  rows={4}
                  {...register('description')}
                  disabled={isFormLoading}
                  aria-invalid={errors.description ? 'true' : 'false'}
                  aria-describedby={
                    errors.description ? 'description-error' : undefined
                  }
                  className={cn(
                    'resize-vertical w-full font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                    errors.description &&
                      'border-red-500 focus:border-red-500 focus:ring-red-500',
                  )}
                />
                {errors.description && (
                  <p
                    id='description-error'
                    className='mt-1 flex items-center gap-1 text-sm text-red-600'
                    role='alert'
                  >
                    <X className='h-3 w-3' />
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/* Publish Date Field */}
            <div className='flex flex-col gap-2.5 md:flex-row'>
              <Label
                htmlFor='publishDate'
                className='flex w-full items-center gap-2 text-base font-medium text-black-200 md:w-1/3'
              >
                Publish Date <span className='text-red-500'>*</span>
              </Label>
              <div className='w-full md:w-2/3'>
                <Controller
                  name='publishDate'
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      id='publishDate'
                      value={field.value}
                      onChange={(v) => field.onChange(v)}
                      disabled={isFormLoading}
                      aria-invalid={errors.publishDate ? 'true' : 'false'}
                      aria-describedby={
                        errors.publishDate ? 'publishDate-error' : undefined
                      }
                      className={cn(
                        'w-full font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                        errors.publishDate &&
                          'border-red-500 focus:border-red-500 focus:ring-red-500',
                      )}
                    />
                  )}
                />
                {errors.publishDate && (
                  <p
                    id='publishDate-error'
                    className='mt-1 flex items-center gap-1 text-sm text-red-600'
                    role='alert'
                  >
                    <X className='h-3 w-3' />
                    {errors.publishDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Supervisor Field */}
            <div className='flex flex-col gap-2.5 md:flex-row'>
              <Label
                htmlFor='supervisor'
                className='flex w-full items-center gap-2 text-base font-medium text-black-200 md:w-1/3'
              >
                Supervisor
              </Label>
              <div className='w-full md:w-2/3'>
                <Input
                  id='supervisor'
                  placeholder='Enter supervisor name (optional)'
                  {...register('supervisor')}
                  disabled={isFormLoading}
                  className='w-full font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                />
              </div>
            </div>

            {/* Laboratory Field */}
            <div className='flex flex-col gap-2.5 md:flex-row'>
              <Label
                htmlFor='laboratory'
                className='flex w-full items-center gap-2 text-base font-medium text-black-200 md:w-1/3'
              >
                Laboratory
              </Label>
              <div className='w-full md:w-2/3'>
                <Input
                  id='laboratory'
                  placeholder='Enter laboratory name (optional)'
                  {...register('laboratory')}
                  disabled={isFormLoading}
                  className='w-full font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col-reverse justify-end gap-3 border-t pt-4 md:flex-row'>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  try {
                    handleCancel();
                  } catch {
                    // swallow parent errors intentionally
                  }
                }}
                disabled={isFormLoading}
                className='w-full md:w-auto md:px-8'
              >
                Cancel
              </Button>

              <Button
                type='submit'
                disabled={isFormLoading}
                className='w-full md:w-auto md:px-8'
              >
                {isFormLoading ? (
                  <>
                    <div className='mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white' />
                    {mode === 'create' ? 'Creating...' : 'Updating...'}
                  </>
                ) : (
                  <>Save</>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <ConfirmModal
        open={isConfirmModalOpen}
        onOpenChange={setIsConfirmModalOpen}
        title='Unsaved changes'
        subtitle='You have unsaved changes. Are you sure you want to discard them?'
        variant='danger'
        actions={[
          {
            id: 'cancel',
            label: 'Continue editing',
            variant: 'outline',
            onClick: handleCancelConfirm,
          },
          {
            id: 'confirm',
            label: 'Discard changes',
            variant: 'destructive',
            autoFocus: true,
            autoCloseOnResolve: true,
            onClick: handleConfirmCancel,
          },
        ]}
      />

      {/* Save Confirmation Modal */}
      <ConfirmModal
        open={isSaveConfirmOpen}
        onOpenChange={setIsSaveConfirmOpen}
        variant='info'
        size='md'
        title={`Please confirm information you provided is accurate`}
        illustration={
          <Image
            src='/images/illustrations/delete-confirm.png'
            alt='Save Confirmation'
            width={300}
            height={300}
          />
        }
        actions={[
          {
            id: 'cancel',
            label: 'Cancel',
            variant: 'outline',
            onClick: handleCancelSave,
          },
          {
            id: 'confirm',
            label: `Yes, ${mode === 'create' ? 'Create' : 'Update'}`,
            variant: 'default',
            autoFocus: true,
            autoCloseOnResolve: true,
            onClick: handleConfirmSave,
          },
        ]}
      />
    </div>
  );
}
