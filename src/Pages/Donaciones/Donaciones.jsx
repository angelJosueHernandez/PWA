import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { message } from 'antd';
import { FaUserCircle } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { TfiMoney } from "react-icons/tfi";
import './styles.css';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ReCAPTCHA from 'react-google-recaptcha';
import p1 from '../../assets/img/Servicios/paypal.png';
import p2 from '../../assets/img/Servicios/desastres.jpeg';
import p3 from '../../assets/img/Servicios/medico.png';
import p4 from '../../assets/img/Servicios/work-5.jpeg';
import p5 from '../../assets/img/Servicios/work-6.jpeg';
import p6 from '../../assets/img/Servicios/work-7.jpeg';
import p7 from '../../assets/img/Servicios/work-8.jpeg';
import p8 from '../../assets/img/Servicios/work-3.jpeg';
import { PaymentElement } from '@stripe/react-stripe-js';
import { useAuth } from '../../Components/Contexts/AuthContexts';
import { useNavigate } from 'react-router-dom';



const stripePromise = loadStripe('pk_test_51QJQ5uDIWznX38uOqRNbGsjduSvo12H8NQBCqVdIMS3U28yXBQyk6TW8NReNgcZMWfQWayD2i2pXtFIvYJoIUsZf00eIziHzHG');

const CheckoutForm = ({ amount, clearForm, validateFields }) => {


  const navigate = useNavigate();

  const registrarDonacion = async () => {
    try {
      const response = await fetch("https://api-beta-mocha-59.vercel.app/registrarDonacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: correoGuardar, // El correo del usuario autenticado
          monto: amount, // El monto de la donación
        }),
      });
  
      if (response.ok) {
        message.success("Donación registrada exitosamente");
      } else {
        const errorData = await response.json();
        message.error(`Error al registrar la donación: ${errorData.mensaje}`);
      }
    } catch (error) {
      console.error("Error al registrar la donación:", error);
      message.error("Error al registrar la donación. Inténtalo más tarde.");
    }
  };

  
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { correoGuardar, isAuthenticated } = useAuth();
  const handleSubmitDonar = async (e) => {
    e.preventDefault();

     // Verificar si el usuario está autenticado
  if (!isAuthenticated) {
    message.warning("Debe iniciar sesión para realizar una donación.", 2);
    navigate("/Iniciar Sesion");
    return;
  }

    // Verificar que todos los campos estén completos y sin errores
    if (!validateFields()) {
      return;
    }

    // Validar que el monto sea mayor que cero
    if (!amount || amount <= 0) {
      message.error("Por favor, ingresa una cantidad válida para donar.");
      return;
    }

    setLoading(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (!error) {
        const { id } = paymentMethod;
        const response = await fetch("https://api-beta-mocha-59.vercel.app/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            amount: amount * 100,
          }),
        });

        if (!response.ok) {
          throw new Error("Error en la solicitud de pago");
        }

        const data = await response.json();
        console.log(data);
        elements.getElement(CardElement).clear();
        message.success("Pago exitoso");


          // Registrar la donación en tu API
          await registrarDonacion();
        // Limpiar el formulario después de un pago exitoso
        clearForm();
      } else {
        message.error("Error en la creación del método de pago");
      }
    } catch (error) {
      console.error("Error en la transacción:", error);
      message.error("Error en el pago: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmitDonar} className="w-full max-w-md mx-auto space-y-8 p-4">
      <div className="relative">
        <label className="block text-sm text-gray-700 mb-2">Datos de Tarjeta</label>
        <div className="p-3 bg-white shadow-md rounded-xl focus-within:ring-2 ring-red-500">
          <CardElement
            className="text-lg text-gray-800 placeholder-gray-400"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#2d3748',
                  '::placeholder': { color: '#a0aec0' },
                },
                invalid: { color: '#e53e3e' },
              },
            }}
          />
        </div>
      </div>

      <button
        disabled={!stripe || loading}
        type="submit"
        className="w-full py-3 text-lg font-semibold text-white bg-red-600 rounded-full shadow-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 transition-all duration-300 flex justify-center items-center"
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-white mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        ) : (
          "Donar Ahora"
        )}
      </button>
    </form>
  );
};




