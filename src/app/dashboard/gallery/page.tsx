'use client';

import type { ColumnDef } from '@tanstack/react-table';
import {
  Calendar,
  Edit,
  Eye,
  Link as LinkIcon,
  Plus,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import React, { useMemo } from 'react';

import {
  Gallery,
  Profile,
  Repository,
  Requests,
  Upload,
  User,
} from '@/app/landing/components/dashboard/icons';
import { BaseClientDataTable } from '@/components/table/base-data-table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DashboardLayout from '@/layouts/DashboardLayout';
import { formatDDMMYYYY } from '@/lib/utils/date';
import type { GalleryItem } from '@/types/gallery';
import type { NavItem, User as UserType } from '@/types/sidebar'

/* --------------------------- Mock Data Generator --------------------------- */
function generateMockGalleries(count = 50): GalleryItem[] {
  return Array.from({ length: count }).map((_, i) => {
    const idx = i + 1;
    const day = (i % 28) + 1;
    const dd = String(day).padStart(2, '0');
    return {
      id: idx,
      title: `Gallery Item #${idx} — Nature Photography ${(idx % 10) + 1}`,
      date: `2024-06-${dd}`,
      image: `/gallery/hmtchmti.jpg`,
      link: `https://drive.google.com/file/d/example-${idx}/view`,
      width: 800 + (idx % 5) * 100,
      height: 600 + (idx % 3) * 100,
    };
  });
}

/* --------------------------- Columns Definition --------------------------- */
const getGalleryColumns = (): ColumnDef<GalleryItem>[] => [
  {
    id: 'no',
    header: () => <span className='block text-center'>No.</span>,
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
    header: () => <span className='block text-left'>Title</span>,
    cell: ({ getValue }) => (
      <div className='space-y-1'>
        <span className='line-clamp-2 text-left' title={getValue<string>()}>
          {getValue<string>()}
        </span>
      </div>
    ),
    meta: {
      initialWidth: 250,
      minWidth: 200,
      maxWidth: 300,
      resizable: true,
    },
  },
  {
    accessorKey: 'date',
    header: () => (
      <span className='flex items-center gap-1'>
        <Calendar className='h-4 w-4' />
        Date
      </span>
    ),
    cell: ({ getValue }) => (
      <span className='text-sm'>{formatDDMMYYYY(getValue<string>())}</span>
    ),
    meta: {
      initialWidth: 120,
      minWidth: 100,
      maxWidth: 140,
      resizable: true,
      wrap: 'clamp',
    },
  },
  {
    accessorKey: 'link',
    header: () => (
      <span className='flex items-center gap-1'>
        <LinkIcon className='h-4 w-4' />
        Link
      </span>
    ),
    cell: ({ getValue }) => (
      <a
        href={getValue<string>()}
        target='_blank'
        rel='noopener noreferrer'
        className='nax-w-[300px] block truncate text-sm text-blue-600 hover:text-blue-800'
        title={getValue<string>()}
      >
        {getValue<string>()}
      </a>
    ),
    meta: {
      initialWidth: 150,
      minWidth: 150,
      maxWidth: 300,
      resizable: true,
      wrap: 'clamp',
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className='flex items-center gap-1'>
        <Button
          size='sm'
          variant='ghost'
          onClick={() => alert(`View details: ${row.original.title}`)}
          title='View Details'
        >
          <Eye className='h-4 w-4' />
        </Button>
        <Button
          size='sm'
          variant='ghost'
          onClick={() => alert(`Edit: ${row.original.title}`)}
          title='Edit'
        >
          <Edit className='h-4 w-4' />
        </Button>
        <Button
          size='sm'
          variant='ghost'
          onClick={() => {
            if (confirm('Are you sure you want to delete this gallery item?')) {
              alert(`Delete: ${row.original.title}`);
            }
          }}
          className='text-red-600 hover:text-red-700'
          title='Delete'
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      </div>
    ),
    meta: {
      initialWidth: 120,
      minWidth: 110,
      maxWidth: 140,
      resizable: false,
      wrap: 'clamp',
    },
  },
];

/* --------------------------- Gallery Table Component --------------------------- */
function GalleryTable() {
  // Mock data
  const mockGalleries = useMemo(() => generateMockGalleries(50), []);
  const columns = useMemo(() => getGalleryColumns(), []);

  // Custom toolbar -> Add new gallery button
  const customToolbarRight = () => {
    return (
      <Link
        href='/dashboard/gallery/add'
        className='flex justify-center rounded-lg bg-blue-500 px-[16px] py-[12px] text-white'
      >
        <p className='flex h-[30px] items-center gap-2 font-satoshi text-[16px]/8 font-medium'>
          Add Gallery
          <Plus />
        </p>
      </Link>
    );
  };

  return (
    <Card>
      <BaseClientDataTable<GalleryItem>
        allData={mockGalleries}
        columns={columns}
        storageKey='gallery-client-table'
        defaultPageSize={10}
        toolbarRight={customToolbarRight}
      />
    </Card>
  );
}

/* --------------------------- Main Page Component --------------------------- */
export default function GalleryPage() {
  // Navigation Items
  const navItem: NavItem[] = [
    { href: '/profile', label: 'Profile', icon: Profile },
    { href: '/user', label: 'User', icon: User },
    { href: '/repository', label: 'Repository', icon: Repository },
    { href: '/user-requests', label: 'User Requests', icon: Requests },
    { href: '/user-uploads', label: 'User Upload', icon: Upload },
    { href: '/dashboard/gallery', label: 'Gallery Post', icon: Gallery },
  ];

  // Dummy User Data
  const user: UserType = {
    name: 'John Doe',
    role: 'Administrator',
    avatarUrl: '',
  };

  return (
    <DashboardLayout
      user={user}
      navItems={navItem}
      onLogout={() => {
        /* Handle logout */
      }}
    >
      <div className='flex flex-col space-y-6 p-6'>
        <h1 className='px-[24px] py-[10px] font-adelphe text-[32px] font-bold'>
          Available Gallery
        </h1>

        <GalleryTable />
      </div>
    </DashboardLayout>
  );
}
