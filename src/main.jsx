import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './Components/Contexts/AuthContexts.jsx';
import { Analytics } from '@vercel/analytics/react';

// Importación de Sentry
import * as Sentry from '@sentry/react';

// Inicializar Sentry (sin BrowserTracing)
Sentry.init({
  dsn: "https://de44698c686a7cec475ca59fc575bb7b@o4508289853947904.ingest.us.sentry.io/4508301081116672",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
  ],
   // Tracing
   tracesSampleRate: 1.0, //  Capture 100% of the transactions
   // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled

   tracePropagationTargets: [
    /^https:\/\/pwa-alpha-blue\.vercel\.app/, // Rastrear tu PWA
    /^https:\/\/api-beta-mocha-59\.vercel\.app/ // Rastrear tu API (opcional)
  ],
   profilesSampleRate: 1.0, 
   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
 });
 
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <AuthProvider>
    <App />
    <Analytics />
  </AuthProvider>,
);

// Registrar el Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch((error) => {
        console.error('Error al registrar el Service Worker:', error);
      });
  });
}
