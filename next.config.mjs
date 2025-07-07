/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de imágenes
  /* images: {
    unoptimized: true
  }, */

  // Headers para controlar caché de forma selectiva
  async headers() {
    return [
      {
        // Solo aplicar anti-caché a rutas de API y datos dinámicos
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
      {
        // Para páginas estáticas, permitir caché pero con revalidación
        source: "/((?!api).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
