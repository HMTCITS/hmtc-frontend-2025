'use client';

import { Table } from '@tanstack/react-table';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Props = {
  table: Table<any>;
  storageKey?: string;
  setColumnVisibility?: (v: any) => void;
};

export default function ColumnToggle({
  table,
  storageKey,
  setColumnVisibility,
}: Props) {
  const allLeaf = table.getAllLeafColumns().filter((c) => c.id !== 'select');

  // Always use setColumnVisibility from props if provided, fallback to table.setColumnVisibility
  const updateVisibility = (newVisibility: Record<string, boolean>) => {
    if (typeof window !== 'undefined' && storageKey) {
      localStorage.setItem(`${storageKey}:cols`, JSON.stringify(newVisibility));
    }
    if (typeof setColumnVisibility === 'function') {
      setColumnVisibility(newVisibility);
    } else if (typeof table.setColumnVisibility === 'function') {
      table.setColumnVisibility(newVisibility);
    }
  };

  const toggleAll = (visible: boolean) => {
    const newVisibility: Record<string, boolean> = {
      ...table.getState().columnVisibility,
    };
    allLeaf.forEach((c) => {
      newVisibility[c.id] = visible;
    });
    updateVisibility(newVisibility);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          aria-label='Toggle columns'
          className='rounded-lg border-gray-200 px-3 py-1.5 font-medium text-gray-700 shadow-sm transition-colors duration-150 hover:border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-blue-100'
        >
          <span className='inline-flex items-center gap-2'>
            <svg
              width='18'
              height='18'
              viewBox='0 0 20 20'
              fill='none'
              className='text-blue-500'
            >
              <rect
                x='3'
                y='6'
                width='14'
                height='2'
                rx='1'
                fill='currentColor'
              />
              <rect
                x='3'
                y='12'
                width='14'
                height='2'
                rx='1'
                fill='currentColor'
              />
            </svg>
            Columns
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        className='animate-in fade-in slide-in-from-top-2 w-64 rounded-xl border border-gray-100 bg-white p-3 shadow-lg transition-all duration-200'
      >
        <div className='flex items-center justify-between px-1 py-2'>
          <DropdownMenuLabel className='text-base font-semibold tracking-tight text-gray-800'>
            Manage Columns
          </DropdownMenuLabel>
          <div className='flex gap-2'>
            <Button
              size='sm'
              variant='ghost'
              type='button'
              tabIndex={0}
              className='rounded-md px-2 py-1 text-xs font-medium text-gray-600 transition-colors duration-150 hover:bg-blue-50 hover:text-blue-600 focus:ring-2 focus:ring-blue-200'
              onClick={() => toggleAll(true)}
            >
              All
            </Button>
            <Button
              size='sm'
              variant='ghost'
              type='button'
              tabIndex={0}
              className='rounded-md px-2 py-1 text-xs font-medium text-gray-600 transition-colors duration-150 hover:bg-red-50 hover:text-red-500 focus:ring-2 focus:ring-red-200'
              onClick={() => toggleAll(false)}
            >
              None
            </Button>
          </div>
        </div>

        <DropdownMenuSeparator className='my-2 bg-gray-100' />

        <div className='flex flex-col gap-1 px-1'>
          {allLeaf.map((col) => (
            <DropdownMenuItem
              key={col.id}
              className='p-0'
              // Prevent dropdown from closing on click
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              <label
                className='group flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-gray-700 transition-colors duration-150 focus-within:bg-blue-50 hover:bg-blue-50'
                tabIndex={0}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 accent-blue-500 transition-all duration-150 group-hover:scale-110 group-focus:scale-110 focus:ring-2 focus:ring-blue-400'
                  checked={col.getIsVisible()}
                  onChange={(e) => {
                    const newVisibility = {
                      ...table.getState().columnVisibility,
                      [col.id]: e.target.checked,
                    };
                    updateVisibility(newVisibility);
                  }}
                  aria-checked={col.getIsVisible()}
                  aria-label={`Toggle ${String(col.columnDef.header ?? col.id)}`}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className='text-sm font-medium text-gray-800 transition-colors duration-150 select-none group-hover:text-blue-600 group-focus:text-blue-600'>
                  {String(col.columnDef.header ?? col.id)}
                </span>
              </label>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
