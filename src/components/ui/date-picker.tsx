'use client';

import { CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

function formatDate(date: Date | undefined) {
  if (!date) {
    return '';
  }

  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

type DatePickerProps = {
  id?: string;
  value?: string | null;
  onChange?: (isoDate: string | null) => void;
  disabled?: boolean;
  className?: string;
};

export function DatePicker({
  id,
  value,
  onChange,
  disabled,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const parseIso = (iso?: string | null) => {
    if (!iso) return undefined;
    const d = new Date(iso);
    return isValidDate(d) ? d : undefined;
  };

  const [date, setDate] = React.useState<Date | undefined>(parseIso(value));
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [display, setDisplay] = React.useState<string>('');

  React.useEffect(() => {
    const d = parseIso(value);
    setDate(d);
    setMonth(d ?? undefined);
    setDisplay(formatDate(d));
  }, [value]);

  const emitChange = (d?: Date | undefined) => {
    if (onChange) {
      onChange(d ? d.toISOString().split('T')[0] : null);
    }
  };

  return (
    <div className='flex w-full items-center'>
      <div className='relative flex w-full'>
        <Input
          id={id}
          value={display}
          placeholder='June 01, 2025'
          className={cn('pr-10', className)}
          disabled={disabled}
          readOnly
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id={id ? `${id}-picker` : 'date-picker'}
              variant='ghost'
              size='icon'
              className='absolute top-1/2 right-2 -translate-y-1/2'
              disabled={disabled}
              aria-label='Select date'
            >
              <CalendarIcon className='size-4' />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align='end'
            alignOffset={-8}
            sideOffset={10}
            className='p-0'
          >
            <Calendar
              mode='single'
              selected={date}
              captionLayout='dropdown'
              month={month}
              onMonthChange={setMonth}
              onSelect={(d) => {
                setDate(d);
                setDisplay(formatDate(d));
                emitChange(d);
                setOpen(false);
              }}
              className='rounded-md'
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
