'use client';

import dynamic from 'next/dynamic';
import * as React from 'react';

import AboutSkeleton from '@/app/landing/components/about/AboutSkeleton';
import Cover from '@/app/landing/components/cover/Cover';
import OprecCover from '@/app/landing/components/cover/oprecCover';
import GallerySkeleton from '@/app/landing/components/gallery/GallerySkeleton';
import HMTCBlogSkeleton from '@/app/landing/components/hmtcblog/HMTCBlogSkeleton';
import LifeAtHMTCSkeleton from '@/app/landing/components/lifeHmtc/LifeAtHMTCSkeleton';
import PeopleSkeleton from '@/app/landing/components/people/PeopleHMTCSkeleton';
import ShowCase from '@/app/landing/components/showcase/ShowCase';
import ShowCaseSkeleton from '@/app/landing/components/showcase/ShowCaseSkeleton';
import LazySection from '@/components/LazySection';
import { useAutoIsScheduleActive } from '@/hooks/api/useAutoIsScheduleActive';
import { useIsScheduleActive } from '@/hooks/api/useIsScheduleActive';
import NavbarDefault from '@/layouts/Navbar';
import NavbarLanding from '@/layouts/NavbarLanding';

const About = dynamic(() => import('./components/about/About'), {
  ssr: true,
});

const PeopleHMTC = dynamic(() => import('./components/people/PeopleHMTC'), {
  ssr: true,
});

const LifeAtHMTC = dynamic(() => import('./components/lifeHmtc/LifeAtHMTC'), {
  ssr: true,
});

const GalleryHMTC = dynamic(() => import('./components/gallery/GalleryHMTC'), {
  ssr: true,
});

const HMTCBlog = dynamic(() => import('./components/hmtcblog/HMTCBlog'), {
  ssr: true,
});

export default function LandingPage() {
  const scheduleQuery = useIsScheduleActive();
  const initial = scheduleQuery?.data ?? true;

  useAutoIsScheduleActive({ intervalMs: 7000, path: '/ayomeludaftarmagang' });

  const [isActive, setIsActive] = React.useState<boolean>(initial);

  React.useEffect(() => {
    const onSchedule = (e: any) => {
      const next = Boolean(e?.detail?.active);
      setIsActive((prev) => (prev === next ? prev : next));
    };
    window.addEventListener('hmtc:schedule', onSchedule as EventListener);
    if (typeof scheduleQuery.data === 'boolean')
      setIsActive(scheduleQuery.data);
    return () =>
      window.removeEventListener('hmtc:schedule', onSchedule as EventListener);
  }, [scheduleQuery.data]);

  return (
    <main className='relative scroll-smooth'>
      <div className={isActive ? 'block' : 'hidden'} aria-hidden={!isActive}>
        <OprecCover />
      </div>
      <NavbarLanding isActive={isActive} />
      <div className={!isActive ? 'block' : 'hidden'} aria-hidden={isActive}>
        <Cover />
        <NavbarDefault />
      </div>
      <LazySection
        fallback={<AboutSkeleton />}
        once={true}
        threshold={0.4}
        id='aboutus'
      >
        <About />
      </LazySection>

      <LazySection
        fallback={<ShowCaseSkeleton />}
        once={true}
        threshold={0.25}
        id='historyofhmtc'
      >
        <ShowCase />
      </LazySection>

      <div className='relative mx-auto w-full'>
        <LazySection
          fallback={<PeopleSkeleton />}
          once={true}
          threshold={0.4}
          id='peoplebehindhmtc'
        >
          <PeopleHMTC />
        </LazySection>

        <LazySection
          fallback={<LifeAtHMTCSkeleton />}
          once={true}
          threshold={0.4}
        >
          <LifeAtHMTC />
        </LazySection>
        <LazySection
          fallback={<GallerySkeleton />}
          once={true}
          threshold={0.4}
          id='gallery'
        >
          <GalleryHMTC />
        </LazySection>
        <LazySection
          fallback={<HMTCBlogSkeleton />}
          once={true}
          threshold={0.4}
          id='blog'
        >
          <HMTCBlog />
        </LazySection>
        {/* <LazySection
          fallback={<QuotesKahimaSkeleton />}
          once={true}
          threshold={0.4}
        >
          <QuotesKahima />
        </LazySection> */}
      </div>
    </main>
  );
}
