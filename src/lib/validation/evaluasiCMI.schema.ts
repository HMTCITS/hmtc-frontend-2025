import { z } from 'zod';

import {
  DIVISIONS,
  EVALUASI_BIRO,
  EVALUASI_GENERAL,
  UMPAN_BALIK,
} from '@/contents/evaluasiCMI';

/**
 * Dynamic Zod Schema Generator for Evaluasi CMI Form
 * 
 * This schema automatically adapts to changes in evaluasiCMI.ts content.
 * If questions are added/removed/modified, the schema will reflect those changes.
 */

// Helper function to create star rating schema (1-5)
const createStarRatingSchema = (questionCount: number) => {
  const shape: Record<string, z.ZodNumber> = {};
  for (let i = 0; i < questionCount; i++) {
    shape[`question_${i}`] = z
      .number()
      .min(1, 'Rating minimal 1')
      .max(5, 'Rating maksimal 5');
  }
  return z.object(shape);
};

// Helper function to create text input schema
const createTextInputSchema = (questionCount: number, isOptional: boolean[] = []) => {
  const shape: Record<string, z.ZodString | z.ZodOptional<z.ZodString>> = {};
  for (let i = 0; i < questionCount; i++) {
    const field = z.string();
    shape[`question_${i}`] = isOptional[i]
      ? field.optional()
      : field.min(1, 'Pertanyaan ini wajib diisi');
  }
  return z.object(shape);
};

// 1. Intro Schema (Dynamic based on INTRO)
// Intro contains: Nama (text) and Departemen/Biro (select from DIVISIONS)
export const introSchema = z.object({
  nama: z.string().min(1, 'Nama wajib diisi'),
  division: z.enum(
    DIVISIONS.map((d) => d.id) as [string, ...string[]]
  ).refine((val) => val, {
    message: 'Pilih departemen Anda',
  }),
});

// 2. Evaluasi General Schema (Dynamic based on EVALUASI_GENERAL)
const evaluasiGeneralShape: Record<string, z.ZodObject<any>> = {};

EVALUASI_GENERAL.forEach((section) => {
  evaluasiGeneralShape[section.id] = createStarRatingSchema(
    section.questions.length
  );
});

export const evaluasiGeneralSchema = z.object(evaluasiGeneralShape);

// 3. Evaluasi Biro Selection Schema (Dynamic based on EVALUASI_BIRO intro choices)
const biroIntro = EVALUASI_BIRO.find((item) => item.id === 'intro');
const biroChoices = biroIntro?.choices || [];

export const biroPilihanSchema = z.object({
  selectedBiro: z
    .array(z.string())
    .optional()
    .default([])
    .refine(
      (arr) =>
        arr?.every((choice) =>
          biroChoices.some(
            (biro) => biro.toLowerCase().includes(choice.toLowerCase())
          )
        ) ?? true,
      {
        message: 'Pilihan biro tidak valid',
      }
    ),
});

// 4. Evaluasi Biro Detail Schema (Dynamic based on EVALUASI_BIRO sections)
const evaluasiBiroShape: Record<string, z.ZodOptional<z.ZodObject<any>>> = {};

EVALUASI_BIRO.forEach((section) => {
  // Skip intro section (it's for selection, not star rating)
  if (section.id === 'intro') return;

  // Check if questions is an array (star rating sections)
  if (Array.isArray(section.questions)) {
    evaluasiBiroShape[section.id] = createStarRatingSchema(
      section.questions.length
    ).optional(); // Optional because user may not select this biro
  }
});

export const evaluasiBiroSchema = z.object(evaluasiBiroShape);

// 5. Umpan Balik Schema (Dynamic based on UMPAN_BALIK questions)
// Last question is marked as optional in the content description
const umpanBalikQuestionCount = UMPAN_BALIK.questions.length;
const umpanBalikOptional = Array(umpanBalikQuestionCount).fill(false);
umpanBalikOptional[umpanBalikQuestionCount - 1] = true; // Last question is optional

export const umpanBalikSchema = createTextInputSchema(
  umpanBalikQuestionCount,
  umpanBalikOptional
);

// 6. Complete Form Schema (Combines all sections)
export const evaluasiCMISchema = z.object({
  // Intro section (nama + division)
  intro: introSchema,

  // Evaluasi General (all sections)
  evaluasiGeneral: evaluasiGeneralSchema,

  // Biro selection
  selectedBiro: biroPilihanSchema.shape.selectedBiro,

  // Biro evaluations (conditional based on selection)
  evaluasiBiro: evaluasiBiroSchema,

  // Umpan balik
  umpanBalik: umpanBalikSchema,
});

// Type exports for TypeScript
export type IntroFormData = z.infer<typeof introSchema>;
export type EvaluasiGeneralFormData = z.infer<typeof evaluasiGeneralSchema>;
export type BiroPilihanFormData = z.infer<typeof biroPilihanSchema>;
export type EvaluasiBiroFormData = z.infer<typeof evaluasiBiroSchema>;
export type UmpanBalikFormData = z.infer<typeof umpanBalikSchema>;
export type EvaluasiCMIFormData = z.infer<typeof evaluasiCMISchema>;

/**
 * Usage Example:
 * 
 * import { evaluasiCMISchema } from '@/lib/validation/evaluasiCMI.schema';
 * import { useForm } from 'react-hook-form';
 * import { zodResolver } from '@hookform/resolvers/zod';
 * 
 * const form = useForm<EvaluasiCMIFormData>({
 *   resolver: zodResolver(evaluasiCMISchema),
 *   defaultValues: {
 *     intro: {
 *       nama: '',
 *       division: '',
 *     },
 *     evaluasiGeneral: {},
 *     selectedBiro: [],
 *     evaluasiBiro: {},
 *     umpanBalik: {},
 *   },
 * });
 */

/**
 * Conditional Validation Helper
 * 
 * Use this to validate only the selected biro sections:
 */
export const createConditionalBiroSchema = (selectedBiro: string[]) => {
  const conditionalShape: Record<string, z.ZodObject<any>> = {};

  EVALUASI_BIRO.forEach((section) => {
    if (section.id === 'intro') return;

    // Map biro names to IDs
    const biroNameMap: Record<string, string> = {
      'Creative Design (CD)': 'cd',
      'Social Media Strategist (SMS)': 'sms',
      'Media Production (MedPro)': 'medpro',
      'IT Development (ITDev)': 'itdev',
    };

    // Check if this biro is selected
    const isSelected = selectedBiro.some((selected) => {
      const biroId = biroNameMap[selected];
      return biroId === section.id;
    });

    if (isSelected && Array.isArray(section.questions)) {
      conditionalShape[section.id] = createStarRatingSchema(
        section.questions.length
      );
    }
  });

  return z.object(conditionalShape);
};
