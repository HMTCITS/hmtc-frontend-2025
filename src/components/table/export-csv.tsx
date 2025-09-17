'use client';

import { Button } from '@/components/ui/button';

interface ExportCsvProps<TData = any> {
  data: TData[];
  filename?: string;
  onExport?: (rows: TData[]) => void;
}

function downloadCSV(csvContent: string, filename: string) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

function convertToCSV<TData>(data: TData[]): string {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0] as object);
  const csvHeaders = headers.join(',');

  const csvRows = data.map((row) =>
    headers
      .map((header) => {
        const value = (row as any)[header];
        // Escape quotes and wrap in quotes if contains comma or quotes
        if (
          typeof value === 'string' &&
          (value.includes(',') || value.includes('"'))
        ) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value ?? '';
      })
      .join(','),
  );

  return [csvHeaders, ...csvRows].join('\n');
}

export function ExportCsv<TData>({
  data,
  filename = 'export.csv',
  onExport,
}: ExportCsvProps<TData>) {
  const handleExport = () => {
    if (onExport) {
      onExport(data);
    } else {
      const csv = convertToCSV(data);
      downloadCSV(csv, filename);
    }
  };

  return (
    <Button
      variant='outline'
      size='sm'
      onClick={handleExport}
      disabled={data.length === 0}
      aria-label='Export data to CSV'
    >
      Export CSV
    </Button>
  );
}
