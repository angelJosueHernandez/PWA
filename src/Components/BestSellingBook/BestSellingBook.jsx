import React from 'react'

//import css ............................
import './BestSellingBook.css'

// import Title props'.................................
import TitleTypeTwo from '../../Ui/TitleTypeTwo/TitleTypeTwo'

// import Tree Shape...........................
import TreeShape from '../../assets/treeShape.png'

/// import Link From React.................................

import { Link } from 'react-router-dom'
//import Selling Books Data...........................

import { sellingBooksData } from '../../Data/Data'



import { BsArrowReturnRight } from "react-icons/bs";

export default function BestSellingBook() {
  return (
    <section className='BestSelLingBook'>
      {/*..............Selling Book Tree Shape.................*/}
      <div className="treeShape">
          <img src={TreeShape} alt="" />
      </div>
      

      {/*..............Selling Book Content.................*/}
      {
        sellingBooksData.map(({img, infoTitle, infoTitleTop, desc, price, shopbtnLink, id})=>{
              return(
                <div  className="container bestselling-container">
                   {/*.................Left.................*/}
                  <div key={id} className="selling-book-left">
                      <center><img src={img} alt=''/></center>
                  </div>
                  {/*.................Right.................*/}
                  <div className="selling-book-right">
                     <TitleTypeTwo Title={'Best selling book'} 
                     className="sellingBookTitle"/>
                      <div><small>{infoTitleTop}</small></div>
                      <h3>{infoTitle}</h3>
                      <p>{desc}</p>
                      <h5><span>{price}</span></h5>
                      <Link to={shopbtnLink} className='btn'>
                        <small>Shop it now</small>
                        <BsArrowReturnRight/>
                      </Link>
                  </div>
                </div>
              )
        })
      }
     
  
    </section>
  )
}
