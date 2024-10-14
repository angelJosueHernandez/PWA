import React, { useState, useContext } from 'react';
import { useAuth } from '../../Contexts/AuthContexts';

const Details = () => {

  const [tokenIngresado, setTokenIngresado] = useState('');
  const [error, setError] = useState('');

  const { setToken } = useAuth();

  const handleTokenBlur = () => {
   
    if (tokenIngresado.trim() !== '') {
      setToken(tokenIngresado);
    }
  };

 

  return (
    <div>
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Ingresa el token recibido en tu correo
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onBlur={handleTokenBlur}
          onChange={(e) => setTokenIngresado(e.target.value)}
          value={tokenIngresado}
          placeholder="Token"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
        
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Details;
