import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import React from 'react';
import Form from './Form';
import { AuthProvider } from '../Contexts/AuthContexts';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

describe('Pruebas del Componente Form', () => {
  const mockSetCorreoGuardar = vi.fn();
  
  const authContextValue = {
    setCorreoGuardar: mockSetCorreoGuardar,
  };
  
  function renderForm() {
    return render(
      <MemoryRouter>
        <AuthProvider value={authContextValue}>
          <Form />
        </AuthProvider>
      </MemoryRouter>
    );
  }

  it('debería mostrar el título del formulario', () => {
    renderForm();
    expect(screen.getByText(/Inicio de Sesión/i)).toBeInTheDocument();
  });

  it('debería mostrar un error si el correo está vacío después de 3 clics', async () => {
    renderForm();
    
    const form = screen.getByRole('form');
    
    // Simula tres envíos del formulario
    await act(async () => {
      for (let i = 0; i < 3; i++) {
        fireEvent.submit(form);
      }
    });

    // Aumenta el timeout y agrega un mensaje de error personalizado
    await waitFor(() => {
      const errorContainer = screen.getByTestId('error-container');
      expect(errorContainer).toHaveTextContent('No puede estar vacío');
    }, {
      timeout: 2000,
      interval: 100
    });
  });

  it('debería mostrar un error si el correo es inválido después de 3 clics', async () => {
    renderForm();
    
    const emailInput = screen.getByLabelText(/Correo/i);
    const form = screen.getByRole('form');

    await act(async () => {
      fireEvent.change(emailInput, {
        target: { value: 'invalid-email' }
      });
    });

    // Simula tres envíos del formulario
    await act(async () => {
      for (let i = 0; i < 3; i++) {
        fireEvent.submit(form);
      }
    });

    // Aumenta el timeout y agrega un mensaje de error personalizado
    await waitFor(() => {
      const errorContainer = screen.getByTestId('error-container');
      expect(errorContainer).toHaveTextContent('Correo electrónico no válido');
    }, {
      timeout: 2000,
      interval: 100
    });
  });

  it('no debería mostrar un error si el correo es válido', async () => {
    renderForm();
    
    const emailInput = screen.getByLabelText(/Correo/i);
    const form = screen.getByRole('form');

    await act(async () => {
      fireEvent.change(emailInput, {
        target: { value: 'test@example.com' }
      });
      fireEvent.submit(form);
    });

    await waitFor(() => {
      const errorContainer = screen.getByTestId('error-container');
      expect(errorContainer).not.toHaveTextContent(/Correo electrónico no válido/i);
    }, {
      timeout: 2000,
      interval: 100
    });
  });
});