'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { Calendar, Info, Trash2, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { navItem } from '@/app/dashboard/sidebar-link';
import { BaseClientDataTable } from '@/components/table/base-data-table';
import Typography from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import DashboardLayout from '@/layouts/DashboardLayout';
import type { RepositoryItem } from '@/types/repository';
import type { User as UserType } from '@/types/sidebar';

/* --------------------------- Mock Data Generator --------------------------- */
function generateMockRepositories(count = 50): RepositoryItem[] {
  return Array.from({ length: count }).map((_, i) => {
    const idx = i + 1;
    const day = (i % 28) + 1;
    const dd = String(day).padStart(2, '0');
    return {
      id: `R-${String(idx).padStart(3, '0')}`,
      title: `Repository Item #${idx} — Advanced Research on Topic ${(idx % 10) + 1}`,
      date: `2024-06-${dd}`,
      writer: `Author ${(idx % 5) + 1}`,
    };
  });
}

/* --------------------------- Columns Definition --------------------------- */
const getRepositoryColumns = (
  onDeleteClick: (item: RepositoryItem) => void,
): ColumnDef<RepositoryItem>[] => [
  {
    id: 'no',
    header: () => (
      <Typography as='span' variant='s3' className='block text-center'>
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
      <Typography as='span' variant='s2' className='block text-left'>
        Title
      </Typography>
    ),
    cell: ({ getValue }) => (
      <div className='space-y-1'>
        <Typography
          as='span'
          variant='b2'
          className='line-clamp-2 text-left'
          title={getValue<string>()}
        >
          {getValue<string>()}
        </Typography>
      </div>
    ),
    meta: {
      initialWidth: 200,
      minWidth: 180,
      maxWidth: 300,
      resizable: true,
    },
  },
  {
    accessorKey: 'date',
    header: () => (
      <span className='flex items-center gap-1'>
        <Calendar className='h-4 w-4' />
        <Typography as='span' variant='s3'>
          Date
        </Typography>
      </span>
    ),
    cell: ({ getValue }) => (
      <Typography as='span' variant='s3' className='text-sm'>
        {new Date(getValue<string>()).toLocaleDateString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </Typography>
    ),
    meta: {
      initialWidth: 140,
      minWidth: 120,
      maxWidth: 160,
      resizable: true,
      wrap: 'clamp',
    },
  },
  {
    accessorKey: 'writer',
    header: () => (
      <span className='flex items-center gap-1'>
        <User className='h-4 w-4' />
        <Typography as='span' variant='s3'>
          Writer
        </Typography>
      </span>
    ),
    cell: ({ getValue }) => (
      <Typography as='span' variant='s3' className='text-sm text-gray-700'>
        {getValue<string>()}
      </Typography>
    ),
    meta: {
      initialWidth: 130,
      minWidth: 120,
      maxWidth: 150,
      resizable: true,
      wrap: 'clamp',
    },
  },
  {
    id: 'actions',
    header: () => (
      <Typography as='span' variant='s2'>
        Actions
      </Typography>
    ),
    cell: ({ row }) => (
      <div className='flex items-center gap-1'>
        <Button
          size='lg'
          variant='destructive'
          onClick={() => {
            onDeleteClick(row.original);
          }}
          title='Delete'
        >
          <Trash2 className='h-4 w-4' />
          <Typography as='span' variant='s3'>
            Delete
          </Typography>
        </Button>
        <Button size='lg' variant='default' title='View Details'>
          <Link
            href={`/dashboard/repository/${row.original.id}`}
            className='flex items-center gap-2'
          >
            <Info className='h-4 w-4' />
            <Typography as='span' variant='s3'>
              Detail
            </Typography>
          </Link>
        </Button>
      </div>
    ),
    meta: {
      initialWidth: 320,
      minWidth: 320,
      maxWidth: 380,
      resizable: true,
      wrap: 'clamp',
    },
  },
];

/* --------------------------- Repository Table Component --------------------------- */
function RepositoryTable({
  onDeleteClick,
}: {
  onDeleteClick: (item: RepositoryItem) => void;
}) {
  // Mock data
  const mockRepositories = useMemo(() => generateMockRepositories(50), []);
  const columns = useMemo(
    () => getRepositoryColumns(onDeleteClick),
    [onDeleteClick],
  );

  return (
    <Card className='rounded-2xl'>
      <BaseClientDataTable<RepositoryItem>
        allData={mockRepositories}
        columns={columns}
        storageKey='repository-client-table'
        defaultPageSize={10}
      />
    </Card>
  );
}

/* --------------------------- Main Page Component --------------------------- */
export default function RepositoryPage() {
  // Dummy User Data
  const user: UserType = {
    name: 'John Doe',
    role: 'Administrator',
    avatarUrl: '',
  };

  // Confirm Modal States
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RepositoryItem | null>(null);

  // Handler for delete button click
  const handleDeleteClick = (item: RepositoryItem) => {
    setSelectedItem(item);
    setOpen(true);
  };

  // Handler for delete confirmation
  const handleDeleteConfirm = () => {
    if (selectedItem) {
      setOpen(false);
      setSuccessOpen(true);
      setSelectedItem(null);
      toast.success('Repository item deleted successfully!');
    }
  };

  return (
    <DashboardLayout
      navItems={navItem}
      user={user}
      onLogout={() => {
        /* Handle logout */
      }}
    >
      <div className='flex flex-col space-y-6 p-6'>
        {/* Delete Confirmation Modal */}
        <ConfirmModal
          open={open}
          onOpenChange={setOpen}
          variant={'danger'}
          size={'md'}
          title={'Please confirm that you want to delete this data'}
          illustration={
            <Image
              src='/images/illustrations/delete-confirm.png'
              alt='Delete Confirmation'
              width={300}
              height={300}
            />
          }
          actions={[
            {
              id: 'no',
              label: 'No',
              variant: 'outline',
              onClick: () => setOpen(false),
            },
            {
              id: 'yes',
              label: 'Yes, Delete',
              variant: 'destructive',
              onClick: handleDeleteConfirm,
            },
          ]}
        />
        {/* Success Confirmation Modal */}
        <ConfirmModal
          open={successOpen}
          onOpenChange={setSuccessOpen}
          variant={'success'}
          size={'md'}
          title={'Data Deleted Successfully'}
          illustration={
            <Image
              src='/images/illustrations/delete-success.png'
              alt='Success Confirmation'
              width={300}
              height={300}
            />
          }
          actions={[
            {
              id: 'ok',
              label: 'OK',
              variant: 'default',
              onClick: () => setSuccessOpen(false),
            },
          ]}
        />

        <div className='py-[10px]'>
          <Typography
            as='h1'
            variant='k2'
            className='font-adelphe font-bold md:text-[32px]'
          >
            Available Repositories
          </Typography>
        </div>

        <RepositoryTable onDeleteClick={handleDeleteClick} />
      </div>
    </DashboardLayout>
  );
}
