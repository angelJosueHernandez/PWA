import './RecuperarContraseña.css'
import React , { useState, useEffect }from 'react'
import { Link } from 'react-router-dom';
import { useLocation  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { SiWhatsapp } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FcSms } from "react-icons/fc";
import StepperControl from '../MultiForm/StepperControl';
import Stepper from '../MultiForm/Stepper'
import Acount from '../MultiForm/Steps/Acount'
import Details from '../MultiForm/Steps/Details'
import Final from '../MultiForm/Steps/Final'
import { Button, message } from 'antd';
import Confirm from '../MultiForm/Steps/Confirm'
import { StepperContext } from '../MultiForm/contexts/StepperContext';
import { useAuth } from '../Contexts/AuthContexts';
import '@tailwindcss/forms'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


export default function RecuperarContraseña() {

  const { sig, metodo, token, isMethodSelected, contraActualizar2, contraActualizar, correo, numero, contraCo, contraCo2 } = useAuth();


  const [messageApi, contextHolder] = message.useMessage();

 //boleano para que se espere a que termine la animacion 
 const [actionFinished, setActionFinished] = useState(false);


  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get('email');


    
  // Spter COnfig 
    const [currentStep, setCurrentStep]=useState(1);
    const [userData, setUserData] = useState('');
    const [finalData, setFinalData]= useState([]);
    const [ValidToken, setIsValidToken] = useState(false)

    const steps=[
      "Proceso de Recuperación de Contraseña",
      "Ingreso del Token",
      "Actualización de la Contraseña",
      "Final"          
    ];

    const displayStep=(step)=>{
      switch(step){
        case 1:
          return <Acount/>
        case 2:
          return <Details/>
          case 3:
          return <Confirm/>
        case 4:
          return <Final/>
        default:
      }
    }

const handleClick = async (direction) => {
  /// empieza el handeclick
  const requestBody = {
    correo: correo
  };
  const requestBody2 = {
    correo: correo,
    nuevaContraseña: contraActualizar
  };

  if (currentStep === 1 && direction === 'Siguiente') {
    if (!isMethodSelected) {
      message.error('Por favor, seleccione un método de recuperación para continuar.');
      return; // Detener la ejecución si no se ha seleccionado ningún método
    }
    else if (metodo === 'correo') {
 

      if( correo == null){
        message.error('Por favor, ingresa tu correo electrónico para continuar.');
        return;
      }else{
        /// enviando el mensaje 
        message.loading('Verficando...',1);
  fetch(`http://localhost:3000/recuperacionCorreo/${encodeURIComponent(correo)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody),
    credentials: 'include'
  })
   
  .then(response => response.json())
  .then(async result => {
    if (result.mensaje === "Correo de recuperación enviado correctamente") {
      console.log('exito enviado correo');
    
      setTimeout(() => {
        let newStep = currentStep + 1;
        setCurrentStep(newStep);
        setActionFinished(true) // Resuelve la promesa con true después de que se complete la animación
      }, 200);
    ;
    } else if (result.mensaje === 'Error al enviar el correo electrónico') {
      message.error(' Introduce un correo electrónico válido y funcional.');
    } 
  })
  .catch(error => {
    console.error('Error al enviar:', error);
    setTimeout(() => {
      message.error('Error al enviar el Token. Por favor, intenta de nuevo más tarde.');
    }, 900);
  });

      }
      }else if (metodo === 'sms') {
        if(correo == null){
          message.error('Por favor, ingresa tu correo electrónico para continuar.');
          return;
        }else{
          message.loading('Verficando...', 1);
            fetch('http://localhost:3000/recuperacionSMS', {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(requestBody),
              credentials: 'include'
            })
            .then(response => response.json())
            .then(result => {
              if (result.mensaje === "SMS de recuperación enviado correctamente") {
                console.log('exito enviado SMS');
                setTimeout(() => {
                  let newStep = currentStep + 1;
                  setCurrentStep(newStep);
                  setActionFinished(true); // Resuelve la promesa con true después de que se complete la animación
                }, 200);
              }
            })
            .catch(error => {
              console.error('Error al enviar:', error);
              setTimeout(() => {
                message.error('Error al enviar el Token. Por favor, intenta de nuevo más tarde.');
              }, 1100);
            });

        }
    }
  }
  
  if (currentStep === 2 && direction === 'Siguiente') {
    
    const tokenIsValid = await verifyToken(); 
    if (token == null) {
      message.error('El campo no puede estar vacío');}// Esperar a que verifyToken termine
    if (!tokenIsValid) {
      return; // No avanzar si el token no es válido
    }
    
    
  }

  if (currentStep === 3 && direction === 'Siguiente') {
    if (contraActualizar === null && contraActualizar2 === null) {
      message.error('Para continuar acomplete  los campos correctamente');
      return;
    } else if (contraActualizar2 === null){
      message.error('Para continuar acomplete  los campos correctamente');
    }else if(contraActualizar !== null && contraActualizar2 !== null) {
      console.log(contraActualizar)
      console.log(contraCo)
      if(contraCo === false && contraCo2 === false){
        message.warning('Porfavor atienda los errores que se le muestran');
        return;
      }else if (contraCo === true && contraCo2 === true ){

        fetch(`http://localhost:3000/actualizarContraRecuperacion`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestBody2),
          credentials: 'include'
        })
          .then(response => response.json())
          .then(result => {
            if (result.mensaje === "Contraseña actualizada correctamente") {
                    console.log('Actualizacion correcta');
                   
                    const isSuccess =  success3();
                    setTimeout(() => {
                      let newStep = currentStep + 1;
                      setCurrentStep(newStep);
                      setActionFinished(true) // Resuelve la promesa con true después de que se complete la animación
                    }, 1500);
                    return isSuccess;
                  
            }
          })
          .catch(error => {
            console.error('Error al actulizar:', error);
              message.error('Error al actualizar la contraseña, intenta de nuevo más tarde.');
           
          });
      }
    }
}

 // let newStep = currentStep;
 // direction === 'Siguiente' ? newStep++ : newStep--;

 // newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);


 if (actionFinished === true) {

  let newStep = currentStep;
 direction === 'Siguiente' ? newStep++ : newStep--;

 newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  // Reiniciar la variable de estado para futuros usos
  setActionFinished(false);
}

  //termina el handeclick
}

