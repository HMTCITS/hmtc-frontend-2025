'use client';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export default function ToasterSandbox() {
  return (
    <main className='space-y-10 p-8'>
      <h1 className='font-adelphe text-3xl font-bold'>Toaster / Sonner</h1>
      <div className='flex flex-wrap gap-4'>
        <Button onClick={() => toast('Default Toast')}>Default</Button>
        <Button
          variant='secondary'
          onClick={() => toast.success('Success message')}
        >
          Success
        </Button>
        <Button
          variant='destructive'
          onClick={() => toast.error('Error message')}
        >
          Error
        </Button>
        <Button
          variant='outline'
          onClick={() =>
            toast.info('Info toast with action', {
              action: { label: 'Undo', onClick: () => alert('Undo') },
            })
          }
        >
          Info + Action
        </Button>
      </div>
      <Toaster richColors position='top-center' />
    </main>
  );
}
