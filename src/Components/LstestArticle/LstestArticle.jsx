import React from 'react'
import './LstestArticle.css'

import TitleTypeOne from '../../Ui/TitleTypeOne/TitleTypeOne'
import { BsArrowReturnRight } from "react-icons/bs";

import { lettestArticleData } from '../../Data/Data'

import { Link } from 'react-router-dom'
  // import react Icon.......................
  import {  ImFacebook, ImBehance } from 'react-icons/im';
  import {  FiInstagram } from 'react-icons/fi';
  import {  RiTwitterXLine } from 'react-icons/ri';
  import {  GrLinkedinOption } from 'react-icons/gr';

export default function LstestArticle() {
  return (
    <section className='latestArticle'>
        <div className="continer latest-article-container">
            <TitleTypeOne Title={'Enterate de Todo'} TitleTop={'NUESTRAS NOTICIAS'}/>
            <div className="latest-article-content">
                {
                lettestArticleData.map(({titLink, title, date, instLink,
                fbLink, twitaLink, inspiration, image}, index) =>{
                    return(
                        <article className='latest-article' key={index}>
                            <div className="article-image">
                                <img src={image} alt="" />
                            </div>
                            <div className="article-info">
                                <h5>{date}</h5>
                                    <Link to={titLink}>
                                        <h3>{title}</h3>
                                    </Link>
                            </div>
                            <div className="latest-article-social">
                                <p>{inspiration}</p>
                                <div className="article-social">
                                <a href={fbLink}><ImFacebook/></a>
                                <a href={instLink}><FiInstagram/></a>
                                <a href={twitaLink}><RiTwitterXLine/></a>
                                </div>
                            </div>
                        </article>

                    )
                }
                )}
            </div>
           {/**
            * 
            *   <center>
            <Link to={'*'} className='btn btn-border'>
                Leer mas
            <BsArrowReturnRight/></Link>
            </center>
            */}
            
        </div>
       
    </section>
  )
}
