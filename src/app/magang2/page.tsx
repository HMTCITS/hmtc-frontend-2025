'use client';

import { CheckCircle2, TriangleAlert } from 'lucide-react';
import React from 'react';

import ApplyMagangForm from '@/app/magang2/components/ApplyMagangForm';
import PlaneBackground from '@/app/magang2/components/PlaneBackground';
import TitleAnimation from '@/app/magang2/components/TitleAnimation';
import Typography from '@/components/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogAction,
  DialogCancel,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useApplyMagang } from '@/hooks/api/useApplyMagang';

export default function Magang2Page() {
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string>('');

  const { mutateAsync } = useApplyMagang();

  return (
    <div className='relative w-full'>
      {/* Black background overlay for top area (above PlaneBackground) */}
      <div className='absolute inset-x-0 top-0 -z-10 h-[80vh] bg-black'></div>

      {/* Main content */}
      <div className='relative z-10 min-h-screen w-full'>
        <main className='mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-20'>
          <div className='grid grid-cols-1 items-center justify-center gap-12 lg:grid-cols-1'>
            {/* Top - Header */}
            <div className='mt-[10rem] flex items-start justify-start'>
              <TitleAnimation />
              {/* <IdleAnimation /> */}
            </div>

            {/* Bottom - Form */}
            <div className='mx-auto mb-32 w-full max-w-xl'>
              <Card className='border-1 border-white/10 bg-white/1 shadow-xl backdrop-blur-sm'>
                <CardHeader className='space-y-2 pb-0'>
                  <CardTitle>
                    <Typography
                      as='h1'
                      font='satoshi'
                      weight='bold'
                      className='text-3xl leading-tight tracking-tight text-white md:text-4xl'
                    >
                      Rekrutmen Anak Magang HMTC
                    </Typography>
                  </CardTitle>
                  <Typography
                    as='p'
                    variant='b4'
                    className='text-base text-white/80 md:text-lg'
                  >
                    Silakan isi data diri dengan benar dan unggah file mindmap
                    sesuai ketentuan.
                  </Typography>
                </CardHeader>
                <CardContent className='pt-6'>
                  <ApplyMagangForm
                    submitFn={(p) =>
                      mutateAsync({
                        nama: p.nama,
                        nrp: p.nrp,
                        kelompokKP: p.kelompokKP,
                        mindmap: p.mindmap,
                      })
                    }
                    onSubmitSuccess={() => setOpenSuccess(true)}
                    onSubmitError={(msg) => {
                      setErrorMsg(msg);
                      setOpenError(true);
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Success Dialog */}
        <Dialog open={openSuccess} onOpenChange={setOpenSuccess}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='inline-flex items-center gap-2'>
                <CheckCircle2 className='h-5 w-5 text-green-600' /> Berhasil
              </DialogTitle>
              <DialogDescription>
                Pendaftaran magang Anda berhasil dikirim.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogAction onClick={() => setOpenSuccess(false)}>
                Tutup
              </DialogAction>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Error Dialog */}
        <Dialog open={openError} onOpenChange={setOpenError}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='inline-flex items-center gap-2'>
                <TriangleAlert className='h-5 w-5 text-red-600' /> Gagal
                Mengirim
              </DialogTitle>
              <DialogDescription>
                {errorMsg ||
                  'Terjadi kesalahan saat mengirim data. Coba lagi nanti.'}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogCancel onClick={() => setOpenError(false)}>
                Tutup
              </DialogCancel>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Background anchored from bottom - follows scroll */}
      <PlaneBackground />
    </div>
  );
}
