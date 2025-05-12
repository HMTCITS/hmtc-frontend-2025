'use client';

import Link from 'next/link';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import Typography from '@/components/Typography';
import AuthLayout from '@/layouts/AuthLayout';

type ForgotPasswordFormTypes = {
  email: string;
};

export default function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const form = useForm<ForgotPasswordFormTypes>();
  const { handleSubmit } = form;

  const onSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <AuthLayout>
      <div className='space-y-4'>
        <Typography
          as='h1'
          variant='j0'
          className='font-primary text-3xl md:text-4xl lg:text-5xl'
        >
          {isSubmitted ? 'Periksa Email Anda' : 'Lupa Kata Sandi'}
        </Typography>
        {!isSubmitted && (
          <Typography as='p' className='font-primary'>
            Masukkan email untuk pemulihan kata sandi. Link untuk atur ulang
            kata sandi akan dikirimkan melalui email.
          </Typography>
        )}
      </div>
      {isSubmitted ? (
        <div className='font-primary space-y-6'>
          <Typography as='p'>
            Anda akan menerima tautan di email yang Anda berikan dan
            memungkinkan Anda memverifikasi resmi akun Anda.
          </Typography>
          <Typography as='p' variant='h4'>
            example.test@gmail.com
          </Typography>
          <Typography as='p'>
            Jika Anda tidak melihat email tersebut, periksa tempat lain yang
            mungkin ada, seperti folder sampah, spam, sosial, atau lainnya.
          </Typography>
          <Typography as='p'>
            Anda tidak menerima email?{' '}
            <button className='text-end font-medium text-blue-500 underline decoration-white transition-colors duration-150 hover:decoration-blue-500'>
              Kirim ulang tautan
            </button>
          </Typography>
        </div>
      ) : (
        <>
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              <Input
                id='email'
                label='Alamat Email'
                placeholder='example@gmail.com'
                containerClassName='font-secondary'
                validation={{ required: 'Email tidak boleh kosong' }}
              />
              <Button type='submit' className='w-full'>
                Kirim
              </Button>
            </form>
          </FormProvider>
          <Typography as='div' className='font-secondary space-x-1 text-center'>
            <Typography as='span' className='text-inherit'>
              Ingat kata sandi Anda?
            </Typography>
            <Link
              href='/login'
              className='text-blue-500 underline decoration-white transition-colors duration-150 hover:decoration-blue-500'
            >
              <Typography as='span' className='text-inherit'>
                Masuk
              </Typography>
            </Link>
          </Typography>
        </>
      )}
    </AuthLayout>
  );
}
