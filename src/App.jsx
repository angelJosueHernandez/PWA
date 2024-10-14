import './App.css';
import React, { useState, useEffect } from 'react';
import Router from './Router/Router';
import SplashScreen from '../src/Components/SplashScreen/SplashScreen';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';



export default function App() {
  const [showSplash, setShowSplash] = useState(false); // Estado para controlar el SplashScreen
  const [startPageAnimation, setStartPageAnimation] = useState(false); // Estado para controlar la animación de la página

  useEffect(() => {
    // Verificar si la página fue recargada
    const isPageReloaded = window.performance.getEntriesByType("navigation")[0].type === "reload";

    // Solo mostrar el SplashScreen si la página fue recargada o es la primera vez que se visita
    if (isPageReloaded || !sessionStorage.getItem('splashShown')) {
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false); // Ocultar el SplashScreen después de 7.5 segundos
        setStartPageAnimation(true); // Iniciar la animación de la página principal
        sessionStorage.setItem('splashShown', 'true'); // Guardar que el SplashScreen ya se mostró
      }, 7500);

      return () => clearTimeout(timer); // Limpiar el temporizador cuando el componente se desmonte
    } else {
      setStartPageAnimation(true); // Iniciar la animación si no hay splash que mostrar
    }
  }, []);

  return (
    <>
      {showSplash ? (
        <SplashScreen /> // Mostrar el SplashScreen
      ) : (
        <div className={`main-content ${startPageAnimation ? 'fade-in' : ''}`}>
  
          <Router /> {/* Mostrar el contenido de la aplicación */}
        </div>
      )}
    </>
  );
}
