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
  nrp: string;
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
    defaultValues: { nrp: '' },
  });
  const { handleSubmit } = form;

  const loginMutation = useMutation({
    mutationFn: async (
      values: LoginFormTypes,
    ): Promise<LoginSuccessResponse> => {
      const { data, headers } = buildPayload('/auth/login', {
        nrp: values.nrp,
      });
      const res = await api.post('/auth/login', data, { headers });
      return res.data as LoginSuccessResponse;
    },
    onSuccess: (res) => {
      toast.success(res?.message || 'Login berhasil');
      router.push('/');
    },
    onError: (err: any) => {
      const message: string =
        err?.response?.data?.message ||
        err?.message ||
        'Login gagal. Silakan coba lagi.';
      toast.error(message);
    },
  });

  const onSubmit = (values: LoginFormTypes) => {
    loginMutation.mutate(values);
  };

  return (
    <AuthLayout>
      <div className='space-y-4'>
        <Typography
          as='h1'
          variant='j0'
          className='font-satoshi text-3xl font-semibold md:text-4xl lg:text-5xl'
        >
          Login
        </Typography>
        <Typography as='p' className='mb-2 font-satoshi text-slate-600'>
          Masukkan NRP untuk mengakses akun
        </Typography>
      </div>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-4'>
            <Input
              id='nrp'
              label='NRP'
              placeholder='Masukkan NRP (10 digit)'
              containerClassName='font-satoshi'
              validation={{
                required: 'NRP tidak boleh kosong',
                pattern: {
                  value: /^\d{10}$/,
                  message: 'NRP harus 10 digit',
                },
              }}
              inputMode='numeric'
              autoComplete='username'
            />
          </div>

          <Button
            type='submit'
            className='w-full rounded-md font-satoshi font-bold'
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Memproses…' : 'Login'}
          </Button>
        </form>

        <Typography as='div' className='font-secondary space-x-1 text-center'>
          <Typography as='span' className='text-inherit'>
            Belum punya akun?
          </Typography>
          <Link
            href='/register'
            className='text-blue-500 underline decoration-white transition-colors duration-150 hover:decoration-blue-500'
          >
            <Typography as='span' className='text-inherit'>
              Daftar
            </Typography>
          </Link>
        </Typography>
      </FormProvider>
    </AuthLayout>
  );
}
