import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteUpload } from '@/lib/api/uploads.client';
import { uploadKeys } from '@/lib/query-keys';

/**
 * Hook to delete an upload (Admin/Owner only)
 * @returns Mutation hook for deleting an upload
 */
export function useDeleteUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await deleteUpload(id);
      return id;
    },
    onSuccess: (id) => {
      // Invalidate all upload lists
      queryClient.invalidateQueries({
        queryKey: uploadKeys.lists(),
      });

      // Remove the specific upload detail from cache
      queryClient.removeQueries({
        queryKey: uploadKeys.detail(id),
      });

      toast.success('Upload deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(
        error.message || 'Failed to delete upload. Please try again.'
      );
    },
  });
}

/**
 * Type for the hook return value
 */
export type UseDeleteUploadResult = ReturnType<typeof useDeleteUpload>;
