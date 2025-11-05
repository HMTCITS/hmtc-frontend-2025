import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createRequest } from '@/lib/api/requests.client';
import { requestKeys } from '@/lib/query-keys';
import type { CreateRequestPayload, RequestDetail } from '@/types/request';

/**
 * Hook to create a new request (for students to request repository access)
 * @returns Mutation hook for creating a request
 */
export function useCreateRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateRequestPayload) => {
      const response = await createRequest(payload);
      return response.data;
    },
    onSuccess: (data: RequestDetail) => {
      // Invalidate all request lists to refetch
      queryClient.invalidateQueries({ queryKey: requestKeys.lists() });
      
      // Optionally set the detail in cache
      queryClient.setQueryData(requestKeys.detail(data.id), data);
      
      toast.success('Request submitted successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create request. Please try again.');
    },
  });
}

/**
 * Type for the hook return value
 */
export type UseCreateRequestResult = ReturnType<typeof useCreateRequest>;
