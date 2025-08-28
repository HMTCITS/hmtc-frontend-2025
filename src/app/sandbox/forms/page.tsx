'use client';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Input from '@/components/forms/Input';
import Button from '@/components/buttons/Button';
import { Mail, Lock, User } from 'lucide-react';

export default function FormsSandbox() {
  const methods = useForm({
    defaultValues: { email: '', password: '', username: '' },
  });
  const { handleSubmit } = methods;
  const onSubmit = (data: any) => alert(JSON.stringify(data, null, 2));

  return (
    <main className='space-y-10 p-8'>
      <h1 className='font-adelphe text-3xl font-bold'>Form Inputs</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-xl space-y-6'>
          <Input
            id='email'
            label='Email'
            leftIcon={Mail}
            placeholder='you@mail.com'
            validation={{ required: 'Email wajib diisi' }}
          />
          <Input
            id='password'
            type='password'
            label='Password'
            leftIcon={Lock}
            placeholder='********'
            validation={{ required: 'Password wajib diisi' }}
          />
          <Input
            id='username'
            label='Username (Addon)'
            addon='@'
            placeholder='hmtc'
            validation={{ minLength: { value: 3, message: 'Min 3 char' } }}
          />
          <Input
            id='readonly'
            label='Read Only'
            readOnly
            value='Static value'
            onChange={() => {}}
          />
          <Input
            id='nolabel'
            label={null}
            placeholder='No label input'
            helperText='Contoh helper text'
          />
          <Input
            id='disabled'
            label='Disabled'
            disabled
            placeholder='Tidak bisa edit'
          />
          <div className='pt-2'>
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </FormProvider>
    </main>
  );
}
