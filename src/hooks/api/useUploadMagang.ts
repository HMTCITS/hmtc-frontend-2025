'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api/api';

import { useIsScheduleActive } from './useIsScheduleActive';

type UploadPayload = {
  nama: string;
  nrp: string;
  kelompokKP: string;
  umum: { q1: string; q2: string; q3: string };
  selectedDivisions: string[]; // ordered
  divisionAnswers: Record<
    string,
    { q1: string; q2: string; q3: string; q4: string; q5: string }
  >;
  zipFile: File;
};

type UploadResponse = {
  data: any;
  fileUrl: string | null;
  message: string;
};

async function submitUploadUsingApi(payload: UploadPayload) {
  const fd = new FormData();
  fd.append('nama', payload.nama);
  fd.append('nrp', payload.nrp);
  fd.append('kelompok_kp', payload.kelompokKP);
  fd.append('pertanyaan_umum[q1]', payload.umum.q1);
  fd.append('pertanyaan_umum[q2]', payload.umum.q2);
  fd.append('pertanyaan_umum[q3]', payload.umum.q3);
  for (const d of payload.selectedDivisions) {
    fd.append('divisi_dipilih', d);
  }
  for (const divId of payload.selectedDivisions) {
    const ans = payload.divisionAnswers[divId];
    if (!ans) continue;
    fd.append(`pertanyaan_divisi[${divId}][q1]`, ans.q1);
    fd.append(`pertanyaan_divisi[${divId}][q2]`, ans.q2);
    fd.append(`pertanyaan_divisi[${divId}][q3]`, ans.q3);
    fd.append(`pertanyaan_divisi[${divId}][q4]`, ans.q4);
    fd.append(`pertanyaan_divisi[${divId}][q5]`, ans.q5);
  }
  fd.append('file_zip', payload.zipFile);

  // Use axios instance so interceptors and baseURL apply
  const res = await api.post('/magang/upload', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data as UploadResponse;
}

export function useUploadMagang(options?: {
  onSuccess?: (data: UploadResponse) => void;
  onError?: (err: Error) => void;
}) {
  const queryClient = useQueryClient();
  const schedule = useIsScheduleActive();

  return useMutation<UploadResponse, Error, UploadPayload>({
    mutationFn: async (payload) => {
      // ensure schedule is active client-side
      if (schedule.isLoading) {
        // wait for the query to finish
        await schedule.refetch();
      }
      if (!schedule.data) {
        throw new Error('Pendaftaran belum dibuka saat ini.');
      }
      return submitUploadUsingApi(payload);
    },
    onSuccess: (data, _variables, _context) => {
      // invalidate any relevant queries if needed
      queryClient.invalidateQueries({ queryKey: ['magang', 'list'] });
      options?.onSuccess?.(data);
    },
    onError: (err, _variables, _context) => {
      // bubble error to optional handler
      options?.onError?.(err as Error);
    },
  });
}
