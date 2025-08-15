'use client';

import React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col bg-radial-[at_25%_25%] from-[#4C5DF5] from-35% to-[#AEE0FF]'>
      <main className='flex flex-1 flex-col items-center justify-center px-4'>
        <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md'>
          {children}
        </div>
      </main>
    </div>
  );
}