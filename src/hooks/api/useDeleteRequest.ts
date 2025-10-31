import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteRequest } from '@/lib/api/requests.client';
import { requestKeys } from '@/lib/query-keys';

/**
 * Hook to delete a request (Admin or request owner only)
 * @returns Mutation hook for deleting a request
 */
export function useDeleteRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteRequest(id);
      return response.data;
    },
    onSuccess: (_, requestId) => {
      // Remove the specific request from cache
      queryClient.removeQueries({
        queryKey: requestKeys.detail(requestId),
      });

      // Invalidate all request lists to refetch
      queryClient.invalidateQueries({
        queryKey: requestKeys.lists(),
      });

      toast.success('Request deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete request. Please try again.');
    },
  });
}

/**
 * Type for the hook return value
 */
export type UseDeleteRequestResult = ReturnType<typeof useDeleteRequest>;
