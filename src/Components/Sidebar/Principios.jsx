import React from 'react';
import humanidad from '../../assets/img/Principios/humanidad.png';
import imparcialidad from '../../assets/img/Principios/imparcialidad.png';
import neutralidad from '../../assets/img/Principios/neutralidad.png';
import independencia from '../../assets/img/Principios/independencia.png';

const features = [
  {
    name: 'Humanidad',
    description:
      'Tiende a proteger la vida y la salud, así como a hacer respetar a la persona humana. Favorece la comprensión mutua, la cooperación y una paz duradera entre todos los pueblos.',
  },
  {
    name: 'Imparcialidad',
    description:
      'No hace ninguna distinción de nacionalidad, raza, religión, condición social ni credo político. Se dedica únicamente a recorrer a los individuos en proporción con los sufrimientos, remediando sus necesidades y dando prioridad a los más urgentes.',
  },
  {
    name: 'Neutralidad',
    description:
      'Con el fin de conservar la confianza de todos, el Movimiento se abstiene de tomar parte en las hostilidades y, en todo tiempo, en las controversias de orden político, radical, religioso o ideológico.',
  },
  {
    name: 'Independencia',
    description:
      'El Movimiento es independiente. Auxiliares de los poderes públicos en sus actividades humanitarias y sometidas a las leyes que rigen los países respectivos, las Sociedades Nacionales deben, sin embargo, conservar una autonomía que les permite actuar siempre de acuerdo con los principios del Movimiento.',
  },
];

const Principios = () => {
  return (
    <div className="p-4 bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-2 sm:px-6 sm:py-2 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Principios Fundamentales
          </h2>
          <p className="mt-4 text-gray-500">
            Los principios fundamentales garantizan continuidad del movimiento
            de la Cruz Roja y de la Media Luna Roja y su labor humanitaria.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            src={humanidad}
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            src={imparcialidad}
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Side of walnut card tray with card groove and recessed card area."
            src={neutralidad}
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            src={independencia}
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default Principios;
