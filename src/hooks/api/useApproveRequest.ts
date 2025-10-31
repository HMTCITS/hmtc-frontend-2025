import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { approveRequest } from '@/lib/api/requests.client';
import { requestKeys } from '@/lib/query-keys';
import type { ApproveRequestPayload } from '@/types/request';

/**
 * Hook to approve a request (Admin Repository only)
 * @returns Mutation hook for approving a request
 */
export function useApproveRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload?: ApproveRequestPayload;
    }) => {
      const response = await approveRequest(id, payload);
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

      toast.success('Request approved successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to approve request. Please try again.');
    },
  });
}

/**
 * Type for the hook return value
 */
export type UseApproveRequestResult = ReturnType<typeof useApproveRequest>;
