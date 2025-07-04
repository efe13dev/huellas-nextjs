/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para evitar caché en Vercel
  experimental: {
    // Deshabilitar caché estático para páginas dinámicas
    isrMemoryCacheSize: 0,
  },
  // Headers para controlar caché
  async headers() {
    return [
      {
        // Aplicar a todas las rutas
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
