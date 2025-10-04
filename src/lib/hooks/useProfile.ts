import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { changePassword, getCurrentUser, updateProfile, uploadAvatar } from '@/lib/api/me.client';
import { profileKeys } from '@/lib/query-keys';
import type { ChangePasswordRequest, UpdateProfileRequest, UserMe } from '@/types/profile';

/**
 * Hook to fetch current user profile
 * @returns Query result with user data
 */
export const useMe = () => {
  return useQuery({
    queryKey: profileKeys.me(),
    queryFn: async () => {
      const response = await getCurrentUser();
      if (!response.status) {
        throw new Error(response.message || 'Failed to fetch user profile');
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};

/**
 * Hook to update user profile
 * @returns Mutation function for updating profile
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileRequest) => {
      const response = await updateProfile(data);
      if (!response.status) {
        throw new Error(response.message || 'Failed to update profile');
      }
      return response.data;
    },
    onSuccess: (updatedUser: UserMe) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: profileKeys.me() });
      
      // Optimistically update cache
      queryClient.setQueryData(profileKeys.me(), updatedUser);
      
      toast.success('Profile updated successfully!', {
        description: 'Your profile information has been updated.',
      });
    },
    onError: (error: Error) => {
      toast.error('Failed to update profile', {
        description: error.message,
      });
    },
  });
};

/**
 * Hook to upload user avatar
 * @returns Mutation function for uploading avatar
 */
export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const response = await uploadAvatar(file);
      if (!response.status) {
        throw new Error(response.message || 'Failed to upload avatar');
      }
      return response.data;
    },
    onSuccess: (avatarData) => {
      // Update user data with new avatar URL
      queryClient.setQueryData(profileKeys.me(), (oldData: UserMe | undefined) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          avatarUrl: avatarData.avatarUrl,
        };
      });
      
      // Invalidate to ensure fresh data
      queryClient.invalidateQueries({ queryKey: profileKeys.me() });
      
      toast.success('Avatar updated successfully!', {
        description: 'Your profile picture has been updated.',
      });
    },
    onError: (error: Error) => {
      toast.error('Failed to upload avatar', {
        description: error.message,
      });
    },
  });
};

/**
 * Hook to change user password
 * @returns Mutation function for changing password
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: ChangePasswordRequest) => {
      const response = await changePassword(data);
      if (!response.status) {
        throw new Error(response.message || 'Failed to change password');
      }
      return response.data;
    },
    onSuccess: () => {
      toast.success('Password changed successfully!', {
        description: 'Your password has been updated.',
      });
    },
    onError: (error: Error) => {
      toast.error('Failed to change password', {
        description: error.message,
      });
    },
  });
};

/**
 * Hook to prefetch user profile
 * Useful for optimistic loading
 */
export const usePrefetchMe = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.prefetchQuery({
      queryKey: profileKeys.me(),
      queryFn: async () => {
        const response = await getCurrentUser();
        if (!response.status) {
          throw new Error(response.message || 'Failed to fetch user profile');
        }
        return response.data;
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  };
};
