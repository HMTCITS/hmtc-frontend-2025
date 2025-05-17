import { Skeleton } from '@/components/ui/skeleton';

export default function LifeAtHMTCSkeleton() {
  return (
    <section className='flex flex-col items-center justify-center bg-white p-4 pt-28 font-sans'>
      <div className='w-full max-w-[90%] text-center lg:max-w-[65%]'>
        <Skeleton className='mx-auto mb-5 h-6 w-36' />

        <Skeleton className='mx-auto mb-5 h-12 w-64 md:w-96' />

        <Skeleton className='mx-auto mb-14 h-24 w-full' />
      </div>

      <div className='w-full max-w-7xl md:px-12'>
        <div className='flex gap-6 overflow-hidden px-6'>
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className='w-[425px] flex-shrink-0'>
              <Skeleton className='h-[390px] w-full rounded-md md:h-[480px] lg:h-[530px]' />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
