import dynamic from 'next/dynamic';

import AboutSkeleton from '@/app/landing/components/about/AboutSkeleton';
import Cover from '@/app/landing/components/cover/oprecCover';
import GallerySkeleton from '@/app/landing/components/gallery/GallerySkeleton';
import HMTCBlogSkeleton from '@/app/landing/components/hmtcblog/HMTCBlogSkeleton';
import LifeAtHMTCSkeleton from '@/app/landing/components/lifeHmtc/LifeAtHMTCSkeleton';
import PeopleSkeleton from '@/app/landing/components/people/PeopleHMTCSkeleton';
// import QuotesKahimaSkeleton from '@/app/landing/components/quotesKahima/QuotesKahimaSkeleton';
import ShowCase from '@/app/landing/components/showcase/ShowCase';
import ShowCaseSkeleton from '@/app/landing/components/showcase/ShowCaseSkeleton';
import LazySection from '@/components/LazySection';
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

// const QuotesKahima = dynamic(
//   () => import('./components/quotesKahima/QuotesKahima'),
//   {
//     ssr: true,
//   },
// );

export default function LandingPage() {
  return (
    <main className='relative scroll-smooth'>
      <Cover />
      <NavbarLanding />
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
