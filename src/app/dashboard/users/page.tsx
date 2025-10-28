'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { Info } from 'lucide-react';
import Link from 'next/link';
import React, { useMemo } from 'react';

import { navItem } from '@/app/dashboard/sidebar-link';
import { BaseClientDataTable } from '@/components/table/base-data-table';
import Typography from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DashboardLayout from '@/layouts/DashboardLayout';
import type { User as UserType } from '@/types/sidebar';

/* --------------------------- Role Configuration --------------------------- */
const ROLE_CONFIG = [
  {
    name: 'Admin Repository',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-300',
  },
  {
    name: 'Admin Gallery',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-800',
    borderColor: 'border-orange-300',
  },
  {
    name: 'User',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800',
    borderColor: 'border-gray-300',
  },
  {
    name: 'Editor',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-300',
  },
  {
    name: 'Viewer',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-800',
    borderColor: 'border-purple-300',
  },
] as const;

/* --------------------------- User Type for Table --------------------------- */
interface UserTableItem {
  id: string;
  name: string;
  email: string;
  role: string;
}

/* --------------------------- Helper Function --------------------------- */
function getRoleStyle(roleName: string) {
  const roleConfig = ROLE_CONFIG.find((r) => r.name === roleName);
  return (
    roleConfig || {
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-300',
    }
  );
}

/* --------------------------- Mock Data Generator --------------------------- */
function generateMockUsers(count = 30): UserTableItem[] {
  const roles = [
    'Admin Repository',
    'Admin Gallery',
    'User',
    'Editor',
    'Viewer',
  ];
  const firstNames = [
    'John',
    'Jane',
    'Michael',
    'Sarah',
    'David',
    'Emily',
    'Robert',
    'Lisa',
    'James',
    'Maria',
  ];
  const lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Rodriguez',
    'Martinez',
  ];

  return Array.from({ length: count }).map((_, i) => {
    const idx = i + 1;
    const firstName = firstNames[idx % firstNames.length];
    const lastName =
      lastNames[Math.floor(idx / firstNames.length) % lastNames.length];
    return {
      id: `U-${String(idx).padStart(3, '0')}`,
      name: `${firstName} ${lastName}`,
      email: `user${idx}@example.com`,
      role: roles[idx % roles.length],
    };
  });
}

/* --------------------------- Columns Definition --------------------------- */
const getUserColumns = (): ColumnDef<UserTableItem>[] => [
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
    accessorKey: 'name',
    header: () => (
      <span className='flex items-center gap-1'>
        <Typography as='span' variant='s3'>
          Name
        </Typography>
      </span>
    ),
    cell: ({ getValue }) => (
      <Typography as='span' variant='b2' className='text-sm font-medium'>
        {getValue<string>()}
      </Typography>
    ),
    meta: {
      initialWidth: 180,
      minWidth: 150,
      maxWidth: 220,
      resizable: true,
    },
  },
  {
    accessorKey: 'email',
    header: () => (
      <span className='flex items-center gap-1'>
        <Typography as='span' variant='s3'>
          Email
        </Typography>
      </span>
    ),
    cell: ({ getValue }) => (
      <Typography as='span' variant='b2' className='text-sm'>
        {getValue<string>()}
      </Typography>
    ),
    meta: {
      initialWidth: 220,
      minWidth: 180,
      maxWidth: 280,
      resizable: true,
    },
  },
  {
    accessorKey: 'role',
    header: () => (
      <span className='flex items-center gap-1'>
        <Typography as='span' variant='s3'>
          Role
        </Typography>
      </span>
    ),
    cell: ({ getValue }) => {
      const role = getValue<string>();
      const { bgColor, textColor, borderColor } = getRoleStyle(role);
      return (
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium ${bgColor} ${textColor} ${borderColor}`}
        >
          {role}
        </span>
      );
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
    id: 'actions',
    header: () => (
      <Typography as='span' variant='s2'>
        Actions
      </Typography>
    ),
    cell: ({ row }) => (
      <div className='flex items-center gap-1'>
        <Button size='lg' variant='default' title='View Details'>
          <Link
            href={`/dashboard/users/${row.original.id}`}
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
      initialWidth: 160,
      minWidth: 140,
      maxWidth: 200,
      resizable: true,
      wrap: 'clamp',
    },
  },
];

/* --------------------------- Users Table Component --------------------------- */
function UsersTable() {
  // Mock data
  const mockUsers = useMemo(() => generateMockUsers(30), []);
  const columns = useMemo(() => getUserColumns(), []);

  return (
    <Card className='rounded-2xl'>
      <BaseClientDataTable<UserTableItem>
        allData={mockUsers}
        columns={columns}
        storageKey='users-client-table'
        defaultPageSize={10}
      />
    </Card>
  );
}

/* --------------------------- Main Page Component --------------------------- */
export default function UserPage() {
  // Dummy User Data
  const user: UserType = {
    name: 'Jane Smith',
    role: 'Administrator',
    avatarUrl: '',
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
        <div className='py-[10px]'>
          <Typography
            as='h1'
            variant='k2'
            className='font-adelphe font-bold md:text-[32px]'
          >
            User
          </Typography>
        </div>

        <UsersTable />
      </div>
    </DashboardLayout>
  );
}
