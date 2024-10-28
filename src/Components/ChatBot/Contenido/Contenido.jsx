import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import WikipediaSearch from '../WikipediaSearch/WikipediaSearch';
import '../WikipediaSearch/wiki.css';
import { useNavigate, Link } from 'react-router-dom';

const theme = {
  background: '#f5f8fb',
  headerBgColor: '#eb3449',
  headerFontColor: '#fff',
  headerFontSize: '20px !important',
  botBubbleColor: '#eb3449',
  botFontColor: '#fff',
  userBubbleColor: '#0cb3c9',
  userFontColor: '#fff',
};

const Contenido = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        steps={[
          {
            id: '1',
            message: 'Hola, soy tu asistente virtual. ¿Cuál es tu nombre?',
            trigger: '2',
          },
          {
            id: '2',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: '¡Hola {previousValue}, un placer conocerte!',
            trigger: '4',
          },
          {
            id: '4',
            message: '¿Necesitas que te ayude con algo?',
            trigger: '5',
          },
          {
            id: '5',
            options: [
              { value: 'y', label: 'Sí', trigger: '6A' },
              { value: 'n', label: 'No', trigger: 'askForHelp' },
            ],
          },
          {
            id: '6A',
            message: '¡Genial! Cuéntame qué es lo que necesitas...',
            trigger: 'seleccion',
          },
          {
            id: 'askForHelp',
            message:
              "Si cambias de opinión y necesitas ayuda, simplemente escribe 'ayuda'.",
            trigger: 'userInput',
          },
          {
            id: 'userInput',
            user: true,
            trigger: '6A',
          },
          {
            id: 'seleccion',
            options: [
              { value: 'f', label: 'Necesitas ir algun lado', trigger: '7A' },
              {
                value: 'b',
                label: 'Quieres buscar algo en internet',
                trigger: '7B',
              },
            ],
          },
          {
            id: '7A',
            message:
              'No te preocupes aqui estoy para ayudarte, a donde quieres ir',
            trigger: 'seleccionFront',
          },
          {
            id: '7B',
            message: 'Me parece perfecto, dime que necesitas saber?',
            trigger: 'seleccionBack',
          },
          {
            id: 'seleccionFront',
            options: [
              {
                value: 'Regresar al Inicio',
                label: 'Regresar al Inicio',
                trigger: () => {
                  navigate('/');
                  return 'preguntaVuelta2';
                },
              },
              {
                value: 'Servicios',
                label: 'Servicios',
                trigger: () => {
                  navigate('servicios');
                  return 'preguntaVuelta2';
                },
              },
              {
                value: 'Login',
                label: 'Login',
                trigger: () => {
                  navigate('Login');
                  return 'preguntaVuelta2';
                },
              },
              {
                value: 'Registro',
                label: 'Registro',
                trigger: () => {
                  navigate('Registro');
                  return 'preguntaVuelta2';
                },
              },
              {
                value: 'Sacar una Cita',
                label: 'Sacar una Cita',
                trigger: () => {
                  navigate('citas');
                  return 'preguntaVuelta2';
                },
              },
              {
                value: 'Hacer una Donacion',
                label: 'Hacer una Donacion',
                trigger: () => {
                  navigate('donaciones');
                  return 'preguntaVuelta2';
                },
              },
              {
                value: 'Contactarnos',
                label: 'Contactarnos',
                trigger: () => {
                  navigate('contacto');
                  return 'preguntaVuelta2';
                },
              },
              {
                value: 'Conocernos',
                label: 'Conocernos',
                trigger: () => {
                  navigate('/Conocenos');
                  return 'preguntaVuelta2';
                },
              },
            ],
          },
          {
            id: 'preguntaVuelta2',
            message: '¿Necesitas ir a un lado más?',
            trigger: 'respuestaVuelta2',
          },
          {
            id: 'respuestaVuelta2',
            options: [
              { value: 'y', label: 'Sí', trigger: 'seleccionFront' },
              { value: 'n', label: 'No', trigger: 'askForHelp' },
            ],
          },
          {
            id: 'seleccionBack',
            user: true,
            trigger: '9',
          },
          {
            id: '9',
            component: <WikipediaSearch />,
            asMessage: true,
            trigger: 'preguntaVuelta',
          },
          {
            id: 'preguntaVuelta',
            message: '¿Necesitas saber algo más?',
            trigger: 'respuestaVuelta',
          },

          {
            id: 'respuestaVuelta',
            options: [
              { value: 'y', label: 'Sí', trigger: '6A' },
              { value: 'n', label: 'No', trigger: 'askForHelp' },
            ],
          },
        ]}
        floating
      />
    </ThemeProvider>
  );
};

export default Contenido;
