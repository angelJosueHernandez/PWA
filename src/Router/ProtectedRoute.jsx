
/**
 * import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../Components/Contexts/AuthContexts';
import { message } from 'antd';

const ProtectorRutas = ({user, children}) => {
    
    if(user == false){
        return <Navigate to='/Login' />
    }
    return children ? children: <Outlet/>
};

export default ProtectorRutas;

/** */

import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../Components/Contexts/AuthContexts';
import { DefaultSkeleton } from '../Pages/Servicios/DefaultSkeleton';

const ProtectorRutas = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Puedes mostrar un componente de carga aquí si es necesario
    return <DefaultSkeleton/>;
  }

  if (!isAuthenticated) {
    return <Navigate to='/Iniciar Sesion' />;
  }

  return children ? children : <Outlet />;
};

export default ProtectorRutas;
