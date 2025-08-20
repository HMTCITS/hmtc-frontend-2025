'use client';

import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import Typography from '@/components/Typography';
import AuthLayout from '@/layouts/AuthLayout';
import { api } from '@/lib/api/api';
import { buildPayload } from '@/lib/api/api.utils';

type RegisterFormTypes = {
  full_name: string;
  email: string;
  password: string;
};

type RegisterResponse = {
  status?: boolean;
  message?: string;
  data?: unknown;
};

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<RegisterFormTypes>({
    mode: 'onSubmit',
    defaultValues: { full_name: '', email: '', password: '' },
  });
  const { handleSubmit } = form;

  const registerMutation = useMutation({
    mutationFn: async (
      values: RegisterFormTypes,
    ): Promise<RegisterResponse> => {
      const { data, headers } = buildPayload('/user/register', {
        full_name: values.full_name,
        email: values.email,
        password: values.password,
      });
      const res = await api.post('/user/register', data, { headers });
      return res.data as RegisterResponse;
    },
    onSuccess: (res) => {
      toast.success(res?.message || 'Registration success. Please login.');
      router.push('/login');
    },
    onError: (err: any) => {
      const message: string =
        err?.response?.data?.message ||
        err?.message ||
        'Registration Failed. Please try again.';
      toast.error(message);
    },
  });

  const onSubmit = (values: RegisterFormTypes) => {
    registerMutation.mutate(values);
  };

  return (
    <AuthLayout>
      <div className='py-4'>
        <Typography
          as='h1'
          variant='j0'
          className='font-adelphe text-3xl font-bold md:text-4xl lg:text-5xl'
        >
          Register
        </Typography>
        <Typography as='p' className='mb-2 font-satoshi text-slate-600'>
          Please complete the form below to create your new account
        </Typography>
      </div>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
          <div className='space-y-4'>
            <Input
              id='full_name'
              label='Full Name'
              placeholder='Enter your full name'
              containerClassName='font-satoshi'
              validation={{
                required: 'Name cannot be empty',
                minLength: {
                  value: 5,
                  message: 'Full name must be at least 5 characters',
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: 'Full name must only contain letters and spaces',
                },
              }}
              inputMode='text'
              autoComplete='name'
            />

            <Input
              id='email'
              label='Email'
              placeholder='Enter your email'
              containerClassName='font-satoshi'
              validation={{
                required: 'Email cannot be empty',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Email is not valid',
                },
                maxLength: {
                  value: 254,
                  message: 'Email address is too long',
                },
              }}
              autoComplete='email'
            />

            <Input
              id='password'
              label='Password'
              placeholder='Enter your password'
              type='password'
              containerClassName='font-satoshi'
              validation={{
                required: 'Password cannot be empty',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message:
                    'Password must contain at least one letter and one number',
                },
              }}
              autoComplete='new-password'
            />
          </div>

          <Button
            type='submit'
            className='w-full rounded-md font-satoshi font-bold'
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? 'Processing...' : 'Register'}
          </Button>
        </form>

        <Typography as='div' className='space-x-1 text-center font-satoshi'>
          <Typography as='span' className='text-inherit' variant='s3'>
            Already have an account?
          </Typography>
          <Link
            href='/login'
            className='text-blue-500 underline decoration-white transition-colors duration-150 hover:decoration-blue-500'
          >
            <Typography as='span' className='text-inherit' variant='s3'>
              Login
            </Typography>
          </Link>
        </Typography>
      </FormProvider>
    </AuthLayout>
  );
}
