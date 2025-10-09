'use client';

import { CheckCircle2, Droplets, Layers, TriangleAlert } from 'lucide-react';
import dynamic from 'next/dynamic';
import * as React from 'react';

import ApplyMagangForm from '@/app/ayomeludaftarmagang/components/ApplyMagangForm';
import GlassSurface from '@/components/GlassSurface';
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
import { Switch } from '@/components/ui/switch';
import { useApplyMagang } from '@/hooks/api/useApplyMagang';
import { useScheduleAutoRedirect } from '@/hooks/useSchedule';

/**
 * Page: Rekrutmen Anak Magang
 *
 * This page composes the form component and the status dialogs (success/error).
 * Data submission is delegated to a dedicated TanStack mutation hook.
 */
export default function ApplyMagangPage() {
  const [liquidEnabled, setLiquidEnabled] = React.useState(true);
  const [glassEnabled, setGlassEnabled] = React.useState(true);

  // Check for reduced motion preference
  React.useEffect(() => {
    try {
      const prefersReduced =
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        setLiquidEnabled(false);
        setGlassEnabled(false);
      }
    } catch {
      /* noop */
    }
  }, []);

  // Battery status check
  React.useEffect(() => {
    let isMounted = true;
    const anyNavigator: any =
      typeof navigator !== 'undefined' ? navigator : null;
    if (anyNavigator && typeof anyNavigator.getBattery === 'function') {
      anyNavigator
        .getBattery()
        .then((bat: any) => {
          if (!isMounted || !bat) return;
          const update = () => {
            if (!isMounted) return;
            // Disable effects when battery is low and not charging
            if (bat.level < 0.2 && !bat.charging) {
              setLiquidEnabled(false);
              setGlassEnabled(false);
            }
          };
          update();
          bat.addEventListener('levelchange', update);
          bat.addEventListener('chargingchange', update);
        })
        .catch(() => {
          /* ignore */
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string>('');

  const { mutateAsync } = useApplyMagang();
  useScheduleAutoRedirect(5000, '/ayomeludaftarmagang');

  const etherColors = React.useMemo(
    () => ['#5227FF', '#FF9FFC', '#B19EEF'],
    [],
  );

  const LiquidEtherNoSSR = React.useMemo(
    () =>
      dynamic(() => import('@/components/LiquidEther'), {
        ssr: false,
        loading: () => (
          <div className='absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black' />
        ),
      }),
    [],
  );

  return (
    <section className='relative min-h-screen w-full overflow-hidden'>
      <div className='absolute inset-0 -z-10 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black'>
        {liquidEnabled ? (
          <LiquidEtherNoSSR
            colors={etherColors}
            mouseForce={20}
            cursorSize={120}
            isViscous={true}
            viscous={40}
            iterationsViscous={35}
            iterationsPoisson={32}
            resolution={0.3}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.7}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
            adaptiveQuality={true}
            style={{ width: '100%', height: '100%', position: 'relative' }}
          />
        ) : null}
      </div>

      {/* Visual Effect Toggle Switches */}
      <div className='absolute top-4 right-4 z-10 flex flex-col gap-2 rounded-lg bg-black/30 p-3 backdrop-blur-sm'>
        <div className='flex items-center gap-2'>
          <Droplets className='h-4 w-4 text-blue-400' />
          <span className='text-xs font-medium text-white'>Liquid Effect</span>
          <Switch
            checked={liquidEnabled}
            onCheckedChange={setLiquidEnabled}
            className='ml-1'
          />
        </div>
        <div className='flex items-center gap-2'>
          <Layers className='h-4 w-4 text-purple-400' />
          <span className='text-xs font-medium text-white'>Glass Effect</span>
          <Switch
            checked={glassEnabled}
            onCheckedChange={setGlassEnabled}
            className='ml-1'
          />
        </div>
      </div>

      <main className='mx-auto w-full max-w-3xl px-5 py-12 md:px-8 md:py-20'>
        {glassEnabled ? (
          <GlassSurface
            width='100%'
            height='auto'
            borderRadius={24}
            brightness={55}
            opacity={0.86}
            blur={14}
            backgroundOpacity={0.18}
            saturation={1.4}
            distortionScale={-160}
            displace={6}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            mixBlendMode='screen'
            className='pointer-events-none shadow-xl'
          >
            <div className='pointer-events-auto w-full p-6 md:p-10'>
              <Card className='border-0 bg-transparent shadow-none'>
                <CardHeader className='space-y-2 pb-0'>
                  <CardTitle>
                    <Typography
                      as='h1'
                      font='satoshi'
                      weight='bold'
                      className='bg-gradient-to-r from-indigo-400 via-pink-300 to-purple-300 bg-clip-text text-3xl leading-tight tracking-tight text-transparent md:text-4xl'
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
          </GlassSurface>
        ) : (
          <div className='w-full rounded-3xl bg-slate-800/50 p-6 shadow-xl md:p-10'>
            <Card className='border-0 bg-transparent shadow-none'>
              <CardHeader className='space-y-2 pb-0'>
                <CardTitle>
                  <Typography
                    as='h1'
                    font='satoshi'
                    weight='bold'
                    className='bg-gradient-to-r from-indigo-400 via-pink-300 to-purple-300 bg-clip-text text-3xl leading-tight tracking-tight text-transparent md:text-4xl'
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
        )}
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
              <TriangleAlert className='h-5 w-5 text-red-600' /> Gagal Mengirim
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
    </section>
  );
}
