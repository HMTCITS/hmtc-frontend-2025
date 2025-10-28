'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { Calendar, Info } from 'lucide-react';
import Link from 'next/link';
import React, { useMemo } from 'react';

import StatusBadge, {
  type RequestStatus,
} from '@/components/profile/StatusBadge';
import TrackTypeBadge, {
  type TrackType,
} from '@/components/profile/TrackTypeBadge';
import { BaseClientDataTable } from '@/components/table/base-data-table';
import Typography from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

/* --------------------------- Request Type Definition --------------------------- */
interface UserRequestItem {
  id: string;
  title: string;
  requestDate: string;
  trackType: TrackType;
  status: RequestStatus;
}

/* --------------------------- Mock Data Generator --------------------------- */
function generateMockRequests(userId: string, count = 20): UserRequestItem[] {
  const titles = [
    'Request to upload repository',
    'Request new repository access',
    'Upload research paper',
    'Request repository permissions',
    'Submit project documentation',
    'Request repository creation',
  ];
  const trackTypes: TrackType[] = ['request_repository', 'upload_repository'];
  const statuses: RequestStatus[] = ['pending', 'approved', 'rejected'];

  return Array.from({ length: count }).map((_, i) => {
    const idx = i + 1;
    const day = (i % 28) + 1;
    const month = ((i % 12) + 1).toString().padStart(2, '0');
    const dd = String(day).padStart(2, '0');

    return {
      id: `REQ-${userId}-${String(idx).padStart(3, '0')}`,
      title: titles[idx % titles.length],
      requestDate: `2024-${month}-${dd}`,
      trackType: trackTypes[idx % trackTypes.length],
      status: statuses[idx % statuses.length],
    };
  });
}

/* --------------------------- Columns Definition --------------------------- */
const getRequestColumns = (userId: string): ColumnDef<UserRequestItem>[] => [
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
      initialWidth: 220,
      minWidth: 180,
      maxWidth: 300,
      resizable: true,
    },
  },
  {
    accessorKey: 'requestDate',
    header: () => (
      <span className='flex items-center gap-1'>
        <Calendar className='h-4 w-4' />
        <Typography as='span' variant='s3'>
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
      initialWidth: 160,
      minWidth: 140,
      maxWidth: 180,
      resizable: true,
      wrap: 'clamp',
    },
  },
  {
    accessorKey: 'trackType',
    header: () => (
      <Typography as='span' variant='s3'>
        Track Type
      </Typography>
    ),
    cell: ({ getValue }) => {
      const trackType = getValue<TrackType>();
      return <TrackTypeBadge trackType={trackType} />;
    },
    meta: {
      initialWidth: 180,
      minWidth: 160,
      maxWidth: 220,
      resizable: true,
      wrap: 'clamp',
    },
  },
  {
    accessorKey: 'status',
    header: () => (
      <Typography as='span' variant='s3'>
        Status
      </Typography>
    ),
    cell: ({ getValue }) => {
      const status = getValue<RequestStatus>();
      return <StatusBadge status={status} />;
    },
    meta: {
      initialWidth: 130,
      minWidth: 110,
      maxWidth: 150,
      resizable: true,
      wrap: 'clamp',
    },
  },
  {
    id: 'actions',
    header: () => (
      <Typography as='span' variant='s2'>
        Action
      </Typography>
    ),
    cell: ({ row }) => (
      <div className='flex items-center gap-1'>
        <Button size='lg' variant='default' title='View Details'>
          <Link
            href={`/dashboard/users/${userId}/requests/${row.original.id}`}
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
      initialWidth: 140,
      minWidth: 120,
      maxWidth: 160,
      resizable: true,
      wrap: 'clamp',
    },
  },
];

/* --------------------------- Request History Table Component --------------------------- */
interface RequestHistoryTableProps {
  userId: string;
}

export default function RequestHistoryTable({
  userId,
}: RequestHistoryTableProps) {
  // Mock data
  const mockRequests = useMemo(
    () => generateMockRequests(userId, 20),
    [userId],
  );
  const columns = useMemo(() => getRequestColumns(userId), [userId]);

  return (
    <div className='space-y-4'>
      {/* Section Header */}
      <Typography
        as='h2'
        variant='h2'
        font='satoshi'
        weight='semibold'
        className='text-[24px] text-black'
      >
        Request History
      </Typography>

      {/* Table Card */}
      <Card className='rounded-2xl'>
        <BaseClientDataTable<UserRequestItem>
          allData={mockRequests}
          columns={columns}
          storageKey={`user-${userId}-requests-table`}
          defaultPageSize={10}
        />
      </Card>
    </div>
  );
}
