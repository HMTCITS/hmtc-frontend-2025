import { ColumnDef } from '@tanstack/react-table';
import { ReactNode } from 'react';

// Sort definition
export type Sort = {
  id: string;
  desc: boolean;
};

// Query state for controlled/server mode
export type QueryState = {
  page: number; // 1-based
  pageSize: number; // 10/25/50...
  q?: string; // search query
  sort?: Sort[];
  filters?: Record<string, unknown>;
};

// Table density options
export type TableDensity = 'compact' | 'comfortable' | 'spacious';

// Status for StatusBadge
export type RequestStatus = 'pending' | 'in-review' | 'approved' | 'rejected';

// Base DataTable Props
export interface BaseDataTableProps<TData, TValue = unknown> {
  // Core data
  data: TData[];
  columns: ColumnDef<TData, TValue>[];

  // Client-side total items/pages jika serverMode=false
  totalItems?: number;
  totalPages?: number;

  // Controlled state (server-mode)
  serverMode?: boolean;
  query?: QueryState;
  onQueryChange?: (next: QueryState) => void;

  // Uncontrolled defaults (client-mode)
  defaultPageSize?: number;
  defaultDensity?: TableDensity;
  storageKey?: string; // persist column visibility/order/size

  // Toolbar slots
  toolbarLeft?: ReactNode | ((q: QueryState) => ReactNode);
  toolbarRight?: ReactNode | ((q: QueryState) => ReactNode);
  renderSearchInput?: (
    value: string,
    onChange: (v: string) => void,
  ) => ReactNode;
  extraFilters?: ReactNode;

  // Behaviors
  enableRowSelection?: boolean;
  enableColumnVisibility?: boolean;
  enableExportCsv?: boolean;
  enableVirtualize?: boolean;

  // UI states
  loading?: boolean;
  emptyMessage?: string;
  errorMessage?: string;

  // Callbacks
  onRowClick?: (row: TData) => void;
  onExportCsv?: (rows: TData[]) => void; // override default exporter

  // Styling
  className?: string;

  // Accessibility
  'aria-label'?: string;
}

// Props for toolbar components
export interface ToolbarProps {
  query: QueryState;
  onQueryChange: (next: Partial<QueryState>) => void;
  table?: any;
}

// Props for pagination
export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}

// Props for StatusBadge
export interface StatusBadgeProps {
  status: RequestStatus;
  variant?: 'default' | 'outline';
}

// Request item example type
export interface RequestItem {
  id: string;
  title: string;
  requestDate: string;
  applicant: string;
  status: RequestStatus;
}
