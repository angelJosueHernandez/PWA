import React, { useState, useEffect } from 'react';
import './Ayuda.css';
import { headerBooks2 } from '../../Data/Data';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { GoArrowRight, GoArrowLeft } from 'react-icons/go';
import headerShape from '../../assets/header-shape.svg';
import { Link } from 'react-router-dom';

export default function Ayuda() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [routeUrl, setRouteUrl] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga del botón

  const cruzRojaLocation = { latitude: 21.1435, longitude: -98.4197 };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          getAddress(latitude, longitude);
          getRoute(cruzRojaLocation, { latitude, longitude });
        },
        (error) => {
          alert('Error obteniendo ubicación: ' + error.message);
        },
      );
    } else {
      alert('Geolocalización no es soportada por este navegador.');
    }
  };

  const getAddress = (latitude, longitude) => {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.address) {
          const address = `${data.address.road || ''}, ${data.address.neighbourhood || ''}, ${data.address.city || ''}, ${data.address.state || ''}, ${data.address.country || ''}`;
          setAddress(address);
          setModalIsOpen(true);
        } else {
          alert('No se pudo obtener la dirección.');
        }
      })
      .catch((error) => {
        console.error('Error al obtener la dirección:', error);
        alert('Error al obtener la dirección.');
      });
  };

  const getRoute = (start, end) => {
    const origin = `${start.latitude},${start.longitude}`;
    const destination = `${end.latitude},${end.longitude}`;
    const routeUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
    setRouteUrl(routeUrl);
  };

  const handleConfirm = () => {
    setModalIsOpen(false);
    if (location) {
      const message = `Necesito ayuda. Mi ubicación es: ${address}. Coordenadas: https://www.google.com/maps?q=${location.latitude},${location.longitude}. Ruta: ${routeUrl}`;
      const whatsappLink = `https://wa.me/5535518659?text=${encodeURIComponent(message)}`;
      window.open(whatsappLink, '_blank');
    } else {
      alert('No se pudo obtener la ubicación. Intenta nuevamente.');
    }
  };

  const handleClick = () => {
    setIsLoading(true); // Inicia la animación de carga

    // Simula un tiempo de espera para el cargando, por ejemplo, 3 segundos
    setTimeout(() => {
      setIsLoading(false);
      getLocation();
    }, 3000);
  };

  // Generar burbujas dinámicas
  useEffect(() => {
    generateBubbles();
  }, []);

  const generateBubbles = () => {
    const bubbleArray = [];
    const maxBubbles = 30;

    for (let i = 0; i < maxBubbles; i++) {
      const randomSize = Math.random();
      let size = 'small';
      if (randomSize >= 0.7 && randomSize < 0.9) size = 'medium';
      else if (randomSize >= 0.9) size = 'large';

      const left = `${Math.random() * 100}%`;
      const bottom = `${Math.random() * 30}%`;
      const animationDelay = `${(Math.random() * 1.5).toFixed(2)}s`;
      const animationDuration = `${(10 + Math.random() * 10).toFixed(2)}s`;

      bubbleArray.push({
        size,
        left,
        bottom,
        animationDelay,
        animationDuration,
      });
    }

    setBubbles(bubbleArray);
  };

  const getSizeClass = (size) => {
    switch (size) {
      case 'small':
        return 'w-4 h-4';
      case 'medium':
        return 'w-8 h-8';
      case 'large':
        return 'w-12 h-12';
      default:
        return 'w-5 h-5';
    }
  };

  return (
    <header>
      <div className="header-container">
        <Swiper spaceBetween={50} slidesPerView={1} navigation pagination>
          {headerBooks2.map(({ title, info, img, btnLink }, index) => (
            <SwiperSlide key={index}>
              <div className="header-wrapper container">
                <div className="header-left">
                  <h1 className="text-animated">Necesitas Ayuda</h1>
                  <p
                    className="leading-loose lg:text-[14px]"
                    dangerouslySetInnerHTML={{ __html: info }}
                  ></p>
                  <button
                    className={`btn-border2 ${isLoading ? 'loading' : ''}`}
                    onClick={handleClick}
                    disabled={isLoading} // Deshabilitar el botón mientras está cargando
                  >
                    {isLoading ? (
                      <div className="loading-container">
                        <div className="loading-message">Tomando datos...</div>
                        <div className="loading-bar">
                          <div className="fill"></div>
                        </div>
                      </div>
                    ) : (
                      'Ayuda'
                    )}
                  </button>
                </div>
                <div className="header-right ">
                  <img
                    className="lg:drop-shadow-[0_25px_25px_rgba(0,0,0,0.35)] drop-shadow-[0_15px_15px_rgba(0,0,0,0.35)] imgLogD"
                    src={img}
                    alt=""
                  />{' '}
                  {/* Imagen animada */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="header-shape">
          <img src={headerShape} alt="" />
        </div>
      </div>

      {/* Burbujas dinámicas */}
      <div className="bubbles-container">
        {bubbles.map((bubble, index) => (
          <div
            key={index}
            className={`red-bubble ${getSizeClass(bubble.size)}`}
            style={{
              left: bubble.left,
              bottom: bubble.bottom,
              animationDelay: bubble.animationDelay,
              animationDuration: bubble.animationDuration,
            }}
          />
        ))}
      </div>

      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-out">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg md:max-w-xl lg:max-w-2xl transition-all transform duration-300 ease-in-out scale-100 modal-container">
            {/* Icono de advertencia */}
            <div className="text-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-red-600 mx-auto"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2a10 10 0 110 20 10 10 0 010-20zm0 13a1 1 0 100 2 1 1 0 000-2zm-1-7v6h2V8h-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Título del modal */}
            <h2 className="text-2xl lg:text-3xl font-bold text-center text-red-700 mb-4">
              Confirmación de Envío
            </h2>

            {/* Texto de advertencia */}
            <p className="text-gray-700 text-center mb-6">
              Estás a punto de enviar tu ubicación a nuestro número de
              Emergencia. Si realizas una peticion falsa, podrías recibir una
              penalización ciudadana.
            </p>

            {/* Botones */}
            <div className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-4">
              <button
                className="w-full md:w-auto px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-md hover:shadow-lg"
                onClick={handleConfirm}
              >
                Confirmar
              </button>
              <button
                className="w-full md:w-auto px-6 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition-all ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-md hover:shadow-lg"
                onClick={() => setModalIsOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
