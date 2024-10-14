import React from 'react'

import './PopularBooks.css'

//// Import Title Props
import TitleTypeOne from '../../Ui/TitleTypeOne/TitleTypeOne'


//// Import popularbookd Books Data
import { galleryData } from '../../Data/Data'

import { useState } from 'react'


export default function PopularBooks() {

//// Active Button Funcationality............................

    const [activeButton, setActiveButton] = useState('all')

    const handleFilterChange =(category)=>{
        setActiveButton(category);
    }

///// Fillter Gallery Funcationality....................................
    const filterItems = activeButton === 'all' ? galleryData :
     galleryData.filter((item)=> item.category === activeButton);

  return (
    <section className='PopularBooks'>
        <div className="container popularbooks-container">
            <TitleTypeOne TitleTop={'Some quality items'} Title={'Popular Books'}
            className={'popularbooks-title'} />



            
            {/*..............................Fillter Tabs Button.................................... */}
            <div className="filter-buttons">
                <button
                className={activeButton === 'all' ? 'active' : ''}
                onClick={()=> handleFilterChange('all')}>
                    All
                </button>
                <button
                className={activeButton === 'Business' ? 'active' : ''}
                onClick={()=> handleFilterChange('Business')}>
                    Business
                </button>
                <button
                className={activeButton === 'Technology' ? 'active' : ''}
                onClick={()=> handleFilterChange('Technology')}>
                    Technology
                </button>
                <button
                className={activeButton === 'Adventure' ? 'active' : ''}
                onClick={()=> handleFilterChange('Adventure')}>
                    Adventure
                </button>
                <button
                className={activeButton === 'Romantic' ? 'active' : ''}
                onClick={()=> handleFilterChange('Romantic')}>
                    Romantic
                </button>
                <button
                className={activeButton === 'Fictional' ? 'active' : ''}
                onClick={()=> handleFilterChange('Fictional')}>
                    Fictional
                </button>
            </div>


            {/*..............................Fillter Books Content.................................... */}
            <div className="gallery">
                {
                    filterItems.map(({name, writer, price, image}, index)=>{
                        return (
                            <div className="gallery-items" key={index}>
                                <div className="popularbook-image">
                                    <img src={image} alt="" />
                                </div>
                                <div className="popularbook-info">
                                    <h4>{name}</h4>
                                    <div><small>{writer}</small></div>
                                    <h5><span>{price}</span></h5>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}
