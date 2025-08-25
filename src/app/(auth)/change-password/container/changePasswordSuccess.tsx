'use client';

import Link from 'next/link';
import React from 'react';

import Button from '@/components/buttons/Button';
import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';
import ChangePassLayout from '@/layouts/ChangePassLayout';

export default function ChangePasswordSuccess() {
  return (
    <ChangePassLayout>
      <div className='grid justify-items-center gap-[30px] text-center'>
        <Typography as='h1' className='font-adelphe text-[28px] font-bold'>
          Password Changed Successfully
        </Typography>
        <NextImage
          src='/auth/change-password-success.png'
          alt='Change Password Success'
          width={316}
          height={323}
        />
        <Link href='/login' className='w-full'>
          <Button
            type='submit'
            className='w-full rounded-lg font-satoshi font-bold'
          >
            Go to Login
          </Button>
        </Link>
      </div>
    </ChangePassLayout>
  );
}