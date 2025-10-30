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
import type { RequestItem } from '@/types/request';
import type { User as UserType } from '@/types/sidebar';

/* --------------------------- Mock Data Generator --------------------------- */
function generateMockRequests(count = 50): RequestItem[] {
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
  const writers = [
    'Ahmad Rizki Pratama',
    'Siti Nurhaliza',
    'Bambang Setiawan',
    'Dewi Lestari',
    'Fajar Nugraha',
  ];

  return Array.from({ length: count }).map((_, i) => {
    const idx = i + 1;
    const day = (i % 28) + 1;
    const month = ((i % 12) + 1).toString().padStart(2, '0');
    const dd = String(day).padStart(2, '0');

    return {
      id: `REQ-${String(idx).padStart(4, '0')}`,
      name: names[i % names.length],
      nrp: 5025220000 + idx,
      email: `student${idx}@student.its.ac.id`,
      reason: `Membutuhkan referensi untuk penelitian tugas akhir terkait topik yang serupa.`,
      repositoryTitle: titles[i % titles.length],
      writer: writers[i % writers.length],
      requestDate: `2025-${month}-${dd}T10:30:00Z`,
      status: statuses[i % statuses.length],
    };
  });
}

/* --------------------------- Columns Definition --------------------------- */
const getRequestColumns = (): ColumnDef<RequestItem>[] => [
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
    accessorKey: 'repositoryTitle',
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
    accessorKey: 'requestDate',
    header: () => (
      <span className='flex items-center gap-1'>
        <Typography
          as='span'
          variant='s3'
          className='block text-left font-medium'
        >
          Request Date
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
    accessorKey: 'name',
    header: () => (
      <span className='flex items-center gap-1'>
        <Typography
          as='span'
          variant='s3'
          className='block text-left font-medium'
        >
          Applicant
        </Typography>
      </span>
    ),
    cell: ({ getValue }) => (
      <Typography as='span' variant='s3' className='text-sm text-gray-700'>
        {getValue<string>()}
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
        <StatusBadge status={getValue<RequestItem['status']>()} />
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
            href={`/dashboard/user-requests/${row.original.id}`}
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

/* --------------------------- Request Table Component --------------------------- */
function RequestTable() {
  // Mock data
  const mockRequests = useMemo(() => generateMockRequests(50), []);
  const columns = useMemo(() => getRequestColumns(), []);

  return (
    <Card className='rounded-2xl'>
      <BaseClientDataTable<RequestItem>
        allData={mockRequests}
        columns={columns}
        storageKey='user-requests-client-table'
        defaultPageSize={10}
      />
    </Card>
  );
}

/* --------------------------- Main Page Component --------------------------- */
export default function UserRequestPage() {
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
            Track Requests
          </Typography>
        </div>

        <RequestTable />
      </div>
    </DashboardLayout>
  );
}
