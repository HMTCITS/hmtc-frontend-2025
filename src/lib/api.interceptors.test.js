/* eslint-disable no-undef */
// Mock dependencies sebelum import
jest.mock('react-hot-toast', () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

jest.mock('@sentry/nextjs', () => ({
  captureException: jest.fn(),
}));

jest.mock('./cookies', () => ({
  getToken: jest.fn(),
  setToken: jest.fn(),
  getRefreshToken: jest.fn(),
}));

jest.mock('./api.utils', () => ({
  transformApiError: jest.fn((error) => error),
}));

jest.mock('universal-cookie', () => {
  return jest.fn().mockImplementation((cookieString) => {
    return {
      get: jest.fn((key) => {
        if (cookieString && cookieString.includes(`${key}=`)) {
          const match = cookieString.match(new RegExp(`${key}=([^;]+)`));
          return match ? match[1] : undefined;
        }
        return undefined;
      }),
    };
  });
});

// Import setelah mock
import * as mockSentry from '@sentry/nextjs';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { redirect as mockRedirect } from 'next/navigation';
import { toast as mockToast } from 'react-hot-toast';

import { applyInterceptors } from './api.interceptors';
import * as mockCookies from './cookies';

describe('API Interceptors', () => {
  let instance;
  let mock;

  beforeEach(() => {
    // Reset semua mock
    jest.clearAllMocks();

    // Reset mock cookies functions
    mockCookies.getToken.mockReset();
    mockCookies.setToken.mockReset();
    mockCookies.getRefreshToken.mockReset();

    // Reset mock toast dan redirect
    mockToast.error.mockReset();
    mockRedirect.mockReset();
    mockSentry.captureException.mockReset();

    // Buat instance axios baru untuk setiap test
    instance = axios.create();
    mock = new MockAdapter(instance);

    // Reset environment
    delete process.env.NODE_ENV;
  });

  afterEach(() => {
    mock.restore();
  });

  describe('SSR Context Handling', () => {
    test('should handle SSR API calls with context (server-side)', () => {
      const mockCtx = {
        req: {
          headers: {
            cookie: '@HMTCTOKEN=server-side-token',
          },
        },
      };

      // Apply interceptors dengan context SSR
      applyInterceptors(instance, mockCtx);

      expect(instance.interceptors.request.handlers).toHaveLength(1);
      expect(instance.interceptors.response.handlers).toHaveLength(1);

      const config = { headers: {} };
      const requestHandler =
        instance.interceptors.request.handlers[0].fulfilled;

      expect(() => {
        requestHandler(config);
      }).not.toThrow();
    });

    test('should handle SSR API calls without context (client-side)', () => {
      // Setup: Mock client-side token
      mockCookies.getToken.mockReturnValue('client-side-token');

      // Apply interceptors tanpa context (client-side)
      applyInterceptors(instance);

      const config = { headers: {} };
      const requestHandler =
        instance.interceptors.request.handlers[0].fulfilled;

      const result = requestHandler(config);

      // Verifikasi: Token diambil dari cookies client
      expect(mockCookies.getToken).toHaveBeenCalled();
      expect(result.headers.Authorization).toBe('Bearer client-side-token');
    });

    test('should handle missing token in both SSR and client-side', () => {
      // Reset mock
      jest.clearAllMocks();

      // Test 1: SSR tanpa token
      const mockCtxNoToken = {
        req: {
          headers: {},
        },
      };

      // Mock window sebagai undefined (server-side) sebelum apply interceptors
      const originalWindow = global.window;
      delete global.window;

      applyInterceptors(instance, mockCtxNoToken);
      const config1 = { headers: {} };
      const requestHandler1 =
        instance.interceptors.request.handlers[0].fulfilled;
      const result1 = requestHandler1(config1);

      expect(result1.headers.Authorization).toBeUndefined();

      // Restore window
      global.window = originalWindow;

      // Reset instance untuk test kedua
      instance = axios.create();
      mock = new MockAdapter(instance);

      // Test 2: Client-side tanpa token
      mockCookies.getToken.mockReturnValue(undefined);

      applyInterceptors(instance);
      const config2 = { headers: {} };
      const requestHandler2 =
        instance.interceptors.request.handlers[0].fulfilled;
      const result2 = requestHandler2(config2);

      expect(result2.headers.Authorization).toBeUndefined();
    });
  });

  describe('Refresh Token Logic', () => {
    test('should refresh token and retry request on 401', async () => {
      // Setup: Mock client-side
      mockCookies.getToken.mockReturnValue('expired-token');
      mockCookies.getRefreshToken.mockReturnValue('valid-refresh-token');

      applyInterceptors(instance);

      // Mock responses
      mock.onGet('/profile').replyOnce(401); // Request pertama gagal
      mock.onPost('/auth/refresh').reply(200, { accessToken: 'new-token' }); // Refresh berhasil
      mock.onGet('/profile').replyOnce(200, { data: 'profile-data' }); // Retry berhasil

      // Execute request
      const response = await instance.get('/profile');

      // Verifikasi
      expect(response.status).toBe(200);
      expect(response.data).toEqual({ data: 'profile-data' });
      expect(mockCookies.setToken).toHaveBeenCalledWith('new-token');
      expect(mockRedirect).not.toHaveBeenCalled();
      expect(mockToast.error).not.toHaveBeenCalled();
    });

    test('should redirect to login when refresh token fails', async () => {
      // Setup
      mockCookies.getToken.mockReturnValue('expired-token');
      mockCookies.getRefreshToken.mockReturnValue('invalid-refresh-token');

      applyInterceptors(instance);

      // Mock responses
      mock.onGet('/profile').replyOnce(401); // Request pertama gagal
      mock.onPost('/auth/refresh').reply(403); // Refresh gagal

      // Execute request dan expect error
      await expect(instance.get('/profile')).rejects.toThrow();

      // Verifikasi
      expect(mockToast.error).toHaveBeenCalledWith(
        'Sesi Anda telah berakhir. Silakan login kembali.',
      );
      expect(mockRedirect).toHaveBeenCalledWith('/login');
      expect(mockCookies.setToken).not.toHaveBeenCalled();
    });

    test('should not retry refresh for /auth/refresh endpoint', async () => {
      // Setup
      applyInterceptors(instance);

      // Mock: /auth/refresh endpoint mengembalikan 401
      mock.onPost('/auth/refresh').reply(401);

      // Execute request dan expect error
      await expect(instance.post('/auth/refresh')).rejects.toThrow();

      // Verifikasi: Tidak ada retry, langsung error handling biasa
      expect(mockCookies.getRefreshToken).not.toHaveBeenCalled();
      expect(mockCookies.setToken).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    test('should show toast for 403 Forbidden error', async () => {
      applyInterceptors(instance);

      mock.onGet('/admin').reply(403);

      await expect(instance.get('/admin')).rejects.toThrow();

      expect(mockToast.error).toHaveBeenCalledWith('Akses ditolak.');
      expect(mockRedirect).not.toHaveBeenCalled();
    });

    test('should capture server errors to Sentry', async () => {
      applyInterceptors(instance);

      mock.onGet('/api/test').reply(500, { message: 'Internal Server Error' });

      await expect(instance.get('/api/test')).rejects.toThrow();

      expect(mockSentry.captureException).toHaveBeenCalled();
    });

    test('should not capture 401 errors to Sentry during normal refresh flow', async () => {
      // Setup untuk refresh flow normal
      mockCookies.getToken.mockReturnValue('expired-token');
      mockCookies.getRefreshToken.mockReturnValue('valid-refresh-token');

      applyInterceptors(instance);

      mock.onGet('/profile').replyOnce(401);
      mock.onPost('/auth/refresh').reply(200, { accessToken: 'new-token' });
      mock.onGet('/profile').replyOnce(200, { data: 'profile-data' });

      await instance.get('/profile');

      // Verifikasi: 401 tidak di-capture ke Sentry karena itu normal refresh flow
      expect(mockSentry.captureException).not.toHaveBeenCalled();
    });
  });

  describe('Comprehensive Error Handling', () => {
    test('should not display toast or redirect for 400 errors', async () => {
      // Reset mocks secara manual sebelum test
      jest.clearAllMocks();

      applyInterceptors(instance);
      mock.onGet('/test-400').reply(400, { error: 'Bad Request' });

      await expect(instance.get('/test-400')).rejects.toThrow();

      expect(mockToast.error).not.toHaveBeenCalled();
      expect(mockSentry.captureException).not.toHaveBeenCalled();
      expect(mockRedirect).not.toHaveBeenCalled();
    });

    test('should display toast for 403 errors without Sentry', async () => {
      // Reset mocks secara manual sebelum test
      jest.clearAllMocks();

      applyInterceptors(instance);
      mock.onGet('/test-403').reply(403, { error: 'Forbidden' });

      await expect(instance.get('/test-403')).rejects.toThrow();

      expect(mockToast.error).toHaveBeenCalledWith('Akses ditolak.');
      expect(mockSentry.captureException).not.toHaveBeenCalled();
      expect(mockRedirect).not.toHaveBeenCalled();
    });

    test('should capture 404 errors to Sentry without toast', async () => {
      // Reset mocks secara manual sebelum test
      jest.clearAllMocks();

      applyInterceptors(instance);
      mock.onGet('/test-404').reply(404, { error: 'Not Found' });

      await expect(instance.get('/test-404')).rejects.toThrow();

      expect(mockToast.error).not.toHaveBeenCalled();
      expect(mockSentry.captureException).toHaveBeenCalled();
      expect(mockRedirect).not.toHaveBeenCalled();
    });

    test('should capture 500 errors to Sentry without toast', async () => {
      // Reset mocks secara manual sebelum test
      jest.clearAllMocks();

      applyInterceptors(instance);
      mock.onGet('/test-500').reply(500, { error: 'Internal Server Error' });

      await expect(instance.get('/test-500')).rejects.toThrow();

      expect(mockToast.error).not.toHaveBeenCalled();
      expect(mockSentry.captureException).toHaveBeenCalled();
      expect(mockRedirect).not.toHaveBeenCalled();
    });

    test('should display toast and redirect for 401 errors without refresh token', async () => {
      // Reset mock implementation untuk memastikan clean state
      mockSentry.captureException.mockClear();

      // Pastikan tidak ada refresh token dan tidak ada retry
      mockCookies.getRefreshToken.mockReturnValue(undefined);

      applyInterceptors(instance);
      mock.onGet('/test-401').reply(401, { error: 'Unauthorized' });

      await expect(instance.get('/test-401')).rejects.toThrow();

      expect(mockToast.error).toHaveBeenCalledWith('Silakan login kembali.');
      expect(mockRedirect).toHaveBeenCalledWith('/login');

      // Untuk 401 tanpa refresh token yang masuk ke case 401, Sentry tidak seharusnya dipanggil
      // (sentry dipanggil untuk kasus default, bukan case 401)
      expect(mockSentry.captureException).not.toHaveBeenCalledWith(
        expect.objectContaining({
          response: expect.objectContaining({ status: 401 }),
        }),
      );
    });
  });
});
