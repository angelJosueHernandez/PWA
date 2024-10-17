import React from 'react'

export default function Final() {
  return (
    <div className="flex justify-center items-center">
    <div className="container mx-auto md:mt-10">
      <div className="flex flex-col items-center">
        <div className="text-red-400">
          <svg
            className="w-24 h-24"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="mt-3 text-xl font-semibold uppercase text-red-400">
        Felicidades!
      </div>
      <br />
      <div className="text-l font-semibold text-gray-500">
        Has terminado Correctamente el proceso. 
      </div>
      
      <a className="mt-10" href="/Iniciar Sesion">
      <button
          className='bg-red-600 text-white uppercase py-2 px-4 rounded-md font-semibold cursor-pointer border border-transparent transition duration-200 ease-in-out'
          style={{
            fontSize: '12px',
            padding: '8px 24px',
            letterSpacing: '0.5px',
            marginTop: '10px',
          }}
        >
          Finalizar
        </button>
      </a>
      </div>
     
    </div>
  </div>
  )
}
