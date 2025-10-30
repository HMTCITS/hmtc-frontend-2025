export const galleryKeys = {
  all: ['galleries'] as const,
  lists: () => [...galleryKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) =>
    [...galleryKeys.lists(), filters] as const,
  details: () => [...galleryKeys.all, 'detail'] as const,
  detail: (id: number) => [...galleryKeys.details(), id] as const,
} as const;

export const profileKeys = {
  all: ['profile'] as const,
  me: () => [...profileKeys.all, 'me'] as const,
} as const;

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) =>
    [...userKeys.lists(), filters ?? {}] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
  requests: (id: string) => [...userKeys.detail(id), 'requests'] as const,
  requestsList: (id: string, filters?: Record<string, unknown>) =>
    [...userKeys.requests(id), filters ?? {}] as const,
} as const;

