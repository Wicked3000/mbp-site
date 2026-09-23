/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },
  rewrites: async () => [
    { source: '/', destination: '/site.html' },
    { source: '/home', destination: '/site.html' },
    { source: '/about', destination: '/site.html' },
    { source: '/basic', destination: '/site.html' },
    { source: '/post', destination: '/site.html' },
    { source: '/vet', destination: '/site.html' },
    { source: '/fode', destination: '/site.html' },
    { source: '/news', destination: '/site.html' },
    { source: '/news/:id', destination: '/site.html' },
    { source: '/contact', destination: '/site.html' },
    { source: '/policy', destination: '/site.html' },
    { source: '/calendar', destination: '/site.html' },
    { source: '/jobs', destination: '/site.html' },
    { source: '/exams', destination: '/site.html' },
    { source: '/parents', destination: '/site.html' },
    { source: '/elearning', destination: '/site.html' },
  ],
};

export default nextConfig;
