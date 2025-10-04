import { api } from '@/lib/api/api';
import type { ApiResponse } from '@/types/api';
import type { 
  AvatarUploadResponse, 
  ChangePasswordRequest, 
  UpdateProfileRequest, 
  UserMe} from '@/types/profile';

/**
 * Get current user profile information
 * @returns Promise<ApiResponse<UserMe>>
 */
export const getCurrentUser = async (): Promise<ApiResponse<UserMe>> => {
  const response = await api.get<ApiResponse<UserMe>>('/auth/me');
  return response.data;
};

/**
 * Update current user profile
 * @param data - Profile data to update
 * @returns Promise<ApiResponse<UserMe>>
 */
export const updateProfile = async (
  data: UpdateProfileRequest
): Promise<ApiResponse<UserMe>> => {
  const response = await api.patch<ApiResponse<UserMe>>('/users/me', data);
  return response.data;
};

/**
 * Upload user avatar
 * @param file - Avatar image file
 * @returns Promise<ApiResponse<AvatarUploadResponse>>
 */
export const uploadAvatar = async (
  file: File
): Promise<ApiResponse<AvatarUploadResponse>> => {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await api.post<ApiResponse<AvatarUploadResponse>>(
    '/users/me/avatar',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  
  return response.data;
};

/**
 * Change user password
 * @param data - Password change data
 * @returns Promise<ApiResponse<{ message: string }>>
 */
export const changePassword = async (
  data: ChangePasswordRequest
): Promise<ApiResponse<{ message: string }>> => {
  const response = await api.post<ApiResponse<{ message: string }>>(
    '/auth/change-password',
    data
  );
  
  return response.data;
};

// Export all functions as default object for easier importing
const meClient = {
  getCurrentUser,
  updateProfile,
  uploadAvatar,
  changePassword,
};

export default meClient;
