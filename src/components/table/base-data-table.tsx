'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Pagination } from '@/components/table/pagination';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { QueryState } from '@/types/data-table';

import ColumnToggle from './column-toggle';
import { EmptyState } from './empty-state';
import { ExportCsv } from './export-csv';
import { SkeletonRows } from './skeleton-rows';

/* --------------------- Utilities --------------------- */
function loadVisibility(key?: string): VisibilityState {
  if (!key || typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(`${key}:cols`);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    // ignore localStorage errors
    void e;
    return {};
  }
}
function saveVisibility(key?: string, v?: VisibilityState) {
  if (!key || typeof window === 'undefined' || !v) return;
  try {
    localStorage.setItem(`${key}:cols`, JSON.stringify(v));
  } catch (e) {
    // ignore localStorage errors
    void e;
  }
}

/* --------------------- Common Props --------------------- */
type CommonProps<TData extends RowData, TValue = unknown> = {
  columns: ColumnDef<TData, TValue>[];
  storageKey?: string;
  toolbarLeft?: React.ReactNode | ((qs: QueryState) => React.ReactNode);
  toolbarRight?: React.ReactNode | ((qs: QueryState) => React.ReactNode);
  extraFilters?: React.ReactNode;
  enableColumnVisibility?: boolean;
  enableExportCsv?: boolean;
  enableVirtualize?: boolean;
  enableRowSelection?: boolean;
  defaultPageSize?: number;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  'aria-label'?: string;
  showInitialSkeleton?: boolean;
  initialSkeletonDuration?: number;
  serverMode?: boolean;
};

