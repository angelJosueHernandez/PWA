import React from 'react';

export default function PoliCokkies() {
    const cookiesData = [
        { nombre: '__utma', tipo: 'De Terceros (Google Analytics)', caducidad: '2 años', finalidad: 'Se usa para distinguir usuarios y sesiones.', clase: 'No Exenta' },
        { nombre: '__utmb', tipo: 'De Terceros (Google Analytics)', caducidad: '30 minutos', finalidad: 'Se usa para determinar nuevas sesiones o visitas.', clase: 'No Exenta' },
        { nombre: '__utmc', tipo: 'De Terceros (Google Analytics)', caducidad: 'Al finalizar la sesión', finalidad: 'Se configura para su uso con Urchin.', clase: 'No Exenta' },
        { nombre: '__utmz', tipo: 'De Terceros (Google Analytics)', caducidad: '6 meses', finalidad: 'Almacena el origen o la campaña que explica cómo el usuario ha llegado hasta la página web.', clase: 'No Exenta' },
    ];

    return (
        <div className="max-w-5xl mx-auto p-6 ">
            <h1 className="text-3xl font-bold text-red-700 mb-4">Política de Cookies</h1>
            <p  className=" text-[13px] mb-4">Actualizado en 14 de noviembre de 2023.</p>

            <h2 className="text-2xl  text-red-600 mb-4">Definiciones y términos clave</h2>
            <p className="text-[13px] mb-4">
                Para ayudar a explicar lo más claramente posible esta Política de Cookies, cada vez que alguno de estos términos está referenciado, están estrictamente definidos como:
            </p>
            <ul className="list-disc pl-6 text-[13px] mb-6 text-[13px] leading-loose">
                <li><strong>Cookie:</strong> pequeña cantidad de datos generados por un sitio web y guardados por su navegador web. Se utiliza para identificar su navegador, proporcionar análisis, recordar información sobre usted, como su preferencia de idioma o información de inicio de sesión.</li>
                <li><strong>Empresa:</strong> cuando esta política menciona "Empresa", "nosotros", "nos"/o "nuestro", se refiere a [Tu Empresa], que es responsable de su información según esta Política de Cookies.</li>
                <li><strong>Dispositivo:</strong> cualquier dispositivo conectado a Internet, como un teléfono, tableta, computadora o cualquier otro dispositivo que se puede utilizar para visitar y utilizar los servicios.</li>
                <li><strong>Dato Personal:</strong> cualquier información que directa, indirectamente o en conexión con otra información, incluido un número de identificación personal, permite la identificación o identificabilidad de una persona natural.</li>
                <li><strong>Servicio:</strong> se refiere al servicio prestado por [Tu Empresa], según se describe en los términos relativos (si están disponibles) y en esta plataforma.</li>
                <li><strong>Servicio de terceros:</strong> se refiere a anunciantes, patrocinadores de concursos, promocionales y de marketing, socios y otras personas que proporcionan nuestro contenido o cuyos productos o servicios creemos que pueden interesarte.</li>
                <li><strong>App/Aplicación:</strong> se refiere al PRODUCTO DE SOFTWARE identificado anteriormente.</li>
                <li><strong>Usted:</strong> una persona o entidad que está registrada para utilizar los Servicios.</li>
            </ul>

            <h2 className="text-2xl  text-red-600 mb-4">Introducción</h2>
            <p className="text-[13px] mb-4">
                Esta Política de cookies explica cómo [Tu Empresa] y sus afiliados (colectivamente "nosotros", "nos" y "nuestro"), utilizamos cookies y tecnologías similares para reconocerlo cuando visita nuestra aplicación. Explica qué son estas tecnologías y por qué las utilizamos, así como las opciones sobre cómo controlarlos.
            </p>

            <h2 className="text-2xl  text-red-600 mb-4">¿Qué es una cookie?</h2>
            <p className="text-[13px] mb-6">
                Una cookie es un pequeño archivo de texto que se almacena en su computadora u otro dispositivo conectado a Internet para identificar su navegador, proporcionar análisis, recordar información sobre usted, como su preferencia de idioma o información de inicio de sesión. Son completamente seguros y no se pueden usar para correr programas o enviar virus a su dispositivo.
            </p>

            <h2 className="text-2xl  text-red-600 mb-4">¿Por qué utilizamos cookies?</h2>
            <p className="text-[13px] mb-4">Utilizamos cookies propias y/o de terceros en nuestra aplicación para diversos fines, tales como:</p>
            <ul className=" text-[13px] leading-loose list-disc pl-6 text-[13px] mb-6">
                <li>Para facilitar el funcionamiento y la funcionalidad de nuestra aplicación;</li>
                <li>Para mejorar su experiencia con nuestra aplicación y hacer que la navegación por ellas sea más rápida y más fácil;</li>
                <li>Para permitirnos crear una experiencia de usuario personalizada para usted;</li>
                <li>Analizar cómo se utiliza nuestra aplicación y cuál es la mejor manera de personalizarla;</li>
                <li>Identificar perspectivas de futuro y personalizar las interacciones de marketing y ventas con ellas;</li>
                <li>Para facilitar la adaptación de la publicidad en línea a sus intereses.</li>
            </ul>

            <h2 className="text-2xl  text-red-600 mb-4">¿Qué tipo de cookies utiliza?</h2>
            <p className="text-[13px] mb-4">Las cookies pueden ser cookies de sesión o cookies persistentes. Una cookie de sesión caduca automáticamente cuando cierra su navegador.</p>

            <h2 className="text-2xl  text-red-600 mb-4">Cookies esenciales</h2>
            <p className="text-[13px] mb-4">
                Utilizamos cookies esenciales para que nuestra aplicación funcione. Estas cookies son estrictamente necesarias para permitir funcionalidades como seguridad y administración de red.
            </p>

            <h2 className="text-2xl  text-red-600 mb-4">Cookies de marketing</h2>
            <p className="text-[13px] mb-4">Estas cookies de marketing basadas en cuentas nos permiten identificar prospectos futuros y personalizar interacciones de ventas y marketing con ellos.</p>

            <h2 className="text-2xl  text-red-600 mb-4">Cookies de análisis y personalización</h2>
            <p className="text-[13px] mb-6">Estas cookies recopilan información que se utiliza para ayudarnos a comprender cómo se utiliza nuestra aplicación o qué tan efectivas son nuestras campañas de marketing.</p>

            <h2 className="text-2xl  text-red-600 mb-4">Cookies de redes sociales</h2>
            <p className="text-[13px] mb-6">
                Estas cookies se utilizan cuando usted comparte información usando un botón para compartir en las redes sociales o "me gusta" en nuestro Sitio o vincula su cuenta o interactúa con nuestro contenido.
            </p>

            <h2 className="text-2xl  text-red-600 mb-4">¿Cómo se pueden gestionar las cookies?</h2>
            <p className="text-[13px] mb-4">
                La mayoría de los navegadores le permiten controlar las cookies a través de sus preferencias de "configuración". Sin embargo, si usted limita la capacidad de los sitios web para configurar cookies, puede empeorar su experiencia general de usuario.
            </p>

            <h2 className="text-2xl  text-red-600 mb-4">Bloquear y deshabilitar cookies</h2>
            <p className="text-[13px] mb-6">
                Donde quiera que esté, también puede configurar su navegador para bloquear cookies y tecnologías similares. Sin embargo, esta acción puede bloquear nuestras cookies esenciales y afectar el funcionamiento de nuestra aplicación.
            </p>

            <h2 className="text-2xl  text-red-600 mb-4">Cambios a Nuestra Política de Cookies</h2>
            <p className="text-[13px] mb-6">
                Podemos cambiar nuestro Servicio y nuestras políticas, y es posible que necesitemos realizar cambios en esta Política de Cookies para que reflejen con precisión nuestro Servicio y nuestras políticas.
            </p>

            <h2 className="text-2xl  text-red-600 mb-4">Tu consentimiento</h2>
            <p className="text-[13px] mb-6">
                Al utilizar nuestra aplicación, registrar una cuenta o realizar una compra, por la presente usted acepta nuestra Política de Cookies y acepta sus términos.
            </p>

            <h2 className="text-2xl  text-red-600 mb-4">Contáctenos</h2>
            <ul className=" text-[13px] leading-loose list-disc pl-6 text-[13px] mb-6">
                <li>Vía correo electrónico: <a href="mailto:jestrada@cruzrojamexicana.org.mx" className="text-red-500 underline">jestrada@cruzrojamexicana.org.mx</a></li>
                <li>A través del número de teléfono: 5510844519</li>
                <li>A través de esta dirección: Calle Nuevo León, colonia Santa Irene, ciudad Huejutla de Reyes, cp. 43000, en la entidad de Hidalgo.</li>
            </ul>
        </div>
    );
}
