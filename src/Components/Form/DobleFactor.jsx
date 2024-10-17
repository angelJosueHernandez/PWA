import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { message, Spin, Alert, Flex  } from 'antd';
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from '../Contexts/AuthContexts';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import LoginImg from '../../assets/img/p3.png';
import LoginImg2 from '../../assets/img/logo.png';
import './DobleFactor.css';
import { Button, Space, notification } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import OtpInput from '../InputOTP/Otp';
import Cookies from 'js-cookie';

export default function Doblefactor() {


  const { setIsAuthenticated, correoGuardar, setCorreoCookieUser, setIdCookieUser, setNombreCookieUser } = useAuth();
 
  //------------INPUT OTP--------------

  const length = 6; // Longitud predeterminada del OTP
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
  
    const newOtp = [...otp];
    newOtp[index] = value; // Actualizamos el valor en la posición correspondiente
    setOtp(newOtp);
  
    // Si el valor actual está completo y hay un siguiente input, enfocamos en el siguiente
    if (value.length === 1 && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  
    // Combinamos el código OTP completo
    combineOtp();
  };
  
  const handlePaste = (e) => {
    e.preventDefault(); // Evitar que se pegue el texto directamente en los campos de entrada
    const pasteData = e.clipboardData.getData("Text");
    const pasteArray = pasteData.split("").filter(char => !isNaN(char)); // Filtramos solo los dígitos
  
    const newOtp = [...otp];
  
    // Llenamos el nuevo arreglo con los dígitos del código OTP pegado
    pasteArray.forEach((char, index) => {
      if (index < length) {
        newOtp[index] = char;
      }
    });
  
    // Actualizamos el estado del OTP con el nuevo arreglo
    setOtp(newOtp);
  
    // Combinamos el código OTP completo
    combineOtp();
  };
  
 // Función para combinar el código OTP completo
const combineOtp = () => {
  const combinedOtp = otp.join(""); 
  setTokenUser(combinedOtp);//
 // console.log(setTokenUser) //Combinamos los dígitos del OTP en un solo string
  if (combinedOtp.length === length) {
    console.log("Código OTP completo:", combinedOtp);
    // Aquí puedes realizar cualquier acción que necesites con el código OTP completo
  }
};

// Efecto secundario para combinar el código OTP completo cada vez que cambia
useEffect(() => {
  combineOtp();
}, [otp]);


  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // opcional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };





  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Mover el foco al campo de entrada anterior en retroceso
      combineOtp(); 
      inputRefs.current[index - 1].focus();
    } else if (e.key === "Tab" && index < length - 1) {
      // Mover al siguiente campo de entrada al presionar la tecla Tab
      inputRefs.current[index + 1].focus();
    }
  };





  //////////////////////////----------------------------


  function  getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Verifica si la cookie actual comienza con el nombre proporcionado
        if (cookie.startsWith(name + '=')) {
            // Retorna el valor de la cookie
            return cookie.substring(name.length + 1);
        }
    }
    // Si no se encuentra la cookie, retorna null
    return null;
}



