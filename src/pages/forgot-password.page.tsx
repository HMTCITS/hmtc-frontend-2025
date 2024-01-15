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
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const form = useForm<ForgotPasswordForm>();
  const { handleSubmit } = form;
  const onSubmit = () => {
    setIsSubmitted(true);
  };
  return (
    <AuthLayout>
      <div className='space-y-4'>
        <Typography
          variant='j0'
          className='font-primary text-3xl md:text-4xl lg:text-5xl'
        >
          {isSubmitted ? 'Periksa Email Anda' : 'Lupa Kata Sandi'}
        </Typography>
        {!isSubmitted && (
          <Typography className='font-primary'>
            Masukkan email untuk pemulihan kata sandi. Link untuk atur ulang
            kata sandi akan dikirimkan melalui email.
          </Typography>
        )}
      </div>
      {isSubmitted ? (
        <div className='space-y-6 font-primary'>
          <Typography>
            Anda akan menerima tautan di email yang Anda berikan dan
            memungkinkan Anda memverifikasi resmi akun Anda.
          </Typography>
          <Typography variant='h4'>example.test@gmail.com</Typography>
          <Typography>
            Jika Anda tidak melihat email tersebut, periksa tempat lain yang
            mungkin ada, seperti folder sampah, spam, sosial, atau lainnya.
          </Typography>
          <Typography>
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
          <Typography as='div' className='space-x-1 text-center font-secondary'>
            <span>Ingat kata sandi Anda?</span>
            <BaseLink
              href='/login'
              className='text-blue-500 underline decoration-white transition-colors duration-150 hover:decoration-blue-500'
            >
              Masuk
            </BaseLink>
          </Typography>
        </>
      )}
    </AuthLayout>
  );
}
