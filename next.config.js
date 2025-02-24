/**
 * Next.js Production Configuration
 *
 * This configuration sets:
 * - Security Headers to improve security (CSP, HSTS, XSS Protection, etc.)
 * - React Strict Mode and SWC Minification for improved performance and development experience
 * - ESLint to run only on the 'src' directory
 * - Custom Webpack rules to optimize SVG imports:
 *    - Uses the default file loader for SVG files imported with query ?url
 *    - Converts other SVG imports into React components using @svgr/webpack
 *
 * Note: For improved security, consider using a nonce‑based approach for inline scripts.
 */

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'self';
  manifest-src 'self';
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
  // Disable the "X-Powered-By" header for security
  poweredByHeader: false,

  // Enable React Strict Mode to help identify potential issues
  reactStrictMode: true,

  // Enable SWC minification for performance (uncomment if desired)
  // swcMinify: true,

  // Run ESLint only on the 'src' directory
  eslint: {
    dirs: ['src'],
  },

  // Apply security headers to every route
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  // Custom Webpack configuration for optimized SVG imports
  webpack(config) {
    // Find the default file loader rule for SVG files
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test && rule.test.test('.svg'),
    );

    // Add custom rules:
    // 1. If a SVG is imported with ?url, use the default file loader
    // 2. Otherwise, transform SVGs into React components using @svgr/webpack
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // Handle *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: { not: /\.(css|scss|sass)$/ },
        resourceQuery: { not: /url/ }, // Ignore *.svg?url
        loader: '@svgr/webpack',
        options: {
          dimensions: false,
          titleProp: true,
        },
      },
    );

    // Modify the default file loader rule to ignore SVG files
    if (fileLoaderRule) {
      fileLoaderRule.exclude = fileLoaderRule.exclude
        ? [...fileLoaderRule.exclude, /\.svg$/i]
        : [/\.svg$/i];
    }

    return config;
  },
};

module.exports = nextConfig;
