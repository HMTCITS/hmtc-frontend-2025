'use client';

import React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col bg-radial-[at_25%_25%] from-[#4C5DF5] from-35% to-[#AEE0FF]'>
      <main className='flex flex-1 flex-col items-center justify-center px-4'>
        <div className='w-full max-w-md rounded-xl bg-white px-[52px] py-[32px]'>
          {children}
        </div>
      </main>
    </div>
  );
}