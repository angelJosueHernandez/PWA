import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../Components/Contexts/AuthContexts';
import { DefaultSkeleton } from '../Pages/Servicios/DefaultSkeleton';

const ProtectorRutas = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  console.log(isAuthenticated);
  if (loading) {
    // Puedes mostrar un componente de carga aquí si es necesario
    return <DefaultSkeleton />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/Iniciar Sesion" />;
  }

  return children ? children : <Outlet />;
};

export default ProtectorRutas;
