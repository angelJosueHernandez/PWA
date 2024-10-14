import React from 'react'
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

const features = [
    {
      name: 'Misión 2030',
      description:
        'Cruz Roja Mexicana es una institución humanitaria de asistencia privada, que forma parte del Movimiento Internacional de la Cruz Roja y la Media Luna Roja, dedicada a preservar la salud, la vida y aliviar el sufrimiento humano, fomentando la cultura del autocuidado en las personas y sus comunidades, a través de la acción voluntaria.',
      icon: CloudArrowUpIcon,
    },
    {
      name: 'Visión 2030',
      description:
        'Somos líderes nacionales en movilización y vinculación social, a través de redes solidarias que dan respuesta a las vulnerabilidades de las personas y comunidades',
      icon: LockClosedIcon,
    },
  ]

const MisioVision = () => {
  return (
    
      <div className="p-4 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Misión y Visión
          </p>
        </div>
        <div className="mt-16 max-w-2xl mx-auto sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
    
  )
}

export default MisioVision
