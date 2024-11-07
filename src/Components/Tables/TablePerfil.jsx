import React, { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContexts';
import { AlertVariants } from '../Alertas/AlertVariants';
import moment from 'moment';

export default function TablePerfil() {
  const [userData, setUserData] = useState({});
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const { userId, idCookieUser } = useAuth();

  useEffect(() => {
    if (idCookieUser) {
      fetch(`https://api-beta-mocha-59.vercel.app/MiPerfil/${idCookieUser}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          setTelefono(data.telefono);
          setCorreo(data.correo);
        })
        .catch((error) => console.error('Error fetching user profile:', error));
    }
  }, [idCookieUser]);

  const handleUpdate = async () => {
    setErrorMsg('');
    try {
      const response = await fetch(
        `https://api-beta-mocha-59.vercel.app/actualizarContacto/${idCookieUser}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ telefono, correo }),
        },
      );
      const result = await response.json();
      if (response.ok) {
        setUserData((prevData) => ({ ...prevData, telefono, correo }));
        setEditModalOpen(false);
        setAlertType('success');
        setAlertMessage(result.msg);
      } else {
        console.error('Error updating contact info:', result.msg);
        setAlertType('error');
        setAlertMessage(result.msg);
      }
    } catch (error) {
      console.error('Error updating contact info:', error);
      setAlertType('error');
      setAlertMessage('Error al actualizar la información de contacto');
    } finally {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-white shadow-md rounded-lg max-w-full md:max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Información Personal</h3>
      <AlertVariants
        alertType={alertType}
        alertMessage={showAlert ? alertMessage : ''}
      />
      <div className="px-4 sm:px-0">
        <dt className="text-sm mt-1 mb-2 font-medium leading-6 text-gray-900">
          Nombre:
        </dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          {userData.nombre} {userData.apellidoP} {userData.apellidoM}
        </dd>
      </div>
      <div className="mt-6 border-t border-gray-100">
      
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Correo:
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {userData.correo}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Teléfono:
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {userData.telefono}
            </dd>
          </div>
        </dl>
        <button
          className="btn btn-primary mt-4 w-full md:w-auto"
          onClick={() => setEditModalOpen(true)}
        >
          Actualizar Información
        </button>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-xs sm:max-w-md md:max-w-lg mx-4 md:mx-0">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Actualizar Información De Contacto
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setEditModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div>
              {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Teléfono:
                </label>
                <input
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Correo:
                </label>
                <input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="btn btn-primary bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={handleUpdate}
              >
                Guardar
              </button>
              <button
                className="btn btn-primary2 bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => setEditModalOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
