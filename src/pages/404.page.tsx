import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';
import { MdWbTwilight } from 'react-icons/md';

export default function NotFoundPage() {
  return (
    <main>
      <section>
        <div className='flex min-h-screen w-full flex-col items-center justify-center gap-y-2'>
          <MdWbTwilight
            size={70}
            className='drop-shadow-glow animate-pulse text-red-500'
          />
          <h1 className='text-4xl font-extrabold'>Page Not Found</h1>
          <div className='flex items-center'>
            <Link href='/' className='text-lg tracking-wide'>
              Back to home
            </Link>
            <FiChevronRight size={22} />
          </div>
        </div>
      </section>
    </main>
  );
}
