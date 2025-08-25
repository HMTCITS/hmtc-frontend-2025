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

type LoginFormTypes = {
  email: string;
  password: string;
};

type LoginSuccessResponse = {
  status?: boolean;
  message?: string;
  data?: unknown;
};

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginFormTypes>({
    mode: 'onSubmit',
    defaultValues: { email: '', password: '' },
  });
  const { handleSubmit } = form;

  const loginMutation = useMutation({
    mutationFn: async (
      values: LoginFormTypes,
    ): Promise<LoginSuccessResponse> => {
      const { data, headers } = buildPayload('/auth/login', {
        email: values.email,
        password: values.password,
      });
      const res = await api.post('/auth/login', data, { headers });
      return res.data as LoginSuccessResponse;
    },
    onSuccess: (res) => {
      toast.success(res?.message || 'Login Success');
      router.push('/');
    },
    onError: (err: any) => {
      const message: string =
        err?.response?.data?.message ||
        err?.message ||
        'Login failed. Please try again.';
      toast.error(message);
    },
  });

  const onSubmit = (values: LoginFormTypes) => {
    loginMutation.mutate(values);
  };

  return (
    <AuthLayout>
      <div className='grid gap-[16px]'>
        <Typography
          as='h1'
          variant='j0'
          className='font-adelphe text-3xl font-bold md:text-4xl lg:text-5xl'
        >
          Login
        </Typography>
        <Typography as='p' className='font-satoshi text-slate-600'>
          Type in your email and password, then dive back in
        </Typography>

        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className='grid gap-[16px]'>
            <div className='grid gap-y-[12px]'>
              <Input
                id='email'
                label='Email'
                placeholder='Masukkan email Anda'
                containerClassName='font-satoshi'
                validation={{
                  required: 'Email tidak boleh kosong',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Email tidak valid',
                  },
                }}
                inputMode='email'
                autoComplete='username'
              />

              <div className='flex flex-col items-end space-y-[12px]'>
                <Input
                  id='password'
                  label='Password'
                  placeholder='Masukkan password Anda'
                  type='password'
                  containerClassName='font-satoshi w-full'
                  validation={{
                    required: 'Password tidak boleh kosong',
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message:
                        'Password harus terdiri dari minimal 8 karakter, dan mengandung huruf serta angka',
                    },
                  }}
                  autoComplete='current-password'
                />
                <Link
                  href='/change-password'
                  className='text-blue-500 underline decoration-white transition-colors duration-150 hover:decoration-blue-500'
                >
                  <Typography as='span' className='text-inherit' variant='s3'>
                    Forgot Password?
                  </Typography>
                </Link>
              </div>
            </div>

            <Button
              type='submit'
              className='w-full rounded-xl font-satoshi font-bold'
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'Processing…' : 'Login'}
            </Button>
          </form>

          <Typography
            as='div'
            className='space-x-1 text-center font-satoshi font-medium'
          >
            <Typography as='span' className='text-inherit' variant='s3'>
              Don&apos;t have an account?
            </Typography>
            <Link
              href='/register'
              className='text-blue-500 underline decoration-white transition-colors duration-150 hover:decoration-blue-500'
            >
              <Typography as='span' className='text-inherit' variant='s3'>
                Register now
              </Typography>
            </Link>
          </Typography>
        </FormProvider>
      </div>
    </AuthLayout>
  );
}
