  import React, { useState, useEffect, useRef } from 'react';
  import ReactDOM from 'react-dom';
  import './styles.css';

  import ReCAPTCHA from "react-google-recaptcha";
  import p1 from "../../assets/img/Servicios/paypal.png"; 
  import p2 from "../../assets/img/Servicios/desastres.jpeg"; 
  import p3 from "../../assets/img/Servicios/medico.png"; 
  import p4 from "../../assets/img/Servicios/work-5.jpeg"; 
  import p5 from "../../assets/img/Servicios/work-6.jpeg"; 
  import p6 from "../../assets/img/Servicios/work-7.jpeg"; 
  import p7 from "../../assets/img/Servicios/work-8.jpeg"; 
  import p8 from "../../assets/img/Servicios/work-3.jpeg"; 



  const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

  export default function Donaciones() {


    const captcha = useRef(null); 


    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

 

    useEffect(() => {
      setIsDisabled(error || amount === '');
    }, [error, amount]);

    const createOrder = (data, actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: amount
            }
          }
        ]
      });
    };

    const onApprove = (data, actions) => {
      return actions.order.capture().then(details => {
        alert(`Donación recibida: $${amount}`);
        setAmount('');
      });
    };




    const [nombre,setNombre]= useState('')
  const [ApellidoP,setApellidoP]= useState('')
  const [ApellidoM,setApellidoM]= useState('')
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');


  ///mensajes de error
  const [emailError, setEmailError] = useState('');
  const [telefonoError, setTelefonoError] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [apellidoMError, setApellidoMError] = useState('');
  const [apellidoPError, setApellidoPError] = useState('');


  const success = async () => {
    message.loading({ content: 'Verificando datos..', duration: 2 });
    return new Promise((resolve) => {
      setTimeout(() => {
        message.success({ content: 'Datos correctos', duration: 2 });
        resolve(true); // Resuelve la promesa con true después de que se complete la animación
      }, 1700); // Ajusta este valor según sea necesario
    });
  };



 



  // Estados para saber si un campo ha sido tocado
  const [nombreTouched, setNombreTouched] = useState(false);
  const [apellidoPTouched, setApellidoPTouched] = useState(false);
  const [apellidoMTouched, setApellidoMTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [telefonoTouched, setTelefonoTouched] = useState(false);
  const [amountTouched, setAmountTouched] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);


 // Funciones de validación
 const validateNombre = (nombre) => {
 setNombreTouched(true)
  if (nombre === '') {
    setNombreError('No puede estar vacío');
    return false;
  } else if (nombre.length < 2) {
    setNombreError('Mínimo de 2 caracteres');
    return false;
  } else {
    const nombreRegex = /^[a-zA-Z\s]+$/;
    if (nombreRegex.test(nombre)) {
      setNombreError('');
      return true;
    } else {
      setNombreError('No puede contener números');
      return false;
    }
  }
}

const validateApellidoP = (ApellidoP) => {
  setApellidoPTouched(true)
  if (ApellidoP === '') {
    setApellidoPError('No puede estar vacío');
    return false;
  } else if (ApellidoP.length < 3) {
    setApellidoPError('Mínimo de 3 caracteres');
    return false;
  } else {
    const apellidoRegex = /^[a-zA-Z\s]+$/;
    if (apellidoRegex.test(ApellidoP)) {
      setApellidoPError('');
      return true;
    } else {
      setApellidoPError('No puede contener números');
      return false;
    }
  }
}

const validateApellidoM = (ApellidoM) => {
  setApellidoMTouched(true)
  if (ApellidoM === '') {
    setApellidoMError('No puede estar vacío');
    return false;
  } else if (ApellidoM.length < 3) {
    setApellidoMError('Mínimo de 3 caracteres');
    return false;
  } else {
    const apellidoRegex = /^[a-zA-Z\s]+$/;
    if (apellidoRegex.test(ApellidoM)) {
      setApellidoMError('');
      return true;
    } else {
      setApellidoMError('No puede contener números');
      return false;
    }
  }
}

const validateEmail = (email) => {
 setEmailTouched(true)
  if (email === '') {
    setEmailError('No puede estar vacío');
    return false;
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setEmailError('');
      return true;
    } else {
      setEmailError('Correo electrónico no válido');
      return false;
    }
  }
}

const validateTelefono = (telefono) => {
  setTelefonoTouched(true);
  const telefonoRegex = /^[0-9]{10}$/;
  if (telefono === '') {
    setTelefonoError('El campo no puede estar vacío');
    return false;
  } else if (!telefonoRegex.test(telefono)) {
    setTelefonoError('El número de teléfono debe tener  10 digitos, no se aceptan letras');
    return false;
  } else {
    setTelefonoError('');
    return true;
  }
};


