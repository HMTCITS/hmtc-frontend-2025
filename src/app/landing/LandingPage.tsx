import dynamic from 'next/dynamic';

import AboutSkeleton from '@/app/landing/components/about/AboutSkeleton';
import Cover from '@/app/landing/components/cover/Cover';
import CoverSkeleton from '@/app/landing/components/cover/CoverSkeleton';
import GalleryHMTC from '@/app/landing/components/GalleryHMTC';
import HMTCBlog from '@/app/landing/components/HMTCBlog';
import LifeAtHMTC from '@/app/landing/components/LifeAtHMTC';
import PeopleHMTC from '@/app/landing/components/PeopleHMTC';
import QuotesKahima from '@/app/landing/components/QuotesKahima';
import ShowCase from '@/app/landing/components/ShowCase';
import LazySection from '@/components/LazySection';

const About = dynamic(() => import('./components/about/About'), {
  ssr: true,
});

export default function LandingPage() {
  return (
    <main className='relative scroll-smooth'>
      <Cover />
      <LazySection fallback={<AboutSkeleton />} once={true} threshold={0.4}>
        <About />
      </LazySection>

      <LazySection fallback={<CoverSkeleton />} once={true} threshold={0.3}>
        <ShowCase />
      </LazySection>

      <div className='relative mx-auto w-full'>
        <PeopleHMTC />
        <LifeAtHMTC />
        <GalleryHMTC />
        <HMTCBlog />
        <QuotesKahima />
      </div>
    </main>
  );
}
