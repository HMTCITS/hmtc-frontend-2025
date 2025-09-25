'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import * as React from 'react';
import { toast } from 'sonner';

import { navItem } from '@/app/dashboard/sidebar-link';
import { RepositoryForm } from '@/components/repository/RepositoryForm';
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

      toast.success('Repository updated successfully!');
      setIsEditing(false);
    } catch {
      toast.error('Failed to update repository');
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
          <h1 className='text-[32px] font-bold'>Repository Detail</h1>
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
          <Card className='space-y-[10px] font-satoshi'>
            <CardHeader>
              <CardTitle className='text-2xl leading-relaxed font-medium'>
                {repositoryDetail.title}
              </CardTitle>
            </CardHeader>

            <Separator />

            <CardContent>
              <div className='space-y-6 font-medium'>
                <h2 className='text-[20px] font-semibold text-gray-900'>
                  Information
                </h2>

                {/* Title */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                  <div className='flex items-center gap-2 text-black-200 md:col-span-1'>
                    <span>Title</span>
                  </div>
                  <div className='md:col-span-3'>
                    <p className='text-gray-900'>{repositoryDetail.title}</p>
                  </div>
                </div>

                {/* Writer */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                  <div className='flex items-center gap-2 text-black-200 md:col-span-1'>
                    <span>Writer</span>
                  </div>
                  <div className='md:col-span-3'>
                    <p className='text-gray-900'>{repositoryDetail.writer}</p>
                  </div>
                </div>

                {/* Description */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                  <div className='flex items-start gap-2 text-black-200 md:col-span-1'>
                    <span>Description</span>
                  </div>
                  <div className='md:col-span-3'>
                    <p className='leading-relaxed text-gray-900'>
                      {repositoryDetail.description}
                    </p>
                  </div>
                </div>

                {/* Publish Date */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                  <div className='flex items-center gap-2 text-black-200 md:col-span-1'>
                    <span>Publish Date</span>
                  </div>
                  <div className='md:col-span-3'>
                    <p className='text-gray-900'>
                      {formatDate(repositoryDetail.publishDate)}
                    </p>
                  </div>
                </div>

                {/* Supervisor */}
                {repositoryDetail.supervisor && (
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                    <div className='flex items-center gap-2 text-black-200 md:col-span-1'>
                      <span>Supervisor</span>
                    </div>
                    <div className='md:col-span-3'>
                      <p className='text-gray-900'>
                        {repositoryDetail.supervisor}
                      </p>
                    </div>
                  </div>
                )}

                {/* Laboratory */}
                {repositoryDetail.laboratory && (
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                    <div className='flex items-center gap-2 text-black-200 md:col-span-1'>
                      <span>Laboratory</span>
                    </div>
                    <div className='md:col-span-3'>
                      <p className='text-gray-900'>
                        {repositoryDetail.laboratory}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>

            <Separator />

            <CardFooter className='flex justify-end'>
              <Button size='lg' className='px-8' onClick={handleEdit}>
                Edit Repository
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
