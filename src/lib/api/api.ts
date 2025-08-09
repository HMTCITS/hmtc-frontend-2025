/**
 * API Factory (SSR & Client)
 * -------------------------------------------------------
 * - Cookie HttpOnly sebagai sumber auth (access & refresh)
 * - withCredentials: true
 * - SSR lanjutan: ctx.req.headers.cookie diteruskan ke API
 * - Interceptors dipasang via applyInterceptors
 *
 * Catatan:
 * - Gunakan createApi({ ctx }) di GSSP/GIP.
 * - Gunakan createApi() (tanpa ctx) di client.
 */

import * as Sentry from '@sentry/nextjs';
import axios, { AxiosInstance } from 'axios';
import type { GetServerSidePropsContext } from 'next/types';

import { applyInterceptors } from '../api.interceptors';

export const baseURL =
  process.env.NEXT_PUBLIC_RUN_MODE === 'development'
    ? process.env.NEXT_PUBLIC_API_URL_DEV
    : process.env.NEXT_PUBLIC_API_URL_PROD;

export type CreateApiOptions = {
  /**
   * Next.js SSR context. Jika disediakan:
   * - Cookie dari req akan diteruskan ke API (auth SSR).
   * - Hasil refresh token akan mem-forward Set-Cookie ke res.
   */
  ctx?: GetServerSidePropsContext;
  /**
   * Handler saat user unauthorized setelah refresh gagal / retry habis.
   * Client: arahkan ke /login dengan router.
   * SSR: kembalikan redirect dari GSSP (tangani di layer pemanggil).
   */
  onUnauthorized?: () => void;
};

export function createApi(opts?: CreateApiOptions): AxiosInstance {
  const instance = axios.create({
    baseURL,
    withCredentials: true, // penting untuk cookie-based auth
    headers: { Accept: 'application/json' },
  });

  // SSR: teruskan cookie dari incoming request agar status login terbawa
  if (typeof window === 'undefined' && opts?.ctx?.req?.headers?.cookie) {
    instance.defaults.headers.Cookie = opts.ctx.req.headers.cookie;
  }

  try {
    applyInterceptors(instance, {
      ctx: opts?.ctx,
      onUnauthorized:
        opts?.onUnauthorized ??
        (() => {
          // fallback aman (client)
          if (typeof window !== 'undefined') {
            window.location.assign('/login');
          }
        }),
    });
  } catch (e) {
    // Jangan memblokir pembuatan instance bila interceptor gagal dipasang
    Sentry.captureException(e);
  }

  return instance;
}

/**
 * Client-default API:
 * - Gunakan HANYA di client component / hooks.
 * - Untuk SSR gunakan createApi({ ctx }).
 */
export const api = createApi();

export default api;