const handleAmountChange = (e) => {
  const value = e.target.value;
  setAmount(value);
  setAmountTouched(true);
  if (value === '') {
    setError('');
  } else if (parseFloat(value) <= 0 || isNaN(parseFloat(value))) {
    setError('Por favor, ingresa una cifra válida.');
  } else {
    setError('');
  }
}

const checkFormValidity = () => {
  const isValid = 
    validateNombre(nombre) &&
    validateApellidoP(ApellidoP) &&
    validateApellidoM(ApellidoM) &&
    validateEmail(email) &&
    validateTelefono(telefono) &&
    amount !== '' &&
    !error &&
    isCaptchaVerified;
  
  setIsFormValid(isValid);
}

useEffect(() => {
  checkFormValidity();
}, [nombre, ApellidoP, ApellidoM, email, telefono, amount, error, isCaptchaVerified]);

const handleChangeCaptcha = () => {
  const captchaValue = captcha.current.getValue();
  setIsCaptchaVerified(!!captchaValue);
  checkFormValidity(); // Llamamos a checkFormValidity aquí también
}


    return (
      <div className="relative overflow-hidden bg-white">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-1 lg:pt-15">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Haz la Diferencia Hoy
              </h1>
              <p className="mt-4 text-[15px] text-gray-500">
                Tu generosidad puede salvar vidas. Únete a nuestra misión y ayuda a aquellos que más lo necesitan.
              </p>
            </div>
            <div className="mt-10">
            <form className="space-y-3 max-w-lg mx-auto sm:ml-[-5px] formDona">
  <div className="grid grid-cols-2 gap-4">
   
  <div>
      <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
        Nombre
      </label>
      <input
      type="text"
      id="nombre"
      name="nombre"
      value={nombre}
      onChange={(e) => {
        setNombre(e.target.value);
        validateNombre(e.target.value);
      }}
      onBlur={() => validateNombre(nombre)}
      className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      required
    />
      {nombreError && <p className="mt-1 text-xs error-message ">{nombreError}</p>}
    </div>

    <div>
      <label htmlFor="ApellidoP" className="block text-sm font-medium text-gray-700">
        Apellido Paterno
      </label>
      <input
        type="text"
        id="ApellidoP"
        name="ApellidoP"
        value={ApellidoP}
        onChange={(e) =>{
          setApellidoP(e.target.value);
          validateApellidoP(e.target.value);
         } }
        onBlur={() => validateApellidoP(ApellidoP)}
        className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        required
      />
      {apellidoPError && <p className="mt-1 text-xs error-message">{apellidoPError}</p>}
    </div>
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div>
      <label htmlFor="ApellidoM" className="block text-sm font-medium text-gray-700">
        Apellido Materno
      </label>
      <input
        type="text"
        id="ApellidoM"
        name="ApellidoM"
        value={ApellidoM}
        onChange={(e) =>{
          setApellidoM(e.target.value);
          validateApellidoM(e.target.value);
        } }
        onBlur={() => validateApellidoM(ApellidoM)}
        className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        required
      />
      {apellidoMError && <p className="mt-1 text-xs error-message">{apellidoMError}</p>}
    </div>

    <div>
      <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
        Teléfono
      </label>
      <input
        type="text"
        id="telefono"
        name="telefono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        onBlur={() => validateTelefono(telefono)}
        className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        required
      />
      {telefonoError && <p className="mt-1 text-xs error-message">{telefonoError}</p>}
    </div>
  </div>

  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
      Correo
    </label>
    <input
      type="email"
      id="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onBlur={() => validateEmail(email)}
      className="mt-1 block w-[300px] px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      required
    />
    {emailError && <p className="mt-1 text-xs error-message">{emailError}</p>}
  </div>

  <div className="sm:col-span-1">
    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
      Monto de la donación
    </label>
    <input
      type="number"
      id="amount"
      name="amount"
      value={amount}
      onChange={handleAmountChange}
      className="mt-1 block w-[100px]  px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      required
    />
    {error && <p className="mt-1 text-xs error-message">{error}</p>}
  </div>
<center>
  <div className="mt-6">
    <ReCAPTCHA
      ref={captcha}
       //sitekey=6LfXgm0pAAAAAA6yN5NyGT_RfPXZ_NLXu1eNoaQf    
       sitekey="6LfXgm0pAAAAAA6yN5NyGT_RfPXZ_NLXu1eNoaQf    "
      onChange={handleChangeCaptcha}
    />
  </div>
  </center>
  <div className="mt-6 paypal-button-container">
  <div style={{ pointerEvents: isFormValid ? 'auto' : 'none', opacity: isFormValid ? 1 : 0.5 }}>
    <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      onError={(err) => console.error(err)}
      style={{
        layout: 'vertical',
        shape: 'rect',
        label: 'paypal',
      }}
    />
  </div>
</div>
</form>
            </div>
            <div className="mt-10">
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          alt=""
                          src={p2}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src={p3}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src={p8}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src={p7}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src={p6}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src={p5}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src={p4}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
