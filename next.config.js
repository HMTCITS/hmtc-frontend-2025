/**
 * Next.js Production Configuration
 *
 * Konfigurasi ini mengatur:
 * - Security Headers untuk meningkatkan keamanan (CSP, HSTS, XSS Protection, dsb.)
 * - React Strict Mode dan SWC Minification untuk performa dan pengembangan yang lebih baik
 * - ESLint hanya pada direktori 'src'
 * - Custom Webpack untuk mengoptimalkan impor file SVG:
 *    - Menggunakan file loader default untuk file SVG yang diimpor dengan query ?url
 *    - Mengonversi file SVG lainnya menjadi komponen React menggunakan @svgr/webpack
 *
 * Catatan: Pastikan dependensi seperti @svgr/webpack sudah terinstal di proyek.
 */

const ContentSecurityPolicy = `
  default-src 'self';
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'self';
  manifest-src 'self';
  report-uri /api/report-csp-violation;
`;

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'no-referrer-when-downgrade',
  },
  {
    key: 'Permissions-Policy',
    value: 'accelerometer=(), camera=(), gyroscope=(), microphone=(), usb=()',
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, '').trim(),
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Nonaktifkan header "X-Powered-By"
  poweredByHeader: false,

  // Aktifkan React Strict Mode untuk mendeteksi potensi masalah
  reactStrictMode: true,

  // Aktifkan SWC minification untuk optimasi performa
  swcMinify: true,

  // Konfigurasi ESLint hanya pada direktori 'src'
  eslint: {
    dirs: ['src'],
  },

  // Menambahkan security headers pada setiap request
  async headers() {
    return [
      {
        // Terapkan headers ke seluruh route
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  // Konfigurasi custom Webpack untuk mengoptimalkan impor SVG
  webpack(config) {
    // Cari rule yang sudah ada untuk file SVG
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test && rule.test.test('.svg'),
    );

    // Tambahkan rule baru untuk SVG:
    // 1. Jika file SVG diimpor dengan query "?url", gunakan file loader default
    // 2. Untuk impor SVG lainnya, gunakan @svgr/webpack agar bisa diperlakukan sebagai komponen React
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // Menghandle file *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: { not: /\.(css|scss|sass)$/ },
        resourceQuery: { not: /url/ }, // Mengabaikan file *.svg?url
        loader: '@svgr/webpack',
        options: {
          dimensions: false,
          titleProp: true,
        },
      },
    );

    // Modifikasi rule file loader asli agar mengabaikan file SVG
    if (fileLoaderRule) {
      if (fileLoaderRule.exclude) {
        fileLoaderRule.exclude.push(/\.svg$/i);
      } else {
        fileLoaderRule.exclude = [/\.svg$/i];
      }
    }

    return config;
  },
};

module.exports = nextConfig;
