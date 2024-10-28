import React, { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContexts';
import moment from 'moment';
import { AlertVariants } from '../Alertas/AlertVariants'; // Importa tu componente de alertas

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
  const [alertType, setAlertType] = useState(null); // Estado para el tipo de alerta
  const [alertMessage, setAlertMessage] = useState(''); // Estado para el mensaje de alerta
  const [tiposServicios, setTiposServicios] = useState([]); // Estado para los tipos de servicios
  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar/ocultar alerta

  const { userId, idCookieUser } = useAuth();

  useEffect(() => {
    if (idCookieUser) {
      fetch(`https://api-beta-mocha-59.vercel.app/MiPerfil/${idCookieUser}`)
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error('Error fetching user profile:', error));
    }
  }, [idCookieUser]);

  useEffect(() => {
    if (userData.correo) {
      fetch(
        `https://api-beta-mocha-59.vercel.app/citasPagina/correo?correo=${userData.correo}`,
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Citas Data:', data);
          if (Array.isArray(data)) {
            setCitasData(data);
          } else {
            console.error('Expected an array but got:', data);
            setCitasData([]); // Set an empty array if data is not as expected
          }
        })
        .catch((error) => console.error('Error fetching citas data:', error));
    }
  }, [userData.correo]);

  useEffect(() => {
    // Obtener los tipos de servicios
    fetch('https://api-beta-mocha-59.vercel.app/tiposServicios/')
      .then((response) => response.json())
      .then((data) => setTiposServicios(data))
      .catch((error) =>
        console.error('Error fetching tipos de servicios:', error),
      );
  }, []);

  // Nuevo useEffect para actualizar los datos de citas periódicamente
  useEffect(() => {
    const interval = setInterval(() => {
      if (userData.correo) {
        fetch(
          `https://api-beta-mocha-59.vercel.app/citasPagina/correo?correo=${userData.correo}`,
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log('Citas Data:', data);
            if (Array.isArray(data)) {
              setCitasData(data);
            } else {
              console.error('Expected an array but got:', data);
              setCitasData([]); // Set an empty array if data is not as expected
            }
          })
          .catch((error) => console.error('Error fetching citas data:', error));
      }
    }, 1000); // Actualiza cada 60 segundos

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, [userData.correo]);

  const handleEditCita = (cita) => {
    const fechaFormateada = moment(cita.fecha, 'DD/MM/YYYY').format(
      'YYYY-MM-DD',
    );
    const horaFormateada = moment(cita.horario, 'hh:mm A').format('HH:mm');
    setEditCitaData({
      fecha: fechaFormateada,
      horario: horaFormateada,
      ID_Cita: cita.ID_Cita,
      ID_Servicio: cita.ID_Servicio,
      tipo_Servicio: cita.tipo_Servicio, // Guardar el tipo de servicio también
    });
    setEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    const { fecha, horario, ID_Cita, ID_Servicio } = editCitaData;
    try {
      const horarioFormateado = moment(horario, 'HH:mm').format('HH:mm:ss');
      console.log('Datos enviados:', {
        fecha,
        horario: horarioFormateado,
        ID_Cita,
        ID_Servicio,
      });
      const response = await fetch(
        `https://api-beta-mocha-59.vercel.app/actualizarFechaCitas/${ID_Cita}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fecha,
            horario: horarioFormateado,
            ID_Servicio,
          }),
        },
      );
      const result = await response.json();
      if (response.ok) {
        const updatedCitas = citasData.map((cita) =>
          cita.ID_Cita === ID_Cita
            ? {
                ...cita,
                fecha: moment(fecha).format('DD/MM/YYYY'),
                horario: moment(horarioFormateado, 'HH:mm:ss').format(
                  'hh:mm A',
                ),
                ID_Servicio,
                tipo_Servicio: tiposServicios.find(
                  (servicio) => servicio.ID_Servicio === ID_Servicio,
                ).tipo_Servicio,
              }
            : cita,
        );
        setCitasData(updatedCitas);
        setEditModalOpen(false);
        setAlertType('success');
        setAlertMessage(result.msg); // Mostrar mensaje de éxito
      } else {
        console.error('Error updating cita:', result.msg);
        setAlertType('error');
        setAlertMessage(result.msg); // Mostrar mensaje de error específico
      }
    } catch (error) {
      console.error('Error updating cita:', error);
      setAlertType('error');
      setAlertMessage('Error al actualizar la cita'); // Mostrar mensaje de error general
    } finally {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000); // La alerta desaparecerá después de 5 segundos
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
        },
      );

      const text = await response.text(); // Obtener la respuesta como texto para depuración
      console.log('Response text:', text);

      if (response.ok) {
        const updatedCitas = citasData.map((cita) =>
          cita.ID_Cita === ID_Cita ? { ...cita, estado: 'Cancelado' } : cita,
        );
        setCitasData(updatedCitas);
      } else {
        console.error('Error cancelling cita');
      }
    } catch (error) {
      console.error('Error cancelling cita:', error);
    }
  };

  return (
    <div>
      {
        <AlertVariants
          alertType={alertType}
          alertMessage={showAlert ? alertMessage : ''}
        />
      }
      <div className="other-container">
        {isEditModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Editar Cita</h3>
                <button onClick={() => setEditModalOpen(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <label>
                  Fecha:
                  <input
                    type="date"
                    value={editCitaData.fecha}
                    onChange={(e) =>
                      setEditCitaData({
                        ...editCitaData,
                        fecha: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Horario:
                  <input
                    type="time"
                    value={editCitaData.horario}
                    onChange={(e) =>
                      setEditCitaData({
                        ...editCitaData,
                        horario: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Tipo de Servicio:
                  <select
                    value={editCitaData.ID_Servicio}
                    onChange={(e) => {
                      const selectedService = tiposServicios.find(
                        (servicio) => servicio.ID_Servicio === e.target.value,
                      );
                      setEditCitaData({
                        ...editCitaData,
                        ID_Servicio: e.target.value,
                        tipo_Servicio: selectedService
                          ? selectedService.tipo_Servicio
                          : '',
                      });
                    }}
                  >
                    <option value="">Seleccione un tipo de servicio</option>
                    {tiposServicios.map((servicio) => (
                      <option
                        key={servicio.ID_Servicio}
                        value={servicio.ID_Servicio}
                      >
                        {servicio.tipo_Servicio}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="modal-footer">
                <button className="save-button" onClick={handleSaveEdit}>
                  Guardar
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        <h3>Citas</h3>
        <div className="citas-table">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  Fecha
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  Hora
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  Estado
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  Servicio
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  Editar
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  Cancelar
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(citasData) && citasData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4">
                    No hay datos de citas.
                  </td>
                </tr>
              ) : (
                Array.isArray(citasData) &&
                citasData.map((cita, index) => (
                  <tr
                    key={index}
                    className={`even:bg-blue-gray-50/50 ${cita.estado === 'Cancelado' ? 'bg-gray-200' : ''}`}
                  >
                    <td className="p-4">{cita.fecha}</td>
                    <td className="p-4">{cita.horario}</td>
                    <td className="p-4">{cita.estado}</td>
                    <td className="p-4">{cita.tipo_Servicio}</td>
                    <td className="p-4">
                      <button
                        className="button-edit"
                        onClick={() => handleEditCita(cita)}
                        disabled={cita.estado === 'Cancelado'}
                      >
                        Editar
                      </button>
                    </td>
                    <td className="p-4">
                      <button
                        className="button-cancel"
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
      </div>
    </div>
  );
}
