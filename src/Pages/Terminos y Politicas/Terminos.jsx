import React from 'react';

export default function Terminos() {
  return (
    <div className="max-w-2xl mx-auto p-6 ">
      <h1 className="lg:text-3xl font-bold text-red-700 mb-4">Términos y Condiciones de la Aplicación Web de la Cruz Roja en Huejutla de Reyes</h1>
      <p className="text-[13px] mb-4"><strong>Fecha de última actualización:</strong> 15/11/2023</p>

      {/* Todo el contenido en una sola sección */}
      <section className="mb-4">
        <h2 className="text-2xl  mb-4 text-red-600 mb-1">1. Identificación de la Empresa y Datos de Contacto:</h2>
        <p className="text-[13px] mb-4">La aplicación web es propiedad de Cruz Roja sede en Huejutla de Reyes, una entidad sin ánimo de lucro dedicada a la prestación de servicios de asistencia médica.</p>
        <p className="text-[13px] mb-4"><strong>Datos de Contacto:</strong></p>
        <ul className=" text-[13px] leading-loose list-disc pl-4 text-[13px] mb-4">
          <li>Vía correo electrónico: <a href="mailto:jestrada@cruzrojamexicana.org.mx" className="text-red-500 underline">jestrada@cruzrojamexicana.org.mx</a></li>
          <li>A través del número de teléfono: 5510844519</li>
          <li>A través de este <a href="#" className="text-red-500 underline">enlace</a></li>
          <li>A través de esta dirección: Calle Nuevo León, colonia Santa Irene, ciudad Huejutla de Reyes, CP. 43000, en la entidad de Hidalgo.</li>
        </ul>

        <h2 className="text-2xl  mb-4  text-red-600 mb-1">2. Descripción del Servicio:</h2>
        <p className="text-[13px] mb-4">La aplicación web brinda acceso a servicios esenciales relacionados con la asistencia médica. Los usuarios pueden realizar actividades como el registro en la plataforma, contratación de ambulancias (servicio de pago), y solicitud de citas en línea.</p>

        <h2 className="text-2xl  mb-4  text-red-600 mb-1">3. Asignación de Riesgos, Responsabilidad y Descargos de Responsabilidad:</h2>
        <p className="text-[13px] mb-4">Los usuarios reconocen que el uso de la aplicación y sus servicios conlleva riesgos inherentes. La Cruz Roja no asume responsabilidad por pérdidas, daños o consecuencias derivadas del uso de la aplicación, excepto en casos de negligencia grave.</p>

        <h2 className="text-2xl  mb-4  text-red-600 mb-1">4. Garantía:</h2>
        <p className="text-[13px] mb-4">Dada la naturaleza crítica de los servicios, no se ofrece garantía explícita. La Cruz Roja se esfuerza por proporcionar servicios de alta calidad, pero no garantiza la ausencia total de errores o interrupciones.</p>

        <h2 className="text-2xl  mb-4  text-red-600 mb-1">5. Derecho de Desistimiento:</h2>
        <p className="text-[13px] mb-4">Debido a la urgencia y criticidad de los servicios, no se contempla un derecho de desistimiento.</p>

        <h2 className="text-2xl  mb-4  text-red-600 mb-1">6. Información de Seguridad:</h2>
        <p className="text-[13px] mb-4">Los usuarios recibirán instrucciones detalladas sobre el uso adecuado de la aplicación, especialmente en lo que respecta a la manipulación de información médica sensible y el manejo de situaciones de emergencia.</p>

        <h2 className="text-2xl  mb-4  text-red-600 mb-1">7. Condiciones de Entrega del Producto/Servicio:</h2>
        <p className="text-[13px] mb-4">Dado que la aplicación se centra en servicios en línea, no aplican condiciones de entrega de productos físicos. Para la contratación de ambulancias, se establecerán condiciones específicas de servicio durante el proceso de contratación.</p>

        <h2 className="text-2xl  mb-4  text-red-600 mb-1">8. Derechos de Uso:</h2>
        <p className="text-[13px] mb-4">La Cruz Roja retiene todos los derechos de propiedad y uso de la aplicación y sus contenidos. Los usuarios tienen derecho a utilizar la aplicación de acuerdo con los términos establecidos en estos Términos y Condiciones.</p>

        <h2 className="text-2xl  mb-4  text-red-600 mb-1">9. Condiciones de Uso o de Compra:</h2>
        <p className="text-[13px] mb-4">La contratación de ambulancias es un servicio de pago. Los usuarios deben cumplir con las condiciones de compra y pago establecidas durante el proceso de contratación.</p>

        <h2 className="text-2xl  mb-4  text-red-600 mb-1">10. Política de Reembolsos, Cambios o Cese del Servicio:</h2>
        <p className="text-[13px] mb-4">Se aplicarán políticas y procedimientos detallados sobre reembolsos, cambios en servicios y el cese de los mismos, según corresponda.</p>

        <h2 className="text-2xl  mb-4  text-red-600 mb-1">11. Información Relativa a Métodos de Pago:</h2>
        <p className="text-[13px] mb-4">En el caso de la contratación de ambulancias u otros servicios de pago, se proporcionará información detallada sobre los métodos de pago aceptados.</p>

        <h2 className="text-2xl  mb-4  text-red-600 mb-1">12. Canales Postventa:</h2>
        <p className="text-[13px] mb-4">Para consultas postventa relacionadas con la contratación de ambulancias u otros servicios, los usuarios pueden ponerse en contacto a través de [Canales de Comunicación Postventa].</p>

        <h2 className="text-2xl  mb-4  text-red-600 mb-1">13. Propiedad Intelectual:</h2>
        <p className="text-[13px] mb-4">La Cruz Roja retiene los derechos de propiedad intelectual sobre la aplicación y sus contenidos. La reproducción no autorizada está prohibida.</p>

        <h2 className="text-2xl  mb-4  text-red-600 mb-1">14. Marco Legal:</h2>
        <p className="text-[13px] mb-4">Estos Términos y Condiciones se rigen por las leyes de [Jurisdicción]. Cualquier disputa se resolverá mediante arbitraje de conformidad con las normas de arbitraje de [Institución de Arbitraje].</p>

        <h2 className="text-2xl  mb-4  text-red-600 mb-1">15. Condiciones Adicionales Aplicables:</h2>
        <p className="text-[13px] mb-4">Para servicios específicos dentro de la aplicación que requieran condiciones adicionales, dichas condiciones se detallarán y aplicarán según corresponda.</p>

        <p className='text-[13px] mb-4'>Al utilizar la aplicación, los usuarios aceptan cumplir con estos Términos y Condiciones. La Cruz Roja se reserva el derecho de modificar estos términos en cualquier momento y notificará a los usuarios sobre cualquier cambio significativo.</p>
      </section>
    </div>
  );
}
