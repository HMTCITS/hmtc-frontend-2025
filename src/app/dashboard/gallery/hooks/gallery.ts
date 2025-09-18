import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import {
  createGallery,
  deleteGallery,
  getGalleries,
  getGalleryById,
  updateGallery
} from '@/lib/api/gallery.client';
import { galleryKeys } from '@/lib/query-keys'
import type {
  CreateGalleryRequest,
  GalleryItem,
  UpdateGalleryRequest
} from '@/types/gallery';

/**
 * Get all galleries + Caching
 */
export function useGalleries(filters?: {
  search?: string;
  tags?: string[];
}) {
  return useQuery({
    queryKey: galleryKeys.list(filters || {}),
    queryFn: () => getGalleries(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Get Gallery by ID
 */
export function useGallery(id: number, enabled = true) {
  return useQuery({
    queryKey: galleryKeys.detail(id),
    queryFn: () => getGalleryById(id),
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Create gallery
 */
export function useCreateGallery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGalleryRequest) => createGallery(data),
    onSuccess: (newGallery) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: galleryKeys.lists(),
      })

      // Update cache
      queryClient.setQueryData(
        galleryKeys.detail(newGallery.data.data.id),
        newGallery.data.data
      )
    },
    onError: () => {}
  })
}

/**
 * Update Gallery
 */
export function useUpdateQuery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateGalleryRequest }) => updateGallery(id, data),
    onSuccess: (updatedGallery, variables) => {
      const { id } = variables;

      // Update specific gallery cache
      queryClient.setQueryData(
        galleryKeys.detail(id),
        updatedGallery
      );

      // Invalidate galleries list
      queryClient.invalidateQueries({
        queryKey: galleryKeys.lists(),
      })
    },
    onError: () => {}
  })
}

/**
 * Delete Single Gallery
 */
export function useDeleteGallery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteGallery(id),
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({
        queryKey: galleryKeys.detail(id)
      })

      // Invalidate lists
      queryClient.invalidateQueries({
        queryKey: galleryKeys.lists(),
      })
    },
    onError: () => {}
  })
}

/**
 * Group all gallery hooks
 */
export function useGalleryOperations() {
  const createMutation = useCreateGallery();
  const updateMutation = useUpdateQuery();
  const deleteMutation = useDeleteGallery();

  return {
    create: createMutation,
    update: updateMutation,
    delete: deleteMutation,

    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
}

/**
 * Client side filtering and pagination
 */
export function useGalleryPagination(
  galleries: GalleryItem[] = [],
  initialPageSize = 10
) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [searchQuery, setSearchQuery] = useState('');

  // Client-side filtering
  const { paginatedGalleries, totalItems, totalPages } = useMemo(() => {
    let filtered = galleries;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((gallery) =>
        gallery.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Calculate pagination
    const total = filtered.length;
    const pages = Math.ceil(total / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginated = filtered.slice(startIndex, endIndex);

    return {
      paginatedGalleries: paginated,
      totalItems: total,
      totalPages: pages,
    };
  }, [galleries, searchQuery, currentPage, pageSize]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const changePageSize = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }

  const search = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }

  return {
    galleries: paginatedGalleries,
    totalItems,
    totalPages,
    currentPage,
    pageSize,
    searchQuery,
    goToPage,
    changePageSize,
    search
  }
}