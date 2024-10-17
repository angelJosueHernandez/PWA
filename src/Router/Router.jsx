import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from '../Components/Contexts/AuthContexts';
import Home from '../Pages/Home';
import Login from '../Pages/User/Login/Login';
import Registrer from '../Pages/User/Registrer/Registrer';
import NotFound from '../Pages/NotFound/NotFound';
import Breadcrumbs from '../Components/Breadcrumbs/Breadcrumbs';
import Servicios from '../Pages/Servicios/Servicios';
import RecuperarContraseña from '../Components/Form/RecuperarContraseña';
import Token from '../Components/Form/Token';
import Restablece from '../Components/Form/Restablece';
import Terminos from '../Pages/Terminos y Politicas/Terminos';
import Politicas from '../Pages/Terminos y Politicas/Politicas';
import PoliCokkies from '../Pages/PoliticasCookies/PoliCokkies';
import Perfil from '../Pages/User/Perfil';
import DobleFactor from '../Components/Form/DobleFactor';
import Donaciones from '../Pages/Donaciones/Donaciones';
import Nav from '../Components/Nav/Nav';
import Footer from '../Components/Footer/Footer';
import './Router.css';
import { message } from 'antd';
import CookieBanner from '../Components/Cookies/Cookies';
import Citas from '../Pages/Citas/Citas';
import ContratacionAmbulancias from '../Pages/ContratacionAmbulancias/ContratacionAmbulancias';
import Contenido from '../Components/ChatBot/Contenido/Contenido';
import ProtectorRutas from './ProtectedRoute';
import AuthRoute from './AuthRoute'; // Importa el nuevo componente AuthRoute
import { DefaultSkeleton } from '../Pages/Servicios/DefaultSkeleton';
import Conocenos from '../Pages/Conocenos/Conocenos';
import ScrollToTop from '../Components/ScrollToTop/ScrollToTop';


export default function Router() {
  const { loading } = useAuth(); // Asegúrate de que la ruta del contexto sea correcta

  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookieBanner(false);
  };

  if (loading) {
    // Puedes mostrar un componente de carga global aquí si lo deseas
    return <div> <br /><br /><DefaultSkeleton/> </div>;
  }

  return (
    <BrowserRouter>
     <ScrollToTop />
      {showCookieBanner && <CookieBanner className="" onAccept={handleAcceptCookies} />}
      <Nav />
      <div className="mPan"><Breadcrumbs /></div>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="Servicios" element={<Servicios />} />
        <Route path="Recuperacion" element={<RecuperarContraseña />} />
        <Route path="Token" element={<Token />} />
        <Route path="Restablece" element={<Restablece />} />
        <Route path="Terminos" element={<Terminos />} />
        <Route path="Politicas" element={<Politicas />} />
        <Route path="Cookies" element={<PoliCokkies />} />
        <Route path="DobleFactor" element={<DobleFactor />} />
        <Route path="Citas" element={<Citas />} />
        <Route path="Donaciones" element={<Donaciones />} />
        <Route path="Conocenos" element={<Conocenos/>} />

        {/* Rutas protegidas */}
       
          <Route path="Perfil" element={<Perfil />} />
          <Route path="ContratacionAmbulancias" element={<ContratacionAmbulancias />} />
       

        {/* Rutas de autenticación */}
      
          <Route path="Iniciar Sesion" element={<Login />} />
          <Route path="Registro" element={<Registrer />} />
     

        {/* Ruta para cualquier otro caso */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Contenido />
      <Footer />
    </BrowserRouter>
  );
}
