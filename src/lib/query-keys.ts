export const galleryKeys = {
  all: ['galleries'] as const,
  lists: () => [...galleryKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...galleryKeys.lists(), filters] as const,
  details: () => [...galleryKeys.all, 'detail'] as const,
  detail: (id: number) => [...galleryKeys.details(), id] as const,
} as const