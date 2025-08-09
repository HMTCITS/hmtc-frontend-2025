/**
 * Cookie helpers
 * -------------------------------------------------------
 * Token auth dikelola oleh server (HttpOnly cookies).
 * Frontend TIDAK menyimpan/memodifikasi token secara manual.
 * Sediakan helper logout untuk memicu penghapusan cookie di server.
 */

import type { AxiosInstance } from 'axios';

import apiDefault from './api/api';

/**
 * Meminta server menghapus sesi (access/refresh cookies).
 * Pemanggilan ini harus menggunakan instance API yang withCredentials: true.
 */
export async function logout(api: AxiosInstance = apiDefault): Promise<void> {
  await api.post('/auth/logout');
}

/**
 * (Opsional) Helper untuk cookie non-sensitif (tema, locale, dsb) bisa ditambahkan di sini,
 * tapi JANGAN menyentuh cookie auth HttpOnly.
 */
type SameSite = 'Lax' | 'Strict' | 'None';

export type CookieOptions = {
  path?: string; // default '/'
  domain?: string;
  /** Detik; lebih direkomendasikan ketimbang expires untuk kemudahan */
  maxAge?: number;
  /** Jika disediakan, abaikan maxAge */
  expires?: Date;
  secure?: boolean; // default false; gunakan true jika SameSite=None
  sameSite?: SameSite; // default 'Lax'
};

const isBrowser = () =>
  typeof window !== 'undefined' && typeof document !== 'undefined';

const DEFAULT_OPTS: Required<Pick<CookieOptions, 'path' | 'sameSite'>> = {
  path: '/',
  sameSite: 'Lax',
};

/**
 * Set non-sensitive cookie (client-side only). Return true jika sukses (di browser), false di SSR.
 */
export function setCookie(
  name: string,
  value: string,
  opts: CookieOptions = {},
): boolean {
  if (!isBrowser()) return false;
  const opt = { ...DEFAULT_OPTS, ...opts };
  const parts = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    `Path=${opt.path}`,
  ];

  if (opt.domain) parts.push(`Domain=${opt.domain}`);
  if (opt.expires instanceof Date) {
    parts.push(`Expires=${opt.expires.toUTCString()}`);
  } else if (typeof opt.maxAge === 'number') {
    parts.push(`Max-Age=${Math.max(0, Math.floor(opt.maxAge))}`);
  }
  if (opt.sameSite) parts.push(`SameSite=${opt.sameSite}`);
  if (opt.secure) parts.push('Secure');

  document.cookie = parts.join('; ');
  return true;
}

/** Ambil nilai cookie tertentu (client-side only). */
export function getCookie(name: string): string | undefined {
  if (!isBrowser()) return undefined;
  const target = `${encodeURIComponent(name)}=`;
  const cookies = document.cookie ? document.cookie.split(/;\s*/) : [];
  for (const c of cookies) {
    if (c.startsWith(target)) {
      return decodeURIComponent(c.slice(target.length));
    }
  }
  return undefined;
}

/** Hapus cookie dengan mengatur Max-Age=0 (client-side only). */
export function deleteCookie(name: string, opts: CookieOptions = {}): boolean {
  if (!isBrowser()) return false;
  const { path = '/', domain, sameSite = 'Lax', secure } = opts;
  const parts = [
    `${encodeURIComponent(name)}=`,
    'Max-Age=0',
    `Path=${path}`,
    `SameSite=${sameSite}`,
  ];
  if (domain) parts.push(`Domain=${domain}`);
  if (secure) parts.push('Secure');
  document.cookie = parts.join('; ');
  return true;
}

// Convenience helpers (tema & locale) — NON AUTH
export function setThemeCookie(theme: string, days = 365) {
  const maxAge = Math.floor(days * 24 * 60 * 60);
  return setCookie('theme', theme, { maxAge, path: '/', sameSite: 'Lax' });
}

export function getThemeCookie(): string | undefined {
  return getCookie('theme');
}

export function setLocaleCookie(locale: string, days = 365) {
  const maxAge = Math.floor(days * 24 * 60 * 60);
  return setCookie('locale', locale, { maxAge, path: '/', sameSite: 'Lax' });
}

export function getLocaleCookie(): string | undefined {
  return getCookie('locale');
}
