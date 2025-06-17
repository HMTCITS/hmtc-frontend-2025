import { api } from '@/lib/api';
import type { ApiResponse } from '@/types/api';

interface ValidateData {
  nrp: string;
}

export async function validateNrp(nrp: string): Promise<boolean> {
  if (!nrp) {
    return false;
  }

  try {
    const res = await api.get<ApiResponse<ValidateData>>('/auth/getuser', {
      params: { nrp },
    });

    return res.data.status || false;
  } catch {
    return false;
  }
}
