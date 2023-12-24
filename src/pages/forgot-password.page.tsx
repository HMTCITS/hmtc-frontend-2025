import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import AuthLayout from '@/components/layouts/AuthLayout';
import BaseLink from '@/components/links/BaseLink';
import Typography from '@/components/typography/Typography';

type ForgotPasswordForm = {
  email: string;
};

export default function ForgotPasswordPage() {
  const form = useForm<ForgotPasswordForm>();
  const { handleSubmit } = form;
  const onSubmit = (data: ForgotPasswordForm) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };
  return (
    <AuthLayout>
      <div className='space-y-4'>
        <Typography
          variant='j0'
          className='font-primary text-3xl md:text-4xl lg:text-5xl'
        >
          Lupa Kata Sandi
        </Typography>
        <Typography className='font-primary'>
          Masukkan email untuk pemulihan kata sandi. Link untuk atur ulang kata
          sandi akan dikirimkan melalui email.
        </Typography>
      </div>
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
      <Typography as='div' className='space-x-1 text-center font-secondary'>
        <span>Ingat kata sandi Anda?</span>
        <BaseLink
          href='/login'
          className='text-blue-500 underline decoration-white transition-colors duration-150 hover:decoration-blue-500'
        >
          Masuk
        </BaseLink>
      </Typography>
    </AuthLayout>
  );
}
