'use client';

import Link from 'next/link';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import Typography from '@/components/Typography';
import AuthLayout from '@/layouts/AuthLayout';

type ResetPasswordForm = {
  password: string;
  password_confirm: string;
};

export default function ChangePasswordForm() {
  const form = useForm<ResetPasswordForm>();
  const { handleSubmit, watch } = form;
  const wpassword = watch('password');
  const onSubmit = (_data: ResetPasswordForm) => {
    // console.log(data);
  };

  return (
    <AuthLayout>
      <div className='grid gap-[16px]'>
        <Typography
          as='h1'
          variant='j0'
          className='font-adelphe text-3xl font-bold md:text-4xl lg:text-5xl'
        >
          Reset your password account
        </Typography>
        <Typography as='p' className='mb-2 font-satoshi text-slate-600'>
          Enter your email to recover your password. A link to reset your
          password will be sent via email.
        </Typography>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className='grid gap-[16px]'>
            <div className='grid gap-y-[12px]'>
              <Input
                id='password'
                label='Password'
                placeholder='Enter your password'
                containerClassName='font-satoshi'
                validation={{ required: 'Password is required' }}
              />
              <Input
                id='password_confirm'
                label='Confirm Password'
                placeholder='Re-enter your password'
                containerClassName='font-satoshi'
                validation={{
                  required: 'Confirm Password is required',
                  validate: (value) =>
                    value === wpassword || 'Passwords do not match',
                }}
              />
            </div>
            <Button type='submit' className='w-full rounded-xl font-satoshi'>
              Change Password
            </Button>
          </form>
        </FormProvider>
        <Typography as='div' className='space-x-1 text-center font-satoshi font-medium'>
          <Typography as='span' className='text-inherit' variant='s3'>
            Back to
          </Typography>
          <Link
            href='/login'
            className='text-blue-500 underline decoration-white transition-colors duration-150 hover:decoration-blue-500'
          >
            <Typography as='span' className='text-inherit' variant='s3'>
              Login Page
            </Typography>
          </Link>
        </Typography>
      </div>
    </AuthLayout>
  );
}
