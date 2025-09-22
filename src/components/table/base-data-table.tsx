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
import { Search } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Pagination } from '@/components/table/pagination';
import Typography from '@/components/Typography';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
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
    void e;
    return {};
  }
}
function saveVisibility(key?: string, v?: VisibilityState) {
  if (!key || typeof window === 'undefined' || !v) return;
  try {
    localStorage.setItem(`${key}:cols`, JSON.stringify(v));
  } catch (e) {
    void e;
  }
}

/* --------------------- Column widths persistence --------------------- */
type ColWidthsState = Record<string, number>;
function loadColWidths(key?: string): ColWidthsState {
  if (!key || typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(`${key}:colWidths`);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    void e;
    return {};
  }
}
function saveColWidths(key?: string, v?: ColWidthsState) {
  if (!key || typeof window === 'undefined' || !v) return;
  try {
    localStorage.setItem(`${key}:colWidths`, JSON.stringify(v));
  } catch (e) {
    void e;
  }
}

/* --------------------- Column meta interface ---------------------
  Per-kolom konfigurasi lewat ColumnDef.meta:
  meta?: {
    initialWidth?: number; // px
    minWidth?: number; // px
    maxWidth?: number; // px
    resizable?: boolean; // default true
    wrap?: 'clamp' | 'wrap'; // default 'clamp'
  }
-------------------------------------------------------------------------*/

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

/* --------------------- Helpers --------------------- */
function getColMeta(col: any) {
  return (col.columnDef && col.columnDef.meta) || {};
}
function buildStyleObject(opts: {
  width?: number | string | undefined;
  minWidth?: number | undefined;
  maxWidth?: number | undefined;
  extra?: React.CSSProperties | undefined;
}): React.CSSProperties | undefined {
  const s: React.CSSProperties = {};
  if (opts.width !== undefined && opts.width !== null) {
    s.width = typeof opts.width === 'number' ? `${opts.width}px` : opts.width;
  }
  if (opts.minWidth !== undefined && opts.minWidth !== null) {
    s.minWidth = `${opts.minWidth}px`;
  }
  if (opts.maxWidth !== undefined && opts.maxWidth !== null) {
    s.maxWidth = `${opts.maxWidth}px`;
  }
  if (opts.extra) Object.assign(s, opts.extra);
  return Object.keys(s).length > 0 ? s : undefined;
}