export default function Donaciones() {
  const [amount, setAmount] = useState('');
  const [nombre, setNombre] = useState('');
  const [ApellidoP, setApellidoP] = useState('');
  const [ApellidoM, setApellidoM] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');

  const [nombreError, setNombreError] = useState('');
  const [apellidoPError, setApellidoPError] = useState('');
  const [apellidoMError, setApellidoMError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [telefonoError, setTelefonoError] = useState('');
  const [amountError, setAmountError] = useState('');

  const validateNombre = (nombre) => {
    if (nombre === '') setNombreError('No puede estar vacío');
    else if (nombre.length < 2) setNombreError('Mínimo de 2 caracteres');
    else if (!/^[a-zA-Z\s]+$/.test(nombre)) setNombreError('No puede contener números');
    else setNombreError('');
  };

  const validateApellidoP = (ApellidoP) => {
    if (ApellidoP === '') setApellidoPError('No puede estar vacío');
    else if (ApellidoP.length < 3) setApellidoPError('Mínimo de 3 caracteres');
    else if (!/^[a-zA-Z\s]+$/.test(ApellidoP)) setApellidoPError('No puede contener números');
    else setApellidoPError('');
  };

  const validateApellidoM = (ApellidoM) => {
    if (ApellidoM === '') setApellidoMError('No puede estar vacío');
    else if (ApellidoM.length < 3) setApellidoMError('Mínimo de 3 caracteres');
    else if (!/^[a-zA-Z\s]+$/.test(ApellidoM)) setApellidoMError('No puede contener números');
    else setApellidoMError('');
  };

  const validateEmail = (email) => {
    if (email === '') setEmailError('No puede estar vacío');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) setEmailError('Correo electrónico no válido');
    else setEmailError('');
  };

  const validateTelefono = (telefono) => {
    if (telefono === '') setTelefonoError('No puede estar vacío');
    else if (!/^[0-9]{10}$/.test(telefono)) setTelefonoError('El número debe tener 10 dígitos');
    else setTelefonoError('');
  };


  const clearForm = () => {
    setAmount('');
    setNombre('');
    setApellidoP('');
    setApellidoM('');
    setEmail('');
    setTelefono('');
  };


  const validateFields = () => {
    // Ejecutar validación en cada campo
    validateNombre(nombre);
    validateApellidoP(ApellidoP);
    validateApellidoM(ApellidoM);
    validateEmail(email);
    validateTelefono(telefono);
    validateAmount(amount);

    // Verificar si hay algún error
    if (
      nombreError ||
      apellidoPError ||
      apellidoMError ||
      emailError ||
      telefonoError ||
      amountError
    ) {
      message.error("Por favor, complete todos los campos correctamente.");
      return false;
    }

    // Verificar que todos los campos estén completos
    if (!nombre || !ApellidoP || !ApellidoM || !email || !telefono || !amount) {
      message.error("Por favor, complete todos los campos.");
      return false;
    }

    return true;
  };



  const validateAmount = (amount) => {
    if (amount === '') setAmountError('No puede estar vacío');
    else if (parseFloat(amount) <= 0 || isNaN(parseFloat(amount))) setAmountError('Por favor, ingresa una cifra válida');
    else setAmountError('');
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    validateAmount(value);
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="relative overflow-hidden bg-white">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-1 lg:pt-15">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="space-y-4 max-w-lg mx-auto lg:ml-[1rem]">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Haz la Diferencia Hoy
              </h1>
              <p className="mt-4 text-[12px] lg:text-[14px] text-gray-500">
                Tu generosidad puede salvar vidas. Únete a nuestra misión y ayuda a aquellos que más lo necesitan.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                 
                <label htmlFor="nombre" className="block text-sm py-2 font-medium leading text-gray-700 flex items-center flex items-center">
                  <FaUserCircle className="text-red-500 mr-2" /> Nombre
                </label>

                  <input
                    id="nombre"
                    value={nombre}
                    onChange={(e) => {
                      setNombre(e.target.value);
                      validateNombre(e.target.value);
                    }}
                    className="mt-1  w-full px-4 py-1 text[10px] border bg-gray-100 rounded-[15px] shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                  {nombreError && <p className="mt-1 text-xs error-message">{nombreError}</p>}
                </div>
                <div>
                  <label htmlFor="ApellidoP" className="block text-sm py-2 font-medium leading text-gray-700 flex items-center">
                  <FaUserCircle className="text-red-500 mr-2" />  Apellido Paterno
                  </label>
                  <input
                    id="ApellidoP"
                    value={ApellidoP}
                    onChange={(e) => {
                      setApellidoP(e.target.value);
                      validateApellidoP(e.target.value);
                    }}
                    className="mt-1 w-full px-4 py-1 text[10px] border bg-gray-100 rounded-[15px] shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                  {apellidoPError && <p className="mt-1 text-xs error-message">{apellidoPError}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ApellidoM" className="block text-sm py-2 font-medium leading text-gray-700 flex items-center">
                  <FaUserCircle className="text-red-500 mr-2" />  Apellido Materno
                  </label>
                  <input
                    id="ApellidoM"
                    value={ApellidoM}
                    onChange={(e) => {
                      setApellidoM(e.target.value);
                      validateApellidoM(e.target.value);
                    }}
                    className="mt-1 w-full px-4 py-1 text[10px] border bg-gray-100 rounded-[15px] shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                  {apellidoMError && <p className="mt-1 text-xs error-message">{apellidoMError}</p>}
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-sm py-2 font-medium leading text-gray-700 flex items-center">
                  <FaPhone className="text-red-500 mr-2" />  Teléfono
                  </label>
                  <input
                    id="telefono"
                    value={telefono}
                    onChange={(e) => {
                      setTelefono(e.target.value);
                      validateTelefono(e.target.value);
                    }}
                    className="mt-1 w-3/4 px-4 py-1 text[10px] border bg-gray-100 rounded-[15px] shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                  {telefonoError && <p className="mt-1 text-xs error-message">{telefonoError}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm py-2 font-medium leading text-gray-700 flex items-center">
                <MdEmail className="text-red-500 mr-2" />  Correo Electrónico
                </label>
                <input
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                  className="mt-1 w-3/4 px-4 py-1 text[10px] border bg-gray-100 rounded-[15px] shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                {emailError && <p className="mt-1 text-xs error-message">{emailError}</p>}
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm py-2 font-medium leading text-gray-700 flex items-center">
                <TfiMoney className="text-red-500 mr-2" /> Introduzca el Monto a Donar en MXN 
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  className="mt-1 block w-[7rem] px-4 py-1 text-sm border bg-gray-100 rounded-[15px] shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                {amountError && <p className="mt-1 text-xs error-message">{amountError}</p>}
              </div>
              <div className="mt-6 paypal-button-container">
                <CheckoutForm amount={parseInt(amount) || 0} clearForm={clearForm} validateFields={validateFields} />
              </div>
            </div>

            {/* Imágenes de servicios */}
            <div className="mt-10">
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-4 sm:gap-y-6 lg:gap-y-8">
                      <div className="h-32 w-24 sm:h-48 sm:w-32 lg:h-64 lg:w-44 overflow-hidden rounded-lg">
                        <img alt="" src={p2} className="h-full w-full object-cover object-center" />
                      </div>
                      <div className="h-32 w-24 sm:h-48 sm:w-32 lg:h-64 lg:w-44 overflow-hidden rounded-lg">
                        <img alt="" src={p3} className="h-full w-full object-cover object-center" />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-4 sm:gap-y-6 lg:gap-y-8">
                      <div className="h-32 w-24 sm:h-48 sm:w-32 lg:h-64 lg:w-44 overflow-hidden rounded-lg">
                        <img alt="" src={p8} className="h-full w-full object-cover object-center" />
                      </div>
                      <div className="h-32 w-24 sm:h-48 sm:w-32 lg:h-64 lg:w-44 overflow-hidden rounded-lg">
                        <img alt="" src={p7} className="h-full w-full object-cover object-center" />
                      </div>
                      <div className="h-32 w-24 sm:h-48 sm:w-32 lg:h-64 lg:w-44 overflow-hidden rounded-lg">
                        <img alt="" src={p6} className="h-full w-full object-cover object-center" />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-4 sm:gap-y-6 lg:gap-y-8">
                      <div className="h-32 w-24 sm:h-48 sm:w-32 lg:h-64 lg:w-44 overflow-hidden rounded-lg">
                        <img alt="" src={p5} className="h-full w-full object-cover object-center" />
                      </div>
                      <div className="h-32 w-24 sm:h-48 sm:w-32 lg:h-64 lg:w-44 overflow-hidden rounded-lg">
                        <img alt="" src={p4} className="h-full w-full object-cover object-center" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Fin imágenes de servicios */}
          </div>
        </div>
      </div>
    </Elements>
  );
}
