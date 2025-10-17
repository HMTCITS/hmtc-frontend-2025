import { z } from 'zod';

export const divisionAnswerSchema = z.object({
  q1: z.string().min(1, 'Belum diisi'),
  q2: z.string().min(1, 'Belum diisi'),
  q3: z.string().min(1, 'Belum diisi'),
  q4: z.string().min(1, 'Belum diisi'),
  q5: z.string().min(1, 'Belum diisi'),
});

export const magangFormSchema = z
  .object({
    nama: z.string().min(2, 'Nama minimal 2 karakter'),
    nrp: z.string().regex(/^\d{8,12}$/g, 'NRP harus 8-12 digit angka'),
    kelompokKP: z.string().min(1, 'Kelompok KP wajib diisi'),
    q1: z.string().min(1, 'Jawaban pertanyaan 1 harus diisi'),
    q2: z.string().min(1, 'Jawaban pertanyaan 2 harus diisi'),
    q3: z.string().min(1, 'Jawaban pertanyaan 3 harus diisi'),
    zipFile: z.any(),
    selectedDivisions: z
      .array(z.string())
      .min(1, 'Pilih minimal 1 divisi')
      .max(3, 'Maksimal memilih 3 divisi'),
    divisionAnswers: z.record(z.string(), divisionAnswerSchema),
  })
  .superRefine((all, ctx) => {
    const f = all.zipFile as unknown as File | null;
    if (!f || !('name' in f) || !/\.zip$/i.test((f as any).name)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Bundle ZIP wajib diunggah dan harus .zip',
        path: ['zipFile'],
      });
    }
    const answers = all.divisionAnswers as Record<
      string,
      z.infer<typeof divisionAnswerSchema>
    >;
    type Key = 'q1' | 'q2' | 'q3' | 'q4' | 'q5';
    const KEYS: Key[] = ['q1', 'q2', 'q3', 'q4', 'q5'];
    for (const divId of all.selectedDivisions) {
      // Ensure we validate each required question individually. If the
      // entire division object is missing, treat it as empty and add per-
      // field issues so the UI shows field-level errors (consistent with
      // Input/Textarea messages).
      const ans = (answers && answers[divId]) || {};
      for (const key of KEYS) {
        const val = ans[key as Key];
        if (!val || !val.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            // Use the concise message expected by the Textarea component
            // and consistent with other input messages.
            message: 'Belum diisi',
            path: ['divisionAnswers', divId, key],
          });
        }
      }
    }
  });

export type MagangFormValues = z.infer<typeof magangFormSchema>;