/* --------------------- BaseServerDataTable --------------------- */
export function BaseServerDataTable<TData extends RowData, TValue = unknown>({
  data,
  columns,
  query,
  onQueryChange,
  totalItems,
  totalPages,
  storageKey,
  toolbarLeft,
  toolbarRight,
  extraFilters,
  enableColumnVisibility = true,
  enableExportCsv = true,
  enableVirtualize = false,
  // enableRowSelection removed (unused)
  defaultPageSize = 10,
  loading = false,
  emptyMessage = 'No data',
  className,
  'aria-label': ariaLabel = 'Server data table',
  showInitialSkeleton = true,
  initialSkeletonDuration = 200,
}: CommonProps<TData, TValue> & {
  data?: TData[];
  query: QueryState;
  onQueryChange: (q: QueryState) => void;
  totalItems?: number;
  totalPages?: number;
}) {
  if (!query || !onQueryChange)
    throw new Error(
      'BaseServerDataTable requires query and onQueryChange props',
    );

  /* --------------------- States --------------------- */
  const [localSearch, setLocalSearch] = useState(query.q ?? '');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    () => loadVisibility(storageKey),
  );

  useEffect(
    () => saveVisibility(storageKey, columnVisibility),
    [columnVisibility, storageKey],
  );

  const cols = useMemo(() => columns, [columns]);
  const sortingState: SortingState = useMemo(
    () =>
      query.sort ? query.sort.map((s) => ({ id: s.id, desc: !!s.desc })) : [],
    [query.sort],
  );

  const [initialSkeletonActive, setInitialSkeletonActive] =
    useState(showInitialSkeleton);

  useEffect(() => {
    if (!showInitialSkeleton) return setInitialSkeletonActive(false);
    const t = window.setTimeout(
      () => setInitialSkeletonActive(false),
      initialSkeletonDuration,
    );
    return () => clearTimeout(t);
  }, [showInitialSkeleton, initialSkeletonDuration]);

  const [waitingForData, setWaitingForData] = useState(
    () => !Array.isArray(data) && showInitialSkeleton,
  );

  const prevQueryRef = useRef<string | null>(null);
  useEffect(() => {
    const key = JSON.stringify({
      page: query.page,
      pageSize: query.pageSize,
      q: query.q,
      sort: query.sort,
    });
    if (prevQueryRef.current !== key) {
      prevQueryRef.current = key;
      setWaitingForData(true);
    }
  }, [query.page, query.pageSize, query.q, query.sort]);

  useEffect(() => {
    if (loading) setWaitingForData(true);
  }, [loading]);

  useEffect(() => {
    if (Array.isArray(data)) setWaitingForData(false);
  }, [data]);

  /* --------------------- React Table --------------------- */
  const table = useReactTable<TData>({
    data: data ?? [],
    columns: cols,
    state: {
      sorting: sortingState,
      columnVisibility,
      globalFilter: query.q ?? '',
    },
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
    pageCount:
      totalPages ??
      Math.max(
        1,
        Math.ceil(
          (totalItems ?? data?.length ?? 0) /
            (query.pageSize ?? defaultPageSize),
        ),
      ),
    onSortingChange: (updater) => {
      const next =
        typeof updater === 'function' ? updater(sortingState) : updater;
      onQueryChange({
        ...query,
        sort: next.map((s) => ({ id: String(s.id), desc: !!s.desc })),
        page: 1, // reset page when sorting changes
      });
    },
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: (v) => {
      onQueryChange({ ...query, q: v, page: 1 });
    },
  });

  useEffect(() => {
    table.setPageSize(query.pageSize ?? defaultPageSize);
    table.setPageIndex(Math.max(0, (query.page ?? 1) - 1));
  }, [query.page, query.pageSize, query.sort, defaultPageSize, table]);

  useEffect(
    () => setLocalSearch(query.q ?? ''),
    [query.q, onQueryChange, query],
  );

  useEffect(() => {
    const id = setTimeout(() => {
      if (query.q !== localSearch)
        onQueryChange({ ...query, q: localSearch, page: 1 });
    }, 400);
    return () => clearTimeout(id);
  }, [localSearch, onQueryChange, query]);

  /* --------------------- Virtualization --------------------- */
  const parentRef = useRef<HTMLDivElement | null>(null);
  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
    overscan: 5,
  });
  const virtualRows = enableVirtualize ? rowVirtualizer.getVirtualItems() : [];
  const totalSize = enableVirtualize ? rowVirtualizer.getTotalSize() : 0;

  /* --------------------- Pagination --------------------- */
  const pageSize = query.pageSize ?? defaultPageSize;
  const currentPage = Math.max(1, query.page ?? 1);
  const computedTotalPages =
    totalPages ??
    Math.max(1, Math.ceil((totalItems ?? data?.length ?? 0) / pageSize));
  const serverStartIndex = (currentPage - 1) * pageSize;
  const goToPage = (p: number) => {
    const targetPage = Math.max(1, Math.min(computedTotalPages, Math.floor(p)));
    onQueryChange({ ...query, page: targetPage });
  };

  const showSkeleton =
    initialSkeletonActive ||
    loading ||
    waitingForData ||
    (!Array.isArray(data) && showInitialSkeleton);

  /* --------------------- Render --------------------- */
  return (
    <div
      className={cn('w-full rounded-2xl border bg-white shadow-sm', className)}
      role='region'
      aria-label={ariaLabel}
    >
      {/* --------------------- Topbar --------------------- */}
      <div className='flex flex-wrap items-center justify-between gap-3 overflow-x-auto border-b p-4'>
        <div className='flex items-center gap-3'>
          {typeof toolbarLeft === 'function' ? toolbarLeft(query) : toolbarLeft}
          <Input
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder='Search...'
            className='w-full max-w-sm'
            aria-label='Search data'
          />
          {extraFilters}
        </div>
        <div className='flex items-center gap-2'>
          <Select
            value={String(pageSize)}
            onValueChange={(v) => {
              const newSize = Number(v);
              onQueryChange({
                ...query,
                pageSize: newSize,
                page: query.pageSize !== newSize ? 1 : query.page,
              });
            }}
          >
            <SelectTrigger className='w-[70px]'>
              <SelectValue placeholder={String(defaultPageSize)} />
            </SelectTrigger>
            <SelectContent>
              {[10, 25, 50, 100].map((s) => (
                <SelectItem key={s} value={s.toString()}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {enableColumnVisibility && (
            <ColumnToggle table={table} storageKey={storageKey} />
          )}
          {enableExportCsv && (
            <ExportCsv
              data={data ?? []}
              filename={`server-export-${new Date()
                .toISOString()
                .slice(0, 10)}.csv`}
            />
          )}
          {typeof toolbarRight === 'function'
            ? toolbarRight(query)
            : toolbarRight}
        </div>
      </div>

      {/* --------------------- Table --------------------- */}
      <div className='w-full overflow-x-auto'>
        <div
          ref={parentRef}
          className={cn(
            'min-w-[600px]',
            enableVirtualize ? 'max-h-[480px] overflow-auto' : '',
          )}
        >
          <Table style={{ tableLayout: 'fixed', width: '100%' }}>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className='bg-gray-50'>
                  {hg.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      scope='col'
                      className={cn(
                        'border-b border-gray-200 bg-gray-50 px-4 py-3 font-semibold whitespace-nowrap text-gray-700',
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                      )}
                      onClick={
                        header.column.getCanSort()
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                    >
                      <div className='flex items-center gap-2'>
                        {!header.isPlaceholder &&
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        {header.column.getCanSort() && (
                          <span className='ml-2 text-xs opacity-50'>
                            {header.column.getIsSorted() === 'desc'
                              ? '↓'
                              : header.column.getIsSorted() === 'asc'
                                ? '↑'
                                : '↕'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {showSkeleton ? (
                <SkeletonRows rows={pageSize} columns={cols.length} />
              ) : !data || data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={cols.length} className='py-8 text-center'>
                    <EmptyState message={emptyMessage} />
                  </TableCell>
                </TableRow>
              ) : enableVirtualize ? (
                <>
                  <TableRow key='spacer' style={{ height: totalSize }}>
                    <TableCell colSpan={cols.length} className='p-0' />
                  </TableRow>
                  {virtualRows.map((vr) => {
                    const row = table.getRowModel().rows[vr.index];
                    if (!row) return null;
                    const rowNumber = serverStartIndex + vr.index + 1;
                    return (
                      <TableRow
                        key={row.id}
                        style={{ transform: `translateY(${vr.start}px)` }}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className='px-4 py-3 text-sm'
                          >
                            {cell.column.id === 'no'
                              ? rowNumber
                              : flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </>
              ) : (
                table.getRowModel().rows.map((row, rIdx) => {
                  const rowKey = `${row.id}-${rIdx}`;
                  const rowNumber = serverStartIndex + rIdx + 1;
                  return (
                    <TableRow
                      key={rowKey}
                      className='border-b border-gray-100 transition-colors hover:bg-gray-50'
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={`${cell.id}-${rowKey}`}
                          className='px-4 py-3 align-middle whitespace-nowrap text-gray-800'
                        >
                          {cell.column.id === 'no'
                            ? rowNumber
                            : flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* --------------------- Pagination --------------------- */}
      <div className='flex items-center justify-end gap-4 border-t p-4'>
        <Pagination
          page={currentPage}
          totalPages={computedTotalPages}
          onChange={goToPage}
          className='ml-auto'
        />
      </div>
    </div>
  );
}

/* --------------------- BaseClientDataTable --------------------- */
export function BaseClientDataTable<TData extends RowData, TValue = unknown>({
  allData,
  columns,
  storageKey,
  toolbarLeft,
  toolbarRight,
  extraFilters,
  enableColumnVisibility = true,
  enableExportCsv = true,
  enableVirtualize = false,
  // enableRowSelection removed (unused)
  defaultPageSize = 10,
  loading = false,
  emptyMessage = 'No data',
  className,
  'aria-label': ariaLabel = 'Client data table',
  showInitialSkeleton = true,
  initialSkeletonDuration = 200,
}: CommonProps<TData, TValue> & { allData?: TData[] }) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    () => loadVisibility(storageKey),
  );
  useEffect(
    () => saveVisibility(storageKey, columnVisibility),
    [columnVisibility, storageKey],
  );

  const cols = useMemo(() => columns, [columns]);

  const [initialSkeletonActive, setInitialSkeletonActive] =
    useState(showInitialSkeleton);
  useEffect(() => {
    if (!showInitialSkeleton) return setInitialSkeletonActive(false);
    const t = window.setTimeout(
      () => setInitialSkeletonActive(false),
      initialSkeletonDuration,
    );
    return () => clearTimeout(t);
  }, [showInitialSkeleton, initialSkeletonDuration]);

  const table = useReactTable<TData>({
    data: allData ?? [],
    columns: cols,
    state: { globalFilter, columnVisibility },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
  });

  useEffect(() => {
    table.setPageSize(defaultPageSize);
  }, [defaultPageSize, table]);

  const parentRef = useRef<HTMLDivElement | null>(null);
  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
    overscan: 5,
  });
  const virtualRows = enableVirtualize ? rowVirtualizer.getVirtualItems() : [];
  const totalSize = enableVirtualize ? rowVirtualizer.getTotalSize() : 0;

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize ?? defaultPageSize;
  const currentPage = pageIndex + 1;
  const startIndex = (currentPage - 1) * pageSize;

  const showSkeleton = loading || initialSkeletonActive;

  return (
    <div
      className={cn('w-full rounded-2xl border bg-white shadow-sm', className)}
      role='region'
      aria-label={ariaLabel}
    >
      {/* Topbar */}
      <div className='flex flex-wrap items-center justify-between gap-3 overflow-x-auto border-b p-4'>
        <div className='flex items-center gap-3'>
          {typeof toolbarLeft === 'function'
            ? toolbarLeft({ page: currentPage, pageSize })
            : toolbarLeft}
          <Input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder='Search...'
            className='w-full max-w-sm'
            aria-label='Search data'
          />
          {extraFilters}
        </div>
        <div className='flex items-center gap-2'>
          <Select
            value={String(pageSize)}
            onValueChange={(v) => table.setPageSize(Number(v))}
          >
            <SelectTrigger className='w-[70px]'>
              <SelectValue placeholder={String(defaultPageSize)} />
            </SelectTrigger>
            <SelectContent>
              {[10, 25, 50, 100].map((s) => (
                <SelectItem key={s} value={s.toString()}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {enableColumnVisibility && (
            <ColumnToggle table={table} storageKey={storageKey} />
          )}
          {enableExportCsv && (
            <ExportCsv
              data={table.getRowModel().rows.map((r) => r.original)}
              filename={`client-export-${new Date()
                .toISOString()
                .slice(0, 10)}.csv`}
            />
          )}
          {typeof toolbarRight === 'function'
            ? toolbarRight({ page: currentPage, pageSize })
            : toolbarRight}
        </div>
      </div>

      {/* Table */}
      <div className='w-full overflow-x-auto'>
        <div
          ref={parentRef}
          className={cn(
            'min-w-[600px]',
            enableVirtualize ? 'max-h-[480px] overflow-auto' : '',
          )}
        >
          <Table style={{ tableLayout: 'fixed', width: '100%' }}>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className='bg-gray-50'>
                  {hg.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      scope='col'
                      className={cn(
                        'border-b border-gray-200 bg-gray-50 px-4 py-3 font-semibold whitespace-nowrap text-gray-700',
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                      )}
                      onClick={
                        header.column.getCanSort()
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                    >
                      <div className='flex items-center gap-2'>
                        {!header.isPlaceholder &&
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        {header.column.getCanSort() && (
                          <span className='ml-2 text-xs opacity-50'>
                            {header.column.getIsSorted() === 'desc'
                              ? '↓'
                              : header.column.getIsSorted() === 'asc'
                                ? '↑'
                                : '↕'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {showSkeleton ? (
                <SkeletonRows rows={pageSize} columns={cols.length} />
              ) : !allData || allData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={cols.length} className='py-8 text-center'>
                    <EmptyState message={emptyMessage} />
                  </TableCell>
                </TableRow>
              ) : enableVirtualize ? (
                <>
                  <TableRow key='spacer' style={{ height: totalSize }}>
                    <TableCell colSpan={cols.length} className='p-0' />
                  </TableRow>
                  {virtualRows.map((vr) => {
                    const row = table.getRowModel().rows[vr.index];
                    if (!row) return null;
                    const rowNumber = startIndex + vr.index + 1;
                    return (
                      <TableRow
                        key={row.id}
                        style={{ transform: `translateY(${vr.start}px)` }}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className='px-4 py-3 text-sm'
                          >
                            {cell.column.id === 'no'
                              ? rowNumber
                              : flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </>
              ) : (
                table.getRowModel().rows.map((row, rIdx) => {
                  const rowKey = `${row.id}-${rIdx}`;
                  const rowNumber = startIndex + rIdx + 1;
                  return (
                    <TableRow
                      key={rowKey}
                      className='border-b border-gray-100 transition-colors hover:bg-gray-50'
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={`${cell.id}-${rowKey}`}
                          className='px-4 py-3 align-middle whitespace-nowrap text-gray-800'
                        >
                          {cell.column.id === 'no'
                            ? rowNumber
                            : flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-end gap-4 border-t p-4'>
        <Pagination
          page={currentPage}
          totalPages={Math.max(1, table.getPageCount())}
          onChange={(p) => table.setPageIndex(Math.max(0, p - 1))}
          className='ml-auto'
        />
      </div>
    </div>
  );
}

/* --------------------- BaseDataTable wrapper --------------------- */
export default function BaseDataTable(props: any) {
  return props.serverMode ? (
    <BaseServerDataTable {...props} />
  ) : (
    <BaseClientDataTable {...props} />
  );
}
