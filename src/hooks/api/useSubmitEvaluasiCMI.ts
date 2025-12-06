'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api/api';

/**
 * Internal form data structure (from form component)
 */
export type EvaluasiCMIFormData = {
  intro: {
    nama: string;
    division: string;
  };
  evaluasiGeneral: {
    bagian1: Record<string, number>; // question_0, question_1, etc. with star ratings (1-5)
    bagian2: Record<string, number>;
  };
  selectedBiro: string[]; // Array of selected biro names
  evaluasiBiro: {
    cd?: Record<string, number>;
    sms?: Record<string, number>;
    medpro?: Record<string, number>;
    itdev?: Record<string, number>;
  };
  umpanBalik: Record<string, string>; // question_0, question_1, question_2 with text answers
};

/**
 * Backend API payload structure (flattened)
 */
export type EvaluasiCMIPayload = {
  nama: string;
  departemen: string;

  // Bagian 1: Kualitas Kerja Sama dan Koordinasi
  kejelasan_komunikasi: number;
  responsivitas: number;
  koordinasi_kegiatan: number;
  profesionalisme: number;
  keterbukaan_feedback: number;

  // Bagian 2: Kontribusi Departemen CMI
  kualitas_dukung: number;
  keterlibatan_aktif: number;
  inovasi_kreativitas: number;
  pemahaman_tugas: number;
  kepatuhan_deadline: number;

  // Evaluasi Biro Creative Design (CD) - Optional
  cd_konsistensi_visual?: number;
  cd_kesesuaian_brief?: number;
  cd_estetika?: number;
  cd_kecepatan_revisi?: number;

  // Evaluasi Biro Social Media Strategist (SMS) - Optional
  sms_strategi_konten?: number;
  sms_audien?: number;
  sms_caption?: number;
  sms_analitik?: number;

  // Evaluasi Biro Media Production (MP) - Optional
  mp_kualitas_produksi?: number;
  mp_konsep?: number;
  mp_inovasi?: number;
  mp_dokumentasi?: number;

  // Evaluasi Biro IT Development (IT) - Optional
  it_stabilitas?: number;
  it_teknis?: number;
  it_keamanan?: number;
  it_ux?: number;

  // Umpan Balik
  umpan_balik_umum: string;
  saran_perbaikan: string;
  komentar_tambahan?: string;
};

/**
 * API response structure
 */
type EvaluasiCMIResponse = {
  data: any;
  message: string;
  success: boolean;
};

/**
 * Transform form data to backend API payload format
 */
function transformToBackendPayload(
  formData: EvaluasiCMIFormData
): EvaluasiCMIPayload {
  const payload: EvaluasiCMIPayload = {
    // Intro
    nama: formData.intro.nama,
    departemen: formData.intro.division,

    // Bagian 1: Kualitas Kerja Sama dan Koordinasi
    kejelasan_komunikasi: formData.evaluasiGeneral.bagian1.question_0,
    responsivitas: formData.evaluasiGeneral.bagian1.question_1,
    koordinasi_kegiatan: formData.evaluasiGeneral.bagian1.question_2,
    profesionalisme: formData.evaluasiGeneral.bagian1.question_3,
    keterbukaan_feedback: formData.evaluasiGeneral.bagian1.question_4,

    // Bagian 2: Kontribusi Departemen CMI
    kualitas_dukung: formData.evaluasiGeneral.bagian2.question_0,
    keterlibatan_aktif: formData.evaluasiGeneral.bagian2.question_1,
    inovasi_kreativitas: formData.evaluasiGeneral.bagian2.question_2,
    pemahaman_tugas: formData.evaluasiGeneral.bagian2.question_3,
    kepatuhan_deadline: formData.evaluasiGeneral.bagian2.question_4,

    // Umpan Balik
    umpan_balik_umum: formData.umpanBalik.question_0,
    saran_perbaikan: formData.umpanBalik.question_1,
    komentar_tambahan: formData.umpanBalik.question_2 || undefined,
  };

  // Evaluasi Biro CD (Creative Design)
  if (formData.evaluasiBiro.cd) {
    payload.cd_konsistensi_visual = formData.evaluasiBiro.cd.question_0;
    payload.cd_kesesuaian_brief = formData.evaluasiBiro.cd.question_1;
    payload.cd_estetika = formData.evaluasiBiro.cd.question_2;
    payload.cd_kecepatan_revisi = formData.evaluasiBiro.cd.question_3;
  }

  // Evaluasi Biro SMS (Social Media Strategist)
  if (formData.evaluasiBiro.sms) {
    payload.sms_strategi_konten = formData.evaluasiBiro.sms.question_0;
    payload.sms_audien = formData.evaluasiBiro.sms.question_1;
    payload.sms_caption = formData.evaluasiBiro.sms.question_2;
    payload.sms_analitik = formData.evaluasiBiro.sms.question_3;
  }

  // Evaluasi Biro MedPro (Media Production)
  if (formData.evaluasiBiro.medpro) {
    payload.mp_kualitas_produksi = formData.evaluasiBiro.medpro.question_0;
    payload.mp_konsep = formData.evaluasiBiro.medpro.question_1;
    payload.mp_inovasi = formData.evaluasiBiro.medpro.question_2;
    payload.mp_dokumentasi = formData.evaluasiBiro.medpro.question_3;
  }

  // Evaluasi Biro ITDev (IT Development)
  if (formData.evaluasiBiro.itdev) {
    payload.it_stabilitas = formData.evaluasiBiro.itdev.question_0;
    payload.it_teknis = formData.evaluasiBiro.itdev.question_1;
    payload.it_keamanan = formData.evaluasiBiro.itdev.question_2;
    payload.it_ux = formData.evaluasiBiro.itdev.question_3;
  }

  return payload;
}

/**
 * Submit evaluasi CMI data to backend
 */
async function submitEvaluasiCMI(
  formData: EvaluasiCMIFormData
): Promise<EvaluasiCMIResponse> {
  // Transform form data to backend payload format
  const payload = transformToBackendPayload(formData);

  const response = await api.post('/evaluasi-cmi/submit', payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  return response.data as EvaluasiCMIResponse;
}

/**
 * Hook to submit Evaluasi CMI form
 * @param options - Optional callbacks for success and error handling
 * @returns Mutation hook for submitting evaluasi CMI
 */
export function useSubmitEvaluasiCMI(options?: {
  onSuccess?: (data: EvaluasiCMIResponse) => void;
  onError?: (err: Error) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<EvaluasiCMIResponse, Error, EvaluasiCMIFormData>({
    mutationFn: async (formData) => {
      return submitEvaluasiCMI(formData);
    },
    onSuccess: (data, _variables, _context) => {
      // Invalidate any relevant queries if needed
      queryClient.invalidateQueries({ queryKey: ['evaluasi-cmi', 'list'] });
      
      // Call optional success handler
      options?.onSuccess?.(data);
    },
    onError: (err, _variables, _context) => {
      // Call optional error handler
      options?.onError?.(err as Error);
    },
  });
}

/**
 * Type for the hook return value
 */
export type UseSubmitEvaluasiCMIResult = ReturnType<
  typeof useSubmitEvaluasiCMI
>;