const verifyToken = async () => {
  if (token == null) {
    console.log('El campo no puede estar vacío');
    return false;
  } else {
    const requestBody = {
      correo: correo,
      tokenUsuario: token
    };
    try {
      const response = await fetch(`http://localhost:3000/compararToken/${encodeURIComponent(correo)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody),
        credentials: 'include'
      });
      const result = await response.json();
      if (result.mensaje === "El token de recuperación es válido") {
        console.log('exito token correcto');
        const isSuccess = await success(); // Espera a que se resuelva la promesa de success
        return isSuccess;
       
      } else if (result.mensaje === "El token de recuperación es inválido") {
        const isSuccess = await success2(); // Espera a que se resuelva la promesa de success
        return isSuccess;
        return false;
      } else if (result.mensaje === "El token de recuperación ha expirado") {
        const isSuccess = await success4(); // Espera a que se resuelva la promesa de success
        return isSuccess;
        return false;
      }
    } catch (error) {
      console.error('Error al enviar:', error);
      message.error('El token de recuperación es inválido.');
      return false;
    }
  }
};

const success = async () => {
  message.loading({ content: 'Verificando..', duration: 2 });
  return new Promise((resolve) => {
    setTimeout(() => {
      message.success({ content: 'Token Correcto', duration: 1.3 });
      resolve(true); // Resuelve la promesa con true después de que se complete la animación
    }, 1700); // Ajusta este valor según sea necesario
  });
};

const success2 = async () => {
  message.loading({ content: 'Verificando..', duration: 2 });
  return new Promise((resolve) => {
    setTimeout(() => {
      message.error({ content: 'Token Incorrecto', duration: 1.3 });
      resolve(false); // Resuelve la promesa con true después de que se complete la animación
    }, 1700); // Ajusta este valor según sea necesario
  });
};


const success3 = async () => {
  message.loading({ content: 'Actualizando Datos..', duration: 2 });
  return new Promise((resolve) => {
    setTimeout(() => {
      message.success({ content: 'Datos Actualizados', duration: 1.3 });
      resolve(true); // Resuelve la promesa con true después de que se complete la animación
    }, 1700); // Ajusta este valor según sea necesario
  });
};

const success4 = async () => {
  message.loading({ content: 'Verificando..', duration: 2 });
  return new Promise((resolve) => {
    setTimeout(() => {
      message.success({ content: 'El token ha expirado', duration: 1.3 });
      resolve(true); // Resuelve la promesa con true después de que se complete la animación
    }, 1700); // Ajusta este valor según sea necesario
  });
};
    
    return (
      <div className="md:w-2/3 mx-auto my-20 shadow-2xl rounded-3xl pb-2 bg-white mt-10  border-300 mul ">
      {/*Spetter */}
      <div className="container horizontal mt-5 ">
        <Stepper
          steps={steps}
          currentStep={currentStep}
        />
         {/*Dsiplay Components */}  
         <div className="my-10 p-10">
          <StepperContext.Provider value={{
            userData,
            setUserData,
            finalData,
            setFinalData,
          }}>
            {displayStep(currentStep)}
          </StepperContext.Provider>
         </div>
      </div>
        {/*SpetterControl */}                
      <StepperControl
        handleClick={handleClick}
        currentStep={currentStep}
        steps= {steps}
      />
      <br />
    </div>
      );
}
