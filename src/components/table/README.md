# BaseDataTable Component

A highly flexible and reusable DataTable component built on top of shadcn/ui Table and TanStack Table. Supports both client-side and server-side data handling with extensive customization options.

## Features

- 🔄 **Dual Mode**: Client-side and server-side data handling
- 🔍 **Search**: Built-in global search functionality
- 📄 **Pagination**: Customizable pagination with page size selection
- 🔢 **Sorting**: Multi-column sorting support
- 👁️ **Column Visibility**: Toggle column visibility with persistence
- 📊 **Export**: CSV export functionality
- 🎨 **Customizable**: Extensive customization through slots and render props
- ♿ **Accessible**: Full keyboard navigation and ARIA support
- 📱 **Responsive**: Mobile-friendly with horizontal scrolling
- 💾 **Persistence**: Column preferences saved to localStorage

## Basic Usage

### Client-Side Mode (Default)

```tsx
import { BaseDataTable } from '@/components/table';
import { columns } from './columns';

function MyTable() {
  return <BaseDataTable data={data} columns={columns} storageKey='my-table' />;
}
```

### Server-Side Mode

```tsx
import { BaseDataTable } from '@/components/table';
import { useState, useEffect } from 'react';

function ServerTable() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState({ page: 1, pageSize: 10 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await api.getData(query);
      setData(response.data);
      setLoading(false);
    };
    fetchData();
  }, [query]);

  return (
    <BaseDataTable
      serverMode
      data={data}
      columns={columns}
      query={query}
      onQueryChange={setQuery}
      loading={loading}
      totalItems={response.totalItems}
      totalPages={response.totalPages}
    />
  );
}
```

## Column Definition

```tsx
import { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/table';

export const columns: ColumnDef<DataType>[] = [
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
      <span className='line-clamp-1 max-w-[200px]'>{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => <StatusBadge status={getValue<RequestStatus>()} />,
  },
];
```

## API Reference

### BaseDataTableProps

| Prop                     | Type                                            | Default             | Description                         |
| ------------------------ | ----------------------------------------------- | ------------------- | ----------------------------------- |
| `data`                   | `TData[]`                                       | Required            | Array of data to display            |
| `columns`                | `ColumnDef<TData, TValue>[]`                    | Required            | Column definitions                  |
| `serverMode`             | `boolean`                                       | `false`             | Enable server-side data handling    |
| `query`                  | `QueryState`                                    | -                   | Current query state (server mode)   |
| `onQueryChange`          | `(query: QueryState) => void`                   | -                   | Query change handler                |
| `loading`                | `boolean`                                       | `false`             | Loading state                       |
| `totalItems`             | `number`                                        | -                   | Total number of items (server mode) |
| `totalPages`             | `number`                                        | -                   | Total number of pages (server mode) |
| `defaultPageSize`        | `number`                                        | `10`                | Default page size                   |
| `storageKey`             | `string`                                        | -                   | Key for localStorage persistence    |
| `enableColumnVisibility` | `boolean`                                       | `true`              | Enable column visibility toggle     |
| `enableExportCsv`        | `boolean`                                       | `true`              | Enable CSV export                   |
| `emptyMessage`           | `string`                                        | "No data available" | Empty state message                 |
| `onRowClick`             | `(row: TData) => void`                          | -                   | Row click handler                   |
| `toolbarLeft`            | `ReactNode \| (query: QueryState) => ReactNode` | -                   | Custom left toolbar content         |
| `toolbarRight`           | `ReactNode \| (query: QueryState) => ReactNode` | -                   | Custom right toolbar content        |

### QueryState

```tsx
type QueryState = {
  page: number; // 1-based page number
  pageSize: number; // Items per page
  q?: string; // Search query
  sort?: Sort[]; // Sorting configuration
  filters?: Record<string, unknown>; // Additional filters
};
```

### Sort

```tsx
type Sort = {
  id: string; // Column ID
  desc: boolean; // Sort direction
};
```

## Custom Cell Renderers

### StatusBadge

```tsx
import { StatusBadge } from '@/components/table';

// In column definition
{
  accessorKey: 'status',
  header: 'Status',
  cell: ({ getValue }) => (
    <StatusBadge
      status={getValue<'pending' | 'approved' | 'rejected' | 'in-review'>()}
    />
  ),
}
```

## Toolbar Customization

```tsx
<BaseDataTable
  data={data}
  columns={columns}
  toolbarLeft={(query) => (
    <div className='flex gap-2'>
      <Button>Custom Action</Button>
      <span>Items: {data.length}</span>
    </div>
  )}
  toolbarRight={() => <Button>Add New</Button>}
/>
```

## Custom Search Input

```tsx
<BaseDataTable
  data={data}
  columns={columns}
  renderSearchInput={(value, onChange) => (
    <Input
      placeholder='Custom search...'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='max-w-xs'
    />
  )}
/>
```

## Persistence

Column visibility and order are automatically saved to localStorage when `storageKey` is provided:

```tsx
<BaseDataTable
  data={data}
  columns={columns}
  storageKey='user-preferences-table'
/>
```

## Server-Side Implementation Example

```tsx
// API handler
async function fetchData(query: QueryState) {
  const { page, pageSize, q, sort, filters } = query;

  const response = await fetch('/api/data', {
    method: 'POST',
    body: JSON.stringify({
      page,
      pageSize,
      search: q,
      sort,
      filters,
    }),
  });

  return response.json(); // { items, totalItems, totalPages }
}

// Component
function ServerDataTable() {
  const [response, setResponse] = useState(null);
  const [query, setQuery] = useState({ page: 1, pageSize: 10 });

  useEffect(() => {
    fetchData(query).then(setResponse);
  }, [query]);

  return (
    <BaseDataTable
      serverMode
      data={response?.items ?? []}
      totalItems={response?.totalItems}
      totalPages={response?.totalPages}
      query={query}
      onQueryChange={setQuery}
      columns={columns}
    />
  );
}
```

## Styling and Theming

The component uses Tailwind CSS and follows shadcn/ui design tokens. Customize appearance through:

- CSS classes via `className` prop
- Tailwind utility classes
- Custom CSS variables
- shadcn/ui theme configuration

## Accessibility Features

- Full keyboard navigation
- ARIA labels and descriptions
- Screen reader support
- Focus management
- Semantic HTML structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Examples

See `/src/app/(dashboard)/track-request/` for a complete implementation example with:

- Server-side data fetching
- Custom column definitions
- Status badge cell renderer
- Row click handling
- Custom toolbar actions
- Export functionality
