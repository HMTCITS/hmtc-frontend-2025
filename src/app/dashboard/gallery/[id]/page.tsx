'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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
  
  // Dummy user data
  const user: UserType = {
    name: 'John Doe',
    role: 'Administrator',
    avatarUrl: '',
  };

  // Mock Data
  const galleryDetail = getMockGalleryDetail(galleryId);

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
                >
                  Lihat Gambar
                </Button>
              </div>
            </div>
          </CardContent>

          <Separator />
          <CardFooter className='flex justify-end'>
            <Button size='lg' onClick={() => alert('Edit Gallery Clicked')}>Edit Gallery</Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
