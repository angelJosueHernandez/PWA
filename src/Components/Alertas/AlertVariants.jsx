import React, { useState } from 'react';
//import Alert from '@mui/material/Alert';
//import Stack from '@mui/material/Stack';
import { Alert } from '@material-tailwind/react';

export function AlertVariants({ alertType, alertMessage }) {
  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-[1050] transition-all 
      duration-500 ease-in-out ${alertMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}
    >
      <Alert
        variant={alertType === 'error' ? 'filled' : 'gradient'}
        className="w-full max-w-md mx-auto shadow-lg"
      >
        <span>{alertMessage}</span>
      </Alert>


    </div>
  );
}
