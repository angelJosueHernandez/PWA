import React from 'react'

//import CSS........................
import './FeaturesBooks.css'

// Import Swiper React components Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Pagination} from 'swiper/modules';

//import feauresBooksData

import { featuredBooksData } from '../../Data/Data';

import { BsArrowReturnRight } from "react-icons/bs";

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



export default function FeaturesBooks() {
  return (
    <section className='Featured'>
        <div className="container featurers-book-cotnainer">
            {/*....................Title Props............... */}
            <TitleTypeOne TitleTop={'Some quality items'} Title={'Featured Books'}/>
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
                    featuredBooksData.map(({img, imgLlink, name, nameLink, writer, price}, index)=>{
                        return(
                            <SwiperSlide key={index}>
                                <div className="featurebook-box">
                                    <Link to={imgLlink} className='featurebook'>
                                        <img src={img} alt=''/>
                                    </Link>
                                    <div className="featurebook-info">
                                        <Link to={nameLink}>
                                         <h4>{name}</h4>
                                        </Link>
                                        <div><small>{writer}</small></div><br/>
                                        <h5><span>{price}</span></h5>
                                    </div>
                                </div>
                                
                            </SwiperSlide>
                        )
                    })
                }
                <div className="feature-border container"></div>
                {/*....................Swiper pagination............... */}
                <div className="swiper-pagination"></div>
                {/*............ View all products Button........... */}
                <Link className="btn feature-btn">View all Products<BsArrowReturnRight /></Link>
            </Swiper>
        </div>
    </section>
  )
}
