import React, { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContexts';
import moment from 'moment';
import { AlertVariants } from '../Alertas/AlertVariants'; // Importa tu componente de alertas

export default function TableContratacion() {
  const [contratacionData, setContratacionData] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editContratacionData, setEditContratacionData] = useState({
    fecha: '',
    horario: '',
    ID_Contratacion: null,
  });
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar/ocultar alerta

  const { idCookieUser, setContratacionLoaded } = useAuth(); // Asegúrate de obtener setContratacionLoaded del contexto

  const fetchContratacionData = () => {
    if (idCookieUser) {
      fetch(`https://api-beta-mocha-59.vercel.app/Contratacion/${idCookieUser}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al cargar contrataciones');
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            setContratacionData(data);
            setContratacionLoaded(true); // Cargar con éxito
          } else if (data) {
            setContratacionData([data]);
            setContratacionLoaded(true); // Cargar con éxito
          } else {
            setContratacionData([]);
            setContratacionLoaded(false); // No hay datos, pero indicar que terminó la carga
          }
        })
        .catch((error) => {
          console.error('Error fetching contratacion data:', error);
          setContratacionLoaded(false); // Error en la carga
        });
    }
  };

  useEffect(() => {
    fetchContratacionData();
  }, [idCookieUser, setContratacionLoaded]);

  useEffect(() => {
    const interval = setInterval(fetchContratacionData, 1000); // Actualiza cada 60 segundos
    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, [idCookieUser, setContratacionLoaded]);

  const handleEditContratacion = (item) => {
    const fechaFormateada = moment(item.fecha, 'DD/MM/YYYY').format(
      'YYYY-MM-DD',
    );
    const horaFormateada = moment(item.horario, 'hh:mm A').format('HH:mm');
    setEditContratacionData({
      fecha: fechaFormateada,
      horario: horaFormateada,
      ID_Contratacion: item.ID_Contratacion,
    });
    setEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    const { fecha, horario, ID_Contratacion } = editContratacionData;
    try {
      const horarioFormateado = moment(horario, 'HH:mm').format('HH:mm:ss');
      const response = await fetch(
        `https://api-beta-mocha-59.vercel.app/actualizarFechaContratacion/${ID_Contratacion}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fecha, horario: horarioFormateado }),
        },
      );
      const result = await response.json();
      if (response.ok) {
        const updatedContratacion = contratacionData.map((item) =>
          item.ID_Contratacion === ID_Contratacion
            ? {
                ...item,
                fecha: moment(fecha).format('DD/MM/YYYY'),
                horario: moment(horarioFormateado, 'HH:mm:ss').format(
                  'hh:mm A',
                ),
              }
            : item,
        );
        setContratacionData(updatedContratacion);
        setEditModalOpen(false);
        setAlertType('success');
        setAlertMessage(result.msg);
      } else {
        console.error('Error updating contratacion:', result.msg);
        setAlertType('error');
        setAlertMessage(result.msg);
      }
    } catch (error) {
      console.error('Error updating contratacion:', error);
      setAlertType('error');
      setAlertMessage('Error al actualizar la contratación');
    } finally {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000); // La alerta desaparecerá después de 5 segundos
    }
  };

  const handleCancel = async (ID_Contratacion) => {
    try {
      const response = await fetch(
        `https://api-beta-mocha-59.vercel.app/cancelarContratacion/${ID_Contratacion}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ estado: 'Cancelado' }),
        },
      );

      const result = await response.json();
      if (response.ok) {
        const updatedContratacion = contratacionData.map((item) =>
          item.ID_Contratacion === ID_Contratacion
            ? { ...item, estado: 'Cancelado' }
            : item,
        );
        setContratacionData(updatedContratacion);
      } else {
        console.error('Error cancelling contratacion');
      }
    } catch (error) {
      console.error('Error cancelling contratacion:', error);
    }
  };

  return (
    <div>
      <AlertVariants
        alertType={alertType}
        alertMessage={showAlert ? alertMessage : ''}
      />

      <div className="other-container">
        {isEditModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Editar Contratación</h3>
                <button onClick={() => setEditModalOpen(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <label>
                  Fecha:
                  <input
                    type="date"
                    value={editContratacionData.fecha}
                    onChange={(e) =>
                      setEditContratacionData({
                        ...editContratacionData,
                        fecha: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Horario:
                  <input
                    type="time"
                    value={editContratacionData.horario}
                    onChange={(e) =>
                      setEditContratacionData({
                        ...editContratacionData,
                        horario: e.target.value,
                      })
                    }
                  />
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
        <h3>Contratación de Ambulancias</h3> <br />
        <div className="tabla-container">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  Motivo
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  Destino
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  Fecha
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  Horario
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  Estado
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
              {contratacionData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-4 text-[13px]">
                    No hay datos de contratación de ambulancias.
                  </td>
                </tr>
              ) : (
                contratacionData.map((item, index) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td className="p-4">{item.motivo}</td>
                    <td className="p-4">{item.destino_Traslado}</td>
                    <td className="p-4">{item.fecha}</td>
                    <td className="p-4">{item.horario}</td>
                    <td className="p-4">{item.estado}</td>
                    <td className="p-4">
                      <button
                        className="button-edit"
                        onClick={() => handleEditContratacion(item)}
                      >
                        Editar
                      </button>
                    </td>
                    <td className="p-4">
                      <button
                        className="button-cancel"
                        onClick={() => handleCancel(item.ID_Contratacion)}
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
