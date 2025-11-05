'use client';

import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React, { useMemo } from 'react';

import { navItem } from '@/app/dashboard/sidebar-link';
import StatusBadge from '@/components/profile/StatusBadge';
import { BaseClientDataTable } from '@/components/table/base-data-table';
import Typography from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DashboardLayout from '@/layouts/DashboardLayout';
import type { User as UserType } from '@/types/sidebar';
import type { UploadItem } from '@/types/upload';

/* --------------------------- Mock Data Generator --------------------------- */
function generateMockUploads(count = 50): UploadItem[] {
  const statuses = ['in_review', 'approved', 'rejected'] as const;
  const names = [
    'Budi Santoso',
    'Ani Wijaya',
    'Citra Dewi',
    'Doni Prasetyo',
    'Eka Putri',
  ];
  const titles = [
    'Implementasi Machine Learning untuk Prediksi Cuaca',
    'Sistem Informasi Manajemen Berbasis Web',
    'Analisis Sentimen Media Sosial menggunakan NLP',
    'Optimasi Jaringan Komputer dengan SDN',
    'Aplikasi Mobile untuk Smart Home IoT',
  ];
  const uploadTypes = ['file', 'link'] as const;

  return Array.from({ length: count }).map((_, i) => {
    const idx = i + 1;
    const day = (i % 28) + 1;
    const month = ((i % 12) + 1).toString().padStart(2, '0');
    const dd = String(day).padStart(2, '0');

    return {
      id: `UPL-${String(idx).padStart(4, '0')}`,
      title: titles[i % titles.length],
      description: `Deskripsi untuk ${titles[i % titles.length]}`,
      fileName: `document-${idx}.pdf`,
      fileUrl: `https://example.com/files/document-${idx}.pdf`,
      fileSize: Math.floor(Math.random() * 10000000) + 100000,
      fileType: 'application/pdf',
      uploadType: uploadTypes[i % uploadTypes.length],
      status: statuses[i % statuses.length],
      uploadedBy: {
        id: `USER-${String(idx).padStart(4, '0')}`,
        name: names[i % names.length],
        email: `student${idx}@student.its.ac.id`,
      },
      uploadedAt: `2025-${month}-${dd}T10:30:00Z`,
    };
  });
}

/* --------------------------- Columns Definition --------------------------- */
const getUploadColumns = (): ColumnDef<UploadItem>[] => [
  {
    id: 'no',
    header: () => (
      <Typography
        as='span'
        variant='s3'
        className='block text-center font-medium'
      >
        No.
      </Typography>
    ),
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination?.pageIndex ?? 0;
      const pageSize = table.getState().pagination?.pageSize ?? 10;
      return (
        <span className='block text-center'>
          {pageIndex * pageSize + row.index + 1}
        </span>
      );
    },
    meta: {
      initialWidth: 60,
      minWidth: 50,
      maxWidth: 80,
      resizable: false,
      wrap: 'clamp',
    },
  },
  {
    accessorKey: 'title',
    header: () => (
      <Typography
        as='span'
        variant='s3'
        className='block text-left font-medium'
      >
        Title
      </Typography>
    ),
    cell: ({ getValue }) => (
      <div className='space-y-1'>
        <Typography
          as='span'
          variant='s3'
          className='line-clamp-2 text-left'
          title={getValue<string>()}
        >
          {getValue<string>()}
        </Typography>
      </div>
    ),
    meta: {
      initialWidth: 300,
      minWidth: 300,
      maxWidth: 500,
      resizable: true,
    },
  },
  {
    accessorKey: 'uploadedAt',
    header: () => (
      <span className='flex items-center gap-1'>
        <Typography
          as='span'
          variant='s3'
          className='block text-left font-medium'
        >
          Upload Date
        </Typography>
      </span>
    ),
    cell: ({ getValue }) => (
      <Typography as='span' variant='s3' className='text-sm'>
        {new Date(getValue<string>()).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </Typography>
    ),
    meta: {
      initialWidth: 150,
      minWidth: 130,
      maxWidth: 180,
      resizable: true,
      wrap: 'clamp',
    },
  },
  {
    accessorKey: 'uploadedBy',
    header: () => (
      <span className='flex items-center gap-1'>
        <Typography
          as='span'
          variant='s3'
          className='block text-left font-medium'
        >
          Uploaded By
        </Typography>
      </span>
    ),
    cell: ({ getValue }) => (
      <Typography as='span' variant='s3' className='text-sm text-gray-700'>
        {getValue<UploadItem['uploadedBy']>().name}
      </Typography>
    ),
    meta: {
      initialWidth: 150,
      minWidth: 130,
      maxWidth: 180,
      resizable: true,
      wrap: 'clamp',
    },
  },
  {
    accessorKey: 'status',
    header: () => (
      <Typography
        as='span'
        variant='s3'
        className='block text-left font-medium'
      >
        Status
      </Typography>
    ),
    cell: ({ getValue }) => (
      <div className='flex justify-center'>
        <StatusBadge status={getValue<UploadItem['status']>()} />
      </div>
    ),
    meta: {
      initialWidth: 130,
      minWidth: 110,
      maxWidth: 150,
      resizable: false,
      wrap: 'clamp',
    },
  },
  {
    id: 'actions',
    header: () => (
      <Typography
        as='span'
        variant='s3'
        className='block text-left font-medium'
      >
        Actions
      </Typography>
    ),
    cell: ({ row }) => (
      <div className='flex items-center gap-1'>
        <Button size='lg' variant='default' title='View Details'>
          <Link
            href={`/dashboard/user-uploads/${row.original.id}`}
            className='flex items-center gap-2'
          >
            <Typography as='span' variant='s3'>
              Detail
            </Typography>
          </Link>
        </Button>
      </div>
    ),
    meta: {
      initialWidth: 150,
      minWidth: 130,
      maxWidth: 180,
      resizable: true,
      wrap: 'clamp',
    },
  },
];

/* --------------------------- Upload Table Component --------------------------- */
function UploadTable() {
  // Mock data
  const mockUploads = useMemo(() => generateMockUploads(50), []);
  const columns = useMemo(() => getUploadColumns(), []);

  return (
    <Card className='rounded-2xl'>
      <BaseClientDataTable<UploadItem>
        allData={mockUploads}
        columns={columns}
        storageKey='user-uploads-client-table'
        defaultPageSize={10}
      />
    </Card>
  );
}

/* --------------------------- Main Page Component --------------------------- */
export default function UserUploadPage() {
  // Dummy user data
  const user: UserType = {
    name: 'John Doe',
    role: 'Administrator',
    avatarUrl: '',
  };

  return (
    <DashboardLayout user={user} navItems={navItem} onLogout={() => {}}>
      <div className='flex flex-col space-y-6 p-6'>
        <div className='py-[10px]'>
          <Typography
            as='h1'
            variant='k2'
            className='font-adelphe font-bold md:text-[32px]'
          >
            Track Uploads
          </Typography>
        </div>

        <UploadTable />
      </div>
    </DashboardLayout>
  );
}
