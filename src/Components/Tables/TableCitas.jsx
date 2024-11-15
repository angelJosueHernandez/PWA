import React, { useState, useEffect } from 'react';
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import moment from 'moment-timezone';
import { useAuth } from '../Contexts/AuthContexts';
import { AlertVariants } from '../Alertas/AlertVariants';

export default function TableCitas() {
  const [userData, setUserData] = useState({});
  const [citasData, setCitasData] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editCitaData, setEditCitaData] = useState({
    fecha: '',
    horario: '',
    ID_Cita: null,
    ID_Servicio: '',
    tipo_Servicio: '',
  });
  const [availableHorarios, setAvailableHorarios] = useState([]);
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [tiposServicios, setTiposServicios] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [fechaError, setFechaError] = useState('');
  const [showFechaError, setShowFechaError] = useState(false);
  
  const { idCookieUser } = useAuth();

  useEffect(() => {
    if (idCookieUser) {
      fetch(`https://api-beta-mocha-59.vercel.app/MiPerfil/${idCookieUser}`)
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error('Error fetching user profile:', error));
    }
  }, [idCookieUser]);

  useEffect(() => {
    const fetchCitasData = () => {
      if (userData.correo) {
        fetch(`https://api-beta-mocha-59.vercel.app/citasPagina/correo?correo=${userData.correo}`)
          .then((response) => response.json())
          .then((data) => setCitasData(Array.isArray(data) ? data : []))
          .catch((error) => console.error('Error fetching citas data:', error));
      }
    };

    fetchCitasData();
    const interval = setInterval(fetchCitasData, 2000);
    return () => clearInterval(interval);
  }, [userData.correo]);

  useEffect(() => {
    fetch('https://api-beta-mocha-59.vercel.app/servicios-excluidos/')
      .then((response) => response.json())
      .then((data) => setTiposServicios(data))
      .catch((error) => console.error('Error fetching tipos de servicios:', error));
  }, []);

  const handleEditCita = (cita) => {
    setEditCitaData({
      fecha: moment.tz(cita.fecha, 'DD/MM/YYYY', 'America/Mexico_City').format('YYYY-MM-DD'),
      horario: cita.horario,
      ID_Cita: cita.ID_Cita,
      ID_Servicio: cita.ID_Servicio,
      tipo_Servicio: cita.tipo_Servicio,
    });
    setEditModalOpen(true);
  };

  useEffect(() => {
    const fetchAvailableHorarios = async () => {
      try {
        const dateInMexico = moment.tz(editCitaData.fecha, 'America/Mexico_City').format('YYYY-MM-DD');
        const response = await fetch(
          `https://api-beta-mocha-59.vercel.app/horas-disponibles/${dateInMexico}`
        );
        if (!response.ok) {
          throw new Error('Error al obtener los horarios disponibles');
        }
        const data = await response.json();
        setAvailableHorarios(data);
      } catch (error) {
        console.error('Error fetching available hours:', error);
      }
    };

    if (editCitaData.fecha) {
      fetchAvailableHorarios();
      const interval = setInterval(fetchAvailableHorarios, 2000);
      return () => clearInterval(interval);
    }
  }, [editCitaData.fecha]);

  const handleSaveEdit = async () => {
    const { fecha, horario, ID_Cita, ID_Servicio } = editCitaData;
  
    try {
      const horarioFormateado = moment(horario, 'HH:mm').format('HH:mm:ss');
      const response = await fetch(
        `https://api-beta-mocha-59.vercel.app/actualizarFechaCitas/${ID_Cita}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fecha, horario: horarioFormateado, ID_Servicio }),
        }
      );
  
      const result = await response.json();
      if (response.ok) {
        const updatedCitas = citasData.map((cita) =>
          cita.ID_Cita === ID_Cita
            ? {
                ...cita,
                fecha: moment(fecha).format('DD/MM/YYYY'),
                horario: moment(horarioFormateado, 'HH:mm:ss').format('hh:mm A'),
                ID_Servicio,
              }
            : cita
        );
        setCitasData(updatedCitas);
        setEditModalOpen(false);
        setAlertType('success');
        setAlertMessage(result.msg || 'Cita actualizada con éxito');
      } else {
        setAlertType('error');
        setAlertMessage(result.msg || 'Error al actualizar la cita');
      }
    } catch (error) {
      console.error('Error al actualizar la cita:', error);
      setAlertType('error');
      setAlertMessage('Error al actualizar la cita');
    } finally {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };
  
  const handleCancel = async (ID_Cita) => {
    try {
      const response = await fetch(
        `https://api-beta-mocha-59.vercel.app/cancelarCitas/${ID_Cita}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ estado: 'Cancelado' }),
        }
      );

      if (response.ok) {
        const updatedCitas = citasData.map((cita) =>
          cita.ID_Cita === ID_Cita ? { ...cita, estado: 'Cancelado' } : cita
        );
        setCitasData(updatedCitas);
      } else {
        console.error('Error cancelling cita');
      }
    } catch (error) {
      console.error('Error cancelling cita:', error);
    }
  };

  const validateFecha = (date) => {
    const day = moment.tz(date, 'America/Mexico_City').day();
    const today = moment.tz('America/Mexico_City').startOf('day');
    const selectedDate = moment.tz(date, 'America/Mexico_City').startOf('day');

    if (selectedDate.isBefore(today)) {
      setFechaError('No se puede elegir una fecha que ya pasó.');
      return false;
    } else if (day === 0 || day === 6) {
      setFechaError('No se pueden seleccionar sábados ni domingos.');
      return false;
    } else {
      setFechaError('');
      return true;
    }
  };

  const handleDateChange = (selectedDate) => {
    setShowFechaError(true); // Mostrar el mensaje de error solo después de interactuar con el campo de fecha
    if (validateFecha(selectedDate)) {
      setEditCitaData({ ...editCitaData, fecha: selectedDate });
    }
  };

  const handleHorarioChange = (selectedHorario) => {
    setEditCitaData({ ...editCitaData, horario: selectedHorario.time });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-full md:max-w-3xl mx-auto">
      <AlertVariants alertType={alertType} alertMessage={showAlert ? alertMessage : ''} />
      <h3 className="text-xl font-semibold mb-4">Citas</h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-full table-auto text-left">
          <thead>
            <tr>
              <th className="border-b p-4">Fecha</th>
              <th className="border-b p-4">Hora</th>
              <th className="border-b p-4">Estado</th>
              <th className="border-b p-4">Servicio</th>
              <th className="border-b p-4">Editar</th>
              <th className="border-b p-4">Cancelar</th>
            </tr>
          </thead>
          <tbody>
            {citasData.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center">No hay datos de citas.</td>
              </tr>
            ) : (
              citasData.map((cita, index) => (
                <tr key={index} className={`${cita.estado === 'Cancelado' ? 'bg-gray-200' : ''}`}>
                  <td className="p-4">{cita.fecha}</td>
                  <td className="p-4">{cita.horario}</td>
                  <td className="p-4">{cita.estado}</td>
                  <td className="p-4">{cita.tipo_Servicio}</td>
                  <td className="p-4">
                    <button
                      className="text-blue-600"
                      onClick={() => handleEditCita(cita)}
                      disabled={cita.estado === 'Cancelado'}
                    >
                      Editar
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      className="text-red-600"
                      onClick={() => handleCancel(cita.ID_Cita)}
                      disabled={cita.estado === 'Cancelado'}
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xs sm:max-w-md mx-4 md:mx-0">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Editar Cita</h3>
              <button className="text-gray-500" onClick={() => setEditModalOpen(false)}>
                &times;
              </button>
            </div>
            <div>
              <label className="block mb-4">
                Fecha:
                <input
                  type="date"
                  value={editCitaData.fecha}
                  onChange={(e) => handleDateChange(e.target.value)}
                  onBlur={() => setShowFechaError(true)}
                  className="w-full mt-1 rounded-md border-gray-300"
                />
                {fechaError && showFechaError && (
                  <span className="text-red-500 text-sm mt-1">{fechaError}</span>
                )}
              </label>
              <label className="block mb-4">
                Horario:
                <Listbox
                  value={editCitaData.horario}
                  onChange={(selectedHorario) => {
                    handleHorarioChange(selectedHorario);
                  }}
                  disabled={!availableHorarios.length}
                >
                  <div className="relative">
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1 pl-2 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm">
                      <span className="block truncate">
                        {editCitaData.horario
                          ? availableHorarios.find(
                              (h) => h.time === editCitaData.horario
                            )?.name || 'Seleccione un horario'
                          : 'Seleccione un horario'}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {availableHorarios.length ? (
                        availableHorarios.map((horario) => (
                          <Listbox.Option
                            key={horario.time}
                            value={horario}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-3 pr-9 ${
                                active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                              }`
                            }
                          >
                            {({ selected }) => (
                              <>
                                <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                  {horario.name}
                                </span>
                                {selected && (
                                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                )}
                              </>
                            )}
                          </Listbox.Option>
                        ))
                      ) : (
                        <div className="py-2 pl-3 pr-9 text-gray-500">No hay horarios disponibles</div>
                      )}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </label>
              <label className="block mb-4">
                Tipo de Servicio:
                <select
                  value={editCitaData.ID_Servicio}
                  onChange={(e) =>
                    setEditCitaData({ ...editCitaData, ID_Servicio: e.target.value })
                  }
                  className="w-full mt-1 rounded-md border-gray-300"
                >
                  <option value="">Seleccione un tipo de servicio</option>
                  {tiposServicios.map((servicio) => (
                    <option key={servicio.ID_Servicio} value={servicio.ID_Servicio}>
                      {servicio.tipo_Servicio}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={handleSaveEdit}
                disabled={fechaError} // Botón deshabilitado si hay errores en la fecha
              >
                Guardar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
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
