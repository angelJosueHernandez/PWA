import React, { useState } from 'react';

export default function Politicas() {
  const [consentimientoFinesSecundarios, setConsentimientoFinesSecundarios] =
    useState({
      analisisEstadisticos: false,
      requerimientoAutoridad: false,
      prestacionServiciosMedicos: false,
    });

  const handleConsentimientoChange = (event) => {
    const { name, checked } = event.target;
    setConsentimientoFinesSecundarios((prevConsentimiento) => ({
      ...prevConsentimiento,
      [name]: checked,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <h2 className="lg:text-5xl  text-5xl font-bold text-red-700 t mb-4">
        Aviso de Privacidad
      </h2>
      <p className="text-[13px] mb-4">
        Cruz Roja Mexicana, con domicilio en calle Nuevo León, colonia Santa
        Irene, ciudad Huejutla de Reyes, municipio o delegación Huejutla de
        Reyes, c.p. 43000, en la entidad de Hidalgo, país México, y portal de
        internet
        <a
          href="http://www.cruzrojamexicana.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-500 underline"
        >
          http://www.cruzrojamexicana.com
        </a>
        , es el responsable del uso y protección de sus datos personales, y al
        respecto le informamos lo siguiente:
      </p>

      <h2 className="text-2xl  text-red-600 mb-6">
        ¿Para qué fines utilizaremos sus datos personales?
      </h2>
      <p className="text-[13px] mb-4">
        Los datos personales que recabamos de usted, los utilizaremos para las
        siguientes finalidades que son necesarias para el servicio que solicita:
      </p>
      <ul className="  text-[13px] leading-loose mb-4 mb-3">
        <li>Facturación y cobranza por servicios.</li>
        <li>Mantenimiento de registros para seguimiento a servicios.</li>
        <li>
          Estudios, registros, estadísticas y análisis de información de salud.
        </li>
        <li>
          Mantenimiento de registros para prestación de servicios en el futuro.
          Análisis estadísticos y de mercado.
        </li>
        <li>
          Requerimiento de cualquier autoridad gubernamental y demás que las
          leyes, normas y reglamentos que así lo establezcan.
        </li>
        <li>Mercadotecnia o publicitaria.</li>
        <li>Prospección comercial.</li>
      </ul>

      <h2 className="text-2xl  text-red-600 mb-6">
        Consentimiento para Fines Secundarios
      </h2>
      <p className="text-[13px] mb-4">
        De manera adicional, utilizaremos su información personal para las
        siguientes finalidades secundarias que no son necesarias para el
        servicio solicitado, pero que nos permiten y facilitan brindarle una
        mejor atención:
      </p>
      <ul className="text-[13px] leading-loose mb-4">
        <li>Análisis estadísticos y de mercado.</li>
        <li>
          Requerimiento de cualquier autoridad gubernamental y demás que las
          leyes, normas y reglamentos que así lo establezcan.
        </li>
        <li>
          Prestación de servicios médico-hospitalarios, hospitalización,
          cirugía, atención de enfermería, servicios farmacéuticos, análisis de
          laboratorio radiología e imagen, estudios y análisis patológicos,
          terapia, rehabilitación.
        </li>
      </ul>

      <form className="mb-6">
        <p className="mb-6 ">
          No consiento que mis datos personales se utilicen para los siguientes
          fines:
        </p>
        <label className="flex  text-[13px] mb-6 leading-loose items-center mb-6">
          <input
            type="checkbox"
            name="analisisEstadisticos"
            checked={consentimientoFinesSecundarios.analisisEstadisticos}
            onChange={handleConsentimientoChange}
            className="mr-2 text-red-500"
          />
          Análisis estadísticos y de mercado.
        </label>
        <label className="flex  text-[13px] mb-6 leading-loose items-center mb-6">
          <input
            type="checkbox"
            name="requerimientoAutoridad"
            checked={consentimientoFinesSecundarios.requerimientoAutoridad}
            onChange={handleConsentimientoChange}
            className="mr-2 text-red-500"
          />
          Requerimiento de cualquier autoridad gubernamental y demás que las
          leyes, normas y reglamentos que así lo establezcan.
        </label>
        <label className="flex  text-[13px] mb-6 leading-loose items-center">
          <input
            type="checkbox"
            name="prestacionServiciosMedicos"
            checked={consentimientoFinesSecundarios.prestacionServiciosMedicos}
            onChange={handleConsentimientoChange}
            className="mr-2 text-red-500"
          />
          Prestación de servicios médico-hospitalarios, hospitalización,
          cirugía, atención de enfermería, servicios farmacéuticos, análisis de
          laboratorio radiología e imagen, estudios y análisis patológicos,
          terapia, rehabilitación.
        </label>
      </form>

      <h2 className="text-2xl  text-red-600 mb-6">
        Negativa y Datos Personales
      </h2>
      <p className="text-[13px] mb-4">
        La negativa para el uso de sus datos personales para estas finalidades
        no podrá ser un motivo para que le neguemos los servicios y productos
        que solicita o contrata con nosotros.
      </p>

      <h2 className="text-2xl  text-red-600 mb-6">
        Datos Personales Sensibles
      </h2>
      <p className="text-[13px] mb-4">
        Además de los datos personales mencionados anteriormente, para las
        finalidades informadas en el presente aviso de privacidad utilizaremos
        los siguientes datos personales considerados como sensibles, que
        requieren de especial protección:
      </p>
      <ul className="text-[13px] leading-loose mb-4 ">
        <li>Estado de salud físico presente, pasado o futuro</li>
        <li>Estado de salud mental presente, pasado o futuro</li>
        <li>Información genética</li>
      </ul>

      <h2 className="text-2xl  text-red-600 mb-6">
        Transferencias con Consentimiento
      </h2>
      <p className="text-[13px] mb-4">
        Con relación a las transferencias que requieren de su consentimiento, si
        usted a continuación no manifiesta su negativa para que estas ocurran,
        entenderemos que nos lo ha otorgado:
      </p>

      <h2 className="text-2xl  text-red-600 mb-4">
        ¿Cómo puede acceder, rectificar o cancelar sus datos personales, u
        oponerse a su uso?
      </h2>
      <p className="text-[13px] mb-4">
        Usted tiene derecho a conocer qué datos personales tenemos de usted,
        para qué los utilizamos y las condiciones del uso que les damos
        (Acceso). Asimismo, es su derecho solicitar la corrección de su
        información personal en caso de que esté desactualizada, sea inexacta o
        incompleta (Rectificación); que la eliminemos de nuestros registros o
        bases de datos cuando considere que la misma no está siendo utilizada
        adecuadamente (Cancelación); así como oponerse al uso de sus datos
        personales para fines específicos (Oposición).
      </p>
    </div>
  );
}
