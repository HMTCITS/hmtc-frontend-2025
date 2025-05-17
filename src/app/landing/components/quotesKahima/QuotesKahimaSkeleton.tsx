import { Skeleton } from '@/components/ui/skeleton';

export default function QuotesKahimaSkeleton() {
  return (
    <section
      className='relative flex h-fit w-full justify-center overflow-hidden px-10 py-16 text-white md:p-6'
      style={{
        background:
          'linear-gradient(263.67deg, #00AAE7 -8.55%, #0076C0 97.16%)',
      }}
    >
      <main className='z-10 flex w-full flex-col items-center justify-center space-y-4 py-10 text-center lg:px-[10%] lg:py-[8%]'>
        <div className='flex w-full flex-col items-center space-y-2'>
          <Skeleton className='mb-2 h-8 w-8 bg-white/30' />

          <Skeleton className='h-6 w-full max-w-[800px] bg-white/30' />
          <Skeleton className='h-6 w-full max-w-[750px] bg-white/30' />
          <Skeleton className='h-6 w-full max-w-[700px] bg-white/30' />
        </div>

        <div className='mt-9 mb-2 flex w-full flex-col items-center'>
          <Skeleton className='mb-1 h-10 w-64 bg-white/50 md:w-80 lg:w-96' />
          <Skeleton className='mr-4 h-8 w-8 self-end bg-white/30 md:mr-8 lg:mr-14' />
        </div>

        <div className='mt-12 flex flex-col items-center'>
          <Skeleton className='mb-2 h-6 w-48 bg-white/40' />
          <Skeleton className='mt-1 h-4 w-32 bg-white/20' />
        </div>
      </main>
    </section>
  );
}
