import React from 'react'

import './NotFound.css'

import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className='Not-Found'>
      <div className="container not-found-container">
        <h1>404</h1>
        <h3>Opps, Esta Pagina No Existe</h3>
        <Link to={'/'} className='btn btn-border'>Regresemos al Inicio</Link>
      </div>
    </section>
  )
}
