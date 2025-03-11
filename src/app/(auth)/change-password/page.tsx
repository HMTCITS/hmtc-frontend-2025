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

export default function Page() {
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
          className='font-primary text-3xl md:text-4xl lg:text-5xl'
        >
          Atur Ulang Kata Sandi
        </Typography>
        <Typography as='p' className='font-primary'>
          Masukkan email untuk pemulihan kata sandi. Link untuk atur ulang kata
          sandi akan dikirimkan melalui email.
        </Typography>
      </div>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <Input
              id='password'
              label='Kata Sandi'
              placeholder='Masukkan kata sandi Anda'
              containerClassName='font-secondary'
              validation={{ required: 'Kata sandi tidak boleh kosong' }}
            />
            <Input
              id='password_confirm'
              label='Konfirmasi Kata Sandi'
              placeholder='Masukkan kembali kata sandi Anda'
              containerClassName='font-secondary'
              validation={{
                required: 'Konfirmasi Kata sandi tidak boleh kosong',
                validate: (value) =>
                  value === wpassword || 'Kata sandi berbeda',
              }}
            />
          </div>
          <Button type='submit' className='w-full'>
            Ubah kata sandi
          </Button>
        </form>
      </FormProvider>
      <Typography as='div' className='space-x-1 text-center font-secondary'>
        <Typography as='span' className='text-inherit'>
          Atau kembali ke
        </Typography>
        <Link
          href='/'
          className='text-blue-500 underline decoration-white transition-colors duration-150 hover:decoration-blue-500'
        >
          <Typography as='span' className='text-inherit'>
            halaman utama
          </Typography>
        </Link>
      </Typography>
    </AuthLayout>
  );
}
