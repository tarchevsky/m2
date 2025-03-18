/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm2.headlessbox.ru',
      },
    ],
  },
  // Оптимизация для ISR
  optimizeFonts: true,
  // Установка политики для ISR кеширования
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=60, s-maxage=3600, stale-while-revalidate=3600',
          },
        ],
      },
    ]
  },
}

export default nextConfig
