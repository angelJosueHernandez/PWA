
import'./Token.css'
import React , { useState}from 'react'
import { Link } from 'react-router-dom';
import { useLocation,useNavigate } from 'react-router-dom';
import { SiWhatsapp } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FcSms } from "react-icons/fc";
import { message } from 'antd';


import '@tailwindcss/forms'

export default function Token() {

  const location = useLocation();
  const correo = new URLSearchParams(location.search).get('correo');
  const navigate = useNavigate();
  const [token,setToken]=useState('')
  const [erroToken,setErroeToken]=useState('')
 


  const data = new FormData();
  data.append('Correo', correo);
  data.append('Token', token);

  const handleSubmit = (event) => {
    event.preventDefault();


      fetch(
        '' +
          '' +
          correo+"&Token="+Token,
        {
          method: 'POST',
          body: data,
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (result === 'Credenciales validas') {
            navigate(`/Restablece?correo=${correo}`);
          }else{
            setErroeToken('Tonken invalido')
          }
        });
  };
  
    
    return (
        <div className="container4" id="container">
          
          <div className="form-container sign-in" >
            <form onSubmit={handleSubmit}>
              

              <h1 className='title-form'>TOKEN</h1>
    
              <div className="social-icons">
                
                <a href="#" className="icon">
                  <i className="fa-brands fa-Whatsapp-f"><SiWhatsapp /></i>
                </a>
                <a href="#" className="icon">
                  <i className="fa-brands fa-sms"><FcSms/></i>
                </a>
              </div>
    
              <span>Introdusca el Token </span>
              <span>enviado al correo proporcionado</span>
                
              <div className="sm:col-span-6">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Token</label>
              <div className="mt-1">
                <input  
                  name="token"
                  required
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                   type="text"  className="  {emailError ? 'input-error' : ''} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                 
              </div>
              {erroToken && <p className="error-message">{erroToken}</p>}
            </div>

            
    
              <button type="submit" >Continuar</button>
             
          <div className='cont-remen2'>
        
          <Link to={'/Recuperacion'} >
            Regresar
          </Link>
        </div>
           
            </form>
            
            
        </div>
    
        </div>
      );
    
}
