import React, { useState, useEffect } from 'react';
// Components Imports.................................
import Header from '../Components/Header/Header';
import Brands from '../Components/Brands/Brands';
import FeaturesBooks from '../Components/FeaturesBooks/FeaturesBooks';
import BestSellingBook from '../Components/BestSellingBook/BestSellingBook';
import PopularBooks from '../Components/PopularBooks/PopularBooks';
import Quote from '../Components/Quote/Quote';
import LstestArticle from '../Components/LstestArticle/LstestArticle';
import Blog from '../Components/Blog/Blog';
import Ayuda from '../Components/Ayuda/Ayuda';
import Valores from '../Components/Valores/Valores';
import SwiperDemo from '../Components/Slider/Slider';
import VideoY from '../Components/VideoY/VideoY';
import AnuncioServicios from '../Components/ServicionAnuncio/ServicionAnuncio';

export default function Home() {
  return (
    <>
      <Ayuda />
      {/*  <Header/>
  <Brands/>
 
  <Quote/> 
   <Valores/>
    
 */}
      <AnuncioServicios />
      <SwiperDemo />

      {/*
    <BestSellingBook/>
  <PopularBooks/>
 
    <Blog/>*/}
      <VideoY />
      <LstestArticle />
    </>
  );
}
