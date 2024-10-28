import './Restablece.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { SiWhatsapp } from 'react-icons/si';
import { FaFacebookF } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa6';
import { FaLinkedinIn } from 'react-icons/fa';
import { FcSms } from 'react-icons/fc';
import { message } from 'antd';

import '@tailwindcss/forms';

export default function Restablece() {
  const navigate = useNavigate();

  const location = useLocation();
  const correo = new URLSearchParams(location.search).get('correo');

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [passwordError2, setPasswordError2] = useState('');

  function checkPasswordStrength(password, minChar, level) {
    const lowcase = /[a-z]/.test(password);
    const uppcase = /[A-Z]/.test(password);
    const numbers = /\d/.test(password);
    const special = /[^a-zA-Z\d]/.test(password);

    let passed = true;
    switch (level) {
      case 5:
        passed = passed && special;
      case 4:
        passed = passed && uppcase;
      case 3:
        passed = passed && numbers;
      case 2:
        passed = passed && lowcase;
      case 1:
        passed = passed && (lowcase || uppcase || numbers);
      case 0:
        passed = passed && password.length >= minChar;
        break;
      default:
        passed = false;
    }
    return passed;
  }

  const validatePassword = (password) => {
    if (password == '') {
      setPasswordError('no puede estar vacio');
      return false;
    } else {
      if (password.length < 8) {
        setPasswordError('minimo de 8 caracteres');
        return false;
      } else {
        const passwordValidate = checkPasswordStrength(password, 8, 5);
        if (passwordValidate) {
          setPasswordError('');
          return true;
        } else {
          setPasswordError(
            'Debe tener almenos una mayuscula, minuscula, numero y caracter especial',
          );
          return false;
        }
      }
    }
  };

  const validatePassword2 = (password2) => {
    if (password2 == password) {
      setPasswordError2('');
      return true;
    } else {
      setPasswordError2('no son iguales las contraseñas');
      return false;
    }
  };

  const data = new FormData();
  data.append('Correo', correo);
  data.append('Contrasena', password);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(
      'https://apicasadelmarisco.azurewebsites.net/' +
        'api/CasaDelMarisco/RecuperarContrasena?Correo=' +
        correo +
        '&Contrasena=' +
        password,
      {
        method: 'POST',
        body: data,
      },
    )
      .then((res) => res.json())
      .then((result) => {
        if (result === 'Contraseña modificada correctamente') {
          message.open({
            type: 'success',
            content: 'Contraseña restablecida',
            className: 'custom-class',
            style: {
              marginTop: '10vh',
            },
          });
          navigate('/Login');
        } else if (result === 'Error en las credenciales') {
        }
      });
  };

  return (
    <div className="container4" id="container">
      <div className="form-container sign-in">
        <form onSubmit={handleSubmit}>
          <h2 className="title-form">Actualice</h2>

          <div className="social-icons">
            <a href="#" className="icon">
              <i className="fa-brands fa-Whatsapp-f">
                <SiWhatsapp />
              </i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-sms">
                <FcSms />
              </i>
            </a>
          </div>

          <span>Introdusca su nueva contraseña </span>

          <div className="sm:col-span-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Contraseña
            </label>
            <div className="mt-1">
              <input
                type="password"
                required
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => validatePassword(password)}
                className="  {passwordError ? 'input-error' : ''} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="contraseña"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Repetir nueva contraseña{' '}
            </label>
            <div className="mt-1">
              <input
                type="password"
                id="password2"
                name="password2"
                value={password2}
                required
                onChange={(e) => setPassword2(e.target.value)}
                onBlur={() => validatePassword2(password2)}
                className="  {passwordError2 ? 'input-error' : ''} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {passwordError2 && (
              <p className="error-message">{passwordError2}</p>
            )}
          </div>

          <button type="submit">Restablecer</button>

          <div className="cont-remen2">
            <Link to={'/Login'}>Regresar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
