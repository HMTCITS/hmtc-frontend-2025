import { z } from 'zod';

export const repositoryFormSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),

  writer: z.string().min(2, 'Writer name is required'),

  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description must be less than 2000 characters'),

  publishDate: z.string().min(1, 'Publish date is required'),

  supervisor: z.string().optional(),

  laboratory: z.string().optional(),
});

export type RepositoryFormData = z.infer<typeof repositoryFormSchema>;
