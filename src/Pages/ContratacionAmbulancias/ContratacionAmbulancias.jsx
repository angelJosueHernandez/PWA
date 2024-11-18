import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Components/Contexts/AuthContexts';
import ambulanceImage from '../../assets/img/ambulanciaForm.png';
import { Textarea } from '@material-tailwind/react';
import { InfoPopover } from './InfoPopover'; // Asegúrate de ajustar la ruta de importación
import './ContratacionAmbulancias.css';
import { message } from 'antd';
import { Navigate } from 'react-router-dom';

export default function ContratacionForm() {
  const { idCookieUser, correoCookieUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const ID_Usuario = idCookieUser;

  if (!isAuthenticated) {
    return <Navigate to="/Iniciar Sesion" />;
  }


  const [nombre, setNombre] = useState('');
  const [apellido_Paterno, setApellido_Paterno] = useState('');
  const [apellido_Materno, setApellido_Materno] = useState('');
  const [inicio_Traslado, setInicio_Traslado] = useState('');
  const [escala, setEscala] = useState('');
  const [destino_Traslado, setDestino_Traslado] = useState('');
  const [motivo, setMotivo] = useState('');
  const [material_especifico, setMaterial_especifico] = useState('');
  const [fecha, setFecha] = useState('');
  const [horario, setHorario] = useState('');
  const [ID_Tipo_Contratacion, setID_Tipo_Contratacion] = useState('');
  const [ambulanciaSeleccionada, setAmbulanciaSeleccionada] = useState('');
  const [ambulanciasDisponibles, setAmbulanciasDisponibles] = useState([]);
  const [tipoContratacionOptions, setTipoContratacionOptions] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [ambulanciaError, setAmbulanciaError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [nombreError, setNombreError] = useState('');
  const [apellidoPaternoError, setApellidoPaternoError] = useState('');
  const [apellidoMaternoError, setApellidoMaternoError] = useState('');
  const [inicioTrasladoError, setInicioTrasladoError] = useState('');
  const [escalaError, setEscalaError] = useState('');
  const [destinoTrasladoError, setDestinoTrasladoError] = useState('');
  const [motivoError, setMotivoError] = useState('');
  const [materialEspecificoError, setMaterialEspecificoError] = useState('');
  const [fechaError, setFechaError] = useState('');
  const [horarioError, setHorarioError] = useState('');
  const [tipoContratacionError, setTipoContratacionError] = useState('');
  const [ambulanciaSeleccionadaError, setAmbulanciaSeleccionadaError] =
    useState('');

  useEffect(() => {
    fetch('https://api-beta-mocha-59.vercel.app/tipoContratacion')
      .then((response) => response.json())
      .then((data) => setTipoContratacionOptions(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    fetch(`https://api-beta-mocha-59.vercel.app/usuario/${correoCookieUser}`)
      .then((response) => response.json())
      .then((data) => {
        setNombre(data.nombre);
        setApellido_Paterno(data.apellidoP);
        setApellido_Materno(data.apellidoM);
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, [correoCookieUser]);

  useEffect(() => {
    const fetchAmbulancias = async () => {
      try {
        const response = await fetch('https://api-beta-mocha-59.vercel.app/ambulancias-disponibles');
        const data = await response.json();
        if (data.length > 0) {
          setAmbulanciasDisponibles(data);
          setAmbulanciaError(''); // Limpia cualquier mensaje de error anterior
        } else {
          setAmbulanciaError('Por el momento no hay ambulancias disponibles');
        }
      } catch (error) {
        console.error('Error fetching ambulances:', error);
      }
    };
  
    // Llama a la función inmediatamente y luego cada 5 segundos
    fetchAmbulancias();
    const intervalId = setInterval(fetchAmbulancias, 1000);
  
    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);
  
  const validateNombre = (value) => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(value)) {
      setNombreError(
        'No se permiten caracteres especiales solo letras y espacios.',
      );
    } else {
      setNombreError('');
    }
    setNombre(value);
  };

  const validateApellidoPaterno = (value) => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(value)) {
      setApellidoPaternoError(
        'No se permiten caracteres especiales solo letras y espacios.',
      );
    } else {
      setApellidoPaternoError('');
    }
    setApellido_Paterno(value);
  };

  const validateApellidoMaterno = (value) => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(value)) {
      setApellidoMaternoError(
        'No se permiten caracteres especiales solo letras y espacios.',
      );
    } else {
      setApellidoMaternoError('');
    }
    setApellido_Materno(value);
  };

  const validateInicioTraslado = (value) => {
    const regex = /^[a-zA-Z0-9\s]*$/;
    if (!regex.test(value)) {
      setInicioTrasladoError('No se permiten caracteres especiales.');
    } else {
      setInicioTrasladoError('');
    }
    setInicio_Traslado(value);
  };

  const validateEscala = (value) => {
    const regex = /^[a-zA-Z0-9\s]*$/;
    if (!regex.test(value)) {
      setEscalaError('No se permiten caracteres especiales.');
    } else {
      setEscalaError('');
    }
    setEscala(value);
  };

  const validateDestinoTraslado = (value) => {
    const regex = /^[a-zA-Z0-9\s]*$/;
    if (!regex.test(value)) {
      setDestinoTrasladoError('No se permiten caracteres especiales.');
    } else {
      setDestinoTrasladoError('');
    }
    setDestino_Traslado(value);
  };

  const validateMotivo = (value) => {
    const regex = /^[a-zA-Z0-9\s]*$/;
    if (!regex.test(value)) {
      setMotivoError('No se permiten caracteres especiales.');
    } else {
      setMotivoError('');
    }
    setMotivo(value);
  };

  const validateMaterialEspecifico = (value) => {
    const regex = /^[a-zA-Z0-9\s]*$/;
    if (!regex.test(value)) {
      setMaterialEspecificoError('No se permiten caracteres especiales.');
    } else {
      setMaterialEspecificoError('');
    }
    setMaterial_especifico(value);
  };

  const validateFecha = (value) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (selectedDate < currentDate) {
      setFechaError('La fecha no puede ser anterior a hoy.');
    } else {
      setFechaError('');
    }
    setFecha(value);
  };

  const validateHorario = (value) => {
    const [hour, minute] = value.split(':');
    const formattedHorario = `${hour}:${minute}:00`; // Formato 'HH:mm:ss'
    setHorario(formattedHorario);
  };

  const validateTipoContratacion = (value) => {
    setID_Tipo_Contratacion(value);
  };

  const validateAmbulanciaSeleccionada = (value) => {
    setAmbulanciaSeleccionada(value);
  };

  const validateFields = () => {
    return (
      !nombreError &&
      !apellidoPaternoError &&
      !apellidoMaternoError &&
      !inicioTrasladoError &&
      !escalaError &&
      !destinoTrasladoError &&
      !motivoError &&
      !materialEspecificoError &&
      !fechaError &&
      nombre &&
      apellido_Paterno &&
      apellido_Materno &&
      inicio_Traslado &&
      escala &&
      destino_Traslado &&
      motivo &&
      material_especifico &&
      fecha &&
      horario &&
      ID_Tipo_Contratacion &&
      ambulanciaSeleccionada
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateFields()) {
      setErrorMessage('Por favor, complete todos los campos correctamente.');
      return;
    }

    setIsSubmitting(true);
    message.loading('Verficando...', 4);
    setTimeout(() => {}, 1000);

    const requestBody = {
      nombre,
      apellido_Paterno,
      apellido_Materno,
      inicio_Traslado,
      escala,
      destino_Traslado,
      motivo,
      material_especifico,
      fecha,
      horario,
      ID_Usuario,
      ID_Tipo_Contratacion,
      ambulanciaSeleccionada,
      correo: correoCookieUser,
    };

    try {
      const response = await fetch(
        'https://api-beta-mocha-59.vercel.app/CrearContratacion',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        },
      );

      if (!response.ok) {
        const data = await response.json();
        setIsSubmitting(true);
        throw new Error(data.msg || 'Error en la solicitud');
      }

      await fetch(
        'https://api-beta-mocha-59.vercel.app/enviar-correo-contratacion',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre,
            apellido_Paterno,
            apellido_Materno,
            correo: correoCookieUser,
          }),
        },
      );

      message.success(
        'Solicitud enviada correctamente a revisión, por favor cheque su correo para llevar el seguimiento correcto del proceso de contratación.',
      );
      navigate('/Perfil');
      setSuccessMessage('Registro realizado de manera exitosa', 10);
      setErrorMessage('');
    } catch (error) {
      setIsSubmitting(false);
      setSuccessMessage('');
      message.warning({
        content: ` ${error.message}`,
        duration: 2,
        style: {
          marginTop: '70px',
        },
      });
      setErrorMessage(`Error: ${error.message}`);
    }
  };

  console.log(horario);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col lg:flex-row lg:space-x-8 w-full max-w-6xl">
        <form
          onSubmit={handleSubmit}
          className={`w-full lg:w-2/3 ${ambulanciaError ? 'opacity-80 pointer-events-none' : ''}`}
        >
          <h3 className="text-[50px] flex justify-center items-center mb-4 text-red-800">
            Contratación de Ambulancias
          </h3>
          <div className="text-[13px] text-red-600 mb-4">
            <strong>
              Nota: Para la contratacion del servicio tome encuenta solicitarla
              3 dias antes ya que pasara por un proceso de revision su
              solicitud.
            </strong>
          </div>
          <p className="text-[13px] text-gray-600 mb-2">
            <strong>Nota: Rellene los campos que faltan.</strong> <br />
            <br />
          </p>

          {ambulanciaError && (
            <div className="text-red-800 font-bold text-center mb-4">
              {ambulanciaError}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="form-group col-span-1 md:col-span-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="ID_Tipo_Contratacion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tipo Contratación
                </label>
                <InfoPopover content="Seleccione el tipo de contratación del servicio de ambulancia." />
              </div>
              <select
                id="ID_Tipo_Contratacion"
                name="ID_Tipo_Contratacion"
                value={ID_Tipo_Contratacion}
                onChange={(e) => validateTipoContratacion(e.target.value)}
                required
                className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Seleccione un tipo</option>
                {tipoContratacionOptions.map((tipo) => (
                  <option
                    key={tipo.ID_Tipo_Contratacion}
                    value={tipo.ID_Tipo_Contratacion}
                  >
                    {tipo.tipo}
                  </option>
                ))}
              </select>
              {tipoContratacionError && (
                <p className="text-red-600 text-[11px] mt-1">
                  {tipoContratacionError}
                </p>
              )}
            </div>
            <div className="form-group col-span-1 md:col-span-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="ambulanciaSeleccionada"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ambulancia
                </label>
                <InfoPopover content="Seleccione una ambulancia disponible para el traslado." />
              </div>
              <select
                id="ambulanciaSeleccionada"
                name="ambulanciaSeleccionada"
                value={ambulanciaSeleccionada}
                onChange={(e) => validateAmbulanciaSeleccionada(e.target.value)}
                required
                className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                disabled={ambulanciaError ? true : false}
              >
                <option value="">Seleccione una ambulancia</option>
                {ambulanciasDisponibles.map((ambulancia) => (
                  <option
                    key={ambulancia.AmbulanciaID}
                    value={ambulancia.AmbulanciaID}
                  >
                    {ambulancia.NumeroAmbulancia}
                  </option>
                ))}
              </select>
              {ambulanciaSeleccionadaError && (
                <p className="text-red-600 text-[11px] mt-1">
                  {ambulanciaSeleccionadaError}
                </p>
              )}
            </div>
            <div className="form-group col-span-1 md:col-span-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <InfoPopover content="Ingrese su nombre completo tal como aparece en su identificación oficial." />
              </div>
              <input
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={(e) => validateNombre(e.target.value)}
                required
                type="text"
                autoComplete="nombre"
                className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                readOnly // Hace que el campo sea de solo lectura
              />
              {nombreError && (
                <div className="text-red-600 text-[11px] mt-1">
                  {nombreError}
                </div>
              )}
            </div>
            <div className="form-group col-span-1 md:col-span-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="apellido_Paterno"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apellido Paterno
                </label>
                <InfoPopover content="Ingrese su apellido paterno tal como aparece en su identificación oficial." />
              </div>
              <input
                id="apellido_Paterno"
                name="apellido_Paterno"
                value={apellido_Paterno}
                onChange={(e) => validateApellidoPaterno(e.target.value)}
                required
                type="text"
                autoComplete="apellidoPaterno"
                className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                readOnly // Hace que el campo sea de solo lectura
              />
              {apellidoPaternoError && (
                <div className="text-red-600 text-[11px] mt-1">
                  {apellidoPaternoError}
                </div>
              )}
            </div>
            <div className="form-group col-span-1 md:col-span-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="apellido_Materno"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apellido Materno
                </label>
                <InfoPopover content="Ingrese su apellido materno tal como aparece en su identificación oficial." />
              </div>
              <input
                id="apellido_Materno"
                name="apellido_Materno"
                value={apellido_Materno}
                onChange={(e) => validateApellidoMaterno(e.target.value)}
                required
                type="text"
                autoComplete="apellido_Materno"
                className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                readOnly // Hace que el campo sea de solo lectura
              />
              {apellidoMaternoError && (
                <div className="text-red-600 text-[11px] mt-1">
                  {apellidoMaternoError}
                </div>
              )}
            </div>
            <div className="form-group col-span-1 md:col-span-2 lg:col-span-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="motivo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Motivo
                </label>
                <InfoPopover content="Describa el motivo del traslado (por ejemplo, consulta médica, tratamiento, etc.)." />
              </div>
              <Textarea
                id="motivo"
                name="motivo"
                value={motivo}
                onChange={(e) => validateMotivo(e.target.value)}
                required
                className="mt-1 h-32 border margText border-gray-300 rounded-md w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-[12px]"
              />
              {motivoError && (
                <div className="text-red-600 text-[11px] mt-1">
                  {motivoError}
                </div>
              )}
            </div>
            <div className="form-group col-span-1 md:col-span-2 lg:col-span-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="material_especifico"
                  className="block text-sm font-medium text-gray-700"
                >
                  Material Específico
                </label>
                <InfoPopover content="Indique si se requiere algún material específico durante el traslado (por ejemplo, oxígeno, camilla, etc.)." />
              </div>
              <Textarea
                id="material_especifico"
                name="material_especifico"
                value={material_especifico}
                onChange={(e) => validateMaterialEspecifico(e.target.value)}
                required
                className="mt-1 h-32 border margText border-gray-300 rounded-md w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-[12px]"
              />
              {materialEspecificoError && (
                <div className="text-red-600 text-[11px] mt-1">
                  {materialEspecificoError}
                </div>
              )}
            </div>
            <div className="form-group col-span-1 md:col-span-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="inicio_Traslado"
                  className="block text-sm font-medium text-gray-700"
                >
                  Inicio Traslado
                </label>
                <InfoPopover content="Ingrese el lugar de inicio del traslado (por ejemplo, su dirección actual). Para la contratación de eventos, coloque el lugar del evento." />
              </div>
              <input
                id="inicio_Traslado"
                name="inicio_Traslado"
                value={inicio_Traslado}
                onChange={(e) => validateInicioTraslado(e.target.value)}
                required
                type="text"
                autoComplete="inicio_Traslado"
                className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              {inicioTrasladoError && (
                <div className="text-red-600 text-[11px] mt-1">
                  {inicioTrasladoError}
                </div>
              )}
            </div>
            <div className="form-group col-span-1 md:col-span-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="escala"
                  className="block text-sm font-medium text-gray-700"
                >
                  Escala
                </label>
                <InfoPopover content="Ingrese las escalas o paradas intermedias durante el traslado. Para la contratación de eventos, coloque 'No aplica'." />
              </div>
              <input
                id="escala"
                name="escala"
                value={escala}
                onChange={(e) => validateEscala(e.target.value)}
                required
                type="text"
                autoComplete="escala"
                className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              {escalaError && (
                <div className="text-red-600 text-[11px] mt-1">
                  {escalaError}
                </div>
              )}
            </div>
            <div className="form-group col-span-1 md:col-span-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="destino_Traslado"
                  className="block text-sm font-medium text-gray-700"
                >
                  Destino Traslado
                </label>
                <InfoPopover content="Ingrese el destino final del traslado (por ejemplo, la dirección del hospital). Para la contratación de eventos, coloque 'No aplica'." />
              </div>
              <input
                id="destino_Traslado"
                name="destino_Traslado"
                value={destino_Traslado}
                onChange={(e) => validateDestinoTraslado(e.target.value)}
                required
                type="text"
                autoComplete="destino_Traslado"
                className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              {destinoTrasladoError && (
                <div className="text-red-600 text-[11px] mt-1">
                  {destinoTrasladoError}
                </div>
              )}
            </div>
            <div className="form-group col-span-1 md:col-span-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="fecha"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha
                </label>
                <InfoPopover content="Seleccione la fecha en la que se realizará el traslado." />
              </div>
              <input
                id="fecha"
                name="fecha"
                value={fecha}
                onChange={(e) => validateFecha(e.target.value)}
                required
                type="date"
                autoComplete="fecha"
                className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              {fechaError && (
                <div className="text-red-600 text-[11px] mt-1">
                  {fechaError}
                </div>
              )}
            </div>
            <div className="form-group col-span-1 md:col-span-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="horario"
                  className="block text-sm font-medium text-gray-700"
                >
                  Horario
                </label>
                <InfoPopover content="Seleccione el horario en el que se realizará el traslado (horas y minutos)." />
              </div>
              <input
                id="horario"
                name="horario"
                value={horario}
                onChange={(e) => validateHorario(e.target.value)}
                required
                type="time"
                autoComplete="horario"
                className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                step="60"
              />
              {horarioError && (
                <div className="text-red-600 text-[11px] mt-1">
                  {horarioError}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className={`bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 flex items-center justify-center ${isSubmitting ? 'opacity-50 cursor-not-allowed btnCar' : ''}`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && <span className="spinner"></span>}{' '}
              {/* Spinner */}
              {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
          </div>

          {successMessage && (
            <div className="text-red-600 text-[11px] mt-1">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="text-red-600 text-[11px] mt-1">{errorMessage}</div>
          )}
        </form>
        <div className="w-full lg:w-1/3 flex justify-center items-center mt-4 lg:mt-0">
          <img
            src={ambulanceImage}
            alt="Ambulancia"
            className="max-w-full ambu"
          />
        </div>
      </div>
    </div>
  );
}
