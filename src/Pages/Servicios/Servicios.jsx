import React, { useState, useEffect, useMemo } from "react";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import './Servicios.css';
import { DefaultSkeleton } from "./DefaultSkeleton";
import ambu from '../../assets/img/ambu.png';
import ser from '../../assets/img/ser.png';
import Cookies from 'js-cookie';
import { useAuth } from "../../Components/Contexts/AuthContexts";
import { message } from 'antd';
import x from '../../assets/img/x.png'
import bu from '../../assets/img/busqueda.png'
// Importa el ícono que necesitas
import { CheckIcon } from '@heroicons/react/20/solid';

// URLs de los íconos de Flaticon desde Internet

const { Option } = Select;

const Servicios = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [search, setSearch] = useState("");
  const [filterServicios, setFilterServicios] = useState("");
  const [filterCostos, setFilterCostos] = useState("");
  const [tiposServicio, setTiposServicio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userId, setUserId] = useState(null);
  const [logeo, setLogeo] = useState(null);

  const costRanges = [
    { label: 'Menos de $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $150', min: 100, max: 150 },
    { label: '$150 - $200', min: 150, max: 200 },
    { label: '$200 - $250', min: 200, max: 250 },
    { label: '$250 - $300', min: 250, max: 300 },
    { label: 'Más de $300', min: 300, max: Infinity }
  ];

  const filteredData = useMemo(() => {
    const searchLower = search.toLowerCase();
    const selectedRange = costRanges.find(range => range.label === filterCostos);
    return tiposServicio.filter((item) => {
      const servicioLower = item.servicio ? item.servicio.toLowerCase() : "";
      const costos = item.costos ? parseFloat(item.costos) : 0;
      return (
        (!search || servicioLower.includes(searchLower)) &&
        (!filterServicios || item.servicio === filterServicios) &&
        (!selectedRange || (costos >= selectedRange.min && costos <= selectedRange.max))
      );
    });
  }, [tiposServicio, search, filterServicios, filterCostos]);

  const searcher = (value) => {
    setSearch(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/tiposServicio', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        const servicios = await response.json();
        setTiposServicio(servicios);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const token = Cookies.get('jwt');
    if (token) {
      try {
        fetch('http://localhost:3000/verifyToken', {
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

  if (loading) {
    return <DefaultSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white-100">
        <p className="text-gray-700 text-[13px]">Error al cargar los datos. Por favor, inténtelo más tarde.</p>
        <img src={ambu} className="imgAm" />
      </div>
    );
  }

  const handleSolicitarClick = (servicio) => {
    if (servicio.servicio === 'Eventos' || servicio.servicio === 'Traslados') {
      if (isAuthenticated) {
        navigate('/ContratacionAmbulancias');
      } else {
        message.warning({
          content: 'Para Solicitar el servicio inicie sesión en su cuenta.',
          duration: 2,
          style: {
            marginTop: '70px',
          },
        });
        navigate('/Iniciar Sesion');
      }
    } else {
      navigate('/citas');
    }
  };

  const clearSearch = () => setSearch("");

  return (
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-8 max-w-2xl sm:text-center">
          <h3 className="tracking-tight text-gray-900 sm:text-4xl">Servicios que ofrece la Cruz Roja Huejutla</h3>
          <p className="mt-8 text-[13px] leading-6 text-gray-600">
            Nuestro compromiso en la Cruz Roja es brindar un cuidado integral y humano, asegurando que cada paciente
            reciba un tratamiento personalizado acorde a sus necesidades. Nos dedicamos a promover
            la salud y el bienestar de nuestra comunidad, ofreciendo servicios de alta calidad y
            accesibles para todos.
            
          </p>
        </div>
        <div className="filtros flex justify-end mb-4">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            
            {/* Input de búsqueda con íconos desde Internet (Flaticon) */}
            <div className="relative w-full max-w-xs">
              {/* Ícono de búsqueda */}
             <img src={bu} alt="" className=" absolute botom-4 top-1/2 ml-4 transform -translate-y-1/2 h-3 w-3 cursor-pointer" />
              
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar..."
               className="bg-white outline-none bus py-1 pl-9 pr-2 mt-[15px]   w-full h-[41px] text-[12px] focus:ring-0 focus:bg-white focus:shadow-2xl transition-all duration-300 ease-in-out"
      
              />

              {/* Ícono de borrar */}
              {search && (
                <img
                  src={x}
                  alt="Limpiar"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 cursor-pointer"
                  onClick={clearSearch}
                />
              )}
            </div>

            <Select
              placeholder="Filtrar por Servicios"
              value={filterServicios}
              onChange={setFilterServicios}
              className="custom-select"
              style={{ height: '42px', borderRadius: '25px', width: '250px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} // Estilos personalizados
            >
              <Option value="">Servicios</Option>
              {Array.from(new Set(tiposServicio.map((item) => item.servicio))).map((servicio) => (
                <Option key={servicio} value={servicio}>
                  {servicio}
                </Option>
              ))}
            </Select>

            <Select
              placeholder="Filtrar por Costos"
              value={filterCostos}
              onChange={setFilterCostos}
              className="custom-select"
              style={{ height: '42px', borderRadius: '25px', width: '250px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} // Estilos personalizados
            >
              <Option value="">Costos</Option>
              {costRanges.map((range) => (
                <Option key={range.label} value={range.label}>
                  {range.label}
                </Option>
              ))}
            </Select>

          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-screen bg-white-100">
            <p className="text-gray-700 text-[13px]">No se encontraron resultados</p> <br />
            <img src={ser} className="imgAm" />
          </div>
        ) : (
          <div className="bg-white serv mt-8">
            {filteredData.map((servicio) => (
              <div key={servicio.id} className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                <div className="p-8 sm:p-10 lg:flex-auto">
                  <h3 className="text-3xl tracking-tight text-gray-900">{servicio.servicio}</h3>
                  <p className="mt-6 text-[13px] leading-7 text-gray-600">
                    {servicio.descripcion}
                  </p>
                  <div className="mt-10 flex items-center gap-x-4">
                    <h4 className="flex-none text-[18px] font-semibold leading-6 text-red-600">Indicaciones</h4>
                    <div className="h-px flex-auto bg-gray-100" />
                  </div>
                  <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                    <li className="flex gap-x-3 text-[13px]">
                      <CheckIcon aria-hidden="true" className="h-8 w-6 flex-none text-green-500" />
                      {servicio.indicaciones}
                    </li>
                  </ul>
                </div>
                <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                  <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                    <div className="mx-auto max-w-xs px-8">
                      <p className="text-[13px] font-semibold text-gray-600">
                        {servicio.servicio === 'Eventos' || servicio.servicio === 'Traslados'
                          ? 'Para estos servicios, necesitamos que realices el proceso de contratación. El precio se proporcionará después de la validación de su servicio, se le estará informando mediante un correo.'
                          : 'Obtén el servicio ahora mismo'}
                      </p>
                      {servicio.servicio !== 'Eventos' && servicio.servicio !== 'Traslados' && (
                        <>
                          <p className="mt-6 flex items-baseline justify-center gap-x-2">
                            <span className="text-5xl tracking-tight text-gray-900">${servicio.costos}</span>
                            <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">MXN</span>
                          </p>
                        </>
                      )}
                      <button
                        onClick={() => handleSolicitarClick(servicio)}
                        className="mt-10 block w-full rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      >
                        Solicitar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Servicios;
