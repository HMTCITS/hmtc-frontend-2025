import { useQuery } from '@tanstack/react-query';

import { getUploads } from '@/lib/api/uploads.client';
import { uploadKeys } from '@/lib/query-keys';
import type { UploadFilters } from '@/types/upload';

/**
 * Hook to fetch all uploads with optional filters
 * @param filters - Optional filters for uploads (status, search, pagination, etc.)
 * @returns React Query result with uploads data
 */
export function useUploads(filters?: UploadFilters) {
  return useQuery({
    queryKey: uploadKeys.list(filters as Record<string, unknown>),
    queryFn: async () => {
      const response = await getUploads(filters);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Type for the hook return value
 */
export type UseUploadsResult = ReturnType<typeof useUploads>;
