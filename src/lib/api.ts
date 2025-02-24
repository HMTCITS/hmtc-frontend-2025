import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { GetServerSidePropsContext } from 'next/types';
import Cookies from 'universal-cookie';

import { getToken } from '@/lib/cookies';
import { UninterceptedApiError } from '@/types/api';

/**
 * Menentukan base URL API berdasarkan environment.
 */
export const baseURL =
  process.env.NEXT_PUBLIC_RUN_MODE === 'development'
    ? process.env.NEXT_PUBLIC_API_URL_DEV
    : process.env.NEXT_PUBLIC_API_URL_PROD;

/**
 * Instance Axios untuk melakukan request ke API.
 */
export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Pastikan dengan eksplisit bahwa withCredentials adalah false.
api.defaults.withCredentials = false;

/**
 * Variabel untuk menyimpan konteks server-side.
 */
let ssrContext: GetServerSidePropsContext | undefined;

/**
 * Mengatur konteks API (SSR) untuk pengambilan cookie pada sisi server.
 *
 * @param context - Konteks Next.js dari getServerSideProps atau sejenisnya.
 */
export function setApiContext(context: GetServerSidePropsContext) {
  ssrContext = context;
}

/**
 * Menentukan apakah kode berjalan di lingkungan browser.
 */
const isBrowser = typeof window !== 'undefined';

/**
 * Interceptor request untuk menambahkan header Authorization jika token tersedia.
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Pastikan headers selalu terdefinisi.
    config.headers = config.headers ?? {};

    let token: string | undefined;

    if (!isBrowser) {
      // Server-side: pastikan ssrContext telah diatur.
      if (!ssrContext || !ssrContext.req) {
        throw new Error(
          'API context not found. Please call setApiContext(context) in your server-side code before making API calls.',
        );
      }
      const cookies = new Cookies(ssrContext.req.headers.cookie);
      token = cookies.get('@HMTCTOKEN');
    } else {
      // Client-side: ambil token menggunakan helper getToken().
      token = getToken();
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * Interceptor response untuk merapikan pesan error yang diterima dari API.
 */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<UninterceptedApiError>) => {
    if (error.response?.data?.message) {
      let refinedMessage: string = '';
      const { message } = error.response.data;

      if (typeof message === 'string') {
        refinedMessage = message;
      } else if (Array.isArray(message)) {
        refinedMessage = message[0];
      } else if (typeof message === 'object') {
        const firstKey = Object.keys(message)[0];
        if (firstKey && Array.isArray(message[firstKey])) {
          refinedMessage = message[firstKey][0];
        } else {
          refinedMessage = JSON.stringify(message);
        }
      }
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: {
            ...error.response.data,
            message: refinedMessage,
          },
        },
      });
    }
    return Promise.reject(error);
  },
);

export default api;
