'use client';
import React, { useState } from 'react';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import { Button } from '@/components/ui/button';
import { Check, Loader2, Trash2 } from 'lucide-react';

export default function ConfirmModalSandbox() {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<
    'neutral' | 'info' | 'success' | 'danger' | 'warning'
  >('neutral');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');

  return (
    <main className='space-y-10 p-8'>
      <h1 className='font-adelphe text-3xl font-bold'>
        Confirm Modal (Advanced)
      </h1>
      <section className='space-y-4'>
        <div className='flex flex-wrap gap-4'>
          {(['neutral', 'info', 'success', 'danger', 'warning'] as const).map(
            (v) => (
              <Button
                key={v}
                variant='outline'
                onClick={() => {
                  setVariant(v);
                  setOpen(true);
                }}
              >
                {v}
              </Button>
            ),
          )}
        </div>
        <div className='flex flex-wrap gap-3'>
          {(['sm', 'md', 'lg'] as const).map((s) => (
            <Button
              key={s}
              variant={size === s ? 'default' : 'outline'}
              onClick={() => setSize(s)}
            >
              {s}
            </Button>
          ))}
        </div>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
      </section>
      <ConfirmModal
        open={open}
        onOpenChange={setOpen}
        variant={variant}
        size={size}
        title={'Delete Item'}
        subtitle={'Tindakan ini tidak dapat dibatalkan.'}
        actions={[
          { id: 'cancel', label: 'Cancel', variant: 'outline' },
          {
            id: 'delete',
            label: 'Delete',
            leadingIcon: <Trash2 className='h-4 w-4' />,
            variant: 'destructive',
            autoFocus: true,
            autoCloseOnResolve: true,
            onClick: async () => {
              await new Promise((r) => setTimeout(r, 1200));
            },
          },
          {
            id: 'approve',
            label: 'Approve',
            leadingIcon: <Check className='h-4 w-4' />,
            variant: 'default',
            onClick: async () => {
              await new Promise((r) => setTimeout(r, 800));
            },
          },
        ]}
        primaryOnEnter
        closeOnOverlayClick
        closeOnEsc
      >
        <p className='text-sm text-muted-foreground'>
          Pastikan Anda yakin sebelum melanjutkan. Klik Delete untuk menghapus
          item atau Cancel untuk membatalkan.
        </p>
        <div className='mt-4 flex items-center gap-2 rounded border p-2 text-xs'>
          <Loader2 className='h-4 w-4 animate-spin' /> Async actions simulate
          network delay
        </div>
      </ConfirmModal>
    </main>
  );
}
