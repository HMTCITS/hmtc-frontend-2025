'use client';

import React from 'react';

type ChangePassLayoutProps = {
  children: React.ReactNode;
};

export default function ChangePassLayout({ children }: ChangePassLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col bg-radial-[at_25%_25%] from-[#4C5DF5] from-35% to-[#AEE0FF]'>
      <main className='flex flex-1 flex-col items-center justify-center px-4'>
        <div className='w-full max-w-[526px] rounded-xl bg-white px-[32px] py-[24px]'>
          {children}
        </div>
      </main>
    </div>
  );
}