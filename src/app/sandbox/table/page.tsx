'use client';

import type { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
  BaseClientDataTable,
  BaseServerDataTable,
} from '@/components/table/base-data-table';
import { Button } from '@/components/ui/button';
import { formatDDMMYYYY } from '@/lib/utils/date';
import type { QueryState } from '@/types/data-table';

/* --------------------------- Types & Dummy Data --------------------------- */
type RequestItem = {
  id: string;
  title: string;
  requestDate: string; // ISO date
  applicant: string;
  status: 'pending' | 'in-review' | 'approved' | 'rejected';
};

const STATUSES: RequestItem['status'][] = [
  'pending',
  'in-review',
  'approved',
  'rejected',
];

function generateDummyAll(count = 500): RequestItem[] {
  return Array.from({ length: count }).map((_, i) => {
    const idx = i + 1;
    const status = STATUSES[i % STATUSES.length];
    const day = (i % 28) + 1;
    const dd = String(day).padStart(2, '0');
    return {
      id: String(idx),
      title: `Demo request #${idx} — Improve feature ${(idx % 10) + 1}`,
      requestDate: `2024-06-${dd}`,
      applicant: `User ${(idx % 20) + 1}`,
      status,
    };
  });
}

/* --------------------------- Columns definition --------------------------- */
const getColumns = (): ColumnDef<RequestItem>[] => [
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
      <span className='line-clamp-1 max-w-[280px]' title={getValue<string>()}>
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
      <span className='line-clamp-1 max-w-[160px]' title={getValue<string>()}>
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => (
      <span className='capitalize'>{getValue<RequestItem['status']>()}</span>
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
        onClick={() => alert(`Detail for: ${row.original.title}`)}
      >
        Detail
      </Button>
    ),
  },
];

/* --------------------------- Dummy server API --------------------------------
   Simulates an API endpoint that accepts query params and returns a paged response
   shape: { items: RequestItem[], page, pageSize, totalItems, totalPages }
   --------------------------------------------------------------------------- */
function fakeApiFetch(params: {
  page?: number;
  pageSize?: number;
  q?: string;
  sort?: { id: string; desc?: boolean }[];
}) {
  const all = generateDummyAll(500);
  return new Promise<{
    items: RequestItem[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  }>((resolve) => {
    // simulate network latency
    setTimeout(
      () => {
        let ds = all;
        // search
        if (params.q && params.q.trim() !== '') {
          const qq = params.q.trim().toLowerCase();
          ds = ds.filter(
            (it) =>
              it.title.toLowerCase().includes(qq) ||
              it.applicant.toLowerCase().includes(qq) ||
              it.status.toLowerCase().includes(qq),
          );
        }
        // sort (only first sort supported here)
        if (params.sort && params.sort.length > 0) {
          const s = params.sort[0];
          ds = [...ds].sort((a, b) => {
            const av = (a as any)[s.id];
            const bv = (b as any)[s.id];
            if (av < bv) return s.desc ? 1 : -1;
            if (av > bv) return s.desc ? -1 : 1;
            return 0;
          });
        }

        const total = ds.length;
        const pageSize = params.pageSize ?? 10;
        const page = Math.max(1, params.page ?? 1);
        const totalPages = Math.max(1, Math.ceil(total / pageSize));
        const start = (page - 1) * pageSize;
        const items = ds.slice(start, start + pageSize);

        resolve({ items, page, pageSize, totalItems: total, totalPages });
      },
      200 + Math.random() * 150,
    ); // 200-350ms
  });
}

/* --------------------------- Sandbox: Client Demo --------------------------- */
function ClientSandbox() {
  const allData = useMemo(() => generateDummyAll(200), []);
  const columns = useMemo(() => getColumns(), []);

  return (
    <section className='rounded-lg border p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>
            Client-side DataTable (All data local)
          </h3>
          <p className='text-sm text-muted-foreground'>
            All data is passed in — filtering/sorting/pagination performed on
            client.
          </p>
        </div>
        <div>
          <Button
            size='sm'
            variant='ghost'
            onClick={() => alert('Client quick action')}
          >
            Client Action
          </Button>
        </div>
      </div>

      <BaseClientDataTable<RequestItem>
        allData={allData}
        columns={columns}
        storageKey='sandbox-client-table'
        enableExportCsv
        enableColumnVisibility
        defaultPageSize={10}
      />
    </section>
  );
}

/* --------------------------- Sandbox: Server Demo --------------------------- */
function ServerSandbox() {
  const columns = useMemo(() => getColumns(), []);

  // Controlled query state
  const [query, setQuery] = useState<QueryState>({ page: 1, pageSize: 10 });
  const [items, setItems] = useState<RequestItem[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // Track previous query to detect page-only change
  const prevRef = useRef<QueryState | null>(null);

  useEffect(() => {
    const prev = prevRef.current;
    const onlyPageChanged =
      prev &&
      prev.page !== query.page &&
      prev.q === query.q &&
      JSON.stringify(prev.sort || []) === JSON.stringify(query.sort || []) &&
      prev.pageSize === query.pageSize;

    let cancelled = false;

    const doFetch = async () => {
      setLoading(true);
      try {
        const resp = await fakeApiFetch({
          page: query.page,
          pageSize: query.pageSize,
          q: query.q,
          sort: query.sort,
        });
        if (cancelled) return;
        setItems(resp.items);
        setTotalItems(resp.totalItems);
        setTotalPages(resp.totalPages);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (onlyPageChanged) {
      // immediate fetch for page changes
      doFetch();
    } else {
      // debounce for search/sort/pageSize
      const t = window.setTimeout(() => doFetch(), 400);
      return () => {
        cancelled = true;
        clearTimeout(t);
      };
    }

    prevRef.current = query;
    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <section className='rounded-lg border p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>
            Server-side DataTable (Fake API)
          </h3>
          <p className='text-sm text-muted-foreground'>
            Server-style pagination: component requests pages from an API-like
            function.
          </p>
        </div>
        <div>
          <Button
            size='sm'
            variant='ghost'
            onClick={() => alert('Server quick action')}
          >
            Server Action
          </Button>
        </div>
      </div>

      <BaseServerDataTable<RequestItem>
        data={items}
        columns={columns}
        query={query}
        onQueryChange={setQuery}
        totalItems={totalItems}
        totalPages={totalPages}
        storageKey='sandbox-server-table'
        enableExportCsv
        enableColumnVisibility
        loading={loading}
        defaultPageSize={10}
      />
    </section>
  );
}

/* ------------------------------- Page ------------------------------------ */
export default function TableSandboxPage() {
  return (
    <main className='space-y-10 p-8'>
      <h1 className='text-2xl font-bold'>Table Sandbox</h1>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
        <ClientSandbox />
        <ServerSandbox />
      </div>
    </main>
  );
}
