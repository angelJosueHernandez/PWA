import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: "Mi Aplicación de Emergencia",
        short_name: "Emergencia",
        description: "Aplicación de emergencia para situaciones críticas.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/vite.svg",
            sizes: "any",
            type: "image/svg+xml"
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000,
        runtimeCaching: [
          {
            urlPattern: /.*/, // Cachear todos los recursos
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'all-resources-cache',
            },
          },
        ],
      },
    }),
  ],
});
