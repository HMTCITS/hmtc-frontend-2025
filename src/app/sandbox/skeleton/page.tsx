import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonSandbox() {
  return (
    <main className='space-y-10 p-8'>
      <h1 className='font-adelphe text-3xl font-bold'>Skeleton</h1>
      <div className='space-y-4'>
        <Skeleton className='h-8 w-1/2' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-5/6' />
        <div className='flex gap-4'>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className='h-24 w-24 rounded-lg' />
          ))}
        </div>
      </div>
    </main>
  );
}
