import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation(); // Obtener la ruta actual

  useEffect(() => {
    window.scrollTo(0, 0); // Forzar el desplazamiento al inicio de la página
  }, [pathname]); // Ejecutar cada vez que cambie la ruta

  return null;
};

export default ScrollToTop;
