'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { UserMe } from '@/types/profile';

// Validation schema
const personalDataSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters'),
  nrp: z
    .string()
    .regex(/^\d{8,12}$/, 'NRP must be 8-12 digits')
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  angkatan: z
    .string()
    .regex(/^\d{4}$/, 'Angkatan must be a 4-digit year')
    .refine((val) => {
      const year = parseInt(val);
      const currentYear = new Date().getFullYear();
      return year >= 2000 && year <= currentYear + 5;
    }, 'Please enter a valid year')
    .optional()
    .or(z.literal('')),
});

type PersonalDataFormData = z.infer<typeof personalDataSchema>;

interface PersonalDataFormProps {
  user: UserMe;
  onSubmit: (data: PersonalDataFormData) => Promise<void>;
  onCancel: () => void;
  onDirtyChange?: (isDirty: boolean) => void;
  isLoading?: boolean;
}

export default function PersonalDataForm({
  user,
  onSubmit,
  onCancel,
  onDirtyChange,
  isLoading = false,
}: PersonalDataFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<PersonalDataFormData>({
    resolver: zodResolver(personalDataSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: user.fullName || '',
      nrp: user.nrp?.toString() || '',
      email: user.email || '',
      angkatan: user.angkatan || '',
    },
  });

  // Notify parent of dirty state changes
  React.useEffect(() => {
    onDirtyChange?.(isDirty);
  }, [isDirty, onDirtyChange]);

  const handleFormSubmit = async (data: PersonalDataFormData) => {
    try {
      await onSubmit(data);
    } catch {
      // Error handling will be done by parent component
      // Silent catch to prevent unhandled promise rejection
    }
  };

  const handleCancel = () => {
    reset(); // Reset form to initial values
    onCancel();
  };

  const isFormLoading = isLoading || isSubmitting;
  const isSaveDisabled = !isDirty || !isValid || isFormLoading;

  return (
    <Card className='w-full border-t-4 border-t-blue-500'>
      <CardHeader>
        <CardTitle
          className='font-satoshi text-[24px] font-semibold text-black'
          id='personal-data-form-title'
        >
          Personal Data
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className='space-y-6'
          aria-labelledby='personal-data-form-title'
          noValidate
        >
          <fieldset
            className='grid grid-cols-[180px_1fr] gap-x-8 gap-y-6'
            disabled={isFormLoading}
          >
            <legend className='sr-only'>Personal Information Fields</legend>
            {/* Full Name Field */}
            <div className='flex items-start pt-2'>
              <Label
                htmlFor='fullName'
                className='font-satoshi text-[14px] font-medium text-gray-700'
              >
                Full Name <span className='text-red-500'>*</span>
              </Label>
            </div>
            <div className='space-y-2'>
              <Input
                id='fullName'
                {...register('fullName')}
                disabled={isFormLoading}
                placeholder='Enter your full name'
                aria-invalid={errors.fullName ? 'true' : 'false'}
                aria-describedby={
                  errors.fullName ? 'fullName-error' : undefined
                }
                className={cn(
                  'font-satoshi text-[16px]',
                  errors.fullName &&
                    'border-red-500 focus:border-red-500 focus:ring-red-500',
                )}
              />
              {errors.fullName && (
                <p
                  id='fullName-error'
                  className='font-satoshi text-[14px] text-red-600'
                  role='alert'
                >
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* NRP Field */}
            <div className='flex items-start pt-2'>
              <Label
                htmlFor='nrp'
                className='font-satoshi text-[14px] font-medium text-gray-700'
              >
                NRP
              </Label>
            </div>
            <div className='space-y-2'>
              <Input
                id='nrp'
                {...register('nrp')}
                disabled={isFormLoading}
                placeholder='Enter your NRP (8-12 digits)'
                aria-invalid={errors.nrp ? 'true' : 'false'}
                aria-describedby={errors.nrp ? 'nrp-error' : undefined}
                className={cn(
                  'font-satoshi text-[16px]',
                  errors.nrp &&
                    'border-red-500 focus:border-red-500 focus:ring-red-500',
                )}
              />
              {errors.nrp && (
                <p
                  id='nrp-error'
                  className='font-satoshi text-[14px] text-red-600'
                  role='alert'
                >
                  {errors.nrp.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className='flex items-start pt-2'>
              <Label
                htmlFor='email'
                className='font-satoshi text-[14px] font-medium text-gray-700'
              >
                Email <span className='text-red-500'>*</span>
              </Label>
            </div>
            <div className='space-y-2'>
              <Input
                id='email'
                type='email'
                {...register('email')}
                disabled={isFormLoading}
                placeholder='Enter your email address'
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={cn(
                  'font-satoshi text-[16px]',
                  errors.email &&
                    'border-red-500 focus:border-red-500 focus:ring-red-500',
                )}
              />
              {errors.email && (
                <p
                  id='email-error'
                  className='font-satoshi text-[14px] text-red-600'
                  role='alert'
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Angkatan Field */}
            <div className='flex items-start pt-2'>
              <Label
                htmlFor='angkatan'
                className='font-satoshi text-[14px] font-medium text-gray-700'
              >
                Angkatan
              </Label>
            </div>
            <div className='space-y-2'>
              <Input
                id='angkatan'
                {...register('angkatan')}
                disabled={isFormLoading}
                placeholder='Enter your angkatan (e.g., 2023)'
                aria-invalid={errors.angkatan ? 'true' : 'false'}
                aria-describedby={
                  errors.angkatan ? 'angkatan-error' : undefined
                }
                className={cn(
                  'font-satoshi text-[16px]',
                  errors.angkatan &&
                    'border-red-500 focus:border-red-500 focus:ring-red-500',
                )}
              />
              {errors.angkatan && (
                <p
                  id='angkatan-error'
                  className='font-satoshi text-[14px] text-red-600'
                  role='alert'
                >
                  {errors.angkatan.message}
                </p>
              )}
            </div>
          </fieldset>

          {/* Action Buttons */}
          <div className='mt-6 flex justify-end gap-3 border-t border-gray-200 pt-6'>
            <Button
              type='button'
              variant='outline'
              onClick={handleCancel}
              disabled={isFormLoading}
              className='font-satoshi text-[14px] font-medium'
              aria-describedby='cancel-button-help'
            >
              Cancel
            </Button>
            <div id='cancel-button-help' className='sr-only'>
              Cancel editing and discard any unsaved changes
            </div>
            <Button
              type='submit'
              disabled={isSaveDisabled}
              className='font-satoshi text-[14px] font-medium'
              aria-describedby='save-button-help save-button-status'
            >
              {isFormLoading ? (
                <>
                  <div
                    className='mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white'
                    aria-hidden='true'
                  />
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </Button>
            <div id='save-button-help' className='sr-only'>
              Save your profile changes
            </div>
            <div id='save-button-status' className='sr-only' aria-live='polite'>
              {isFormLoading
                ? 'Saving your profile changes'
                : isSaveDisabled
                  ? 'Save button disabled - no changes or form has errors'
                  : 'Ready to save changes'}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
