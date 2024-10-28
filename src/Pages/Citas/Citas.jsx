import React, { useState, useEffect } from 'react';
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './custom-calendar.css';
import './Citas.css'
import { useAuth } from '../../Components/Contexts/AuthContexts';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';

const holidays = [
  { month: 0, day: 1 }, // Año Nuevo
  { month: 11, day: 25 }, // Navidad
  // Agrega otros días festivos aquí
];

const isHoliday = (date) => {
  return holidays.some(holiday => 
    date.getMonth() === holiday.month && date.getDate() === holiday.day
  );
};

const CustomCalendar = ({ onChange, value }) => {
  const tileDisabled = ({ date }) => {
    return date.getDay() === 0 || date.getDay() === 6 || isHoliday(date);
  };

  return (
    <Calendar
      onChange={onChange}
      value={value}
      className="calendar-container text-gray-800 bg-white rounded-lg shadow-lg text-[16px]"
      next2Label={null}
      prev2Label={null}
      tileDisabled={tileDisabled}
    />
  );
};


async function scheduleReminderNotification(date, time) {
  const appointmentDate = moment(date + ' ' + time, 'YYYY-MM-DD HH:mm').subtract(1, 'day');
  const reminderTime = appointmentDate.toDate();

  // Almacena la fecha de recordatorio en el localStorage
  localStorage.setItem('reminderTime', reminderTime.toISOString());
}

// Función para verificar si es el momento de mostrar el recordatorio
function checkReminder() {
  const reminderTime = new Date(localStorage.getItem('reminderTime'));
  const now = new Date();

  if (now >= reminderTime) {
    if ('serviceWorker' in navigator && 'showNotification' in ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then(reg => {
        reg.showNotification('Recordatorio de Cita', {
          body: `No olvides tu cita programada para mañana.`,
          icon: '/icon.png',
          tag: 'cita-reminder'
        });
        localStorage.removeItem('reminderTime'); // Elimina el recordatorio una vez que se ha mostrado
      });
    }
  }
}



