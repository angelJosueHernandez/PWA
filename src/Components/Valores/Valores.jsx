import React from 'react'

//import CSS........................
import './Valores.css'

// Import Swiper React components Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Pagination} from 'swiper/modules';

//import feauresBooksData

import { featuredBooksData2 } from '../../Data/Data';

// swiper  Breakpoints
const breakpoints= {
    1024:{
        slidesPerView: 4,
        spaceBetweenSlides: 30
    },

    768:{
        slidesPerView: 3,
        spaceBetweenSlides: 20
    },

    480:{
        slidesPerView: 2,
        spaceBetweenSlides: 10
    },

    0:{
        slidesPerView: 1,
        spaceBetweenSlides: 0
    }
}


/// import React Icos 

import { GoArrowLeft } from "react-icons/go";

//import Tytle Props........................
import TitleTypeOne from '../../Ui/TitleTypeOne/TitleTypeOne'

import { Link } from 'react-router-dom';



export default function Valores() {
  return (
    <section className='Featured'>
        <div className="container featurers-book-cotnainer">
            {/*....................Title Props............... */}
            <TitleTypeOne TitleTop={'Como nos regimos'} Title={'Nuestros Valores'}/>
            {/*....................Swiper............... */}
            <Swiper
            spaceBetween={50}
            slidesPerView={4}
            loop ={true}
            modules={[Pagination]}
            pagination={{el :'.swiper-pagination', clickable: true }}
            breakpoints={breakpoints}
           
            >
                {
                    featuredBooksData2.map(({img, imgLlink, name, nameLink, writer, price}, index)=>{
                        return(
                            <SwiperSlide key={index}>
                                <div className="featurebook-box">
                                        <img className='featurebook-img' src={img} alt=''/>
                                 
                                    <div className="featurebook-info">
                                         <h4>{name}</h4>
                                    </div>
                                </div>
                                
                            </SwiperSlide>
                        )
                    })
                }
                <div className="feature-borderr container"></div>
                {/*....................Swiper pagination............... */}
                <div className="swiper-pagination"></div>
        
            </Swiper>
        </div>
    </section>
  )
}
