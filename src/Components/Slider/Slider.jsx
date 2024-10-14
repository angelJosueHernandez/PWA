
import './slider.css';
import React, { useEffect, useRef, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import TitleTypeOne from '../../Ui/TitleTypeOne/TitleTypeOne';

import co1 from '../../assets/img/Colectas/co1.jpg';
import co2 from '../../assets/img/Colectas/co2.jpg';
import co3 from '../../assets/img/Colectas/co3.jpg';

// Inicializamos los módulos necesarios para Swiper
SwiperCore.use([Autoplay, Navigation, Pagination]);

const SwiperDemo = () => {
  return (
    <section className="Featured" style={{ marginTop: '30px', marginBottom: '-100px' }}>
      <div className="container featurers-book-cotnainer">
        {/*....................Title Props............... */}
        <TitleTypeOne TitleTop={'CADA GRANITO DE AYUDA CUENTA, FALTAS TU!!'} Title={'Colectas'} />
        
        {/*....................Swiper............... */}
        <br />
        <br />
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }} // Configuración del autoplay
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <img src={co1} alt="Colecta 1" className="responsive-img" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={co2} alt="Colecta 2" className="responsive-img" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={co3} alt="Colecta 3" className="responsive-img" />
          </SwiperSlide>
        </Swiper>

        {/*....................Botón de Donaciones............... */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', zIndex: 1 }}>
          <a href="/donaciones" className="donation-button">
            Ir a Donar <span className="icon">💖</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default SwiperDemo;
