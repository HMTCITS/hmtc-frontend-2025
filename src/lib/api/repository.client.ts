import { api } from '@/lib/api/api';
import type { ApiResponse } from '@/types/api';
import type {
  CreateRepositoryRequest,
  RepositoryDetail,
  RepositoryItem,
  UpdateRepositoryRequest,
} from '@/types/repository';

/**
 * Get all repository items
 * Assuming Backend returns all repository data
 * while frontend handles pagination, filtering, and searching
 */
export const getRepositories = async (params?: {
  search?: string;
  writer?: string;
  laboratory?: string;
  supervisor?: string;
}) => {
  const searchParams = new URLSearchParams();

  // Only send filters to backend without pagination params
  if (params?.search) searchParams.append('q', params.search);
  if (params?.writer) searchParams.append('writer', params.writer);
  if (params?.laboratory) searchParams.append('laboratory', params.laboratory);
  if (params?.supervisor) searchParams.append('supervisor', params.supervisor);

  const response = await api.get<ApiResponse<RepositoryItem[]>>('/repositories', {
    params: searchParams,
  });

  if (!response.data.status) {
    throw new Error(response.data.message || 'Failed to fetch repositories');
  }

  return response.data.data;
};

/**
 * Get repository item by ID
 */
export const getRepositoryById = async (id: string) => {
  return api.get<ApiResponse<RepositoryDetail>>(`/repositories/${id}`);
};

/**
 * Upload Repository Document/File
 */
export const uploadRepositoryDocument = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  // POST to /uploads/repository-document
  return api.post<ApiResponse<{ fileUrl: string; fileName: string }>>(
    '/uploads/repository-document',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

/**
 * Create repository item
 */
export const createRepository = async (data: CreateRepositoryRequest) => {
  return api.post<ApiResponse<RepositoryDetail>>('/repositories', data);
};

/**
 * Update repository item
 */
export const updateRepository = async (id: string, data: UpdateRepositoryRequest) => {
  return api.patch<ApiResponse<RepositoryDetail>>(`/repositories/${id}`, data);
};

/**
 * Delete repository item
 */
export const deleteRepository = async (id: string) => {
  return api.delete<ApiResponse<null>>(`/repositories/${id}`);
};

/**
 * Get repositories by writer
 */
export const getRepositoriesByWriter = async (writer: string) => {
  return api.get<ApiResponse<RepositoryItem[]>>(`/repositories/writer/${writer}`);
};

/**
 * Get repositories by laboratory
 */
export const getRepositoriesByLaboratory = async (laboratory: string) => {
  return api.get<ApiResponse<RepositoryItem[]>>(`/repositories/laboratory/${laboratory}`);
};

/**
 * Bulk delete repositories
 */
export const bulkDeleteRepositories = async (ids: string[]) => {
  return api.delete<ApiResponse<null>>('/repositories/bulk', {
    data: { ids },
  });
};
