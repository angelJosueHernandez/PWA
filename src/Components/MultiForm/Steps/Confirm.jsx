import React, { useState, useEffect } from 'react';
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { NivelSeguridad } from '../../NivelSeguridad/NivelSeguridad';
import { useAuth } from '../../Contexts/AuthContexts';

export default function Confirm() {

  const { setContraActualizar, setContraActualizar2, setContraCo, setContraCo2 } = useAuth();

  

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordError2, setPasswordError2] = useState('');
  const [showErrors, setShowErrors] = useState(false); 


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  
  const [errors, setErrors] = useState([]);

  const handlePasswordChange = (event) => {
      const newPassword = event.target.value;
      setPassword(newPassword);
      validatePassword(newPassword);
      console.log(newPassword)
      
      setContraActualizar(newPassword);
      
  };

  const handlePasswordChange2 = (event) => {
    const newPassword2 = event.target.value;
    setPassword2(newPassword2);
    validatePassword2(newPassword2);
    console.log(newPassword2)
    setContraActualizar2(newPassword2);
};


  const validatePassword = (password) => {
    const newErrors = [];

    if (password.length < 8) {
        newErrors.push('* Mínimo 8 caracteres');
    }
    if (!/[a-z]/.test(password)) {
        newErrors.push('* Al menos una letra minúscula');
    }
    if (!/[A-Z]/.test(password)) {
        newErrors.push('* Al menos una letra mayúscula');
    }
    if (!/\d/.test(password)) {
        newErrors.push('* Al menos un número');
    }
    if (!/[^a-zA-Z\d]/.test(password)) {
        newErrors.push('* Al menos un caracter especial');
    }

    setErrors(newErrors);


    // Si no hay errores, retorna true; de lo contrario, retorna false
    return newErrors.length === 0;
};





  const validatePassword2 = (password2) => {
    if (password2 === password) {
      setPasswordError2('');
      return true;

    } else {
      setPasswordError2('Las contraseñas no coinciden');
      return false;
    }
  };

  

  

    const handleBlurPassword = () => {
      const validContra1 = validatePassword(password);
      if (validContra1 === true) {
        setContraCo(true);
      }else{
        setContraCo(false);
      }

    };
  
    const handleBlurPassword2 = () => {
      const validContra2 = validatePassword2(password2);
      if (validContra2 === true) {
        setContraCo2(true);
      }else{
        setContraCo2(false);
      }
    };

    
  return (
    <div>
      <br />
      <div className="sm:col-span-3 relative">
  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
    Contraseña
  </label>
  <div className="mt-2 relative rounded-md shadow-sm">
    <input 
      type={showPassword ? 'text' : 'password'}
      required
      id="password"
      name="password"
      value={password}
      onChange={handlePasswordChange}
      onBlur={handleBlurPassword}
      autoComplete="password" 
      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${passwordError ? 'input-error' : ''} ${passwordError ? 'input-error-padding' : ''}`}
    />
    <button
      type="button"
      className="absolute inset-y-0 right-0 pr flex items-center text-gray-400"
      onClick={togglePasswordVisibility}
    >
      {showPassword ? (
        <FaEyeSlash className="h-5 w-5" aria-hidden="true" />
      ) : (
        <IoEyeSharp className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  </div> <NivelSeguridad password={password}/> 
  <div>
  {errors.length > 0 && (
    <div className="error-container">
      {errors.map((error, index) => (
        <p key={index} className="error-messages2 absolute -mt-6 text-xs text-red-500 left-0">
          {error}
        </p>
      ))}
    </div>
  )}
 
</div>

</div>

{errors.length > 0 && (
  <>
    {Array.from({ length: Math.min(errors.length, 5) }).map((_, index) => (
      <br key={index} />
    ))}
  </>
)}
      <div className="sm:col-span-3">
        <label htmlFor="password2" className="block text-sm font-medium leading-6 text-gray-900 mb-1">
          Confirmar Contraseña
        </label>
        <div className="mt-2 relative rounded-md shadow-sm">
          <input 
            type={showPassword2 ? 'text' : 'password'}
            required
            id="password2"
            name="password2"
            value={password2}
            onChange={handlePasswordChange2}
            onBlur={handleBlurPassword2}
            autoComplete="password2" 
            className={`p-2 pl-3 pr-10 block w-full rounded-md border-0 py-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo sm:text-sm sm:leading-6 ${passwordError2 ? 'input-error' : ''}`}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
            onClick={togglePasswordVisibility2}
          >
            {showPassword2 ? (
              <FaEyeSlash className="h-5 w-5" aria-hidden="true" />
            ) : (
              <IoEyeSharp className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
        {passwordError2 && <p className="error-message">{passwordError2}</p>}
      </div>
    </div>
  );
}
