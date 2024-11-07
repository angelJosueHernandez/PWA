import React from 'react';
import quienes_somos from '../../assets/img/quienes_somos.png';
import servicios from '../../assets/img/servicios.png';
import seguro from '../../assets/img/seguro.png';
import programas from '../../assets/img/programas.png';

const QuienesSomos = () => {
  return (
    <div className="p-4 bg-white">
      <div className="relative isolate overflow-hidden bg-white px-6 py-2 sm:py-15 lg:overflow-visible lg:px-0">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            aria-hidden="true"
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          >
            <defs>
              <pattern
                x="50%"
                y={-1}
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </svg>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-red-900 sm:text-4xl">
                  ¿Quiénes somos?
                </h1>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden hidden lg:block">
            <img
              alt=""
              src={quienes_somos}
              className="w-[48rem] max-w-none rounded-xl bg-white-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[27rem]"
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <span className='font-semibold text-gray-600'>
                La Cruz Roja Mexicana es una institución de asistencia privada
                  no gubernamental, humanitaria, imparcial, neutral e
                  independiente; que moviliza redes de voluntarios, comunidades
                  y donantes para operar programas y servicios que tienen como
                  objetivo el preservar la salud, la vida y aliviar el
                  sufrimiento humano de la población en situación de
                  vulnerabilidad.
                </span>
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <img
                      src={servicios}
                      alt=""
                      className="mt-1 h-10 w-10 flex-none text-indigo-600"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900"></strong>{' '}
                      Atiende a personas o comunidades afectadas por situaciones
                      de emergencia o desastre, problemáticas de salud,
                      enfermedades y lesiones por accidentes, así como a los
                      fenómenos de la migración y la exclusión social.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <img
                      src={programas}
                      alt=""
                      className="mt-1 h-10 w-10 flex-none text-indigo-600"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900"></strong>{' '}
                      Todos los programas y servicios consideran en sus acciones
                      internas y de acercamiento comunitario los enfoques de
                      inclusión social y educación humanitaria.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <img
                      src={seguro}
                      alt=""
                      className="mt-1 h-10 w-10 flex-none text-indigo-600"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900"></strong>{' '}
                      Damos especial énfasis a la prevención y al aumento de
                      capacidades individuales y colectivas, para que los
                      beneficiarios de nuestras acciones, se organicen
                      socialmente, estén preparados y sean resilientes ante
                      amenazas y adversidades.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuienesSomos;
