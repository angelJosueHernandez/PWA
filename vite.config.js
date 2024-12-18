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
        name: "Cruz Roja Huejutla",
        short_name: "Cruz Roja Huejutla",
        description: "Aplicación de emergencia Cruz Roja Huejutla.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/icon2.svg",
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
  test: {
    globals: true,
    environment: 'jsdom', // Define el entorno para pruebas de DOM
    setupFiles: './src/setupTests.js', // O .ts si usas TypeScript
    server: {
      deps: {
        inline: ['workbox-background-sync'] // Fuerza la inclusión de este paquete
      }
    },
    exclude: ['node_modules', 'dist'] // Excluye estas carpetas de las pruebas
  },
});
