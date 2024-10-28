import { Button, Typography } from '@material-tailwind/react';
import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../../UserContext';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';

const PayPalButton = window.paypal.Buttons.driver('react', { React, ReactDOM });

const CarritoDetalle = () => {
  const { user } = useUser();
  const [isLoading, setLoading] = useState(true);
  const [carrito, setCarrito] = useState([]);
  const [direcciones, setDirecciones] = useState([]);
  const [total, setTotal] = useState(20);
  const paypalRef = useRef();
  const apiUrl = `${apiurll}/api/CasaDelMarisco/TraerDirecciones?UsuarioID=${user.idUsuario}`;

  const obtenerDirecciones = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setDirecciones(data);
        console.log('Direcciones obtenidas:', data);
      } else {
        console.error('La respuesta de la API no es un array:', data);
        setDirecciones([]);
      }
    } catch (error) {
      console.error('Error al obtener direcciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const obtenerProductoCarrito = async () => {
    const id = user?.idUsuario || null;
    if (id) {
      try {
        const response = await fetch(
          `${apiurll}/api/CasaDelMarisco/TraerCarritoPorUsuario?idUsuario=${id}`,
          {
            method: 'GET',
          },
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setCarrito(data);
        } else {
          console.error('El resultado de la API no es un array:', data);
        }
      } catch (error) {
        console.error('Error al obtener productos del carrito:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const agregarAlCarrito = async (producto) => {
    const data = new FormData();
    data.append('idUsuario', user.idUsuario);
    data.append('idProducto', producto.idProducto);

    try {
      const response = await fetch(
        `${apiurll}/api/CasaDelMarisco/AgregarProductosCarrito`,
        {
          method: 'POST',
          body: data,
        },
      );
      const result = await response.json();
      if (result === 'Exito') {
        obtenerProductoCarrito();
      } else {
        console.error('Error al agregar al carrito');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al procesar la solicitud',
      });
    }
  };

  const eliminarDelCarrito = async (productoAEliminar) => {
    const data = new FormData();
    data.append('idUsuario', user.idUsuario);
    data.append('idProducto', productoAEliminar.idProducto);
    data.append('idCarritoProductos', productoAEliminar.idCarritoProductos);

    try {
      const response = await fetch(
        `${apiurll}/api/CasaDelMarisco/QuitarProductosCarrito`,
        {
          method: 'POST',
          body: data,
        },
      );
      const result = await response.json();
      if (result === 'Exito') {
        obtenerProductoCarrito();
      } else {
        console.error('Error al eliminar del carrito');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al procesar la solicitud',
      });
    }
  };

  const createOrder = (data, actions) => {
    const amount = parseFloat(total);
    if (isNaN(amount) || amount <= 0) {
      throw new Error('Monto inválido');
    }

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount.toFixed(2),
          },
        },
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
      },
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const order = await actions.order.capture();
      console.log('Orden capturada:', order);
      alert('Pago completado con éxito!');
      return order;
    } catch (error) {
      console.error('Error al capturar la orden:', error);
      alert(`Error al completar el pago: ${error.message}`);
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
      total: total.toFixed(2),
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
    <div className="mr-20 ml-20">
      <div className="grid grid-cols-5 gap-4 p-5">
        <div className="col-span-3 w-full pr-1 shadow-lg rounded-[10px] p-5 mr-10">
          {/* Contenido del carrito */}
        </div>
        <div className="col-span-2 pt-5 pr-24 pl-24  h-[32rem] rounded-[10px] ml-10 shadow-lg">
          <Typography variant="text" className="text-2xl font-semibold mb-4">
            Detalle de la orden
          </Typography>
          <div className="border-t border-y border-gray-300 pt-4 pb-4">
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
          <div className="relative z-10 mt-4">
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
  );
};

export default CarritoDetalle;
