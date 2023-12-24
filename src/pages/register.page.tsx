import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import AuthLayout from '@/components/layouts/AuthLayout';
import BaseLink from '@/components/links/BaseLink';
import Typography from '@/components/typography/Typography';

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

export default function LoginPage() {
  const form = useForm<RegisterForm>();
  const { handleSubmit } = form;
  const onSubmit = (data: RegisterForm) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };
  return (
    <AuthLayout>
      <div className='space-y-3'>
        <Typography
          variant='j0'
          className='font-primary text-3xl md:text-4xl lg:text-5xl'
        >
          Daftar
        </Typography>
        <Typography className='font-primary'>
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
              containerClassName='font-secondary'
              validation={{ required: 'Nama lengkap tidak boleh kosong' }}
            />
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
          <Button type='submit' className='w-full'>
            Daftar
          </Button>
        </form>
        <Typography as='div' className='space-x-1 text-center font-secondary'>
          <span>Sudah punya akun?</span>
          <BaseLink
            href='/login'
            className='text-blue-500 underline decoration-white transition-colors duration-150 hover:decoration-blue-500'
          >
            Masuk
          </BaseLink>
        </Typography>
      </FormProvider>
    </AuthLayout>
  );
}