const correo = correoGuardar;
const [spinning, setSpinning] = React.useState(false);
const showLoader = () => {
  setSpinning(true);
  setTimeout(() => {
    setSpinning(false);
  }, 5000);
};

  const navigate = useNavigate();
  const [tokenUser, setTokenUser] = useState('');
  const [tokenError, setTokenError] = useState('');
  const captcha = useRef(null);


  

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const captchaValue = captcha.current.getValue();
  
    if (!captchaValue) {
      message.warning({
        content: 'Por favor, Realiza el captcha para proseguir.',
        duration: 2, // Duración en segundos antes de que el mensaje desaparezca automáticamente
        style: {
          marginTop: '70px', // Ajusta la distancia vertical desde la parte superior
          marginRight: '-990px', // Ajusta la distancia horizontal desde el borde derecho
        },
      });
      return;
    }
  
   const validado = validateToken(tokenUser);
    if (validado == true) {
      
      const requestBody = {
        correo: correoGuardar,
        tokenUsuario: tokenUser
      };
  
      fetch(`https://api-beta-mocha-59.vercel.app/verificacionTokenIdentificacion/${encodeURIComponent(correoGuardar)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody),
        credentials: 'include'
      })
        .then(response => response.json())
        .then(result => {
          if (result.mensaje === "El token de verificación es válido") {

          /**   const token = Cookies.get('jwt');
            
           //const token = Cookies.get('jwt');
            let nombre; // Declarar la variable fuera de try
            let Authenticated;
            let id;
            let correo;
            if (token) {
              try {
                // Decodifica el token JWT
                const decodedToken = jwtDecode(token);
                nombre = decodedToken.nombre
                Authenticated =decodedToken.IsAuthenticated 
                correo = decodedToken.correo
                id = decodedToken.id
 */

                const token = result.token;
                Cookies.set('jwt', token, { secure: true, sameSite: 'None' });
          
                let nombre;
                let Authenticated;
                let id;
                let correo;
               
                if (token) {
                  try {
                    const decodedToken = jwtDecode(token);
                    nombre = decodedToken.nombre;
                    Authenticated = decodedToken.IsAuthenticated;
                    correo = decodedToken.correo;
                    id = decodedToken.id;
              } catch (error) {
                console.error('Error al decodificar el token JWT:', error);
                // Maneja el error según sea necesario
              }
            } else {
              console.error('No se encontró la cookie "jwt"');
              // Maneja el caso en que no se encuentra la cookie según sea necesario
            }
            
            showLoader();
            
            setTimeout(() => {
              if (nombre) { // Comprueba si nombre tiene un valor válido
                message.success(`Autenticación exitosa. Bienvenido, ${nombre}`, 2);
              } else {
                message.success('Autenticación exitosa', 2);
              }
              navigate('/');
              setIsAuthenticated(Authenticated);
              setCorreoCookieUser(correo);
              setIdCookieUser(id);
              setNombreCookieUser(nombre);
            }, 2000);
            
          }  else if (result.mensaje === "El token de verificación es inválido") {
            message.error('El token de verificación es inválido');
          }
          else if (result.mensaje === "El token de verificación ha expirado") {
            message.error('El token de verificación ha expirado');
          }
        })
        .catch(error => {
          console.error('Error al Verificar la Identidad:', error);
          message.error('Error al Verificar la Identidad, intenta de nuevo más tarde.');
        });
    } else if (validado == false){
        message.warning('Favor de rectificar los datos');
    }
    else {
      console.log('Formulario no válido');
      message.warning('Favor de Rectificar sus datos');
    }
  };
    
 
  const validateToken = (tokenUser) => {
    if (tokenUser === '') {
      setTokenError('No puede estar vacío');
    } else if (tokenUser.length >= 6) {
        setTokenError('');
      return true;
    } else {
        setTokenError('El token debe contener 6 caracteres');
      return false;
    }
  };

  const handleChangeCaptcha = () => {
    
    const captchaValue = captcha.current.getValue();
    if (captchaValue) {
      console.log("éxito");
    }
  };

  const [errorPresent, setErrorPresent] = useState(false);

  useEffect(() => {
    const anyError = Boolean(tokenUser);
    setErrorPresent(anyError);
  }, [tokenUser]);

  const containerClass = `container2 ${errorPresent ? 'error-present' : ''}`;

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };






  const [remainingTime, setRemainingTime] = useState(60); // 1 minuto en segundos
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [hasExpiredOnce, setHasExpiredOnce] = useState(false); 

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (remainingTime <= 0 && !hasExpiredOnce) {
      setIsResendEnabled(true);
      setHasExpiredOnce(true); // Marcar que ha expirado una vez

      // Llamar a la ruta para actualizar el token solo si remainingTime llega a 0
      fetch("/actualizarToken", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ correo: correoGuardar })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log('EXPIRADO');
        // Puedes agregar cualquier manejo adicional aquí después de actualizar el token
      })
      .catch(error => {
        console.error('Error al actualizar el token:', error);
        // Maneja los errores según sea necesario
      });
    }
  }, [remainingTime, hasExpiredOnce]);



  
  const handleResend = () => {
    const requestBody = {
      correo: correoGuardar
    };
  
    fetch(
      `https://api-beta-mocha-59.vercel.app/enviarverificacionCorreo/${encodeURIComponent(correoGuardar)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      }
    )
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al enviar el correo de verificación'); // Manejar errores de solicitud HTTP
      }
      console.log('Correo de verificación enviado exitosamente');
      setRemainingTime(60);
    setIsResendEnabled(false);
    setHasExpiredOnce(false);
      // Puedes agregar aquí cualquier manejo adicional después de enviar el correo
    })
    .catch(error => {
      console.error('Error al enviar el correo de verificación:', error); // Manejar errores de red o del servidor
      // Puedes mostrar un mensaje de error al usuario u otro tipo de manejo de errores
    });
  };
  

  return (
    <div className={containerClass} id="container">
         <Spin spinning={spinning} fullscreen />
      <div className="form-container sign-in">
   
        <form onSubmit={handleSubmit}>

          <h3 className='title-form'>Verificacion Doble Factor</h3>
          <span>Favor de introducir el Token que fue enviado a <strong>{correo}</strong> . En caso de que no le haya llegado revise su span o recargue su bandeja de recibidos, agredecemos su cooperacion.</span>

          <div className="otp-container">
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            type="text"
            ref={(input) => (inputRefs.current[index] = input)}
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={(e) => handlePaste(e)} // Manejar el pegado
            className="otpInput"
          />
        );
      })}
    </div>

          {isResendEnabled ? (
  <button type='button' className="button5" onClick={handleResend} disabled={!isResendEnabled}>
    Volver a enviar token
  </button>
) : (
  <span>{`Volver a enviar token en ${Math.floor(remainingTime / 60)}:${remainingTime % 60}`}</span>
)}


 
          <div className='cont-remen'>
            <ReCAPTCHA
              ref={captcha}
              //sitekey=6Le7_38pAAAAAGL9nCevqF8KzHl6qzULlBArgfMb
             sitekey="6Le7_38pAAAAAGL9nCevqF8KzHl6qzULlBArgfMb"
              onChange={handleChangeCaptcha}
            />
          </div>
         
          <button className='button2' type="submit" >Verificar</button>

          <img src={LoginImg} className='img-Login' alt="" />
          <div className="feature-border container"></div>
          <h4 className='title-form2'>Juntos Hacemos la Diferencia</h4>
          <img src={LoginImg2} className='img-Login4' alt="" />
        </form>
      </div>
    </div>
  );
}




{/* <div className="sm:col-span-4">
              <label htmlFor="tokenUser" className="block text-sm font-medium leading text-gray-900">Token</label>
              <div className="mt-3">
                <input
                  id="tokenUser"
                  name="tokenUser"
                  value={tokenUser}
                  onChange={(e) => setTokenUser(e.target.value)}
                  onBlur={() => validateToken(tokenUser)}
                  required
                  type="text"
                  autoComplete="tokenUser"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${tokenError ? 'input-error' : ''}`} />
              </div>
              <div className="erroresInicio">
              {tokenError && <p className="error-messageInicio absolute  left-30">{tokenError}</p>}
              </div>

            </div> */}