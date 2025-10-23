export interface RepositoryItem {
  id: string;
  title: string;
  date: string;
  writer: string;
}

export interface RepositoryDetail extends RepositoryItem {
  description: string;
  publishDate: string; // ISO date string
  supervisor?: string;
  laboratory?: string;
  documentUrl?: string;
  fileName?: string;
  fileSize?: number;
  downloadCount?: number;
  tags?: string[];
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface CreateRepositoryRequest {
  title: string;
  description: string;
  publishDate: string;
  writer: string;
  supervisor?: string;
  laboratory?: string;
  documentUrl?: string;
  fileName?: string;
  tags?: string[];
  status?: 'draft' | 'published';
}

export interface UpdateRepositoryRequest {
  title?: string;
  description?: string;
  publishDate?: string;
  writer?: string;
  supervisor?: string;
  laboratory?: string;
  documentUrl?: string;
  fileName?: string;
  tags?: string[];
  status?: 'draft' | 'published' | 'archived';
}

// For filtering and search
export interface RepositoryFilters {
  search?: string;
  writer?: string;
  laboratory?: string;
  supervisor?: string;
  status?: 'draft' | 'published' | 'archived';
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
}

// For repository statistics
export interface RepositoryStats {
  totalRepositories: number;
  publishedRepositories: number;
  draftRepositories: number;
  archivedRepositories: number;
  totalDownloads: number;
  topWriters: Array<{
    writer: string;
    repositoryCount: number;
  }>;
  topLaboratories: Array<{
    laboratory: string;
    repositoryCount: number;
  }>;
}
