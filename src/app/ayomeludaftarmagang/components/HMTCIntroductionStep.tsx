'use client';

import { gsap } from 'gsap';
import {
  ArrowRight,
  Briefcase,
  Calendar,
  FileText,
  Phone,
  Sparkles,
  Users,
} from 'lucide-react';
import React, { useEffect, useRef } from 'react';

import GradientText from '@/components/reactbits/GradientText';
import Typography from '@/components/Typography';
import { Button } from '@/components/ui/button';
import {
  INTRO_CONTACTS,
  INTRO_CONTENT,
  INTRO_REQUIREMENTS,
  INTRO_TIME_LIMIT,
} from '@/contents/magangForm';

export interface HMTCIntroductionStepProps {
  onNext: () => void;
}

export default function HMTCIntroductionStep({
  onNext,
}: HMTCIntroductionStepProps) {
  React.useEffect(() => {}, []);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.intro-stagger',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.08,
          delay: 0.1,
        },
      );
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.1,
          duration: 4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          transformOrigin: 'center',
        });
      }
      if (iconRef.current) {
        gsap.to(iconRef.current, {
          rotate: 360,
          duration: 20,
          ease: 'linear',
          repeat: -1,
          transformOrigin: '50% 50%',
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const requirements = INTRO_REQUIREMENTS.map((r) => ({
    ...r,
    icon:
      r.iconId === 'Users'
        ? Users
        : r.iconId === 'FileText'
          ? FileText
          : r.iconId === 'Sparkles'
            ? Sparkles
            : Briefcase,
  }));

  return (
    <div ref={rootRef}>
      <div className='intro-stagger flex flex-col items-center justify-center space-y-3 text-center'>
        <Typography
          as='span'
          font='satoshi'
          className='inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-blue-400 backdrop-blur-sm'
        >
          {INTRO_CONTENT.badge}
        </Typography>
        <Typography
          as='h1'
          font='satoshi'
          weight='bold'
          className='text-4xl leading-tight text-balance text-amber-50 md:text-5xl'
        >
          {INTRO_CONTENT.title}
        </Typography>
        <GradientText
          colors={['#0052D4', '#2E6AF7', '#68B7FF', '#2E6AF7', '#0052D4']}
          animationSpeed={6}
          showBorder={false}
          className='!mx-0 rounded-none backdrop-blur-none'
        >
          <Typography
            as='h2'
            font='satoshi'
            weight='bold'
            className='text-2xl md:text-3xl'
          >
            {INTRO_CONTENT.gradientTitle}
          </Typography>
        </GradientText>
        <Typography
          as='p'
          font='satoshi'
          weight='semibold'
          className='text-lg text-primary'
        >
          {INTRO_CONTENT.subtitle}
        </Typography>
        <Typography
          as='p'
          font='satoshi'
          className='mx-auto max-w-2xl leading-relaxed text-balance text-amber-50'
        >
          {INTRO_CONTENT.paragraph}
        </Typography>
      </div>

      <div className='intro-stagger space-y-4'>
        <Typography
          as='h3'
          font='satoshi'
          weight='bold'
          className='mt-4 text-center text-2xl text-amber-50'
        >
          Apa yang Kami Butuhkan dari Anda?
        </Typography>
        <div className='mt-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
          {requirements.map((req, i) => {
            const Icon = req.icon;
            return (
              <div
                key={i}
                className='group pointer-events-auto relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-0 shadow-xl backdrop-blur-xs transition-all duration-300 hover:border-white/30'
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${req.grad}`}
                />
                <div className='relative z-10 p-6'>
                  <div className='mb-4 inline-flex rounded-xl bg-white/15 p-3 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/25'>
                    <Icon className='h-6 w-6 text-blue-400' />
                  </div>
                  <Typography
                    as='h4'
                    font='satoshi'
                    weight='bold'
                    className='mb-1 text-base text-amber-50'
                  >
                    {req.title}
                  </Typography>
                  <Typography
                    as='p'
                    font='satoshi'
                    className='text-sm leading-relaxed text-amber-50/70'
                  >
                    {req.desc}
                  </Typography>
                </div>
              </div>
            );
          })}
          <div className='group pointer-events-auto relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-xs transition-all duration-300 hover:border-white/30'>
            <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10' />
            <div className='relative z-10 p-8'>
              <div className='mb-4 flex items-center gap-3'>
                <div className='rounded-xl bg-white/15 p-3 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/25'>
                  <Calendar className='h-6 w-6 text-blue-400' />
                </div>
                <Typography
                  as='h3'
                  font='satoshi'
                  weight='bold'
                  className='text-lg text-amber-50'
                >
                  {INTRO_TIME_LIMIT.title}
                </Typography>
              </div>
              <Typography
                as='p'
                font='satoshi'
                weight='semibold'
                className='text-base text-blue-400'
              >
                {INTRO_TIME_LIMIT.range}
              </Typography>
              <Typography
                as='p'
                font='satoshi'
                className='mt-2 text-sm text-amber-50/70'
              >
                {INTRO_TIME_LIMIT.note}
              </Typography>

              {INTRO_TIME_LIMIT.extend && (
                <div className='mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4'>
                  <Typography
                    as='p'
                    font='satoshi'
                    weight='bold'
                    className='text-red-400'
                  >
                    {INTRO_TIME_LIMIT.extend.label || 'Diperpanjang'}
                  </Typography>
                  <Typography
                    as='p'
                    font='satoshi'
                    className='text-sm text-red-300'
                  >
                    {INTRO_TIME_LIMIT.extend.range}
                  </Typography>
                  {INTRO_TIME_LIMIT.extend.note && (
                    <Typography
                      as='p'
                      font='satoshi'
                      className='text-xs text-red-200/80'
                    >
                      {INTRO_TIME_LIMIT.extend.note}
                    </Typography>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className='group pointer-events-auto relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-xs transition-all duration-300 hover:border-white/30'>
            <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/10' />
            <div className='relative z-10 p-8'>
              <div className='mb-4 flex items-center gap-3'>
                <div className='rounded-xl bg-white/15 p-3 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/25'>
                  <Phone className='h-6 w-6 text-blue-400' />
                </div>
                <Typography
                  as='h3'
                  font='satoshi'
                  weight='bold'
                  className='text-lg text-amber-50'
                >
                  Contact Person
                </Typography>
              </div>
              <div className='space-y-2'>
                {INTRO_CONTACTS.map((cp, i) => (
                  <Typography
                    key={i}
                    as='p'
                    font='satoshi'
                    weight='medium'
                    className='text-sm text-amber-50'
                  >
                    <span className='font-bold text-blue-400'>{cp.name}:</span>{' '}
                    {cp.phone}
                  </Typography>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='intro-stagger relative mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-xs md:p-12'>
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10' />
        <div className='relative z-10 space-y-6 text-center'>
          <Typography
            as='h3'
            font='satoshi'
            weight='bold'
            className='text-2xl text-amber-50 md:text-3xl'
          >
            Siap Mengubah Sejarah HMTC?
          </Typography>
          <Typography
            as='p'
            font='satoshi'
            className='mx-auto max-w-xl text-base text-amber-50/80'
          >
            Jangan hanya menjadi penonton. Ambil langkah pertama menuju
            transformasi HMTC 2025. Isi formulir di bawah dan tunjukkan kepada
            kami mengapa Anda adalah orang yang tepat untuk bergabung!
          </Typography>
          <Button
            type='button'
            onClick={() => {
              // Scroll to top of page smoothly
              window.scrollTo({ top: 0, behavior: 'smooth' });
              // Call the original onNext handler
              onNext();
            }}
            size='lg'
            className='pointer-events-auto inline-flex h-fit w-fit cursor-pointer items-center gap-2 rounded-lg bg-primary !px-8 py-4 font-satoshi font-medium text-white shadow-[0_10px_30px_-10px_rgba(82,39,255,0.7)] transition-transform hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98]'
          >
            <Typography
              as='span'
              font='satoshi'
              weight='semibold'
              className='text-white'
              variant='h1'
            >
              Mulai Pendaftaran
            </Typography>
            <ArrowRight className='!h-6 !w-6' strokeWidth={3} />
          </Button>
        </div>
      </div>

      <div className='intro-stagger mt-6 text-center'>
        <Typography
          as='p'
          font='satoshi'
          weight='bold'
          className='text-lg text-primary opacity-80'
        >
          VIVAT TC! #HMTC2025 #SuarPeradaban2025
        </Typography>
      </div>
    </div>
  );
}
