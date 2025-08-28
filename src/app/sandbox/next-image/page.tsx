import NextImage, { ImageSizes } from '@/components/NextImage';

export default function NextImageSandbox() {
  return (
    <main className='space-y-10 p-8'>
      <h1 className='font-adelphe text-3xl font-bold'>Next Image</h1>
      <section className='space-y-4'>
        <h2 className='font-satoshi text-xl font-semibold'>
          Basic Fixed Sizes
        </h2>
        <div className='flex flex-wrap gap-6'>
          <NextImage
            src='/logo-hmtc2025-navbar.png'
            alt='Logo'
            {...ImageSizes.Square.md}
            className='rounded border'
          />
          <NextImage
            src='/logo-hmtc2025-navbar.png'
            alt='Logo'
            {...ImageSizes.Square.lg}
            className='rounded border'
            useSkeleton
          />
        </div>
      </section>
      <section className='space-y-4'>
        <h2 className='font-satoshi text-xl font-semibold'>Fill Layout</h2>
        <div className='relative h-40 w-full max-w-md overflow-hidden rounded border'>
          <NextImage
            src='/halamandepan.png'
            alt='Fill Sample'
            fill
            className='object-cover'
            useSkeleton
          />
        </div>
      </section>
      <section className='space-y-4'>
        <h2 className='font-satoshi text-xl font-semibold'>Error Fallback</h2>
        <div className='flex gap-6'>
          <NextImage
            src='/images/not-exist.png'
            alt='Broken'
            {...ImageSizes.Square.md}
            className='rounded border'
          />
          <NextImage
            src='/images/not-exist.png'
            alt='Broken with custom fallback'
            onErrorSrc='/icons/ban.svg'
            {...ImageSizes.Square.md}
            className='rounded border'
          />
        </div>
      </section>
    </main>
  );
}
