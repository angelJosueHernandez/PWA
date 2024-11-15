import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cookies.css';
import cookieimg from './cookie.png';

function CookieBanner({ onAccept }) {
  const [hidden, setHidden] = useState(false);

  const handleAcceptClick = () => {
    setHidden(true);
    localStorage.setItem('cookiesAccepted', 'true'); // Guardar aceptación
    setTimeout(() => {
      onAccept();
    }, 2000);
  };
  
  // Verificar si ya fue aceptado
  useEffect(() => {
    if (localStorage.getItem('cookiesAccepted')) {
      setHidden(true); // Ocultar el banner si ya se aceptaron las cookies
    }
  }, []);
  

  return (
    <div className={`cookie-banner-container ${hidden ? 'hide' : ''}`}>
      <h3 className="title">Cookies</h3>
      <p className="cookie-info">
        Este sitio web utiliza cookies para garantizar que obtengas la mejor
        experiencia en nuestro sitio web. Para obtener más información sobre
        cómo utilizamos las cookies, consulta nuestra política de cookies.
      </p>
      <span  className="confirm-button" onClick={handleAcceptClick}>
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
