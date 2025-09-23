import { z } from 'zod';

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const isValidGoogleDriveUrl = (url: string) => {
  const patterns = [
    /^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+/,
    /^https:\/\/drive\.google\.com\/open\?id=[a-zA-Z0-9_-]+/,
  ];
  return patterns.some((pattern) => pattern.test(url));
};

export const galleryFormSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters'),

  date: z
    .string()
    .min(1, 'Date is required')
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, 'Invalid date'),

  link: z
    .url('Invalid URL')
    .refine(isValidGoogleDriveUrl, 'Only Google Drive URLs are allowed'),

  thumbnail: z
    .instanceof(File, { message: 'Thumbnail is required' })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      'File size must be 1MB or less',
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only JPG/PNG files are allowed',
    )
    .optional(),
});

export const galleryApiSchema = z.object({
  title: z.string(),
  date: z.string(),
  link: z.string(),
  image: z.string(),
  width: z.number(),
  height: z.number(),
});

export type GalleryFormData = z.infer<typeof galleryFormSchema>;

export const VALIDATION_MESSAGES = {
  title: {
    required: 'Title is required',
    minLength: 'Title must be at least 3 characters',
    maxLength: 'Title must be at most 100 characters',
  },
  date: {
    required: 'Date is required',
    invalid: 'Invalid date',
  },
  link: {
    required: 'Link is required',
    invalid: 'Invalid link',
  },
  thumbnail: {
    required: 'Thumbnail is required',
    fileSize: 'File size must be 1MB or less',
    fileType: 'Only JPG/PNG files are allowed',
  },
} as const;
