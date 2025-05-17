import { Skeleton } from '@/components/ui/skeleton';

export default function GallerySkeleton() {
  return (
    <section className='flex flex-col overflow-hidden bg-white p-8 pt-0 font-sans md:py-10 md:pt-[100px] lg:px-0'>
      <div className='w-full pb-[50px] text-left max-md:pt-20 max-md:text-center md:px-[10%] md:pb-[40px] lg:max-w-[70%] lg:pb-[70px]'>
        <Skeleton className='mx-auto h-12 w-[80%] max-w-[600px] md:mx-0' />
      </div>

      <div className='relative lg:h-[510px]'>
        <div className='flex h-auto w-full flex-wrap justify-center max-md:flex-col max-md:items-center lg:overflow-hidden'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:hidden'>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className={`w-[320px] md:w-[500px] ${
                    index % 2 === 0 ? 'h-[335px]' : 'h-[375px]'
                  }`}
                  style={{
                    willChange: 'opacity',
                    contain: 'content',
                  }}
                />
              ))}
          </div>

          <div className='relative hidden h-[600px] w-full lg:block'>
            <Skeleton
              className='absolute top-[45%] -left-[20%] h-[335px] w-[500px]'
              style={{ willChange: 'opacity' }}
            />
            <Skeleton
              className='absolute top-[30%] left-[19%] h-[375px] w-[325px]'
              style={{ willChange: 'opacity' }}
            />
            <Skeleton
              className='absolute top-[40%] left-[44%] h-[370px] w-[455px]'
              style={{ willChange: 'opacity' }}
            />
            <Skeleton
              className='absolute top-0 -right-[4%] h-[360px] w-[355px]'
              style={{ willChange: 'opacity' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
