import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import './VideoY.css';
import TitleTypeTwo from '../../Ui/TitleTypeTwo/TitleTypeTwo'

export default function VideoY() {
    const [videoSize, setVideoSize] = useState({ height: 0, width: 0 });

    // Función para actualizar las dimensiones del video
    const updateVideoSize = () => {
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const newHeight = windowHeight * 0.9; // Por ejemplo, el 80% de la altura de la ventana
        const newWidth = windowWidth * 1; // Por ejemplo, el 80% del ancho de la ventana
        setVideoSize({ height: newHeight, width: newWidth });
    };

    // Efecto secundario para actualizar las dimensiones del video cuando se redimensiona la ventana
    useEffect(() => {
        updateVideoSize(); // Actualiza las dimensiones del video al cargar el componente
        const handleResize = () => updateVideoSize(); // Función manejadora para redimensionar el video
        window.addEventListener('resize', handleResize); // Agrega el event listener
        return () => window.removeEventListener('resize', handleResize); // Remueve el event listener al desmontar el componente
    }, []); // La dependencia vacía [] asegura que el efecto solo se ejecute una vez al cargar el componente

    const opts = {
        height: videoSize.height,
        width: videoSize.width,
        playerVars: {
            autoplay: 1,
        },
    };

    const videoId = 'W8ED8fyjWaQ'; // ID del video de YouTube

    return (
        
        <div className="videoY">
              <TitleTypeTwo Title={'Porque Soy Paramedico'} ClassName='quote-title'/>
            <YouTube videoId={videoId} opts={opts} />
        </div>
    );
}
