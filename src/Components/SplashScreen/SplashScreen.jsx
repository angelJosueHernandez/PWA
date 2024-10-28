// src/components/SplashScreen.jsx
import React, { useEffect, useState } from 'react';
import './SplashScreen.css';
import logo from '../../assets/img/ser.png';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [startAnimation, setStartAnimation] = useState(false);
  const [startExitAnimation, setStartExitAnimation] = useState(false);
  const [progress, setProgress] = useState(0); // Progreso para la barra o el spinner
  const [message, setMessage] = useState('Cargando...'); // Mensaje dinámico

  useEffect(() => {
    // Inicia la animación de aparición después de 500ms
    const startTimer = setTimeout(() => {
      setStartAnimation(true);
    }, 500);

    // Actualizar el progreso y los mensajes
    const progressTimer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 20; // Incrementa el progreso cada segundo (20%)
        if (newProgress === 40) setMessage('Falta poco...');
        if (newProgress === 80) setMessage('Casi listo...');
        if (newProgress === 100) setMessage('¡Bienvenido!');
        return newProgress;
      });
    }, 1000); // Cada segundo

    // Inicia la animación de agrandarse y desaparecer después de 6 segundos, dándole más tiempo al mensaje "¡Bienvenido!"
    const exitTimer = setTimeout(() => {
      setStartExitAnimation(true);
    }, 6000); // Mostrar el mensaje "¡Bienvenido!" por 2 segundos completos

    // Desaparece completamente después de 7.5 segundos
    const finalTimer = setTimeout(() => {
      setIsVisible(false);
      clearInterval(progressTimer); // Limpiar el timer de progreso
    }, 7500); // Aumentado a 7.5s para asegurar más tiempo de visualización del mensaje "¡Bienvenido!"

    return () => {
      clearTimeout(startTimer);
      clearTimeout(exitTimer);
      clearTimeout(finalTimer);
      clearInterval(progressTimer); // Limpiar el timer
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`splash-screen ${startAnimation ? 'animate' : ''} ${startExitAnimation ? 'fade-out' : ''}`}
    >
      <div className="logo-container">
        <img src={logo} alt="LogoScreen" className="LogoScreen" />
        {/* Spinner Circular */}
        <div className="spinner"></div>
        {/* Barra de Progreso */}
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default SplashScreen;
