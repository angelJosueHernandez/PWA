import './App.css';
import React, { useState, useEffect } from 'react';
import Router from './Router/Router';
import SplashScreen from '../src/Components/SplashScreen/SplashScreen';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import { message } from 'antd';

export default function App() {
  useEffect(() => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Permiso de notificaciones concedido');
        }
      });
    }
  }, []);

  const [showSplash, setShowSplash] = useState(false);
  const [startPageAnimation, setStartPageAnimation] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    const isPageReloaded =
      window.performance.getEntriesByType('navigation')[0].type === 'reload';

    if (isPageReloaded || !sessionStorage.getItem('splashShown')) {
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
        setStartPageAnimation(true);
        sessionStorage.setItem('splashShown', 'true');
      }, 7500);

      return () => clearTimeout(timer);
    } else {
      setStartPageAnimation(true);
    }
  }, []);

  useEffect(() => {
    const showMessage = (type, content) => {
      message[type]({
        content,
        duration: 2,
        style: {
          marginTop: '10vh',
        },
      });
    };

    const checkInternetConnection = async () => {
      try {
        await fetch('https://www.google.com/favicon.ico', {
          method: 'HEAD',
          mode: 'no-cors',
        });
        if (wasOffline) {
          setIsOnline(true);
          showMessage('success', '¡Estamos de nuevo online!');
          setWasOffline(false);
        }
      } catch (error) {
        setIsOnline(false);
        if (!wasOffline) {
          showMessage('error', 'No hay conexión a Internet');
          setWasOffline(true);
        }
      }
    };

    const handleOffline = () => {
      if (isOnline) {
        setIsOnline(false);
        showMessage('error', 'No hay conexión a Internet');
        setWasOffline(true);
      }
    };

    const handleOnline = () => {
      if (wasOffline) {
        checkInternetConnection();
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    checkInternetConnection();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [wasOffline, isOnline]);

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <div className={`main-content ${startPageAnimation ? 'fade-in' : ''}`}>
          <Router />
        </div>
      )}
    </>
  );
}
