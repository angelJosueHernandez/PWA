import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { message, Spin, Alert, Flex } from 'antd';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';
import ReCAPTCHA from 'react-google-recaptcha';
import { useAuth } from '../Contexts/AuthContexts';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import LoginImg from '../../assets/img/p3.png';
import LoginImg2 from '../../assets/img/logo.png';
import './Form.css';
import { Button, Space, notification } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

export default function Form() {

  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Nuevo estado para deshabilitar el botón

  const { setCorreoGuardar } = useAuth();

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const captcha = useRef(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const maxAttempts = 4;
  const encodedEmail = btoa(email);

  const handleSubmit = (event) => {
    event.preventDefault();
    validateEmail(email);
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

    setIsButtonDisabled(true); // Deshabilitar el botón al hacer clic
    setTimeout(() => setIsButtonDisabled(false), 10000); // Habilitar el botón después de 10 segundos

    if (attemptCount >= maxAttempts) {
      message.error(
        'Has excedido el límite de intentos. Tu cuenta ha sido bloqueada por seguridad.',
      );
      bloquearCuenta(email);
      return;
    }

    if (validateEmail(email) && validatePassword(password)) {
      const requestBody = {
        correo: email,
        contraseña: password,
      };

      fetch('https://api-beta-mocha-59.vercel.app/user/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.mensaje === 'Autenticación exitosa') {
            verificacionCorreoTokenEnviar(email);
            setCorreoGuardar(email);
            message.loading('Verficando...', 2);
            setTimeout(() => {
              navigate('/DobleFactor');
            }, 2200);
          } else if (
            result.mensaje ===
            'Este correo no coincide con ningún correo registrado'
          ) {
            message.error(
              'Este correo no coincide con ningún correo registrado',
            );
          } else {
            // Autenticación fallida
            if (result.mensaje === 'Tu cuenta está bloqueada') {
              message.loading('Verficando...', 1);
              setTimeout(() => {
                message.error(
                  'Tu cuenta está bloqueada. No puedes iniciar sesión.',
                );
              }, 1200);
            } else if (attemptCount < maxAttempts - 1) {
              message.loading('Verficando...', 1);
              setTimeout(() => {
                setAttemptCount((prevCount) => prevCount + 1);
                message.error(
                  `Contraseña incorrecta. Te quedan ${maxAttempts - attemptCount - 1} intentos.`,
                );
              }, 1200);
            } else {
              message.loading('Verficando...', 1);
              setTimeout(() => {
                message.error(
                  'Has excedido el límite de intentos. Tu cuenta ha sido bloqueada por seguridad.',
                );
                setAttemptCount(0);
                bloquearCuenta(email);
                NotiCuentaBloqueada(email);
              }, 1200);
            }
          }
        })
        .catch((error) => {
          console.error('Error al autenticar:', error);
          message.error(
            'Error al autenticar. Por favor, intenta de nuevo más tarde.',
          );
        });
    } else {
      console.log('Formulario no válido');
      message.warning('Para continuar Acomplete todo los campos');
    }
  };

  const bloquearCuenta = (email) => {
    const requestBody = {
      correo: email,
    };

    fetch(
      `https://api-beta-mocha-59.vercel.app/userCuenta/${encodeURIComponent(email)}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al bloquear la cuenta');
        }
        console.log('Cuenta bloqueada exitosamente');
      })
      .catch((error) => {
        console.error('Error al bloquear la cuenta:', error);
      });
  };

  const verificacionCorreoTokenEnviar = (email) => {
    const requestBody = {
      correo: email,
    };

    fetch(
      `https://api-beta-mocha-59.vercel.app/enviarverificacionCorreo/${encodeURIComponent(email)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al enviar el correo de verificación'); // Manejar errores de solicitud HTTP
        }
        console.log('Correo de verificación enviado exitosamente');
        // Puedes agregar aquí cualquier manejo adicional después de enviar el correo
      })
      .catch((error) => {
        console.error('Error al enviar el correo de verificación:', error); // Manejar errores de red o del servidor
        // Puedes mostrar un mensaje de error al usuario u otro tipo de manejo de errores
      });
  };

  const validateEmail = (email) => {
    if (!email) {
      setEmailError('No puede estar vacío');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Correo electrónico no válido');
      return false;
    }

    setEmailError('');
    return true;
  };

  const validatePassword = (password) => {
    if (password === '') {
      setPasswordError('No puede estar vacío');
    } else if (password.length >= 8) {
      setPasswordError('');
      return true;
    } else {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
      return false;
    }
  };

  const handleChangeCaptcha = () => {
    const captchaValue = captcha.current.getValue();
    if (captchaValue) {
      console.log('éxito');
    }
  };

  const [errorPresent, setErrorPresent] = useState(false);

  useEffect(() => {
    const anyError = Boolean(emailError || passwordError);
    setErrorPresent(anyError);
  }, [emailError, passwordError]);

  const containerClass = `container2 ${errorPresent ? 'error-present' : ''}`;

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const NotiCuentaBloqueada = (correo) => {
    const requestBody = {
      correo: correo,
    };

    fetch(
      'https://api-beta-mocha-59.vercel.app/notiCorreoCuentaBloqueada/' +
        encodeURIComponent(correo),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al recuperar la cuenta bloqueada');
        }
        console.log('Cuenta bloqueada recuperada exitosamente');
        // Puedes agregar aquí cualquier manejo adicional después de recuperar la cuenta
      })
      .catch((error) => {
        console.error('Error al recuperar la cuenta bloqueada:', error);
        // Puedes manejar el error de acuerdo a tus necesidades, como mostrar un mensaje al usuario
      });
  };

  const google = () => {};

  return (
    <div className={containerClass} id="container">
      <div className="form-containerLogin sign-in">
        <form role="form" onSubmit={handleSubmit}>
          <div className="tituloScreen">
            <h3 className="title-form titulo">Inicio de Sesión</h3>
          </div>

          <span className="span">Introduce tu Correo y Contraseña</span>
          <div className="mt-1 grid grid-cols-1 gap-x-1gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading text-gray-900"
              >
                Correo
              </label>
              <div className="mt-3">
                <input
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => validateEmail(email)}
                  required
                  autoComplete="email"
                  className={`correo block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${emailError ? 'input-error' : ''}`}
                />
              </div>
              <div className="InputsCon">
                <div className="erroresInicio" data-testid="error-container">
                  {emailError && (
                    <p className="error-messageInicio absolute  left-30">
                      {emailError}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-1 grid grid-cols-1 gap-x-1 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium contra leading text-gray-900"
              >
                Contraseña
              </label>
              <div className="mt-3 relative rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => validatePassword(password)}
                  type={showPassword ? '' : 'password'}
                  autoComplete="password"
                  className={`block w-full contrasena rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${passwordError ? 'input-error' : ''}`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 flex items-center text-gray-400 focus:outline-none verBoton"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <IoEyeSharp className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
              <div className="InputsCon2">
                <div className="erroresInicio">
                  {passwordError && (
                    <p className="error-messageInicio absolute  left-30">
                      {passwordError}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="cont-remenLogin">
            <ReCAPTCHA
              ref={captcha}
              sitekey="6LfXgm0pAAAAAA6yN5NyGT_RfPXZ_NLXu1eNoaQf"
              
              onChange={handleChangeCaptcha}
            />
          </div>
          <div className="olvidaste">
            <Link to={'/Recuperacion'}>Olvidaste tu Contraseña?</Link>
          </div>
          <div className="BotonIniciar">
            <button className="button2Login" type="submit" disabled={isButtonDisabled} >
              Iniciar Sesión
            </button>
          </div>
          <div className="logoGogle">
            <button
              type="button"
              onClick={google}
              className="flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100 btn-google"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                  fill="#EA4335"
                />
                <path
                  d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                  fill="#34A853"
                />
                <path
                  d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                  fill="#4A90E2"
                />
                <path
                  d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                  fill="#FBBC05"
                />
              </svg>
              Login con Google
            </button>
          </div>
          <div className="cont-remen2Login">
            <Link className="cuenta2" to={'/Registro'}>
              <p className="">¿No tienes una Cuenta? Regístrate</p>
            </Link>
          </div>
          <img src={LoginImg} className="img-Login" alt="" />
          <div className="feature-border"></div>
          <h4 className="title-form2">Juntos Hacemos la Diferencia</h4>
          <img src={LoginImg2} className="img-Login4" alt="" />
        </form>
      </div>
    </div>
  );
}
