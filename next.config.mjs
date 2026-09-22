/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  rewrites: async () => [
    {
      source: '/',
      destination: '/site.html',
    },
    {
      source: '/:path*',
      destination: '/site.html',
    },
  ],
};

export default nextConfig;
