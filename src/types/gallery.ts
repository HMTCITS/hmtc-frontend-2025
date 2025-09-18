export type GalleryItem = {
  id: number;
  date: string;
  title: string;
  image: string;
  link: string;
  width: number;
  height: number;
}

export type GalleryDetail = GalleryItem & {
  description?: string;
  tags?: string;
  uploadedBy?: string;
  uploadedAt?: string;
  viewCount?: number;
}

export type CreateGalleryRequest = Omit<GalleryItem, 'id'> & {
  description?: string;
  tags?: string;
}

export type UpdateGalleryRequest = Partial<Omit<GalleryItem, 'id'>> & {
  description?: string;
  tags?: string[];
}

// --- API Response Type
export type GalleryListResponse = {
  items: GalleryItem[];
  // totalItems: number;
  // totalPages: number;
  // currentPage: number;
}