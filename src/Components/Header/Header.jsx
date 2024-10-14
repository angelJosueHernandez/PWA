import React from 'react'
import './Header.css'

// Import Header Books Data
import {headerBooks} from '../../Data/Data'

// Import Swiper React components Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination} from 'swiper/modules';

// React Arrow Icon
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";

// Sape Svg Import

import headerShape from '../../assets/header-shape.svg'

/// Import Link From React

import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className="header-container">
        {/*...................Header swiper Slider................*/}
        <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop ={true}
        modules={[Navigation, Pagination]}
        pagination={{el :'.swiper-pagination', clickable: true }}
        navigation ={
          {
          prevEl:'.button-prev-slide',
          nextEl:'.button-next-slide'
          }
        }
        >
          {
            headerBooks.map(({title, info, img, btnLink}, index)=>{
              return(
                <SwiperSlide key={index}>
                  <div className="header-wrapper container">
                    {/*...................Header Left................*/}
                    <div className="header-left">
                      <h1>{title}</h1>   
                      <p dangerouslySetInnerHTML={{__html:info}}></p>
                      <Link className='btn btn-border' to={btnLink}>Lear More</Link>
                    </div>
                    {/*...................Header Right................*/}
                    <div className="header-right">
                      <img src={img} alt=''></img>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })
          }
          {/*...................Header pagination................*/}
          <div className="slider-button">
            <div className="button-prev-slide slidebutton">
              <GoArrowLeft/>
            </div>
            <div className="button-next-slide slidebutton">
              <GoArrowRight/>
            </div>
          </div>


          {/*...................Header pagination................*/}
          <div className="container">
            <div className="swiper-pagination">

            </div>
          </div>
        </Swiper>

             {/*...................Header Shape................*/}
             <div className="header-shape">
               <img src={headerShape} alt=''/>  
             </div>
            
      </div>
    </header>
  )
}
