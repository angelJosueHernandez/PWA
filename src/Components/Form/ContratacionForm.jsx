import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContratacionForm.css';

export default function ContratacionForm() {
  const navigate = useNavigate();

  // Estados para los nuevos campos
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
  const [tipoContratacionOptions, setTipoContratacionOptions] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('https://api-beta-mocha-59.vercel.app/tipoContratacion')
      .then((response) => response.json())
      .then((data) => setTipoContratacionOptions(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar que todos los campos requeridos estén completos
    if (
      !nombre ||
      !apellido_Paterno ||
      !apellido_Materno ||
      !inicio_Traslado ||
      !escala ||
      !destino_Traslado ||
      !motivo ||
      !material_especifico ||
      !fecha ||
      !horario ||
      !ID_Tipo_Contratacion
    ) {
      setErrorMessage('Por favor, complete todos los campos.');
      return;
    }

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
      ID_Tipo_Contratacion,
    };

    console.log('Enviando datos:', requestBody); // Depuración

    fetch(
      'https://api-beta-mocha-59.vercel.app/CrearContratacionSinRegistrar',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.msg || 'Error en la solicitud');
          });
        }
        return response.json();
      })
      .then((data) => {
        setSuccessMessage('Registro realizado de manera exitosa');
        setErrorMessage('');
      })
      .catch((error) => {
        console.error('Error:', error);
        setSuccessMessage('');
        setErrorMessage(`Error: ${error.message}`);
      });
  };

  return (
    <div className="container5">
      <div className="form-container5 sign-in">
        <form onSubmit={handleSubmit}>
          <h3 className="title-form5">Contratación de Ambulancias</h3>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                type="text"
                autoComplete="nombre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellido_Paterno">Apellido Paterno</label>
              <input
                id="apellido_Paterno"
                name="apellido_Paterno"
                value={apellido_Paterno}
                onChange={(e) => setApellido_Paterno(e.target.value)}
                required
                type="text"
                autoComplete="apellidoPaterno"
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellido_Materno">Apellido Materno</label>
              <input
                id="apellido_Materno"
                name="apellido_Materno"
                value={apellido_Materno}
                onChange={(e) => setApellido_Materno(e.target.value)}
                required
                type="text"
                autoComplete="apellido_Materno"
              />
            </div>

            <div className="form-group">
              <label htmlFor="inicio_Traslado">Inicio Traslado</label>
              <input
                id="inicio_Traslado"
                name="inicio_Traslado"
                value={inicio_Traslado}
                onChange={(e) => setInicio_Traslado(e.target.value)}
                required
                type="text"
                autoComplete="inicio_Traslado"
              />
            </div>

            <div className="form-group">
              <label htmlFor="escala">Escala</label>
              <input
                id="escala"
                name="escala"
                value={escala}
                onChange={(e) => setEscala(e.target.value)}
                required
                type="text"
                autoComplete="escala"
              />
            </div>

            <div className="form-group">
              <label htmlFor="destino_Traslado">Destino Traslado</label>
              <input
                id="destino_Traslado"
                name="destino_Traslado"
                value={destino_Traslado}
                onChange={(e) => setDestino_Traslado(e.target.value)}
                required
                type="text"
                autoComplete="destino_Traslado"
              />
            </div>

            <div className="form-group">
              <label htmlFor="motivo">Motivo</label>
              <input
                id="motivo"
                name="motivo"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                required
                type="text"
                autoComplete="motivo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="material_especifico">Material Específico</label>
              <input
                id="material_especifico"
                name="material_especifico"
                value={material_especifico}
                onChange={(e) => setMaterial_especifico(e.target.value)}
                required
                type="text"
                autoComplete="material_especifico"
              />
            </div>

            <div className="form-group">
              <label htmlFor="fecha">Fecha</label>
              <input
                id="fecha"
                name="fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
                type="date"
                autoComplete="fecha"
              />
            </div>

            <div className="form-group">
              <label htmlFor="horario">Horario</label>
              <input
                id="horario"
                name="horario"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                required
                type="time"
                autoComplete="horario"
              />
            </div>

            <div className="form-group">
              <label htmlFor="idTipoContratacion">Tipo Contratacion</label>
              <select
                id="ID_Tipo_Contratacion"
                name="ID_Tipo_Contratacion"
                value={ID_Tipo_Contratacion}
                onChange={(e) => setID_Tipo_Contratacion(e.target.value)}
                required
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
            </div>
          </div>
          <div className="button-container">
            <button className="button2" type="submit">
              Enviar
            </button>
          </div>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}
