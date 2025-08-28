'use client';
import dynamic from 'next/dynamic';

const Kepengurusan = dynamic(
  () => import('@/components/carousel/Kepengurusan'),
  { ssr: false },
);
const KetuaCarousel = dynamic(
  () => import('@/components/carousel/KetuaCarousel'),
  { ssr: false },
);

export default function CarouselsSandbox() {
  return (
    <main className='space-y-16 p-8'>
      <h1 className='font-adelphe text-3xl font-bold'>Carousels</h1>
      <section className='space-y-4'>
        <h2 className='font-satoshi text-xl font-semibold'>
          Kepengurusan (Swiper)
        </h2>
        <div className='rounded border p-4'>
          <Kepengurusan />
        </div>
      </section>
      <section className='space-y-4'>
        <h2 className='font-satoshi text-xl font-semibold'>
          KetuaCarousel (Embla)
        </h2>
        <div className='rounded border bg-[#121212] p-4'>
          <KetuaCarousel />
        </div>
      </section>
    </main>
  );
}
