import React, { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContexts';
import moment from 'moment';
import { AlertVariants } from '../Alertas/AlertVariants';

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
  const [showAlert, setShowAlert] = useState(false);

  const { idCookieUser, setContratacionLoaded } = useAuth();

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
          setContratacionData(Array.isArray(data) ? data : [data]);
          setContratacionLoaded(!!data);
        })
        .catch((error) => {
          console.error('Error fetching contratacion data:', error);
          setContratacionLoaded(false);
        });
    }
  };

  useEffect(() => {
    fetchContratacionData(); // Llamada inicial para cargar los datos de contratación al montar el componente
  
    const intervalId = setInterval(fetchContratacionData, 2000); // Actualiza cada 5 segundos
  
    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, [idCookieUser, setContratacionLoaded]);
  

  const handleEditContratacion = (item) => {
    setEditContratacionData({
      fecha: moment(item.fecha, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      horario: moment(item.horario, 'hh:mm A').format('HH:mm'),
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
                horario: moment(horarioFormateado, 'HH:mm:ss').format('hh:mm A'),
              }
            : item,
        );
        setContratacionData(updatedContratacion);
        setEditModalOpen(false);
        setAlertType('success');
        setAlertMessage(result.msg);
      } else {
        setAlertType('error');
        setAlertMessage(result.msg);
      }
    } catch (error) {
      setAlertType('error');
      setAlertMessage('Error al actualizar la contratación');
    } finally {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
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
    <div className="p-4 bg-white shadow-md rounded-lg max-w-full md:max-w-3xl mx-auto">
      <AlertVariants alertType={alertType} alertMessage={showAlert ? alertMessage : ''} />
      <h3 className="text-xl font-semibold mb-4">Contratación de Ambulancias</h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-full table-auto text-left">
          <thead>
            <tr>
              <th className="border-b p-4">Motivo</th>
              <th className="border-b p-4">Destino</th>
              <th className="border-b p-4">Fecha</th>
              <th className="border-b p-4">Horario</th>
              <th className="border-b p-4">Estado</th>
              <th className="border-b p-4">Editar</th>
              <th className="border-b p-4">Cancelar</th>
            </tr>
          </thead>
          <tbody>
            {contratacionData.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-4 text-center">No hay datos de contratación de ambulancias.</td>
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
                    <button className="text-blue-600" onClick={() => handleEditContratacion(item)}>Editar</button>
                  </td>
                  <td className="p-4">
                    <button className="text-red-600" onClick={() => handleCancel(item.ID_Contratacion)}>Cancelar</button>
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
              <h3 className="text-lg font-medium text-gray-900">Editar Contratación</h3>
              <button className="text-gray-500" onClick={() => setEditModalOpen(false)}>&times;</button>
            </div>
            <div>
              <label className="block mb-4">
                Fecha:
                <input type="date" value={editContratacionData.fecha} onChange={(e) => setEditContratacionData({ ...editContratacionData, fecha: e.target.value })} className="w-full mt-1 rounded-md border-gray-300" />
              </label>
              <label className="block mb-4">
                Horario:
                <input type="time" value={editContratacionData.horario} onChange={(e) => setEditContratacionData({ ...editContratacionData, horario: e.target.value })} className="w-full mt-1 rounded-md border-gray-300" />
              </label>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={handleSaveEdit}>Guardar</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => setEditModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
