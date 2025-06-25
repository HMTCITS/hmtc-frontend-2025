'use client';

import Link from 'next/link';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import Typography from '@/components/Typography';
import AuthLayout from '@/layouts/AuthLayout';

type RegisterFormTypes = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const form = useForm<RegisterFormTypes>();
  const { handleSubmit } = form;

  const onSubmit = (_data: RegisterFormTypes) => {
    // console.log(data);
  };

  return (
    <AuthLayout>
      <div className='space-y-3'>
        <Typography
          as='h1'
          variant='j0'
          className='font-satoshi font-semibold text-3xl md:text-4xl lg:text-5xl'
        >
          Daftar
        </Typography>
        <Typography as='p' className='font-satoshi text-slate-600 mb-2'>
          Silakan mengisi formulir di bawah ini untuk membuat akun baru
        </Typography>
      </div>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
          <div className='space-y-4'>
            <Input
              id='name'
              label='Nama Lengkap'
              placeholder='Masukkan nama lengkap Anda'
              containerClassName='font-satoshi'
              validation={{ required: 'Nama lengkap tidak boleh kosong' }}
            />
            <Input
              id='email'
              label='Email'
              placeholder='Masukkan email Anda'
              containerClassName='font-satoshi'
              validation={{ required: 'Email tidak boleh kosong' }}
            />
            <Input
              id='password'
              label='Kata Sandi'
              placeholder='Masukkan kata sandi Anda'
              containerClassName='font-satoshi'
              validation={{ required: 'Kata sandi tidak boleh kosong' }}
            />
          </div>
          <Button type='submit' className='w-full font-satoshi font-bold rounded-md'>
            Daftar
          </Button>
        </form>
        <Typography as='div' className='font-satoshi space-x-1 text-center'>
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
