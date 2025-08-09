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
  nrp: string;
  departement_name: string;
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
    defaultValues: { nrp: '', departement_name: '' },
  });
  const { handleSubmit } = form;

  const registerMutation = useMutation({
    mutationFn: async (
      values: RegisterFormTypes,
    ): Promise<RegisterResponse> => {
      const { data, headers } = buildPayload('/user/register', {
        nrp: values.nrp,
        departement_name: values.departement_name,
      });
      const res = await api.post('/user/register', data, { headers });
      return res.data as RegisterResponse;
    },
    onSuccess: (res) => {
      toast.success(res?.message || 'Registrasi berhasil. Silakan login.');
      router.push('/login');
    },
    onError: (err: any) => {
      const message: string =
        err?.response?.data?.message ||
        err?.message ||
        'Registrasi gagal. Silakan coba lagi.';
      toast.error(message);
    },
  });

  const onSubmit = (values: RegisterFormTypes) => {
    registerMutation.mutate(values);
  };

  return (
    <AuthLayout>
      <div className='space-y-3'>
        <Typography
          as='h1'
          variant='j0'
          className='font-satoshi text-3xl font-semibold md:text-4xl lg:text-5xl'
        >
          Daftar
        </Typography>
        <Typography as='p' className='mb-2 font-satoshi text-slate-600'>
          Isi NRP dan nama departemen untuk membuat akun baru
        </Typography>
      </div>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
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
            <Input
              id='departement_name'
              label='Nama Departemen'
              placeholder='Contoh: Creative Media Information'
              containerClassName='font-satoshi'
              validation={{
                required: 'Nama departemen tidak boleh kosong',
                maxLength: {
                  value: 100,
                  message: 'Nama departemen maksimal 100 karakter',
                },
              }}
              autoComplete='organization'
            />
          </div>

          <Button
            type='submit'
            className='w-full rounded-md font-satoshi font-bold'
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? 'Memproses…' : 'Daftar'}
          </Button>
        </form>

        <Typography as='div' className='space-x-1 text-center font-satoshi'>
          <Typography as='span' variant='b2'>
            Sudah punya akun?
          </Typography>
          <Link
            href='/login'
            className='text-blue-500 underline decoration-white transition-colors duration-150 hover:decoration-blue-500'
          >
            <Typography as='span' variant='b2'>
              Masuk
            </Typography>
          </Link>
        </Typography>
      </FormProvider>
    </AuthLayout>
  );
}
