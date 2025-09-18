import { api } from '@/lib/api/api';
import type { ApiResponse } from '@/types/api';
import type {
  CreateGalleryRequest,
  GalleryDetail,
  GalleryItem,
  UpdateGalleryRequest,
} from '@/types/gallery';

/**
 * Get all gallery items
 * Assuming Backend returns all gallery data
 * while frontend handles pagination, filtering, and searching
 */
export const getGalleries = async (params?: {
  search?: string;
  tags?: string[];
}) => {
  const searchParams = new URLSearchParams();

  // Only send filters to backend without pagination params
  if (params?.search) searchParams.append('q', params.search);
  if (params?.tags?.length) searchParams.append('tags', params.tags.join(','));

  return api.get<ApiResponse<GalleryItem[]>>('/galleries', {
    params: searchParams
  });
}

/**
 * Get gallery item by ID
 */
export const getGalleryById = async (id: number) => {
  return api.get<ApiResponse<GalleryDetail>>(`/galleries/${id}`);
};

/**
 * Create gallery item
 */
export const createGallery = async (data: CreateGalleryRequest) => {
  return api.post<ApiResponse<GalleryDetail>>('/galleries', data);
}

/**
 * Update gallery item
 */
export const updateGallery = async (id: number, data: UpdateGalleryRequest) => {
  return api.patch<ApiResponse<GalleryDetail>>(`/galleries/${id}`, data);
}

/**
 * Delete gallery item
 */
export const deleteGallery = async (id: number) => {
  return api.delete<ApiResponse<null>>(`/galleries/${id}`);
}