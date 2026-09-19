/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  rewrites: async () => [
    {
      source: '/site.html',
      destination: '/site.html',
    },
    {
      source: '/:path*',
      destination: '/site.html',
      has: [
        {
          type: 'header',
          key: 'accept',
          value: 'text/html',
        },
      ],
    },
  ],
};

export default nextConfig;
