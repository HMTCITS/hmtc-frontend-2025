import { api } from '@/lib/api/api';
import type { ApiResponse } from '@/types/api';
import type {
  AvatarUploadResponse,
  ChangeRoleRequest,
  UpdateUserRequest,
  UserDetail,
  UserRequestsResponse,
} from '@/types/profile';

/**
 * Users API Client
 * Handles all user-related API calls for admin operations
 */

/**
 * Get user detail by ID
 * @param userId - The ID of the user to fetch
 * @returns Promise<ApiResponse<UserDetail>>
 */
export const getUserById = async (
  userId: string,
): Promise<ApiResponse<UserDetail>> => {
  const response = await api.get<ApiResponse<UserDetail>>(`/users/${userId}`);
  return response.data;
};

/**
 * Update user information
 * @param userId - The ID of the user to update
 * @param data - The user data to update
 * @returns Promise<ApiResponse<UserDetail>>
 */
export const updateUser = async (
  userId: string,
  data: UpdateUserRequest,
): Promise<ApiResponse<UserDetail>> => {
  const response = await api.patch<ApiResponse<UserDetail>>(
    `/users/${userId}`,
    data,
  );
  return response.data;
};

/**
 * Upload user avatar
 * @param userId - The ID of the user
 * @param file - The avatar file to upload
 * @returns Promise<ApiResponse<AvatarUploadResponse>>
 */
export const uploadUserAvatar = async (
  userId: string,
  file: File,
): Promise<ApiResponse<AvatarUploadResponse>> => {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await api.post<ApiResponse<AvatarUploadResponse>>(
    `/users/${userId}/avatar`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

/**
 * Change user role
 * @param userId - The ID of the user
 * @param data - The role change data
 * @returns Promise<ApiResponse<UserDetail>>
 */
export const changeUserRole = async (
  userId: string,
  data: ChangeRoleRequest,
): Promise<ApiResponse<UserDetail>> => {
  const response = await api.post<ApiResponse<UserDetail>>(
    `/users/${userId}/role`,
    data,
  );
  return response.data;
};

/**
 * Get user requests (role changes, data updates, etc.)
 * @param userId - The ID of the user
 * @param params - Optional query parameters
 * @returns Promise<ApiResponse<UserRequestsResponse>>
 */
export const getUserRequests = async (
  userId: string,
  params?: {
    type?: string;
    status?: string;
    page?: number;
    limit?: number;
  },
): Promise<ApiResponse<UserRequestsResponse>> => {
  const response = await api.get<ApiResponse<UserRequestsResponse>>(
    `/users/${userId}/requests`,
    { params },
  );
  return response.data;
};

/**
 * Get all users (for admin)
 * @param params - Optional query parameters for filtering and pagination
 * @returns Promise<ApiResponse<{ users: UserDetail[], total: number }>>
 */
export const getAllUsers = async (params?: {
  page?: number;
  limit?: number;
  role?: string;
  search?: string;
}): Promise<ApiResponse<{ users: UserDetail[]; total: number }>> => {
  const response = await api.get<
    ApiResponse<{ users: UserDetail[]; total: number }>
  >('/users', { params });
  return response.data;
};

/**
 * Delete user
 * @param userId - The ID of the user to delete
 * @returns Promise<ApiResponse<{ message: string }>>
 */
export const deleteUser = async (
  userId: string,
): Promise<ApiResponse<{ message: string }>> => {
  const response = await api.delete<ApiResponse<{ message: string }>>(
    `/users/${userId}`,
  );
  return response.data;
};

// Export all functions as default object for easier importing
const usersClient = {
  getUserById,
  updateUser,
  uploadUserAvatar,
  changeUserRole,
  getUserRequests,
  getAllUsers,
  deleteUser,
};

export default usersClient;
