import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { rejectRequest } from '@/lib/api/requests.client';
import { requestKeys } from '@/lib/query-keys';
import type { RejectRequestPayload } from '@/types/request';

/**
 * Hook to reject a request (Admin Repository only)
 * @returns Mutation hook for rejecting a request
 */
export function useRejectRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload?: RejectRequestPayload;
    }) => {
      const response = await rejectRequest(id, payload);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate the specific request detail
      queryClient.invalidateQueries({
        queryKey: requestKeys.detail(variables.id),
      });

      // Invalidate all request lists to refetch with updated status
      queryClient.invalidateQueries({
        queryKey: requestKeys.lists(),
      });

      toast.success('Request rejected successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to reject request. Please try again.');
    },
  });
}

/**
 * Type for the hook return value
 */
export type UseRejectRequestResult = ReturnType<typeof useRejectRequest>;
