import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FootersLinksData } from '../../Data/Data';
import CopyRight from '../CopyRight/CopyRight';

export default function Footer() {
  return (
    <>
      <footer className=" text-white py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 px-6">
          {/* Sección Conócenos */}
          <div>
            <h4 className="Title  Title  mb-4">Conócenos</h4>
            <ul className="space-y-2">
              {FootersLinksData.Nosotros.map(({ link, linkname }, index) => (
                <li key={index}>
                  <span><Link to={link} className="hover:text-gray-600 transition-colors duration-200">{linkname}</Link></span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sección Contenido */}
          <div>
            <h4 className="  Title  mb-4">Contenido</h4>
            <ul className="space-y-2">
              {FootersLinksData.Contenido.map(({ link, linkname }, index) => (
                <li key={index}>
                  <span><Link to={link} className="hover:text-gray-600 transition-colors duration-200">{linkname}</Link></span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sección Cómo nos regimos */}
          <div>
            <h4 className="  Title  mb-4">Cómo nos regimos</h4>
            <ul className="space-y-2">
              {FootersLinksData.Help.map(({ link, linkname }, index) => (
                <li key={index}>
                  <span><Link to={link} className="hover:text-gray-600 transition-colors duration-200">{linkname}</Link></span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sección Información de Contacto */}
          <div>
            <h4 className="  Title  mb-4">Contacto y Emergencias</h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <img src="https://img.icons8.com/color/48/000000/marker.png" alt="Ubicación" className="w-7 h-7 bg-white rounded-full p-1 mr-3" />
                <span className="leading-tight">Calle Ejemplo 123, Ciudad, País</span>
              </li>
              <li className="flex items-center">
                <img src="https://img.icons8.com/color/48/000000/phone.png" alt="Teléfono" className="w-7 h-7 bg-white rounded-full p-1 mr-3" />
               <span><a href="tel:+1234567890" className="hover:text-gray-600 transition-colors duration-200 leading-tight">+1 234 567 890</a></span> 
              </li>
              <li className="flex items-center">
                <img src="https://img.icons8.com/color/48/000000/email.png" alt="Email" className="w-7 h-7 bg-white rounded-full p-1 mr-3" />
               <span> <a href="mailto:contacto@cruzroja.org" className="hover:text-gray-600 transition-colors duration-200">contacto@cruzroja.org</a></span>
              </li>
              <li className="flex items-center">
                <img src="https://img.icons8.com/color/48/000000/phone.png" alt="Emergencia" className="w-7 h-7 bg-white rounded-full p-1 mr-3" />
                <span><a href="tel:911" className="hover:text-gray-600 transition-colors duration-200">911 (Emergencias)</a></span>
              </li>
            </ul>

            {/* Redes sociales debajo de Contacto */}
            <div className="flex justify-start space-x-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/fluency/48/000000/facebook-new.png" alt="Facebook" className="w-9 h-9 bg-white rounded-full p-1 transition-transform duration-200 transform hover:scale-110" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/color/48/000000/twitter--v1.png" alt="Twitter" className="w-9 h-9 bg-white rounded-full p-1 transition-transform duration-200 transform hover:scale-110" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/fluency/48/000000/instagram-new.png" alt="Instagram" className="w-9 h-9 bg-white rounded-full p-1 transition-transform duration-200 transform hover:scale-110" />
              </a>
            </div>
          </div>
        </div>

        <CopyRight />
      </footer>

      <div className="svg-container">
        <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 390" xmlns="http://www.w3.org/2000/svg" className="transition duration-600 ease-in-out delay-150 wawefooter">
          <path d="M 0,400 L 0,150 C 121.89285714285714,127.46428571428572 243.78571428571428,104.92857142857143 362,114 C 480.2142857142857,123.07142857142857 594.7499999999999,163.75000000000003 721,170 C 847.2500000000001,176.24999999999997 985.2142857142858,148.07142857142858 1107,139 C 1228.7857142857142,129.92857142857142 1334.392857142857,139.96428571428572 1440,150 L 1440,400 L 0,400 Z" stroke="none" strokeWidth="0" fill="#ad2e2e" fillOpacity="1" className="transition-all duration-600 ease-in-out delay-150 path-0"></path>
        </svg>
      </div>
    </>
  );
}
