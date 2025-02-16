'use client';

import Link from 'next/link';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import AuthLayout from '@/components/layouts/AuthLayout';
import Typography from '@/components/typography/Typography';

type LoginForm = {
  email: string;
  password: string;
};

export default function Page() {
  const form = useForm<LoginForm>();
  const { handleSubmit } = form;

  const onSubmit = (_data: LoginForm) => {
    // console.log(data);
  };

  return (
    <AuthLayout>
      <div className='space-y-4'>
        <Typography
          variant='j0'
          className='font-primary text-3xl md:text-4xl lg:text-5xl'
        >
          Masuk
        </Typography>
        <Typography className='font-primary'>
          Silakan masukkan informasi login untuk mengakses akun
        </Typography>
      </div>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-4'>
            <Input
              id='email'
              label='Email'
              placeholder='Masukkan email Anda'
              containerClassName='font-secondary'
              validation={{ required: 'Email tidak boleh kosong' }}
            />
            <Input
              id='password'
              label='Kata Sandi'
              placeholder='Masukkan kata sandi Anda'
              containerClassName='font-secondary'
              validation={{ required: 'Kata sandi tidak boleh kosong' }}
            />
          </div>
          <div className='flex items-center justify-end'>
            <Link
              href='/forgot-password'
              className='text-end font-secondary text-blue-500 underline decoration-white transition-colors duration-150 hover:decoration-blue-500'
            >
              Lupa kata sandi?
            </Link>
          </div>
          <Button type='submit' className='w-full'>
            Masuk
          </Button>
        </form>
        <Typography as='div' className='space-x-1 text-center font-secondary'>
          <span>Belum punya akun?</span>
          <Link
            href='/register'
            className='text-blue-500 underline decoration-white transition-colors duration-150 hover:decoration-blue-500'
          >
            Daftar
          </Link>
        </Typography>
      </FormProvider>
    </AuthLayout>
  );
}
