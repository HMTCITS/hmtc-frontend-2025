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
      <div className='space-y-4'>
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
      </div>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
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
          <Button type='submit' className='w-full rounded-md font-satoshi'>
            Change Password
          </Button>
        </form>
      </FormProvider>
      <Typography as='div' className='space-x-1 text-center font-satoshi'>
        <Typography as='span' className='text-inherit'>
          Back to
        </Typography>
        <Link
          href='/login'
          className='text-blue-500 underline decoration-white transition-colors duration-150 hover:decoration-blue-500'
        >
          <Typography as='span' className='text-inherit'>
            Login Page
          </Typography>
        </Link>
      </Typography>
    </AuthLayout>
  );
}
