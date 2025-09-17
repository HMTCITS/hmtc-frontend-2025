'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ColumnToggleProps {
  table: any;
  storageKey?: string;
}

export function ColumnToggle({ table, storageKey }: ColumnToggleProps) {
  const saveVisibilityToStorage = (visibility: any) => {
    if (storageKey && typeof window !== 'undefined') {
      localStorage.setItem(
        `${storageKey}-visibility`,
        JSON.stringify(visibility),
      );
    }
  };

  const handleColumnToggle = (columnId: string, isVisible: boolean) => {
    table.getColumn(columnId)?.toggleVisibility(isVisible);

    // Save to localStorage if storageKey is provided
    if (storageKey) {
      const newVisibility = {
        ...table.getState().columnVisibility,
        [columnId]: isVisible,
      };
      saveVisibilityToStorage(newVisibility);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' aria-label='Toggle columns'>
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-48'>
        {table
          .getAllColumns()
          .filter((column: any) => column.getCanHide())
          .map((column: any) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={(value) =>
                  handleColumnToggle(column.id, !!value)
                }
              >
                {column.columnDef.header || column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
