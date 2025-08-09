/**
 * API Utilities
 * -------------------------------------------------------
 * - Normalisasi pesan error API → single string
 * - Builder payload POST/PUT/PATCH:
 *   default JSON, opsi form-urlencoded bila dibutuhkan
 */

import type { AxiosError } from 'axios';

export interface ApiErrorPayload {
  status?: boolean;
  message?: string | string[] | Record<string, unknown>;
  error?: unknown;
  [key: string]: unknown;
}

/**
 * Normalisasi pesan error API menjadi string tunggal yang konsisten.
 */
export function transformApiError<T = ApiErrorPayload>(
  error: AxiosError<T>,
): AxiosError<T> {
  const response = error.response as any;
  const data = response?.data as ApiErrorPayload | undefined;

  if (data && data.message !== undefined) {
    let refined = '';

    if (typeof data.message === 'string') {
      refined = data.message;
    } else if (Array.isArray(data.message)) {
      refined = data.message[0];
    } else if (typeof data.message === 'object' && data.message !== null) {
      const key = Object.keys(data.message)[0];
      const val = key
        ? (data.message as Record<string, unknown>)[key]
        : undefined;
      refined =
        Array.isArray(val) && val.length > 0
          ? String(val[0])
          : JSON.stringify(data.message);
    }

    response.data = { ...data, message: refined };
  }

  return error;
}

/**
 * Daftar endpoint yang membutuhkan application/x-www-form-urlencoded.
 * Default kosong karena /auth/login menerima JSON (sesuai konfirmasi).
 * Tambahkan bila ada endpoint lain yang wajib form.
 */
let FORM_URLENCODED_ENDPOINTS = new Set<string>([]);

/**
 * Konfigurasi ulang whitelist endpoint form-urlencoded.
 */
export function setFormUrlEncodedEndpoints(paths: string[]) {
  FORM_URLENCODED_ENDPOINTS = new Set(paths.map(normalizePath));
}

function normalizePath(url: string): string {
  try {
    // Hilangkan baseURL & query → fokus ke pathname saja
    const u = new URL(url, 'http://_'); // base dummy agar URL valid
    return u.pathname.replace(/\/+$/, '') || '/';
  } catch {
    // Fallback: buang query manual
    return url.split('?')[0].replace(/\/+$/, '') || '/';
  }
}

export function isFormUrlEncoded(path: string): boolean {
  return FORM_URLENCODED_ENDPOINTS.has(normalizePath(path));
}

export type BuiltPayload = {
  data: any;
  headers: Record<string, string>;
};

/**
 * Builder payload & header Content-Type.
 * - JSON: application/json
 * - Form URL Encoded: application/x-www-form-urlencoded
 * - Multipart/FormData: jika data instanceof FormData → biarkan axios yang set boundary (jangan override)
 */
export function buildPayload(endpoint: string, data?: any): BuiltPayload {
  // Deteksi multipart FormData (browser) / form-data (node)
  const isFormData =
    typeof FormData !== 'undefined' && data instanceof FormData;

  if (isFormData) {
    return { data, headers: {} }; // Axios akan set Content-Type dengan boundary
  }

  if (isFormUrlEncoded(endpoint)) {
    const params = new URLSearchParams();
    Object.entries(data ?? {}).forEach(([k, v]) =>
      params.append(k, String(v ?? '')),
    );
    return {
      data: params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };
  }

  // Default: JSON
  return { data, headers: { 'Content-Type': 'application/json' } };
}
