/**
 * API Interceptors
 * -------------------------------------------------------
 * - Response: Auto refresh (single-flight) + retry 1x
 * - SSR lanjutan: forward Set-Cookie dari refresh ke ctx.res
 * - Error mapping (401/403/400/others)
 * - Request: biarkan Content-Type diatur di layer pemanggil via buildPayload,
 *   namun aman jika sudah di-set manual (tidak di-override di sini).
 */

import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import type { GetServerSidePropsContext } from 'next/types';

import { transformApiError } from '@/lib/api/api.utils';

import { logout } from '../cookies';

// ----- Axios Config Augmentation: _retry flag -----
/* eslint-disable unused-imports/no-unused-vars */
declare module 'axios' {
  export interface InternalAxiosRequestConfig<D = any> {
    /** Internal flag: retry exactly once after refresh */
    _retry?: boolean;
  }
}
/* eslint-enable unused-imports/no-unused-vars */

type ApplyOpts = {
  ctx?: GetServerSidePropsContext;
  onUnauthorized?: () => void;
};

const REFRESH_PATH = '/auth/refresh';

function isRefreshEndpoint(url?: string) {
  return !!url && url.includes(REFRESH_PATH);
}

function mergeSetCookieHeader(
  ctx: GetServerSidePropsContext,
  newSetCookies: string[] | undefined,
) {
  if (!newSetCookies || newSetCookies.length === 0) return;
  const prev = ctx.res.getHeader('Set-Cookie');
  const merged = Array.isArray(prev)
    ? [...prev, ...newSetCookies]
    : prev
      ? [String(prev), ...newSetCookies]
      : newSetCookies;
  ctx.res.setHeader('Set-Cookie', merged);
}

export function applyInterceptors(instance: AxiosInstance, opts?: ApplyOpts) {
  const onUnauthorized =
    opts?.onUnauthorized ??
    (() => {
      if (typeof window !== 'undefined') window.location.assign('/login');
    });

  /**
   * Single-flight refresh state PER instance
   */
  let isRefreshing = false;
  let waiters: Array<() => void> = [];

  // Optional Request Interceptor (tidak memaksa header Authorization)
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Biarkan Content-Type yang sudah di-set di layer pemanggil (buildPayload)
      config.headers = config.headers ?? {};
      return config;
    },
    (err) => Promise.reject(err),
  );

  // Response Interceptor (refresh & error handling)
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      try {
        // Pastikan config request asal tersedia
        const original = error?.config as
          | InternalAxiosRequestConfig
          | undefined;
        const status = error?.response?.status;

        // 1) Non-401 → mapping standar
        if (status !== 401) {
          // 403 → No permission (UI tangani pesan)
          // 400 → Validasi (message sudah dinormalisasi oleh transformApiError di bawah)
          if (status && status >= 500) {
            dynamicCapture(error);
          }
          return Promise.reject(transformApiError(error));
        }

        // 2) Jika endpoint refresh sendiri → unauthorized final
        if (isRefreshEndpoint(original?.url)) {
          try {
            await logout(instance);
          } finally {
            onUnauthorized();
          }
          return Promise.reject(transformApiError(error));
        }

        // 2b) Jika original request config tidak ada → tidak bisa retry
        if (!original) {
          onUnauthorized();
          return Promise.reject(transformApiError(error));
        }

        // 3) Sudah pernah di-retry? → hentikan (hindari loop)
        if (original._retry) {
          try {
            await logout(instance);
          } finally {
            onUnauthorized();
          }
          return Promise.reject(transformApiError(error));
        }

        // 4) Jika sedang refresh → antre sampai selesai
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            waiters.push(async () => {
              try {
                original._retry = true;
                const res = await instance(original);
                resolve(res);
              } catch (e) {
                reject(transformApiError(e as any));
              }
            });
          });
        }

        // 5) Pemicu refresh
        original._retry = true;
        isRefreshing = true;

        try {
          // Cookie-based refresh; instance sudah withCredentials & SSR-cookie forwarded
          const refreshRes = await instance.post(REFRESH_PATH);

          // SSR lanjutan: forward Set-Cookie dari refresh ke browser
          if (typeof window === 'undefined' && opts?.ctx?.res) {
            const setCookies = (refreshRes.headers as any)?.['set-cookie'] as
              | string[]
              | undefined;
            mergeSetCookieHeader(opts.ctx, setCookies);
          }

          // Lepaskan antrean: masing-masing request retry 1x
          const queued = [...waiters];
          waiters = [];
          queued.forEach((run) => run());

          // Retry request pemicu (1x)
          return instance(original);
        } catch (refreshErr) {
          // Gagal refresh: kosongkan antrean & unauthorized
          const queued = [...waiters];
          waiters = [];
          queued.forEach((run) => {
            try {
              run();
            } catch {
              // no-op
            }
          });

          try {
            await logout(instance);
          } finally {
            onUnauthorized();
          }
          return Promise.reject(transformApiError(refreshErr as any));
        } finally {
          isRefreshing = false;
        }
      } catch (e) {
        dynamicCapture(e);
        return Promise.reject(error);
      }
    },
  );
}

// Dynamic capture to avoid bundling Node instrumentation into client chunks
function dynamicCapture(error: unknown) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('[capture]', error);
  }
}
