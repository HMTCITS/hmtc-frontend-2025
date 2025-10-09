'use client';

import { useMutation } from '@tanstack/react-query';

import type { ApplyMagangPayload, ApplyMagangResponse } from '@/types/magang';

async function submitMagang(
  payload: ApplyMagangPayload,
): Promise<ApplyMagangResponse> {
  const fd = new FormData();
  fd.set('nama', payload.nama);
  fd.set('nrp', payload.nrp);
  fd.set('kelompokKP', payload.kelompokKP);
  if (payload.mindmap) fd.set('mindmap', payload.mindmap);

  const res = await fetch('/api/apply-magang', {
    method: 'POST',
    body: fd,
  });

  if (!res.ok) {
    let msg = 'Gagal mengirim data';
    try {
      const j = await res.json();
      msg = j?.error || msg;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
  return res.json();
}

export function useApplyMagang() {
  return useMutation<ApplyMagangResponse, Error, ApplyMagangPayload>({
    mutationFn: submitMagang,
  });
}
