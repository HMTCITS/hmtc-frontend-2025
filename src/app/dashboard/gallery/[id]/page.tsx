'use client';

import { ArrowLeft, X, Download } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import * as React from 'react';
import NextImage from '@/components/NextImage';
import { Dialog, Transition } from '@headlessui/react';

import { navItem } from '@/app/dashboard/sidebar-link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import DashboardLayout from '@/layouts/DashboardLayout';
import { GalleryItem } from '@/types/gallery';
import type { User as UserType } from '@/types/sidebar';

/* --------------------------- Mock Data --------------------------- */
function getMockGalleryDetail(id: string): GalleryItem {
  return {
    id: parseInt(id),
    title: 'Welcome Party HMTC Suar Peradaban 2025',
    date: 'Senin, 10 Maret 2025',
    link: 'https://its.id/m/welparhmtc2025',
    image: '/gallery/hmtchmti.jpg',
    width: 200,
    height: 150,
  };
}

/* --------------------------- Main Page Component --------------------------- */

export default function IdGalleryPage() {
  const params = useParams();
  const galleryId = params.id as string;
  const [isOpen, setIsOpen] = React.useState(false);
  // single image only — this detail view shows a single thumbnail (no prev/next controls)

  // Zoom / pan state
  const [scale, setScale] = React.useState(1);
  const [translate, setTranslate] = React.useState({ x: 0, y: 0 });
  const isPanningRef = React.useRef(false);
  const lastPointerRef = React.useRef<{ x: number; y: number } | null>(null);
  const lastTouchDistRef = React.useRef<number | null>(null);

  // Dummy user data
  const user: UserType = {
    name: 'John Doe',
    role: 'Administrator',
    avatarUrl: '',
  };

  // Mock Data
  const galleryDetail = getMockGalleryDetail(galleryId);

  const getFilenameFromUrl = (url: string) => {
    try {
      const last = url.split('/').pop() || 'image';
      // If there's a querystring, strip it
      return last.split('?')[0];
    } catch {
      return 'image';
    }
  };

  return (
    <DashboardLayout user={user} navItems={navItem} onLogout={() => {}}>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='flex items-center gap-4'>
          <Link href='/dashboard/gallery'>
            <ArrowLeft className='mr-2 h-6 w-6' />
          </Link>
          <h1 className='text-[32px] font-bold'>Detail</h1>
        </div>

        <Card className='space-y-[10px] font-satoshi'>
          <CardHeader>
            <h1 className='text-2xl font-medium'>Gallery Detail</h1>
          </CardHeader>

          <Separator />
          <CardContent>
            <div className='space-y-[10px] font-medium'>
              <h2 className='text-[20px]'>Information</h2>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                <div className='text-black-200 md:col-span-1'>Title</div>
                <p>{galleryDetail.title}</p>
              </div>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                <div className='text-black-200'>Date</div>
                <p>{galleryDetail.date}</p>
              </div>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                <div className='text-black-200'>Link</div>
                <a
                  href={galleryDetail.link}
                  className='text-blue-600 hover:underline'
                >
                  {galleryDetail.link}
                </a>
              </div>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                <div className='text-black-200'>Thumbnail</div>
                <Button
                  variant={'outline'}
                  size={'lg'}
                  className='w-fit font-bold'
                  onClick={() => setIsOpen(true)}
                >
                  Lihat Gambar
                </Button>
              </div>
            </div>
          </CardContent>

          <Separator />
          <CardFooter className='flex justify-end'>
            {/* Link to the edit page (uses query param id) */}
            <Link href={`/dashboard/gallery/${galleryId}/edit`}>
              <Button size='lg'>Edit Gallery</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Image Modal */}
        <Transition.Root show={isOpen} as={React.Fragment}>
          <Dialog
            as='div'
            className='fixed inset-0 z-50 overflow-y-auto'
            onClose={setIsOpen}
          >
            <Transition.Child
              as={React.Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              {/* overlay with 40% black (use tailwind opacity utility) */}
              <div className='fixed inset-0 bg-black/40 transition-opacity' />
            </Transition.Child>
            <div className='relative z-50 min-h-screen px-4 text-center'>
              {/* Centering trick (keeps modal vertically centered on small screens) */}
              <span
                className='hidden sm:inline-block sm:h-screen sm:align-middle'
                aria-hidden='true'
              >
                &#8203;
              </span>

              <Transition.Child
                as={React.Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <div className='inline-block w-full max-w-4xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-2xl'>
                  <div className='relative flex flex-col'>
                    {/* close button */}
                    <button
                      aria-label='Close image'
                      onClick={() => setIsOpen(false)}
                      className='absolute top-3 right-3 z-30 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-50'
                    >
                      <X className='h-4 w-4' />
                    </button>

                    {/* image container with interactions */}
                    <div className='relative flex items-center justify-center'>
                      {/* (single image) */}
                      <div
                        className='max-h-[75vh] w-full max-w-[90vw] overflow-hidden rounded-md'
                        onDoubleClick={() => setScale((s) => (s === 1 ? 2 : 1))}
                        onWheel={(e) => {
                          // ctrl+wheel skip if user is ctrl-zooming page
                          if (e.ctrlKey) return;
                          e.preventDefault();
                          const delta = -e.deltaY;
                          setScale((s) => {
                            const next = Math.min(
                              Math.max(s + delta * 0.0015, 1),
                              4,
                            );
                            return next;
                          });
                        }}
                        onPointerDown={(e) => {
                          if (scale <= 1) return;
                          isPanningRef.current = true;
                          lastPointerRef.current = {
                            x: e.clientX,
                            y: e.clientY,
                          };
                          (e.target as Element).setPointerCapture(
                            (e as any).pointerId,
                          );
                        }}
                        onPointerMove={(e) => {
                          if (!isPanningRef.current || !lastPointerRef.current)
                            return;
                          const dx = e.clientX - lastPointerRef.current.x;
                          const dy = e.clientY - lastPointerRef.current.y;
                          setTranslate((t) => ({ x: t.x + dx, y: t.y + dy }));
                          lastPointerRef.current = {
                            x: e.clientX,
                            y: e.clientY,
                          };
                        }}
                        onPointerUp={(e) => {
                          isPanningRef.current = false;
                          lastPointerRef.current = null;
                        }}
                        onTouchStart={(e) => {
                          if (e.touches.length === 2) {
                            const t0 = e.touches[0];
                            const t1 = e.touches[1];
                            const dist = Math.hypot(
                              t1.clientX - t0.clientX,
                              t1.clientY - t0.clientY,
                            );
                            lastTouchDistRef.current = dist;
                          }
                        }}
                        onTouchMove={(e) => {
                          if (
                            e.touches.length === 2 &&
                            lastTouchDistRef.current
                          ) {
                            const t0 = e.touches[0];
                            const t1 = e.touches[1];
                            const dist = Math.hypot(
                              t1.clientX - t0.clientX,
                              t1.clientY - t0.clientY,
                            );
                            const delta = dist - lastTouchDistRef.current;
                            setScale((s) =>
                              Math.min(Math.max(s + delta * 0.005, 1), 4),
                            );
                            lastTouchDistRef.current = dist;
                          }
                        }}
                      >
                        <div className='flex items-center justify-center'>
                          <div
                            className='transform-gpu will-change-transform'
                            style={{
                              transform: `scale(${scale}) translate(${translate.x / Math.max(scale, 1)}px, ${translate.y / Math.max(scale, 1)}px)`,
                              transition: 'transform 120ms ease-out',
                            }}
                          >
                            <NextImage
                              src={galleryDetail.image}
                              alt={galleryDetail.title}
                              width={1200}
                              height={800}
                              imgClassName='rounded-md object-contain'
                              onErrorSrc='/not-exist.png'
                            />
                          </div>
                        </div>
                      </div>

                      {/* no prev/next controls for single image */}
                    </div>

                    {/* caption + actions */}
                    <div className='mt-4 flex items-center justify-between gap-4'>
                      <figcaption className='text-sm font-medium text-gray-700'>
                        {galleryDetail.title}
                      </figcaption>

                      <div className='flex items-center gap-2'>
                        <a
                          href={galleryDetail.image}
                          download={getFilenameFromUrl(galleryDetail.image)}
                          className='inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-200'
                        >
                          <Download className='h-4 w-4' />
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </DashboardLayout>
  );
}
