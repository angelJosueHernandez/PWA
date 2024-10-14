import { Button, Typography } from '@material-tailwind/react';
import React, { useState, useEffect, useRef } from 'react';
import { useUser } from "../../UserContext";
import ReactDOM from 'react-dom';
import Swal from "sweetalert2";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM }) ;

const CarritoDetalle = () => {
  const { user } = useUser();
  const [isLoading, setLoading] = useState(true);
  const [carrito, setCarrito] = useState([]);
  const [direcciones,setDirecciones]= useState();
  const [total,setTotal]= useState(20);
  const paypalRef = useRef();
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  
  const obtenerIdUsuario = (user) => {
    return user && user.idUsuario ? user.idUsuario : null;
  };

  const obtenerDirecciones = async () => {

    try {
      const response = await fetch(
        apiurll + /api/CasaDelMarisco/TraerDirecciones?UsuarioID=${user.idUsuario},
        {
          method: "GET",
        }
      );
      const data = await response.json();     
      if (Array.isArray(data)) {
        setDirecciones(data);
        console.log("Direcciones obtenidas:", data);
      } else {
        console.error("La respuesta de la API no es un array:", data);
        setDirecciones([]);
      }
     
    } catch (error) {
      console.error("Error al obtener reservaciones:", error);
    } finally {
      setLoading(false); 
    }

  };

  const agregarAlCarrito = async (producto) => {
    const data = new FormData();
    data.append("idUsuario",user.idUsuario)
    data.append("idProducto",producto.idProducto)

    fetch(
      apiurll + "/api/CasaDelMarisco/AgregarProductosCarrito",
      {
        method: "POST",
        body: data,
      }
    )
    .then((res) => res.json())
    .then((result) => {
      console.log(result)
      if (result === 'Exito') {
        obtenerProductoCarrito();
      } else {
      
      }
      })
      .catch((error) => {
          console.error('Error al realizar la solicitud:', error);
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ha ocurrido un error al procesar la solicitud',
          });
      });
    
  };

  const eliminarDelCarrito = (productoAEliminar) => {
    const data = new FormData();
    data.append("idUsuario",user.idUsuario)
    data.append("idProducto",productoAEliminar.idProducto)
    data.append("idCarritoProductos",productoAEliminar.idCarritoProductos)

    fetch(
      apiurll + "/api/CasaDelMarisco/QuitarProductosCarrito",
      {
        method: "POST",
        body: data,
      }
    )
    .then((res) => res.json())
    .then((result) => {
      console.log(result)
      if (result === 'Exito') {
        obtenerProductoCarrito();
      } else {
         
      }
      })
      .catch((error) => {
          console.error('Error al realizar la solicitud:', error);
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ha ocurrido un error al procesar la solicitud',
          });
      });
    
  };

  const obtenerProductoCarrito = async () => {
    const id = obtenerIdUsuario(user);

    if (id !== null) {
      try {
        const response = await fetch(
          apiurll + /api/CasaDelMarisco/TraerCarritoPorUsuario?idUsuario=${id},
          {
            method: "GET",
          }
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setCarrito(data);
        } else {
          console.error("El resultado de la API no es un array:", data);
        }
      } catch (error) {
        console.error("Error al obtener reservaciones:", error);
      } finally {
        setLoading(false); // Marcar el estado de carga como falso una vez que se completa la solicitud
      }
    } else {
      setLoading(false); // Marcar el estado de carga como falso si no hay un id válido
    }
  };
  

  const createOrder = (data, actions) => {
    console.log('Valor de total:', total);
    const amount = parseFloat(total);
    console.log('Monto parseado:', amount);
  
    if (isNaN(amount) || amount <= 0) {
      console.error('Monto inválido:', amount);
      throw new Error('Monto inválido');
    }
  
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: amount.toFixed(2)
        }
      }],
      application_context: {
        shipping_preference: 'NO_SHIPPING'
      }
    });
  };
  
  const onApprove = async (data, actions) => {
    try {
      const order = await actions.order.capture();
      console.log('Orden capturada:', order);
      alert("Pago completado con éxito!");
      return order;
    } catch (error) {
      console.error('Error al capturar la orden:', error);
      alert(Error al completar el pago: ${error.message});
      throw error;
    }
  };
  

  const calcularTotal = () => {
    if (!carrito || carrito.length === 0) return 0;
  
    const subtotal = carrito.reduce((acc, item) => acc + item.Precio, 0);
    const iva = subtotal * 0.16;
    const envio = 30;
    const total = subtotal + iva + envio;
  
    return {
      subtotal: subtotal.toFixed(2),
      iva: iva.toFixed(2),
      envio: envio.toFixed(2),
      total: total.toFixed(2)
    };
  };


  useEffect(() => {
    obtenerProductoCarrito();
    obtenerDirecciones();
    
  }, []);

  useEffect(() => {
    const totales = calcularTotal();
    setTotal(parseFloat(totales.total));
  }, [carrito]);


  return (
    <div className='mr-20 ml-20'>
      <div className="grid grid-cols-5 gap-4 p-5">
        <div className='col-span-3 w-full pr-1 shadow-lg rounded-[10px] p-5 mr-10'>
          {/* Header */}
          <div className="flex w-full mb-4">
            <div className="w-2/4 p-4 font-bold">Producto</div>
            <div className="w-1/4 p-4 font-bold text-center">Cantidad</div>
            <div className="w-1/4 p-4 font-bold text-center">Total</div>
          </div>

          {/* Product rows */}
          <div className="flex flex-col pl-5 pr-5">
            {isLoading ? (
              <p>Cargando...</p>
            ) : carrito != null ? (
              carrito.map((carritoInfo) => (
                <>
                 <div key={carritoInfo.id} className="flex border-t border-gray-400 py-3">
                  <div className="w-2/4 flex items-center p-4">
                    <img src={carritoInfo.Imagen}
                      className="w-40 h-40 pl-5 rounded-md object-cover mr-10"
                    />
                    <div className='flex-col'>
                      <Typography variant='text' className='text-2xl font-bold'>{carritoInfo.Nombre}</Typography>
                      <Typography className="text-xl text-gray-800 font-semibold">${carritoInfo.PrecioUnitario}</Typography>
                    </div>
                  </div>
                  <div className='w-1/4 flex items-center justify-center'>
                    <div className='flex items-center'>
                      <button className="p-2 rounded-full" onClick={()=>eliminarDelCarrito(carritoInfo)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <input
                        type='number'
                        className='w-20 text-center mx-2'
                        value={carritoInfo.Cantidad}
                        disabled={true}
                      />
                      <button className="p-2 rounded-full" onClick={()=>agregarAlCarrito(carritoInfo)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className='w-1/4 flex items-center justify-center'>
                    <Typography variant='text' className='text-2xl font-bold'>${carritoInfo.Precio}</Typography>
                  </div>
                </div>
                <Typography variant='text' className='text-2xl font-bold mb-2'>Elije tu direccion para la entrega de tus pedidos</Typography>
                 <select>
                 {direcciones.length > 0 ? (
                 direcciones.map((midirecciones) => (
                   <>
                       <option>
                         calle {midirecciones.Calle}, colonia{midirecciones.Colonia}, numero interior {midirecciones.NumeroInterior}
                       </option>
                   </>
           
                   ))
                 ) : (
                   <p>No hay direcciones disponibles.</p>
                 )}  
                 </select>
                </>
                  
              ))
            ) : (
              <p>No hay productos en el carrito.</p>
            )}
          </div>
        </div>

       <div className="col-span-2 pt-5 pr-24 pl-24  h-[32rem] rounded-[10px] ml-10 shadow-lg">
          <div className="pt-4 pb-5">
            <Typography variant='text' className="text-2xl font-semibold mb-4">Detalle de la orden</Typography>
            <div className='border-t border-y border-gray-300 pt-4 pb-4'>
              <div className="flex justify-between mb-1">
                <span>Subtotal</span>
                <span>${calcularTotal().subtotal}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Costo del envío</span>
                <span>$30.00</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Iva</span>
                <span>{calcularTotal().iva}</span>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${calcularTotal().total}</span>
            </div>

            <div className=" relative z-10 mt-4">
              <PayPalButton 
                  createOrder={(data, actions) => createOrder(data, actions)}
                  onApprove={(data, actions) => onApprove(data, actions)}
                 
                  fundingSource="paypal" 
                />
              
            </div>
            <div ref={paypalRef}></div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CarritoDetalle;