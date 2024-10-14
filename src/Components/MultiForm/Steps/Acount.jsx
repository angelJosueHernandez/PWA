import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexts/AuthContexts';

export default function Acount() {
  const correoSoporte = "cruzrojasuport@gmail.com";
  const { setMetodo, setIsMethodSelected, setCorreo, setNumero } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState('');

  const handleSelectRecoveryMethod = (method) => {
    setSelectedMethod(method);
    setMetodo(method);
    setIsMethodSelected(true); // Establecer como verdadero cuando se selecciona un método
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setCorreo(value);
    console.log(value);
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    setPhone(value);
    setNumero(value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      setEmailError('No puede estar vacío');
    } else if (emailRegex.test(email)) {
      setEmailError('');
      return true;
    } else {
      setEmailError('Correo electrónico no válido');
      return false;
    }
  };

  return (
    <div className="flex flex-col">
      <center>
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          {"  "}
          ¡Bienvenido al Proceso de Recuperación de Contraseña!
        </div>
      </center>

      <div className="bg-white my-2 p-3 rounded">
        <p style={{ fontSize: '0.75rem', lineHeight: '2.7' }}>
          Nos complace asistirte en la recuperación de tu contraseña. Para garantizar la seguridad de tu cuenta, hemos establecido un proceso seguro y confiable para que puedas recuperar el acceso a tu cuenta.
        </p>
        <p style={{ fontSize: '0.75rem', lineHeight: '2.7' }}>
          Por favor, sigue las instrucciones cuidadosamente y proporciona la información requerida con precisión. Una vez que hayas completado este paso, podrás avanzar al siguiente para continuar con el proceso de recuperación de tu contraseña.
        </p>
        <p style={{ fontSize: '0.75rem', lineHeight: '2.7' }}>
          Si necesitas ayuda o tienes alguna pregunta, no dudes en contactar a nuestro equipo de soporte técnico a través del correo electrónico: <a href={`mailto:${correoSoporte}`} style={{ color: '#3182ce' }}>{correoSoporte}</a>. Estaremos encantados de asistirte en todo lo que necesites.
        </p>
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          <p style={{ fontSize: '0.75rem', lineHeight: '2.7', fontWeight: 'bold' }}>
            Si estás listo para comenzar, selecciona un Método de Recuperación
          </p>
        </div>

      </div>
      <div className="flex justify-center mt-2">
        <div>
          <label>
            <input
              type="checkbox"
              value="correo"
              checked={selectedMethod === 'correo'}
              onChange={() => handleSelectRecoveryMethod('correo')}
            />
            Recuperación por Correo
          </label>
          {selectedMethod === 'correo' && (
            <div className="">
              <br />
              <p>Introduce el correo relacionado con tu cuenta</p>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => validateEmail(email)}
                placeholder="Correo electrónico"
              />
               <div className="erroresInicio">
              {emailError && <p className="error-messageInicio absolute  left-30">{emailError}</p>}
              </div>
            </div>
          )}

        </div>
        <div className="ml-4">
          <label>
            <input
              type="checkbox"
              value="sms"
              checked={selectedMethod === 'sms'}
              onChange={() => handleSelectRecoveryMethod('sms')}
            />
            Recuperación por SMS
          </label>
          {selectedMethod === 'sms' && (
            <div className="">
              <br />
              <p>Introduce el correo relacionado con tu cuenta</p>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => validateEmail(email)}
                placeholder="Correo electrónico"
              />
               <div className="erroresInicio">
              {emailError && <p className="error-messageInicio absolute  left-30">{emailError}</p>}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
