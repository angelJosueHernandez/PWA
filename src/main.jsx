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
  dsn: "https://003a22cd1fff1364065ad7941094c945@o4508289853947904.ingest.us.sentry.io/4508290685075456",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
  ],
   // Tracing
   tracesSampleRate: 1.0, //  Capture 100% of the transactions
   // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
   tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
   // Set profilesSampleRate to 1.0 to profile every transaction.
   // Since profilesSampleRate is relative to tracesSampleRate,
   // the final profiling rate can be computed as tracesSampleRate * profilesSampleRate
   // For example, a tracesSampleRate of 0.5 and profilesSampleRate of 0.5 would
   // results in 25% of transactions being profiled (0.5*0.5=0.25)
   profilesSampleRate: 1.0,
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
