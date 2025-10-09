import { z } from 'zod';

/**
 * Zod schema describing the magang application inputs.
 *
 * Fields:
 * - nama: required, min 2 chars, max 100
 * - nrp: required, 8–12 digits
 * - kelompokKP: required
 * - mindmapMeta: marker object updated when a file is selected; form requires it to exist
 */
export const applyMagangSchema = z.object({
  nama: z
    .string()
    .min(1, 'Nama wajib diisi')
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama maksimal 100 karakter'),
  nrp: z
    .string()
    .min(1, 'NRP wajib diisi')
    .regex(/^\d{8,12}$/, 'NRP harus 8-12 digit angka'),
  kelompokKP: z.string().min(1, 'Kelompok KP wajib diisi'),
  mindmapMeta: z
    .object({ fileName: z.string(), size: z.number().positive() })
    .nullable()
    .refine((v) => !!v, { message: 'File mindmap wajib diunggah' }),
});

/** Inferred TypeScript type for the magang application form data. */
export type ApplyMagangFormData = z.infer<typeof applyMagangSchema>;
