import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cookies.css';
import cookieimg from './cookie.png';

function CookieBanner({ onAccept }) {
  const [hidden, setHidden] = useState(false);

  const handleAcceptClick = () => {
    // Guardar aceptación de cookies en localStorage
    localStorage.setItem('cookiesAccepted', 'true');
    console.log("Cookies Aceptadas: ", localStorage.getItem('cookiesAccepted')); // Verificación
    setHidden(true); // Ocultar el banner
    setTimeout(() => {
      onAccept(); // Ejecutar callback después de 2 segundos
    }, 2000);
  };

  // Verificar si las cookies han sido aceptadas inmediatamente al cargar el componente
  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    console.log("Verificando cookies al cargar el componente:", cookiesAccepted); // Verificación
    if (cookiesAccepted === 'true') {
      setHidden(true); // Ocultar el banner si ya se aceptaron las cookies
    }

    // Si el valor cambia dinámicamente, verificar cada 5 segundos
    const intervalId = setInterval(() => {
      const cookiesAccepted = localStorage.getItem('cookiesAccepted');
      console.log("Intervalo - Verificando cookies:", cookiesAccepted); // Verificación
      if (cookiesAccepted === 'true') {
        setHidden(true); // Ocultar el banner
      } else {
        setHidden(false); // Mostrar el banner si no se aceptaron
      }
    }, 5000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []); // Este efecto solo se ejecuta una vez al montar el componente

  return (
    <div className={`cookie-banner-container ${hidden ? 'hide' : ''}`}>
      <h3 className="title">Cookies</h3>
      <p className="cookie-info">
        Este sitio web utiliza cookies para garantizar que obtengas la mejor
        experiencia en nuestro sitio web. Para obtener más información sobre
        cómo utilizamos las cookies, consulta nuestra política de cookies.
      </p>
      <span className="confirm-button" onClick={handleAcceptClick}>
        Aceptar
      </span>
      <span className="second-button">
        <Link className="second-button" to={'/Cookies'}>
          Consulta nuestra política de Cookies.
        </Link>
      </span>
    </div>
  );
}

export default CookieBanner;
