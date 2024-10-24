import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import React from 'react';
import Form from './Form';
import { AuthProvider } from '../Contexts/AuthContexts'; 
import { MemoryRouter } from 'react-router-dom'; 

describe('Pruebas del Componente Form', () => {
  const mockSetCorreoGuardar = vi.fn(); 

  const authContextValue = {
    setCorreoGuardar: mockSetCorreoGuardar,
  };

  it('debería mostrar el título del formulario', () => {
    render(
      <AuthProvider value={authContextValue}>
        <MemoryRouter>
          <Form />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(screen.getByText(/Inicio de Sesión/i)).toBeInTheDocument();
  });

  it('debería mostrar un error si el correo está vacío después de 3 clics', async () => {
    render(
      <AuthProvider value={authContextValue}>
        <MemoryRouter>
          <Form />
        </MemoryRouter>
      </AuthProvider>
    );

    // Simula tres clics en el botón sin llenar el correo
    await act(async () => {
      for (let i = 0; i < 3; i++) {
        fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));
      }
    });

    // Verifica que el mensaje de error aparece
    const errorMessage = await screen.findByText(/No puede estar vacío/i);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.closest('.erroresInicio')).toBeInTheDocument(); // Verifica que el mensaje esté en el contenedor correcto
  });

  it('debería mostrar un error si el correo es inválido después de 3 clics', async () => {
    render(
      <AuthProvider value={authContextValue}>
        <MemoryRouter>
          <Form />
        </MemoryRouter>
      </AuthProvider>
    );

    // Simula el cambio de valor en el input y luego tres clics
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Correo/i), {
        target: { value: 'invalid-email' }, // Correo inválido
      });
      for (let i = 0; i < 3; i++) {
        fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));
      }
    });

    // Verifica que el mensaje de error aparece
    const errorMessage = await screen.findByText(/Correo electrónico no válido/i);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.closest('.erroresInicio')).toBeInTheDocument(); // Verifica que el mensaje esté en el contenedor correcto
  });

  it('no debería mostrar un error si el correo es válido', async () => {
    render(
      <AuthProvider value={authContextValue}>
        <MemoryRouter>
          <Form />
        </MemoryRouter>
      </AuthProvider>
    );

    // Simula el cambio de valor en el input con un email válido
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Correo/i), {
        target: { value: 'test@example.com' }, // Correo válido
      });
      fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));
    });

    // Asegúrate de que no se muestra el mensaje de error
    await waitFor(() => {
      expect(screen.queryByText(/Correo electrónico no válido/i)).not.toBeInTheDocument();
    });
  });
});
