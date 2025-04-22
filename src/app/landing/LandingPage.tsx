import About from '@/app/landing/components/About';
import Cover from '@/app/landing/components/Cover';
import GalleryHMTC from '@/app/landing/components/GalleryHMTC';
import HMTCBlog from '@/app/landing/components/HMTCBlog';
import LifeAtHMTC from '@/app/landing/components/LifeAtHMTC';
import PeopleHMTC from '@/app/landing/components/PeopleHMTC';
import QuotesKahima from '@/app/landing/components/QuotesKahima';
import ShowCase from '@/app/landing/components/ShowCase';

export default function LandingPage() {
  return (
    <main className='relative scroll-smooth'>
      <Cover />
      <About />
      <ShowCase />
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
