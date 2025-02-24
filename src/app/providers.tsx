'use client';

import {
  QueryClient,
  QueryClientProvider,
  QueryFunctionContext,
  QueryObserverOptions,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';

import Loading from '@/components/Loading';
import { Toaster } from '@/components/ui/sonner';
import api from '@/lib/api';

/**
 * Default query function untuk React Query.
 * Mengharapkan queryKey berupa readonly array dengan elemen pertama sebagai endpoint.
 */
const defaultQueryFn = async ({
  queryKey,
}: QueryFunctionContext<readonly unknown[]>) => {
  const endpoint = queryKey[0] as string;
  const { data } = await api.get(endpoint);
  return data;
};

/**
 * Extend tipe QueryObserverOptions agar mendukung properti suspense.
 * Perhatikan bahwa default type untuk TError diubah menjadi Error untuk mencegah konflik tipe.
 */
interface ExtendedQueryObserverOptions<TData = unknown, TError = Error>
  extends QueryObserverOptions<TData, TError> {
  suspense?: boolean;
}

/**
 * Membuat instance QueryClient sebagai singleton.
 * Pengaturan default untuk query meliputi:
 * - Mengaktifkan suspense.
 * - Retry sesuai environment.
 * - Stale time selama 3 menit.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      suspense: true,
      retry: process.env.NODE_ENV === 'development' ? 0 : 3,
      staleTime: 1000 * 60 * 3,
    } as ExtendedQueryObserverOptions,
  },
});

type ProvidersProps = {
  children: React.ReactNode;
};

/**
 * Providers membungkus aplikasi dengan QueryClientProvider dan Toaster.
 * Suspense fallback ditetapkan ke komponen <Loading />.
 * React Query Devtools hanya ditampilkan saat development.
 */
export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position='top-center' />
      <React.Suspense fallback={<Loading />}>{children}</React.Suspense>
      {process.env.NEXT_PUBLIC_RUN_MODE === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