export default function Citas() {



  function sendNotification(title, options) {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then(reg => {
        if (reg) {
          reg.showNotification(title, options);
        }
      });
    }
  }

  useEffect(() => {
    const intervalId = setInterval(checkReminder, 3600000); // cada hora
    return () => clearInterval(intervalId); // Limpia el intervalo cuando se desmonta el componente
  }, []);




  const { idCookieUser, correoCookieUser } = useAuth();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [apellido_Paterno, setApellido_Paterno] = useState('');
  const [apellido_Materno, setApellido_Materno] = useState('');
  const [userId, setUserId] = useState(null);
  const [logeo, setLogeo] = useState(null);
  const [servicios, setServicios] = useState([]);
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [availableHorarios, setAvailableHorarios] = useState([]);
  const [selectedServicio, setSelectedServicio] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [indicacionesPrevias, setIndicacionesPrevias] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    fecha: '',
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api-beta-mocha-59.vercel.app/usuario/${correoCookieUser}`)
      .then(response => response.json())
      .then(data => {
        setNombre(data.nombre);
        setApellido_Paterno(data.apellidoP);
        setApellido_Materno(data.apellidoM);
        setCorreo(correoCookieUser);
        setFormData(prevData => ({
          ...prevData,
          nombre: data.nombre,
          apellidoPaterno: data.apellidoP,
          apellidoMaterno: data.apellidoM,
          correo: correoCookieUser
        }));
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, [correoCookieUser]);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await fetch('https://api-beta-mocha-59.vercel.app/servicios-excluidos');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setServicios(data);
        setSelectedServicio(data[0]);
        setIndicacionesPrevias(data[0]?.indicaciones_previas || '');
      } catch (error) {
        console.error('Error fetching services data:', error);
      }
    };

    fetchServicios();
  }, []);

  useEffect(() => {
    const token = Cookies.get('jwt');
    if (token) {
      try {
        fetch('https://api-beta-mocha-59.vercel.app/verifyToken', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ token }),
          credentials: 'include'
        })
        .then(response => response.json())
        .then(result => {
          if (result.mensaje === "Token válido") {
            const decodedToken = jwtDecode(token);
            setLogeo(decodedToken.IsAuthenticated);
            setUserId(decodedToken.id);
          } else {
            setLogeo(false);
          }
        })
        .catch(error => {
          console.error('Error al verificar el token:', error);
          setLogeo(false);
        });
      } catch (error) {
        console.error('Error al decodificar el token JWT:', error);
        setLogeo(false);
      }
    }
  }, []);

  useEffect(() => {
    validateForm();
  }, [formData, selectedDate, selectedHorario, selectedServicio, isFormDisabled]);

  useEffect(() => {
    if (selectedDate) {
      const fetchAvailableHorarios = async () => {
        try {
          const dateInMexico = moment.tz(selectedDate, 'America/Mexico_City').format('YYYY-MM-DD');
          const response = await fetch(`https://api-beta-mocha-59.vercel.app/horas-disponibles/${dateInMexico}`);
          if (!response.ok) {
            throw new Error('Error al obtener los horarios disponibles');
          }
          const data = await response.json();
          setAvailableHorarios(data);
          setSelectedHorario(null);
          setIsFormDisabled(data.length === 0);
        } catch (error) {
          console.error('Error fetching available hours:', error);
          setIsFormDisabled(true);
        }
      };

      fetchAvailableHorarios();
    }
  }, [selectedDate]);

  const validateForm = () => {
    const today = moment.tz('America/Mexico_City').startOf('day');
    const tomorrow = moment(today).add(1, 'day');

    let newErrors = {};

    if (!formData.fecha) {
      newErrors.fecha = 'La fecha es obligatoria';
    } else {
      const selected = moment.tz(formData.fecha, 'America/Mexico_City').startOf('day');
      if (selected.isBefore(today)) {
        newErrors.fecha = 'Fecha inválida';
      } else if (selected.isSame(today)) {
        newErrors.fecha = 'Debes elegir una fecha con al menos un día de anticipación';
      } else if (selected.day() === 0 || selected.day() === 6) {
        newErrors.fecha = 'No se puede seleccionar sábados o domingos';
      } else if (isHoliday(selected.toDate())) {
        newErrors.fecha = 'No se puede seleccionar un día festivo';
      }
    }

    setErrors(newErrors);
    setIsFormValid(
      Object.keys(newErrors).length === 0 &&
      !isFormDisabled &&
      selectedHorario !== null
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    // Si el campo modificado es la fecha, también actualiza `selectedDate`.
    if (name === 'fecha') {
      const dateInMexico = moment.tz(value, 'America/Mexico_City').toDate();
      setSelectedDate(dateInMexico);
    }
  
    setTouchedFields((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };
  

  const handleDateChange = (date) => {
    const dateInMexico = moment.tz(date, 'America/Mexico_City').format('YYYY-MM-DD');
    setSelectedDate(date);
    setFormData((prevData) => ({
      ...prevData,
      fecha: dateInMexico,
    }));
    setTouchedFields((prevTouched) => ({
      ...prevTouched,
      fecha: true,
    }));
  };

  const handleServicioChange = (servicio) => {
    setSelectedServicio(servicio);
    setIndicacionesPrevias(servicio.indicaciones_previas || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!logeo) {
      message.warning({
        content: 'Para Solicitar el servicio inicie sesión en su cuenta.',
        duration: 2,
        style: {
          marginTop: '70px',
          marginRight: '-960px',
        },
      });
      navigate('/Iniciar Sesion');
    } else {
      const horarioSeleccionado = selectedHorario ? selectedHorario.time : '';
      const servicioSeleccionado = selectedServicio ? selectedServicio.ID_Servicio : '';

      if (!horarioSeleccionado || !servicioSeleccionado) {
        message.error('Por favor seleccione un horario y un servicio válido', 3);
        return;
      }

      setIsSubmitting(true);
      message.loading('Verificando...', 1);

      const citaData = {
        nombre: formData.nombre,
        apellido_Paterno: formData.apellidoPaterno,
        apellido_Materno: formData.apellidoMaterno,
        fecha: formData.fecha,
        horario: horarioSeleccionado,
        ID_Servicio: servicioSeleccionado,
        correo: formData.correo
      };

      console.log(citaData)

      try {
        const response = await fetch('https://api-beta-mocha-59.vercel.app/crearCita', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(citaData),
        });

        if (response.ok) {
        sendNotification('Servicio contratado con éxito', {
            body: `Tu servicio está programado para el ${formData.fecha} a las ${horarioSeleccionado}.`,
            icon: '/icon.png',
            tag: 'service-contratado'
          });
          scheduleReminderNotification(formData.fecha, horarioSeleccionado);
          message.success('Cita registrada exitosamente', 3);
          navigate('/Perfil');
        } else {
          const errorData = await response.json();
          message.error(`Error: ${errorData.msg}`, 3);
        }
      } catch (error) {
        console.error('Error al registrar la cita:', error);
        message.error('Error al registrar la cita intentelo mas tarde', 3);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-y-0 lg:space-x-8 mt-5 px-4 lg:px-0">
      <div className="w-full lg:w-auto  calendario">
        <CustomCalendar onChange={handleDateChange} value={selectedDate} />
      </div>
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-2xl">
        <h2 className="text-[50px] text-red-700 text-center mb-6">Sacar Cita</h2>
        <div className="text-[12px] text-red-800 mb-4 text-center">
       
        Las citas deben sacarse con al menos un día de anticipación.
        </div>
        <div className="text-[12px] text-red-800 mb-4 text-center">
        Para sacar una cita necesita <strong> Iniciar Sesion en su cuenta</strong> 
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-wrap lg:flex-nowrap justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="w-[9rem] lg:w-1/3">
              <label className="block text-gray-700 text-sm">Nombre</label>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                readOnly
                className={`w-full px-2 py-1 mt-1 border rounded-md focus:outline-none focus:ring-none focus:ring-none text-[12px] h-[33px] ${errors.nombre && touchedFields.nombre ? 'border-red-500' : ''}`}
              />
              <div className="h-4">
                {errors.nombre && touchedFields.nombre && <div className="text-red-500 text-[11px] mt-1">{errors.nombre}</div>}
              </div>
            </div>
          
           <div className="w-[9rem] margin lg:w-1/3">
              <label className="block  text-gray-700 text-sm">Apellido Paterno</label>
              <input
                type="text"
                name="apellidoPaterno"
                placeholder="Apellido Paterno"
                value={formData.apellidoPaterno}
                onChange={handleInputChange}
                 readOnly
                className={`w-full px-2 py-1 mt-1 border rounded-md focus:outline-none focus:ring-none focus:ring-none text-[12px] h-[33px] ${errors.apellidoPaterno && touchedFields.apellidoPaterno ? 'border-red-500' : ''}`}
              />
              <div className="h-4">
                {errors.apellidoPaterno && touchedFields.apellidoPaterno && <div className="text-red-500 text-[11px] mt-1">{errors.apellidoPaterno}</div>}
              </div>
            </div>
           
            <div className="w-[9rem] lg:w-1/3">
              <label className="block text-gray-700 text-sm">Apellido Materno</label>
              <input
                type="text"
                name="apellidoMaterno"
                placeholder="Apellido Materno"
                value={formData.apellidoMaterno}
                onChange={handleInputChange}
                readOnly
                className={`w-full px-2  py-1 mt-1 border rounded-md focus:outline-none focus:ring-none focus:ring-none text-[12px] h-[33px] ${errors.apellidoMaterno && touchedFields.apellidoMaterno ? 'border-red-500' : ''}`}
              />
              <div className="h-4">
                {errors.apellidoMaterno && touchedFields.apellidoMaterno && <div className="text-red-500 text-[11px] mt-1">{errors.apellidoMaterno}</div>}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap justify-between items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="w-[15rem] lg:w-2/3">
              <label className="block text-gray-700 text-sm">Correo</label>
              <input
                type="email"
                name="correo"
                placeholder="Correo"
                value={formData.correo}
                onChange={handleInputChange}
               readOnly
                className={`w-full px-2 py-1 mt-1 border rounded-md focus:outline-none focus:ring-none focus:ring-none text-[12px] h-[33px] ${errors.correo && touchedFields.correo ? 'border-red-500' : ''}`}
              />
              <div className="h-4">
                {errors.correo && touchedFields.correo && <p className="text-red-500 text-xs mt-1">{errors.correo}</p>}
              </div>
            </div>
            <div className="w-[7.8rem] lg:w-1/3">
              <label className="block text-gray-700 text-sm">Fecha</label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleInputChange}
                className={`w-full px-2 py-1 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-[12px] h-[33px] ${errors.fecha && touchedFields.fecha ? 'border-red-500' : ''}`}
              />
              <div className="h-4">
                {errors.fecha && touchedFields.fecha && <div className="text-red-500 text-[11px] mt-1">{errors.fecha}</div>}
              </div>
            </div>
            <div className="w-[11rem]  lg:w-1/3">
              <label className="block  text-gray-700 text-sm">Horarios Disponibles</label>
              <Listbox value={selectedHorario} onChange={setSelectedHorario} disabled={!availableHorarios.length}>
                <div className="relative mt-2 mb-3">
                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1 pl-2 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 sm:text-sm h-[33px] flex items-center justify-between">
                    <span className="block truncate">{selectedHorario ? selectedHorario.name : 'Seleccione un horario'}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {availableHorarios.length ? availableHorarios.map((horario) => (
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
                            {selected ? (
                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                                <CheckIcon aria-hidden="true" className="h-5 w-5" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    )) : <div className="py-2 pl-3 pr-9 text-gray-500">No hay horarios disponibles</div>}
                  </Listbox.Options>
                </div>
              </Listbox>
              <div className="h-4">
                {errors.horario && touchedFields.horario && <p className="text-red-500 text-xs mt-1">{errors.horario}</p>}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm">Servicio</label>
            <Listbox value={selectedServicio} onChange={handleServicioChange} disabled={isFormDisabled}>
              <div className="relative mt-1">
                <Listbox.Button className="relative  cursor-default rounded-md bg-white py-1 pl-2 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 sm:text-sm h-[33px] w-3/5 lg:w-1/2 flex items-center justify-between">
                  <span className="block truncate">{selectedServicio ? selectedServicio.tipo_Servicio : 'Seleccionar servicio'}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-4/5 lg:w-1/2  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {servicios.map((servicio) => (
                    <Listbox.Option
                      key={servicio.ID_Servicio}
                      value={servicio}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-3 pr-9 ${
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                            {servicio.tipo_Servicio}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                              <CheckIcon aria-hidden="true" className="h-5 w-5" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
            <div className="h-4">
              {errors.servicio && touchedFields.servicio && <p className="text-red-500 text-xs mt-1">{errors.servicio}</p>}
            </div>
          </div>
          {indicacionesPrevias && (
            <div>
              <label className="block text-gray-900 text-sm">Indicaciones Previas</label>
              <textarea
                readOnly
                value={indicacionesPrevias}
                className="w-full px-2 py-1 mt-1 border text-gray-900 rounded-md focus:outline-none focus:ring-none focus:ring-none text-[12px] h-[100px] resize-none"
              />
            </div>
          )}
          <div className="col-span-full flex justify-center mt-6">
            <button
              type="submit"
              disabled={!isFormValid || isFormDisabled || isSubmitting}
              className={`px-4 py-2 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-900 ${isFormValid && !isFormDisabled && !isSubmitting ? 'bg-red-400' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              Registrar Cita
            </button>
          </div>
        </form>
      </div>  
    </div>
  );
}
