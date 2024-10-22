import './App.css';
import React, { useState, useEffect } from 'react';
import Router from './Router/Router';
import SplashScreen from '../src/Components/SplashScreen/SplashScreen';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import { message } from 'antd';

export default function App() {
  const [showSplash, setShowSplash] = useState(false); // Estado para controlar el SplashScreen
  const [startPageAnimation, setStartPageAnimation] = useState(false); // Estado para controlar la animación de la página
  const [isOnline, setIsOnline] = useState(navigator.onLine); // Estado para la conexión a internet
  const [wasOffline, setWasOffline] = useState(false); // Estado para saber si estábamos offline previamente

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

  useEffect(() => {
    // Mostrar el mensaje de conexión
    const showMessage = (type, content) => {
      message[type]({
        content,
        duration: 2, // Duración del mensaje en segundos
        style: {
          marginTop: '10vh', // Ajuste opcional para la posición
        },
      });
    };

    // Función para verificar si hay conexión real a Internet
    const checkInternetConnection = async () => {
      try {
        // Realizar una solicitud pequeña a un recurso conocido
        const response = await fetch('https://www.google.com/favicon.ico', {
          method: 'HEAD',
          mode: 'no-cors'
        });
        if (wasOffline) {
          setIsOnline(true); // Si estábamos offline y la solicitud tiene éxito, hay conexión a Internet
          showMessage('success', '¡Estamos de nuevo online!');
          setWasOffline(false); // Resetear el estado de "offline"
        }
      } catch (error) {
        setIsOnline(false); // Si hay un error, no hay conexión a Internet
        setWasOffline(true); // Marcar que estuvimos offline
        showMessage('error', 'No hay conexión a Internet');
      }
    };

    // Evento para cuando la conexión se pierde
    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
      showMessage('error', 'No hay conexión a Internet');
    };

    // Evento para cuando la conexión se recupera (se ejecuta una verificación real)
    const handleOnline = () => {
      checkInternetConnection(); // Verificar si realmente hay conexión
    };

    // Añadir los listeners para online y offline
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Al montar, verificar si hay conexión real
    checkInternetConnection();

    // Limpiar los listeners al desmontar el componente
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [wasOffline]);

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
