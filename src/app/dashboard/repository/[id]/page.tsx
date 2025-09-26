'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import * as React from 'react';

import { navItem } from '@/app/dashboard/sidebar-link';
import { RepositoryForm } from '@/components/repository/RepositoryForm';
import Typography from '@/components/Typography';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import DashboardLayout from '@/layouts/DashboardLayout';
import { RepositoryFormData } from '@/lib/validation/repository.schema';
import { RepositoryDetail } from '@/types/repository';
import type { User as UserType } from '@/types/sidebar';

/* --------------------------- Mock Data --------------------------- */
function getMockRepositoryDetail(id: string): RepositoryDetail {
  return {
    id,
    title:
      'Implementasi Machine Learning untuk Prediksi Cuaca berbasis Data Historis',
    date: 'Senin, 15 Januari 2025',
    writer: 'Ahmad Rizki Pratama',
    description:
      'Penelitian ini membahas implementasi algoritma machine learning untuk memprediksi cuaca berdasarkan data historis meteorologi. Menggunakan metode Random Forest dan Neural Network untuk meningkatkan akurasi prediksi cuaca dalam jangka waktu 7 hari ke depan. Dataset yang digunakan mencakup data temperatur, kelembaban, tekanan udara, dan kecepatan angin selama 10 tahun terakhir dari stasiun meteorologi Juanda Surabaya.',
    publishDate: '2025-01-15',
    supervisor: 'Prof. Dr. Siti Aminah, M.T.',
    laboratory: 'Laboratorium Artificial Intelligence',
    status: 'published' as const,
    createdAt: '2024-12-20T08:00:00Z',
    updatedAt: '2025-01-15T14:30:00Z',
    downloadCount: 156,
    tags: ['Machine Learning', 'Weather Prediction', 'Data Mining'],
  };
}

/* --------------------------- Main Page Component --------------------------- */
export default function RepositoryDetailPage() {
  const params = useParams();
  const repositoryId = params.id as string;
  const [isEditing, setIsEditing] = React.useState(false);

  // Dummy user data
  const user: UserType = {
    name: 'John Doe',
    role: 'Administrator',
    avatarUrl: '',
  };

  // Mock Data
  const repositoryDetail = getMockRepositoryDetail(repositoryId);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleUpdateRepository = async (_data: RepositoryFormData) => {
    try {
      // Simulate API call - in real app, use the data to update repository
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // RepositoryForm already shows success toast on confirm; only change UI state here
      setIsEditing(false);
    } catch {
      // RepositoryForm already shows error toast; no page-level toast needed
    }
  };

  return (
    <DashboardLayout user={user} navItems={navItem} onLogout={() => {}}>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8 flex items-center gap-4'>
          <Link href='/dashboard/repository'>
            <ArrowLeft className='mr-2 h-6 w-6' />
          </Link>
          <Typography
            as='h1'
            variant='k2'
            className='font-adelphe font-bold md:text-[32px]'
          >
            Detail Repository
          </Typography>
        </div>

        {/* Conditional Rendering: Detail View or Edit Form */}
        {isEditing ? (
          <RepositoryForm
            mode='edit'
            initialData={{
              title: repositoryDetail.title,
              writer: repositoryDetail.writer,
              description: repositoryDetail.description,
              publishDate: repositoryDetail.publishDate,
              supervisor: repositoryDetail.supervisor,
              laboratory: repositoryDetail.laboratory,
            }}
            onSubmit={handleUpdateRepository}
            onCancel={handleCancelEdit}
            isLoading={false}
          />
        ) : (
          <Card className='space-y-1.5 font-satoshi'>
            <CardHeader className='mb-0'>
              <CardTitle>
                <Typography
                  as='h2'
                  variant='i2'
                  className='leading-relaxed font-medium'
                >
                  {repositoryDetail.title}
                </Typography>
                <Typography
                  as='p'
                  variant='b4'
                  font='satoshi'
                  weight='regular'
                  className='mt-2 text-[14px] leading-[140%] text-[var(--Foundation-Black-black-200,#8A8A8A)]'
                >
                  Dibuat pada 27 Maret 2023
                </Typography>
              </CardTitle>
            </CardHeader>

            <Separator />

            <CardContent>
              <div className='space-y-6 font-medium'>
                <Typography
                  as='h2'
                  variant='h2'
                  className='text-[20px] font-semibold text-gray-900'
                >
                  Information
                </Typography>

                {/* Title */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                  <div className='flex items-center gap-2 text-black-200 md:col-span-1'>
                    <Typography as='span' variant='s3'>
                      Title
                    </Typography>
                  </div>
                  <div className='md:col-span-3'>
                    <Typography as='p' variant='b2' className='text-gray-900'>
                      {repositoryDetail.title}
                    </Typography>
                  </div>
                </div>

                {/* Writer */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                  <div className='flex items-center gap-2 text-black-200 md:col-span-1'>
                    <Typography as='span' variant='s3'>
                      Writer
                    </Typography>
                  </div>
                  <div className='md:col-span-3'>
                    <Typography as='p' variant='b2' className='text-gray-900'>
                      {repositoryDetail.writer}
                    </Typography>
                  </div>
                </div>

                {/* Description */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                  <div className='flex items-start gap-2 text-black-200 md:col-span-1'>
                    <Typography as='span' variant='s3'>
                      Description
                    </Typography>
                  </div>
                  <div className='md:col-span-3'>
                    <Typography
                      as='p'
                      variant='b2'
                      className='leading-relaxed text-gray-900'
                    >
                      {repositoryDetail.description}
                    </Typography>
                  </div>
                </div>

                {/* Publish Date */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                  <div className='flex items-center gap-2 text-black-200 md:col-span-1'>
                    <Typography as='span' variant='s3'>
                      Publish Date
                    </Typography>
                  </div>
                  <div className='md:col-span-3'>
                    <Typography as='p' variant='b2' className='text-gray-900'>
                      {formatDate(repositoryDetail.publishDate)}
                    </Typography>
                  </div>
                </div>

                {/* Supervisor */}
                {repositoryDetail.supervisor && (
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                    <div className='flex items-center gap-2 text-black-200 md:col-span-1'>
                      <Typography as='span' variant='s3'>
                        Supervisor
                      </Typography>
                    </div>
                    <div className='md:col-span-3'>
                      <Typography as='p' variant='b2' className='text-gray-900'>
                        {repositoryDetail.supervisor}
                      </Typography>
                    </div>
                  </div>
                )}

                {/* Laboratory */}
                {repositoryDetail.laboratory && (
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                    <div className='flex items-center gap-2 text-black-200 md:col-span-1'>
                      <Typography as='span' variant='s3'>
                        Laboratory
                      </Typography>
                    </div>
                    <div className='md:col-span-3'>
                      <Typography as='p' variant='b2' className='text-gray-900'>
                        {repositoryDetail.laboratory}
                      </Typography>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>

            <Separator className='mb-6' />

            <CardFooter className='flex justify-end'>
              <Button size='lg' className='px-8' onClick={handleEdit}>
                <Typography as='span' variant='s3'>
                  Edit Repository
                </Typography>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
