import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './ServicionAnuncio.css';
import doc2 from '../../assets/img/doc2.png'; // Imagen del doctor
import fondo from '../../assets/img/fondoM.png'; // Fondo
import { FaAmbulance, FaCalendarAlt } from 'react-icons/fa';

export default function ServicionAnuncio() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true); // Muestra la animación al entrar en el viewport
        }
      },
      { threshold: 0.2 }, // El componente se considera visible cuando el 20% es visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`bg-announcement py-16 lg:py-24 transition-opacity duration-1000 ease-in-out ${
        isVisible ? 'fade-in' : 'fade-out'
      }`}
    >
      <img
        src={fondo}
        alt="Fondo"
        className="mask-image-gradient lg:w-[400px] lg:h-[700px] absolute"
      />
      <div className="max-w-7xl mt-1 mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
        {/* Contenedor de imágenes */}
        <div className="w-full lg:w-1/2 flex justify-center items-center relative mb-12 lg:mb-0">
          <div className="relative">
            <img
              src={doc2}
              alt="Doctor"
              className="lg:w-[350px] w-[250px] lg:drop-shadow-[0_15px_15px_rgba(0,0,0,0.35)] drop-shadow-[0_9px_9px_rgba(0,0,0,0.35)] imgG h-auto object-cover transition-transform transform hover:scale-105"
            />
          </div>
        </div>

        {/* Contenido de texto */}
        <div className="w-full mt-[80px] lg:w-1/2 text-center lg:text-left">
          <h2 className="text-7xl text-red-600 mb-6 lg:mb-8">
            Servicios Especializados
          </h2>
          <p className="text-[14px] text-gray-700 mb-9 lg:mb-10 info leading-loose">
            ¿Necesitas un traslado médico o una toma de glucosa? En Cruz Roja,
            estamos listos para brindarte el apoyo que necesitas. Solicita una
            cita para chequeos rápidos o programa un traslado seguro y
            eficiente. Estamos aquí para cuidarte en cada paso.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {/* Contratación de Ambulancias */}
            <div className="text-center lg:text-left">
              <Link to="/ContratacionAmbulancias">
                <div className="w-20 h-20 bg-red-500 text-white rounded-full mx-auto lg:mx-0 mb-4 flex items-center justify-center shadow-md hover:shadow-xl transition-shadow transform hover:scale-110">
                  <FaAmbulance className="text-3xl" />
                </div>
              </Link>
              <h3 className="text-2xl font-bold text-gray-800">
                Contratación de Ambulancias
              </h3>
              <p className="text-[13px] text-gray-600 mt-2">
                Servicio rápido y confiable para traslados médicos.
              </p>
            </div>

            {/* Citas */}
            <div className="text-center lg:text-left">
              <Link to="/Citas">
                <div className="w-20 h-20 bg-red-500 text-white rounded-full mx-auto lg:mx-0 mb-4 flex items-center justify-center shadow-md hover:shadow-xl transition-shadow transform hover:scale-110">
                  <FaCalendarAlt className="text-3xl" />
                </div>
              </Link>
              <h3 className="text-2xl font-bold text-gray-800">
                Citas Médicas
              </h3>
              <p className="text-[13px] text-gray-600 mt-2">
                Reserva tu cita con nuestro equipo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
