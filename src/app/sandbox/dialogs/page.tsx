'use client';
import React, { useState } from 'react';
import BaseDialog, { DialogOptions } from '@/components/dialog/BaseDialog';
import ConfirmDialog from '@/components/dialog/ConfirmModal';
import Button from '@/components/buttons/Button';

export default function DialogsSandbox() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<DialogOptions>({
    title: 'Title',
    description: 'Description of dialog',
    variant: 'success',
    submitText: 'Submit',
    cancelText: 'Cancel',
  });

  const trigger = (variant: DialogOptions['variant']) => {
    setOptions({
      title: variant.toUpperCase() + ' Dialog',
      description: 'This is a ' + variant + ' dialog example',
      variant,
      submitText: 'Ok',
      cancelText: 'Close',
    });
    setOpen(true);
  };

  return (
    <main className='space-y-10 p-8'>
      <h1 className='font-adelphe text-3xl font-bold'>Dialogs</h1>
      <section className='space-y-4'>
        <h2 className='font-satoshi text-xl font-semibold'>BaseDialog</h2>
        <div className='flex flex-wrap gap-4'>
          {(['success', 'warning', 'danger'] as const).map((v) => (
            <Button key={v} onClick={() => trigger(v)} variant='primary'>
              Open {v}
            </Button>
          ))}
        </div>
        <BaseDialog
          open={open}
          onSubmit={() => {
            alert('Submit clicked');
            setOpen(false);
          }}
          onClose={() => setOpen(false)}
          options={options}
        />
      </section>
      <section className='space-y-4'>
        <h2 className='font-satoshi text-xl font-semibold'>
          ConfirmDialog (Simple)
        </h2>
        <ConfirmDialog />
      </section>
    </main>
  );
}
