/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/yt',
        destination: '/guide?utm_source=youtube&utm_medium=short&utm_campaign=hook1',
        permanent: true,
      },
      {
        source: '/li',
        destination: '/guide?utm_source=linkedin&utm_medium=social&utm_campaign=posts',
        permanent: true,
      },
      {
        source: '/fb',
        destination: '/guide?utm_source=facebook&utm_medium=social&utm_campaign=posts',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
