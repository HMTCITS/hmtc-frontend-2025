import { Skeleton } from '@/components/ui/skeleton';

export default function PeopleSkeleton() {
  return (
    <section className='flex flex-col items-center justify-center bg-white font-sans md:px-[8%] md:py-24'>
      <div
        className='flex w-full max-w-[95%] flex-col items-center pt-4 max-md:pt-12 lg:flex-row'
        id='peoplebehindhmtc'
      >
        <div className='w-full px-6 lg:w-[60%] lg:px-0'>
          <Skeleton className='mb-3 h-6 w-64' />
          <Skeleton className='mb-6 h-12 w-full max-w-[500px]' />
          <Skeleton className='mb-10 h-24 w-full lg:max-w-[75%]' />
          <div className='mt-10 w-full space-y-4'>
            <div className='flex items-center'>
              <Skeleton className='h-6 w-6 rounded' />
              <div className='ml-4 h-auto w-full md:w-[438px]'>
                <Skeleton className='mb-2 h-5 w-32' />
                <Skeleton className='h-14 w-full' />
              </div>
            </div>

            {/* People section */}
            <div className='flex w-full items-center border-t border-gray-300 pt-4 lg:w-[438px]'>
              <Skeleton className='h-6 w-6 rounded' />
              <div className='ml-4 h-auto w-full md:w-[438px]'>
                <Skeleton className='mb-2 h-5 w-32' />
                <Skeleton className='h-14 w-full' />
              </div>
            </div>

            {/* Programs section */}
            <div className='flex w-full items-center border-t border-gray-300 pt-4 lg:w-[438px]'>
              <Skeleton className='h-6 w-6 rounded' />
              <div className='ml-4 w-full md:w-[438px]'>
                <Skeleton className='mb-2 h-5 w-32' />
                <Skeleton className='h-14 w-full' />
              </div>
            </div>
          </div>
        </div>

        <div className='relative mt-8 w-full px-4 lg:mt-0 lg:w-[40%] lg:px-0'>
          <div className='relative aspect-[4/3] w-full overflow-hidden rounded-md'>
            <Skeleton className='h-full w-full' />
          </div>

          <div className='mt-4 flex items-center justify-between'>
            <Skeleton className='h-5 w-16' />
            <div className='flex space-x-2'>
              <Skeleton className='h-8 w-8 rounded' />
              <Skeleton className='h-8 w-8 rounded' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
