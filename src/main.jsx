import React from 'react'
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App'
import { AuthProvider } from './Components/Contexts/AuthContexts.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <AuthProvider>
  <App />
</AuthProvider>,
);
