import { useQuery } from '@tanstack/react-query';

import { getUploadById } from '@/lib/api/uploads.client';
import { uploadKeys } from '@/lib/query-keys';

/**
 * Hook to fetch a single upload detail by ID
 * @param id - Upload ID
 * @returns React Query result with upload detail data
 */
export function useUploadDetail(id: string) {
  return useQuery({
    queryKey: uploadKeys.detail(id),
    queryFn: async () => {
      const response = await getUploadById(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Type for the hook return value
 */
export type UseUploadDetailResult = ReturnType<typeof useUploadDetail>;
