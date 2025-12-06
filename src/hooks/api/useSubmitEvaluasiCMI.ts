'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api/api';

/**
 * Payload structure for Evaluasi CMI form submission
 * Based on evaluasiCMI.ts content structure
 */
export type EvaluasiCMIPayload = {
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
 * API response structure
 */
type EvaluasiCMIResponse = {
  data: any;
  message: string;
  success: boolean;
};

/**
 * Submit evaluasi CMI data to backend
 */
async function submitEvaluasiCMI(
  payload: EvaluasiCMIPayload
): Promise<EvaluasiCMIResponse> {
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

  return useMutation<EvaluasiCMIResponse, Error, EvaluasiCMIPayload>({
    mutationFn: async (payload) => {
      return submitEvaluasiCMI(payload);
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
