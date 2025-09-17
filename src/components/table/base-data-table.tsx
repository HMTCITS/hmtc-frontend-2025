'use client';

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';

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
import type { BaseDataTableProps, QueryState, Sort } from '@/types/data-table';

import { ColumnToggle } from './column-toggle';
import { EmptyState } from './empty-state';
import { ExportCsv } from './export-csv';
import { Pagination } from './pagination';
import { SkeletonRows } from './skeleton-rows';

// Utility to load column visibility from localStorage
function loadVisibility(storageKey?: string) {
  if (!storageKey || typeof window === 'undefined') return {};

  try {
    const saved = localStorage.getItem(`${storageKey}-visibility`);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

// Utility to convert TanStack sorting to our Sort format
function convertSorting(sorting: any[]): Sort[] {
  return sorting.map((sort) => ({
    id: sort.id,
    desc: sort.desc,
  }));
}

export function BaseDataTable<TData, TValue = unknown>({
  data,
  columns,
  totalItems,
  totalPages,
  serverMode = false,
  query,
  onQueryChange,
  defaultPageSize = 10,
  storageKey,
  toolbarLeft,
  toolbarRight,
  renderSearchInput,
  extraFilters,
  enableColumnVisibility = true,
  enableExportCsv = true,
  loading = false,
  emptyMessage = 'No data available',
  errorMessage,
  onRowClick,
  onExportCsv,
  className,
  'aria-label': ariaLabel = 'Data table',
}: BaseDataTableProps<TData, TValue>) {
  // Local state for uncontrolled mode
  const [localQuery, setLocalQuery] = useState<QueryState>({
    page: 1,
    pageSize: defaultPageSize,
  });

  // Determine which query state to use
  const qs = serverMode
    ? (query ?? { page: 1, pageSize: defaultPageSize })
    : localQuery;

  // Function to update query state
  const setQS = (next: Partial<QueryState>) => {
    const newQuery = { ...qs, ...next };
    if (serverMode && onQueryChange) {
      onQueryChange(newQuery);
    } else {
      setLocalQuery(newQuery);
    }
  };

  // Load saved column visibility
  const [columnVisibility, setColumnVisibility] = useState(() =>
    loadVisibility(storageKey),
  );

  // Save column visibility to localStorage
  const saveVisibility = (visibility: any) => {
    setColumnVisibility(visibility);
    if (storageKey && typeof window !== 'undefined') {
      localStorage.setItem(
        `${storageKey}-visibility`,
        JSON.stringify(visibility),
      );
    }
  };

  // Create table instance
  const table = useReactTable<TData>({
    data,
    columns,
    state: {
      sorting: qs.sort?.map((s) => ({ id: s.id, desc: s.desc })) ?? [],
      columnVisibility,
      globalFilter: qs.q ?? '',
    },
    onSortingChange: (updater) => {
      const current = qs.sort?.map((s) => ({ id: s.id, desc: s.desc })) ?? [];
      const next = typeof updater === 'function' ? updater(current) : updater;
      setQS({ sort: convertSorting(next) });
    },
    onColumnVisibilityChange: saveVisibility,
    onGlobalFilterChange: (value) => {
      setQS({ q: value, page: 1 });
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: serverMode ? undefined : getSortedRowModel(),
    getFilteredRowModel: serverMode ? undefined : getFilteredRowModel(),
    getPaginationRowModel: serverMode ? undefined : getPaginationRowModel(),
    manualPagination: serverMode,
    manualSorting: serverMode,
    manualFiltering: serverMode,
    pageCount: serverMode ? totalPages : undefined,
  });

  // Set initial page size for table
  useEffect(() => {
    table.setPageSize(qs.pageSize);
  }, [qs.pageSize, table]);

  // Calculate actual total pages
  const actualTotalPages = serverMode
    ? (totalPages ?? 1)
    : Math.ceil((totalItems ?? data.length) / qs.pageSize);

  // Render search input
  const searchNode = renderSearchInput ? (
    renderSearchInput(qs.q ?? '', (v) => setQS({ q: v, page: 1 }))
  ) : (
    <Input
      placeholder='Search...'
      value={qs.q ?? ''}
      onChange={(e) => setQS({ q: e.target.value, page: 1 })}
      className='w-full max-w-sm'
      aria-label='Search data'
    />
  );

  // Page size selector
  const pageSizeSelect = (
    <Select
      value={qs.pageSize.toString()}
      onValueChange={(value) => setQS({ pageSize: Number(value), page: 1 })}
    >
      <SelectTrigger className='w-[70px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {[10, 25, 50, 100].map((size) => (
          <SelectItem key={size} value={size.toString()}>
            {size}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  // Show error state
  if (errorMessage) {
    return (
      <div className={cn('rounded-2xl border bg-white', className)}>
        <EmptyState message='Error loading data' description={errorMessage} />
      </div>
    );
  }

  return (
    <div
      className={cn('rounded-2xl border bg-white', className)}
      role='region'
      aria-label={ariaLabel}
    >
      {/* Toolbar */}
      <div className='flex items-center justify-between gap-3 border-b p-4'>
        <div className='flex items-center gap-3'>
          {typeof toolbarLeft === 'function' ? toolbarLeft(qs) : toolbarLeft}
          {searchNode}
          {extraFilters}
        </div>
        <div className='flex items-center gap-2'>
          {pageSizeSelect}
          {enableColumnVisibility && (
            <ColumnToggle table={table} storageKey={storageKey} />
          )}
          {enableExportCsv && (
            <ExportCsv
              data={data}
              filename={`export-${new Date().toISOString().split('T')[0]}.csv`}
              onExport={onExportCsv}
            />
          )}
          {typeof toolbarRight === 'function' ? toolbarRight(qs) : toolbarRight}
        </div>
      </div>

      {/* Table content */}
      <div className='overflow-x-auto'>
        {loading ? (
          <Table>
            <SkeletonRows rows={qs.pageSize} columns={columns.length} />
          </Table>
        ) : data.length === 0 ? (
          <EmptyState message={emptyMessage} />
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      scope='col'
                      className={cn(
                        'font-medium',
                        header.column.getCanSort() &&
                          'cursor-pointer select-none hover:bg-muted/50',
                      )}
                      onClick={
                        header.column.getCanSort()
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                      onKeyDown={(e) => {
                        if (
                          header.column.getCanSort() &&
                          (e.key === 'Enter' || e.key === ' ')
                        ) {
                          e.preventDefault();
                          header.column.toggleSorting();
                        }
                      }}
                      tabIndex={header.column.getCanSort() ? 0 : undefined}
                      aria-sort={
                        header.column.getIsSorted() === 'asc'
                          ? 'ascending'
                          : header.column.getIsSorted() === 'desc'
                            ? 'descending'
                            : header.column.getCanSort()
                              ? 'none'
                              : undefined
                      }
                    >
                      <div className='flex items-center space-x-2'>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
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
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn(
                    onRowClick && 'cursor-pointer hover:bg-muted/50',
                  )}
                  onClick={
                    onRowClick ? () => onRowClick(row.original) : undefined
                  }
                  onKeyDown={(e) => {
                    if (onRowClick && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      onRowClick(row.original);
                    }
                  }}
                  tabIndex={onRowClick ? 0 : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='line-clamp-1'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-between border-t p-4'>
        <span className='text-sm text-muted-foreground'>
          Page {qs.page} from {actualTotalPages}
        </span>
        <Pagination
          page={qs.page}
          totalPages={actualTotalPages}
          onChange={(p) => setQS({ page: p })}
        />
      </div>
    </div>
  );
}
