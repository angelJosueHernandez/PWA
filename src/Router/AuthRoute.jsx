import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../Components/Contexts/AuthContexts';

const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated == true) {
    return <Navigate to='/Perfil' />;
  }

  return children ? children : <Outlet />;
};

export default AuthRoute;
