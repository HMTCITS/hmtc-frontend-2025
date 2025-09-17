'use client';

import { ColumnDef } from '@tanstack/react-table';
import React, { useState } from 'react';

import { BaseDataTable } from '@/components/table/base-data-table';
import { StatusBadge } from '@/components/table/status-badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDDMMYYYY } from '@/lib/utils/date';
import type { QueryState, RequestItem } from '@/types/data-table';

// Mock data for client-side demo
const clientMockData: RequestItem[] = [
  {
    id: '1',
    title: 'Request for project documentation review',
    requestDate: '2024-01-15',
    applicant: 'John Smith',
    status: 'pending',
  },
  {
    id: '2',
    title: 'System maintenance approval request',
    requestDate: '2024-01-14',
    applicant: 'Jane Doe',
    status: 'in-review',
  },
  {
    id: '3',
    title: 'Database backup verification request',
    requestDate: '2024-01-13',
    applicant: 'Bob Johnson',
    status: 'approved',
  },
  {
    id: '4',
    title: 'Code deployment permission request',
    requestDate: '2024-01-12',
    applicant: 'Alice Brown',
    status: 'rejected',
  },
  // Add more data for pagination demo
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `demo-${i + 5}`,
    title: `Demo request ${i + 5} for testing table features`,
    requestDate: `2024-01-${Math.max(1, 11 - (i % 10))}`,
    applicant: `Demo User ${i + 5}`,
    status: (['pending', 'in-review', 'approved', 'rejected'] as const)[i % 4],
  })),
];

// Define columns locally to avoid dependency issues
const demoColumns: ColumnDef<RequestItem>[] = [
  {
    id: 'no',
    header: 'No.',
    size: 56,
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination?.pageIndex ?? 0;
      const pageSize = table.getState().pagination?.pageSize ?? 10;
      return pageIndex * pageSize + row.index + 1;
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ getValue }) => (
      <span className='line-clamp-1 max-w-[200px]' title={getValue<string>()}>
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: 'requestDate',
    header: 'Request Date',
    cell: ({ getValue }) => formatDDMMYYYY(getValue<string>()),
  },
  {
    accessorKey: 'applicant',
    header: 'Applicant',
    cell: ({ getValue }) => (
      <span className='line-clamp-1 max-w-[150px]' title={getValue<string>()}>
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => (
      <StatusBadge status={getValue<RequestItem['status']>()} />
    ),
  },
  {
    id: 'actions',
    header: 'Action',
    size: 120,
    cell: ({ row }) => (
      <Button
        size='sm'
        variant='outline'
        onClick={() => {
          alert(`View details for: ${row.original.title}`);
        }}
      >
        Detail
      </Button>
    ),
  },
];

// Mock server data with pagination
const generateServerData = (query: QueryState) => {
  let filteredData = [...clientMockData];

  // Apply search filter
  if (query.q) {
    const searchTerm = query.q.toLowerCase();
    filteredData = filteredData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.applicant.toLowerCase().includes(searchTerm) ||
        item.status.toLowerCase().includes(searchTerm),
    );
  }

  // Apply sorting
  if (query.sort && query.sort.length > 0) {
    const sort = query.sort[0];
    filteredData.sort((a, b) => {
      const aValue = (a as any)[sort.id];
      const bValue = (b as any)[sort.id];

      if (aValue < bValue) return sort.desc ? 1 : -1;
      if (aValue > bValue) return sort.desc ? -1 : 1;
      return 0;
    });
  }

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / query.pageSize);
  const startIndex = (query.page - 1) * query.pageSize;
  const endIndex = startIndex + query.pageSize;
  const items = filteredData.slice(startIndex, endIndex);

  return { items, totalItems, totalPages };
};

export default function TableSandbox() {
  const [serverData, setServerData] = useState<RequestItem[]>([]);
  const [serverQuery, setServerQuery] = useState<QueryState>({
    page: 1,
    pageSize: 5,
  });
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Simulate server-side data fetching
  const handleServerQueryChange = async (newQuery: QueryState) => {
    setLoading(true);
    setServerQuery(newQuery);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const result = generateServerData(newQuery);
    setServerData(result.items);
    setTotalItems(result.totalItems);
    setTotalPages(result.totalPages);
    setLoading(false);
  };

  // Initialize server data
  React.useEffect(() => {
    handleServerQueryChange(serverQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className='space-y-10 p-8'>
      <h1 className='font-adelphe text-3xl font-bold'>Table Components</h1>

      {/* Basic shadcn Table */}
      <section className='space-y-4'>
        <div>
          <h2 className='mb-2 text-xl font-semibold'>Basic shadcn/ui Table</h2>
          <p className='mb-4 text-sm text-muted-foreground'>
            Standard table component from shadcn/ui
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Country</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>28</TableCell>
              <TableCell>New York</TableCell>
              <TableCell>USA</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell>34</TableCell>
              <TableCell>London</TableCell>
              <TableCell>UK</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Michael Johnson</TableCell>
              <TableCell>45</TableCell>
              <TableCell>Toronto</TableCell>
              <TableCell>Canada</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      {/* Client-side DataTable */}
      <section className='space-y-4'>
        <div>
          <h2 className='mb-2 text-xl font-semibold'>
            BaseDataTable - Client-side Mode
          </h2>
          <p className='mb-4 text-sm text-muted-foreground'>
            Advanced DataTable with client-side sorting, filtering, and
            pagination
          </p>
        </div>

        <BaseDataTable<RequestItem>
          data={clientMockData}
          columns={demoColumns}
          storageKey='sandbox-client-table'
          emptyMessage='No client data available'
          onRowClick={(row: RequestItem) => {
            alert(`Client Mode - Clicked: ${row.title}`);
          }}
          toolbarRight={() => (
            <button
              type='button'
              className='rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700'
            >
              Client Action
            </button>
          )}
        />
      </section>

      {/* Server-side DataTable */}
      <section className='space-y-4'>
        <div>
          <h2 className='mb-2 text-xl font-semibold'>
            BaseDataTable - Server-side Mode
          </h2>
          <p className='mb-4 text-sm text-muted-foreground'>
            Advanced DataTable with server-side data handling, pagination, and
            loading states
          </p>
        </div>

        <BaseDataTable<RequestItem>
          serverMode
          data={serverData}
          columns={demoColumns}
          query={serverQuery}
          onQueryChange={handleServerQueryChange}
          loading={loading}
          totalItems={totalItems}
          totalPages={totalPages}
          storageKey='sandbox-server-table'
          emptyMessage='No server data available'
          onRowClick={(row: RequestItem) => {
            alert(`Server Mode - Clicked: ${row.title}`);
          }}
          toolbarRight={(query: QueryState) => (
            <div className='flex items-center gap-2'>
              <span className='text-xs text-muted-foreground'>
                Page: {query.page}
              </span>
              <button
                type='button'
                className='rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700'
              >
                Server Action
              </button>
            </div>
          )}
        />
      </section>
    </main>
  );
}