/* --------------------- Shared Info Bar renderer --------------------- */
function InfoBar({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-4'>
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={onChange}
          maxButtons={2}
        />
        <Typography
          as='span'
          font='satoshi'
          weight='medium'
          variant='s3'
          className='mb-0 text-navy-500'
        >
          {`Page ${page} from ${totalPages}`}
        </Typography>
      </div>
    </div>
  );
}

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
  toolbarRight: _toolbarRight,
  extraFilters,
  enableColumnVisibility = false,
  enableExportCsv = false,
  enableVirtualize = false,
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

  // SSR-safe: start empty and load persisted widths on client mount
  const [colWidths, setColWidths] = useState<ColWidthsState>(() => ({}));
  useEffect(() => {
    const persisted = loadColWidths(storageKey);
    if (persisted && Object.keys(persisted).length > 0) setColWidths(persisted);
  }, [storageKey]);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    saveColWidths(storageKey, colWidths);
  }, [colWidths, storageKey]);

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
        page: 1,
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

  /* --------------------- Column resizing implementation --------------------- */
  const resizingRef = useRef<{
    colId: string | null;
    startX: number;
    startWidth: number;
    minWidth?: number;
    maxWidth?: number;
  } | null>(null);

  const visibleLeafColumns = table
    .getAllLeafColumns()
    .filter((c) => c.getIsVisible());

  // Seed initial widths (client only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seed: ColWidthsState = {};
    visibleLeafColumns.forEach((c) => {
      const id = c.id;
      const meta = getColMeta(c);
      const initial = meta.initialWidth ?? (id === 'no' ? 40 : undefined);
      if (typeof initial === 'number' && !(id in colWidths)) seed[id] = initial;
    });
    if (Object.keys(seed).length > 0)
      setColWidths((prev) => ({ ...seed, ...prev }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, columnVisibility]);

  const onStartResize = (e: React.MouseEvent, col: any) => {
    e.preventDefault();
    e.stopPropagation();
    const id = col.id;
    const currentWidth = colWidths[id] ?? undefined;
    const meta = getColMeta(col);
    const min = meta.minWidth ?? 32;
    const max = meta.maxWidth ?? 1000;
    resizingRef.current = {
      colId: id,
      startX: e.clientX,
      startWidth:
        typeof currentWidth === 'number'
          ? currentWidth
          : (meta.initialWidth ?? 100),
      minWidth: min,
      maxWidth: max,
    };

    const onMove = (ev: MouseEvent) => {
      if (!resizingRef.current) return;
      const diff = ev.clientX - resizingRef.current.startX;
      let next = Math.max(
        resizingRef.current.minWidth ?? 32,
        resizingRef.current.startWidth + diff,
      );
      if (resizingRef.current.maxWidth)
        next = Math.min(resizingRef.current.maxWidth, next);
      setColWidths((prev) => ({
        ...prev,
        [resizingRef.current!.colId!]: Math.round(next),
      }));
    };

    const onUp = () => {
      resizingRef.current = null;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  /* --------------------- Render --------------------- */

  // Render <colgroup> based on visibleLeafColumns and colWidths
  const colgroup = (
    <colgroup>
      {visibleLeafColumns.map((c) => {
        const id = c.id;
        const meta = getColMeta(c);
        const widthNum =
          colWidths[id] ?? meta.initialWidth ?? (id === 'no' ? 40 : undefined);
        const style = buildStyleObject({
          width: typeof widthNum === 'number' ? widthNum : widthNum,
          minWidth: meta.minWidth,
          maxWidth: meta.maxWidth,
        });
        return <col key={id} style={style} />;
      })}
    </colgroup>
  );

  return (
    // add min-w-0 to allow shrinking inside parent flex containers
    <div
      className={cn(
        'flex w-full min-w-0 flex-col gap-6 rounded-2xl border bg-white px-3 py-6 shadow-sm',
        className,
      )}
      role='region'
      aria-label={ariaLabel}
    >
      {/* --------------------- Topbar --------------------- */}
      <div className='flex flex-wrap items-center justify-between gap-3'>
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
            <SelectTrigger className='mb-0 h-14 w-14 items-center justify-center rounded-xl border-black-100 p-0 shadow-none outline-none'>
              <Typography
                font='satoshi'
                variant='b4'
                className='mb-0 text-sm text-black-300'
              >
                {String(pageSize)}
              </Typography>
            </SelectTrigger>
            <SelectContent>
              {[10, 25, 50, 100].map((s) => (
                <SelectItem
                  key={s}
                  value={s.toString()}
                  className='mb-0 font-satoshi text-sm'
                >
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {extraFilters}
          {typeof toolbarLeft === 'function' ? toolbarLeft(query) : toolbarLeft}
          {enableColumnVisibility && (
            <ColumnToggle table={table} storageKey={storageKey} />
          )}
          {enableExportCsv && (
            <ExportCsv
              data={data ?? []}
              filename={`server-export-${new Date().toISOString().slice(0, 10)}.csv`}
            />
          )}
        </div>

        <div className='flex items-center gap-3'>
          <div className='flex max-h-14 w-[310px] items-center gap-3 rounded-[12px] border border-french-blue-100 bg-white px-4 py-3'>
            <Search
              size={32}
              strokeWidth={2}
              className='shrink-0 text-[#32323280]'
            />
            <div className='flex-1'>
              <input
                type='search'
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder='Search for repository'
                className={cn(
                  'w-full bg-transparent font-satoshi text-base leading-1.5 outline-none',
                  localSearch ? 'text-[#232323]' : 'text-[#00000066]',
                )}
                aria-label='Search data'
              />
            </div>
          </div>
        </div>
      </div>

      {/* --------------------- Table ---------------------
          NOTE: single scroll container (parentRef). use min-w-0 on outer wrapper so no forced overflow
      */}
      <div className='w-full min-w-0'>
        <div
          ref={parentRef}
          className={cn(
            // remove forced min width; make this the single scroll container
            'mb-3 overflow-auto rounded-lg border-2 border-black-100',
            enableVirtualize ? 'max-h-[480px]' : '',
          )}
        >
          <Table
            style={{ tableLayout: 'fixed', width: '100%' }}
            className='box-border'
          >
            {colgroup}
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className='px-3'>
                  {hg.headers.map((header) => {
                    const col = header.column;
                    const id = col.id;
                    const meta = getColMeta(col);
                    const widthNum =
                      colWidths[id] ??
                      meta.initialWidth ??
                      (id === 'no' ? 40 : undefined);
                    const canResize = meta.resizable !== false;
                    const _clamp = meta.wrap !== 'wrap';

                    const style =
                      id === 'no'
                        ? buildStyleObject({
                            width:
                              typeof widthNum === 'number'
                                ? widthNum
                                : widthNum,
                            minWidth: meta.minWidth ?? 32,
                            maxWidth: meta.maxWidth ?? 40,
                            extra: {
                              textAlign: 'center',
                              boxSizing: 'border-box',
                            },
                          })
                        : buildStyleObject({
                            width:
                              typeof widthNum === 'number'
                                ? widthNum
                                : widthNum,
                            minWidth: meta.minWidth,
                            maxWidth: meta.maxWidth,
                          });

                    return (
                      <TableHead
                        key={header.id}
                        scope='col'
                        className={cn(
                          'relative box-border rounded-lg border-b-2 border-black-100 px-4 py-3 whitespace-nowrap text-gray-700',
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          id === 'no' && 'p-0',
                        )}
                        style={style}
                        onClick={
                          header.column.getCanSort()
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                      >
                        <div
                          className={cn(
                            'flex items-center gap-2',
                            id === 'no' ? 'justify-center' : '',
                          )}
                        >
                          {!header.isPlaceholder && (
                            <Typography
                              as='span'
                              font='satoshi'
                              weight='medium'
                              variant='s3'
                              className={
                                id === 'no' ? 'mb-0 w-full text-center' : 'mb-0'
                              }
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                            </Typography>
                          )}
                          {header.column.getCanSort() && (
                            <Typography
                              as='span'
                              font='satoshi'
                              weight='medium'
                              variant='s4'
                              className='mb-0 ml-2 opacity-50'
                            >
                              {header.column.getIsSorted() === 'desc'
                                ? '↓'
                                : header.column.getIsSorted() === 'asc'
                                  ? '↑'
                                  : '↕'}
                            </Typography>
                          )}
                        </div>

                        {canResize && (
                          <div
                            onMouseDown={(e) => onStartResize(e, header.column)}
                            role='separator'
                            aria-orientation='horizontal'
                            className='absolute top-0 right-0 z-10 h-full w-2 cursor-col-resize'
                            style={{ transform: 'translateX(50%)' }}
                          >
                            <div className='mx-auto h-full w-0.5 bg-transparent hover:bg-gray-300/70' />
                          </div>
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody className='px-3'>
              {showSkeleton ? (
                <SkeletonRows rows={pageSize} columns={cols.length} />
              ) : !data || data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={cols.length}
                    className='border-b-2 border-black-100 py-8 text-center'
                  >
                    <EmptyState message={emptyMessage} />
                  </TableCell>
                </TableRow>
              ) : enableVirtualize ? (
                <>
                  <TableRow
                    key='spacer'
                    style={{ height: totalSize }}
                    className='border-b-2 border-black-100'
                  >
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
                        className='border-b-2 border-black-100'
                      >
                        {row.getVisibleCells().map((cell) => {
                          const c = cell.column;
                          const id = c.id;
                          const meta = getColMeta(c);
                          const widthNum =
                            colWidths[id] ??
                            meta.initialWidth ??
                            (id === 'no' ? 40 : undefined);
                          const _clamp = meta.wrap !== 'wrap';
                          const style =
                            id === 'no'
                              ? buildStyleObject({
                                  width:
                                    typeof widthNum === 'number'
                                      ? widthNum
                                      : widthNum,
                                  minWidth: meta.minWidth ?? 32,
                                  maxWidth: meta.maxWidth ?? 40,
                                  extra: {
                                    textAlign: 'center',
                                    boxSizing: 'border-box',
                                  },
                                })
                              : buildStyleObject({
                                  width:
                                    typeof widthNum === 'number'
                                      ? widthNum
                                      : widthNum,
                                  minWidth: meta.minWidth,
                                  maxWidth: meta.maxWidth,
                                });
                          return (
                            <TableCell
                              key={cell.id}
                              className={cn(
                                'border-b-2 border-black-100 align-middle',
                                _clamp
                                  ? 'overflow-hidden px-4 py-3 text-ellipsis whitespace-nowrap'
                                  : 'px-4 py-3 whitespace-normal',
                                id === 'no' && 'p-0',
                              )}
                              style={style}
                            >
                              <Typography
                                as='span'
                                font='satoshi'
                                weight='medium'
                                variant='s3'
                                className={
                                  id === 'no'
                                    ? 'mb-0 w-full text-center'
                                    : 'mb-0'
                                }
                              >
                                {id === 'no'
                                  ? rowNumber
                                  : flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext(),
                                    )}
                              </Typography>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </>
              ) : (
                table.getRowModel().rows.map((row, rIdx, arr) => {
                  const rowKey = `${row.id}-${rIdx}`;
                  const rowNumber = serverStartIndex + rIdx + 1;
                  const isLast = rIdx === arr.length - 1;
                  return (
                    <TableRow
                      key={rowKey}
                      className={cn(
                        'border-b border-black-100 transition-colors hover:bg-gray-50',
                      )}
                    >
                      {row.getVisibleCells().map((cell) => {
                        const c = cell.column;
                        const id = c.id;
                        const meta = getColMeta(c);
                        const widthNum =
                          colWidths[id] ??
                          meta.initialWidth ??
                          (id === 'no' ? 40 : undefined);
                        const _clamp = meta.wrap !== 'wrap';
                        const style =
                          id === 'no'
                            ? buildStyleObject({
                                width:
                                  typeof widthNum === 'number'
                                    ? widthNum
                                    : widthNum,
                                minWidth: meta.minWidth ?? 32,
                                maxWidth: meta.maxWidth ?? 40,
                                extra: {
                                  textAlign: 'center',
                                  boxSizing: 'border-box',
                                },
                              })
                            : buildStyleObject({
                                width:
                                  typeof widthNum === 'number'
                                    ? widthNum
                                    : widthNum,
                                minWidth: meta.minWidth,
                                maxWidth: meta.maxWidth,
                              });
                        return (
                          <TableCell
                            key={`${cell.id}-${rowKey}`}
                            className={cn(
                              'border-b-2 border-black-100 align-middle',
                              isLast && 'border-b-0',
                              _clamp
                                ? 'overflow-hidden px-4 py-3 text-ellipsis whitespace-nowrap'
                                : 'px-4 py-3 whitespace-normal',
                              id === 'no' && 'p-0',
                            )}
                            style={style}
                          >
                            <Typography
                              as='span'
                              font='satoshi'
                              weight='medium'
                              variant='s3'
                              className={
                                id === 'no' ? 'mb-0 w-full text-center' : 'mb-0'
                              }
                            >
                              {id === 'no'
                                ? rowNumber
                                : flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                  )}
                            </Typography>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* --------------------- Info Bar & Pagination --------------------- */}
      <InfoBar
        page={currentPage}
        totalPages={computedTotalPages}
        onChange={goToPage}
      />
    </div>
  );
}

/* --------------------- BaseClientDataTable --------------------- */
export function BaseClientDataTable<TData extends RowData, TValue = unknown>({
  allData,
  columns,
  storageKey,
  toolbarLeft,
  toolbarRight: _toolbarRight,
  extraFilters,
  enableColumnVisibility = false,
  enableExportCsv = false,
  enableVirtualize = false,
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

  const [colWidths, setColWidths] = useState<ColWidthsState>(() => ({}));
  useEffect(() => {
    const persisted = loadColWidths(storageKey);
    if (persisted && Object.keys(persisted).length > 0) setColWidths(persisted);
  }, [storageKey]);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    saveColWidths(storageKey, colWidths);
  }, [colWidths, storageKey]);

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

  // total pages for client-side table and page navigation helper
  const computedTotalPages = Math.max(1, table.getPageCount());
  const goToPage = (p: number) => {
    const targetPage = Math.max(1, Math.min(computedTotalPages, Math.floor(p)));
    table.setPageIndex(targetPage - 1);
  };

  const showSkeleton = loading || initialSkeletonActive;

  /* --------------------- Column resizing (client table) --------------------- */
  const resizingRef = useRef<{
    colId: string | null;
    startX: number;
    startWidth: number;
    minWidth?: number;
    maxWidth?: number;
  } | null>(null);

  const visibleLeafColumns = table
    .getAllLeafColumns()
    .filter((c) => c.getIsVisible());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seed: ColWidthsState = {};
    visibleLeafColumns.forEach((c) => {
      const id = c.id;
      const meta = getColMeta(c);
      const initial = meta.initialWidth ?? (id === 'no' ? 40 : undefined);
      if (typeof initial === 'number' && !(id in colWidths)) seed[id] = initial;
    });
    if (Object.keys(seed).length > 0)
      setColWidths((prev) => ({ ...seed, ...prev }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, columnVisibility]);

  const onStartResizeClient = (e: React.MouseEvent, col: any) => {
    e.preventDefault();
    e.stopPropagation();
    const id = col.id;
    const currentWidth = colWidths[id] ?? undefined;
    const meta = getColMeta(col);
    const min = meta.minWidth ?? 32;
    const max = meta.maxWidth ?? 1000;
    resizingRef.current = {
      colId: id,
      startX: e.clientX,
      startWidth:
        typeof currentWidth === 'number'
          ? currentWidth
          : (meta.initialWidth ?? 100),
      minWidth: min,
      maxWidth: max,
    };

    const onMove = (ev: MouseEvent) => {
      if (!resizingRef.current) return;
      const diff = ev.clientX - resizingRef.current.startX;
      let next = Math.max(
        resizingRef.current.minWidth ?? 32,
        resizingRef.current.startWidth + diff,
      );
      if (resizingRef.current.maxWidth)
        next = Math.min(resizingRef.current.maxWidth, next);
      setColWidths((prev) => ({
        ...prev,
        [resizingRef.current!.colId!]: Math.round(next),
      }));
    };

    const onUp = () => {
      resizingRef.current = null;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const colgroup = (
    <colgroup>
      {visibleLeafColumns.map((c) => {
        const id = c.id;
        const meta = getColMeta(c);
        const widthNum =
          colWidths[id] ?? meta.initialWidth ?? (id === 'no' ? 40 : undefined);
        const style = buildStyleObject({
          width: typeof widthNum === 'number' ? widthNum : widthNum,
          minWidth: meta.minWidth,
          maxWidth: meta.maxWidth,
        });
        return <col key={id} style={style} />;
      })}
    </colgroup>
  );

  return (
    <div
      className={cn(
        'flex w-full min-w-0 flex-col gap-6 rounded-2xl border bg-white px-3 py-6 shadow-sm font-satoshi',
        className,
      )}
      role='region'
      aria-label={ariaLabel}
    >
      {/* Topbar */}
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div className='flex items-center gap-2'>
          <Select
            value={String(pageSize)}
            onValueChange={(v) => table.setPageSize(Number(v))}
          >
            <SelectTrigger className='mb-0 h-14 w-14 items-center justify-center rounded-xl border-black-100 p-0 shadow-none outline-none'>
              <Typography
                font='satoshi'
                variant='b4'
                className='mb-0 text-sm text-black-300'
              >
                {String(pageSize)}
              </Typography>
            </SelectTrigger>
            <SelectContent>
              {[10, 25, 50, 100].map((s) => (
                <SelectItem
                  key={s}
                  value={s.toString()}
                  className='mb-0 font-satoshi text-sm'
                >
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {extraFilters}
          {typeof toolbarLeft === 'function'
            ? toolbarLeft({ page: currentPage, pageSize })
            : toolbarLeft}
          {enableColumnVisibility && (
            <ColumnToggle table={table} storageKey={storageKey} />
          )}
          {enableExportCsv && (
            <ExportCsv
              data={table.getRowModel().rows.map((r) => r.original)}
              filename={`client-export-${new Date().toISOString().slice(0, 10)}.csv`}
            />
          )}
        </div>

        <div className='flex items-center gap-3'>
          <div className='flex max-h-14 w-[310px] items-center gap-3 rounded-[12px] border border-french-blue-100 bg-white px-4 py-3'>
            <Search
              size={32}
              strokeWidth={2}
              className='shrink-0 text-[#32323280]'
            />
            <div className='flex-1'>
              <input
                type='search'
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder='Search for repository'
                className={cn(
                  'w-full bg-transparent font-satoshi text-base leading-1.5 outline-none',
                  globalFilter ? 'text-[#232323]' : 'text-[#00000066]',
                )}
                aria-label='Search data'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table - single scroll container */}
      <div className='w-full min-w-0'>
        <div
          ref={parentRef}
          className={cn(
            'mb-3 overflow-auto rounded-lg border-2 border-black-100',
            enableVirtualize ? 'max-h-[480px]' : '',
          )}
        >
          <Table
            style={{ tableLayout: 'fixed', width: '100%' }}
            className='box-border'
          >
            {colgroup}
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className='px-3'>
                  {hg.headers.map((header) => {
                    const col = header.column;
                    const id = col.id;
                    const meta = getColMeta(col);
                    const widthNum =
                      colWidths[id] ?? meta.initialWidth ?? undefined;
                    const canResize = meta.resizable !== false;
                    const _clamp = meta.wrap !== 'wrap';

                    const style =
                      id === 'no'
                        ? buildStyleObject({
                            width:
                              typeof widthNum === 'number'
                                ? widthNum
                                : widthNum,
                            minWidth: meta.minWidth ?? 32,
                            maxWidth: meta.maxWidth ?? 40,
                            extra: {
                              textAlign: 'center',
                              boxSizing: 'border-box',
                            },
                          })
                        : buildStyleObject({
                            width:
                              typeof widthNum === 'number'
                                ? widthNum
                                : widthNum,
                            minWidth: meta.minWidth,
                            maxWidth: meta.maxWidth,
                          });

                    return (
                      <TableHead
                        key={header.id}
                        scope='col'
                        className={cn(
                          'relative box-border rounded-lg border-b-2 border-black-100 px-4 py-3 whitespace-nowrap text-gray-700',
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          id === 'no' && 'p-0',
                        )}
                        style={style}
                        onClick={
                          header.column.getCanSort()
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                      >
                        <div
                          className={cn(
                            'flex items-center gap-2',
                            id === 'no' ? 'justify-center' : '',
                          )}
                        >
                          {!header.isPlaceholder && (
                            <Typography
                              as='span'
                              font='satoshi'
                              weight='medium'
                              variant='s3'
                              className={
                                id === 'no' ? 'mb-0 w-full text-center' : 'mb-0'
                              }
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                            </Typography>
                          )}
                          {header.column.getCanSort() && (
                            <Typography
                              as='span'
                              font='satoshi'
                              weight='medium'
                              variant='s4'
                              className='mb-0 ml-2 opacity-50'
                            >
                              {header.column.getIsSorted() === 'desc'
                                ? '↓'
                                : header.column.getIsSorted() === 'asc'
                                  ? '↑'
                                  : '↕'}
                            </Typography>
                          )}
                        </div>
                        {canResize && (
                          <div
                            onMouseDown={(e) =>
                              onStartResizeClient(e, header.column)
                            }
                            role='separator'
                            aria-orientation='horizontal'
                            className='absolute top-0 right-0 z-10 h-full w-2 cursor-col-resize'
                            style={{ transform: 'translateX(50%)' }}
                          >
                            <div className='mx-auto h-full w-0.5 bg-transparent hover:bg-gray-300/70' />
                          </div>
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody className='px-3'>
              {showSkeleton ? (
                <SkeletonRows rows={pageSize} columns={cols.length} />
              ) : !allData || allData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={cols.length}
                    className='border-b-2 border-black-100 py-8 text-center'
                  >
                    <EmptyState message={emptyMessage} />
                  </TableCell>
                </TableRow>
              ) : enableVirtualize ? (
                <>
                  <TableRow
                    key='spacer'
                    style={{ height: totalSize }}
                    className='border-b-2 border-black-100'
                  >
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
                        className='border-b-2 border-black-100'
                      >
                        {row.getVisibleCells().map((cell) => {
                          const c = cell.column;
                          const id = c.id;
                          const meta = getColMeta(c);
                          const widthNum =
                            colWidths[id] ?? meta.initialWidth ?? undefined;
                          const _clamp = meta.wrap !== 'wrap';
                          const style =
                            id === 'no'
                              ? buildStyleObject({
                                  width:
                                    typeof widthNum === 'number'
                                      ? widthNum
                                      : widthNum,
                                  minWidth: meta.minWidth ?? 32,
                                  maxWidth: meta.maxWidth ?? 40,
                                  extra: {
                                    textAlign: 'center',
                                    boxSizing: 'border-box',
                                  },
                                })
                              : buildStyleObject({
                                  width:
                                    typeof widthNum === 'number'
                                      ? widthNum
                                      : widthNum,
                                  minWidth: meta.minWidth,
                                  maxWidth: meta.maxWidth,
                                });
                          return (
                            <TableCell
                              key={cell.id}
                              className={cn(
                                'border-b-2 border-black-100 px-4 py-3',
                                _clamp
                                  ? 'overflow-hidden text-ellipsis whitespace-nowrap'
                                  : 'whitespace-normal',
                                id === 'no' && 'p-0',
                              )}
                              style={style}
                            >
                              <Typography
                                as='span'
                                font='satoshi'
                                weight='medium'
                                variant='s3'
                                className={
                                  id === 'no'
                                    ? 'mb-0 w-full text-center'
                                    : 'mb-0'
                                }
                              >
                                {cell.column.id === 'no'
                                  ? rowNumber
                                  : flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext(),
                                    )}
                              </Typography>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </>
              ) : (
                table.getRowModel().rows.map((row, rIdx, arr) => {
                  const rowKey = `${row.id}-${rIdx}`;
                  const rowNumber = startIndex + rIdx + 1;
                  const isLast = rIdx === arr.length - 1;
                  return (
                    <TableRow
                      key={rowKey}
                      className={cn(
                        'border-b border-black-100 transition-colors hover:bg-gray-50',
                      )}
                    >
                      {row.getVisibleCells().map((cell) => {
                        const c = cell.column;
                        const id = c.id;
                        const meta = getColMeta(c);
                        const widthNum =
                          colWidths[id] ?? meta.initialWidth ?? undefined;
                        const _clamp = meta.wrap !== 'wrap';
                        const style =
                          id === 'no'
                            ? buildStyleObject({
                                width:
                                  typeof widthNum === 'number'
                                    ? widthNum
                                    : widthNum,
                                minWidth: meta.minWidth ?? 32,
                                maxWidth: meta.maxWidth ?? 40,
                                extra: {
                                  textAlign: 'center',
                                  boxSizing: 'border-box',
                                },
                              })
                            : buildStyleObject({
                                width:
                                  typeof widthNum === 'number'
                                    ? widthNum
                                    : widthNum,
                                minWidth: meta.minWidth,
                                maxWidth: meta.maxWidth,
                              });
                        return (
                          <TableCell
                            key={`${cell.id}-${rowKey}`}
                            className={cn(
                              'border-b-2 border-black-100 px-4 py-3 align-middle',
                              isLast && 'border-b-0',
                              _clamp
                                ? 'overflow-hidden text-ellipsis whitespace-nowrap'
                                : 'whitespace-normal',
                              id === 'no' && 'p-0',
                            )}
                            style={style}
                          >
                            <Typography
                              as='span'
                              font='satoshi'
                              weight='medium'
                              variant='s3'
                              className={
                                id === 'no' ? 'mb-0 w-full text-center' : 'mb-0'
                              }
                            >
                              {cell.column.id === 'no'
                                ? rowNumber
                                : flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                  )}
                            </Typography>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Info Bar & Pagination */}
      <InfoBar
        page={currentPage}
        totalPages={computedTotalPages}
        onChange={goToPage}
      />
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
