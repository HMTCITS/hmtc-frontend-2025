import Divider from '@/components/Divider';
import { Skeleton } from '@/components/ui/skeleton';

export default function ShowCaseSkeleton() {
  return (
    <div className='relative bg-gray-100'>
      <div className='flex w-full items-center justify-center bg-[#121212] px-12 py-18 sm:p-18 md:p-24'>
        <div className='flex w-full flex-col justify-between gap-x-6 gap-y-12 md:px-0 lg:flex-row lg:gap-x-27'>
          <div className='max-w-[335px]'>
            <Skeleton className='mb-6 h-14 w-40' />
            <Skeleton className='h-32 w-full' />
          </div>

          <div className='max-w-[870px]'>
            <Skeleton className='mb-6 h-14 w-40' />
            <div className='space-y-4'>
              <Skeleton className='h-8 w-full' />
              <Skeleton className='h-8 w-full' />
              <Skeleton className='h-8 w-full' />
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full bg-[#121212] px-12 py-18 sm:p-18 md:p-24'>
        <div className='relative z-10 flex w-full flex-col-reverse items-center justify-between gap-5 lg:flex-row lg:gap-[90px]'>
          <div className='flex w-full flex-col items-start gap-3 md:gap-5 lg:w-[480px] lg:gap-[60px]'>
            <div className='mb-[20px] flex w-full items-center justify-center lg:mb-0 lg:w-[380px] xl:w-[480px]'>
              <Skeleton className='h-32 w-full' />
            </div>

            <div className='flex w-full flex-row items-center gap-3 md:gap-4 lg:mb-0'>
              <Skeleton className='h-14 w-14 rounded-full' />
              <div className='flex w-[165px] flex-col items-start gap-0.5'>
                <Skeleton className='h-6 w-40' />
                <Skeleton className='h-5 w-32' />
              </div>
            </div>
          </div>

          <div className='relative flex w-full flex-col items-center justify-center lg:w-[646px]'>
            <div className='mb-4 flex w-full flex-row items-center justify-between px-0'>
              <Skeleton className='h-5 w-32' />
              <div className='flex flex-row items-center'>
                <Skeleton className='h-1 w-[120px]' />
                <Skeleton className='ml-2 h-5 w-24' />
              </div>
            </div>
            <Skeleton className='h-[311px] w-full' />
          </div>
        </div>
      </div>

      <div className='relative flex w-full items-center bg-[#121212] px-12 py-18 sm:p-18 md:p-24 lg:px-[8%]'>
        <div className='relative mb-[20px] flex w-full flex-col items-center gap-[10px] lg:mb-0'>
          <div className='z-10 w-full'>
            <div className='flex w-full flex-col items-start gap-8'>
              <Skeleton className='h-6 w-32' />
              <Skeleton className='h-14 w-full max-w-[600px]' />
              <Skeleton className='h-28 w-full' />
            </div>
          </div>

          <div className='relative mt-10 h-[272.67px] w-full overflow-hidden lg:mt-20'>
            <div className='flex justify-evenly gap-6 px-6'>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    className='h-[272.67px] w-[194.5px] flex-shrink-0'
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      <Divider id='kepengurusan' />
    </div>
  );
}
