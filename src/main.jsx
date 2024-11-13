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
  integrations: []
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
