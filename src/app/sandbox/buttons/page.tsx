'use client';
import { ArrowRight, Check, Loader2, X } from 'lucide-react';
import React from 'react';

import Button from '@/components/buttons/Button';

export default function ButtonsSandbox() {
  const variants: any[] = [
    'primary',
    'secondary',
    'netral',
    'light',
    'warning',
    'unstyled',
  ];
  const sizes: any[] = ['small', 'base', 'large'];
  return (
    <main className='space-y-10 p-8'>
      <h1 className='font-adelphe text-3xl font-bold'>Buttons</h1>
      <section className='space-y-4'>
        <h2 className='font-satoshi text-xl font-semibold'>Variants & Sizes</h2>
        <div className='flex flex-col gap-6'>
          {variants.map((v) => (
            <div key={v} className='space-y-2'>
              <p className='text-sm font-medium'>{v}</p>
              <div className='flex flex-wrap gap-3'>
                {sizes.map((s) => (
                  <Button key={s} variant={v} size={s}>
                    {v}-{s}
                  </Button>
                ))}
                <Button variant={v} size='base' isLoading>
                  Loading
                </Button>
                <Button variant={v} size='base' leftIcon={Check}>
                  Left Icon
                </Button>
                <Button variant={v} size='base' rightIcon={ArrowRight}>
                  Right Icon
                </Button>
                <Button
                  variant={v}
                  size='base'
                  icon={X}
                  aria-label='Icon only'
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className='space-y-2'>
        <h2 className='font-satoshi text-xl font-semibold'>
          Disabled & Loading State
        </h2>
        <div className='flex flex-wrap gap-4'>
          <Button disabled>Disabled</Button>
          <Button isLoading leftIcon={Loader2}>
            Loading with Icon
          </Button>
        </div>
      </section>
      <section className='space-y-3'>
        <h2 className='font-satoshi text-xl font-semibold'>Notes</h2>
        <ul className='list-disc pl-6 text-sm text-muted-foreground'>
          <li>
            Variant <code>warning</code> dan <code>unstyled</code> belum
            memiliki styling khusus di komponen; tampil default.
          </li>
          <li>
            <code>isLoading</code> akan menampilkan spinner dan menyembunyikan
            teks.
          </li>
        </ul>
      </section>
    </main>
  );
}
