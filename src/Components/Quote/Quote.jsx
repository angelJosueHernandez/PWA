import React from 'react'
import './Quote.css'
///....Title Props...................
import TitleTypeTwo from '../../Ui/TitleTypeTwo/TitleTypeTwo'
// Quote Data Props...........................

import { quoteData } from '../../Data/Data'

export default function Quote() {
  return (
    <section className='Quote'>
        <div className="container quote-cotnainer">
            <TitleTypeTwo Title={'Quote of the day'} ClassName='quote-title'/>
                <article>
                    {
                        quoteData.map(({quote, speaker}, index)=>{
                            return(
                                <article key={index}>
                                    <p className='color-text'>{quote}</p>
                                    <h5>{speaker}</h5>
                                </article>
                            )
                        })
                    }
                </article>
        </div>
    </section>
  )
}
