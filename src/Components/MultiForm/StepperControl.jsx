import React from 'react';
import '@tailwindcss/forms';

const StepperControl = ({ handleClick, currentStep, steps }) => {
  return (
    <div className="container flex justify-end mt-4 mb-8">
      {currentStep !== steps.length && (
        <button
          onClick={() => handleClick('Siguiente')}
          className="bg-red-600 text-white uppercase py-2 px-4 rounded-md font-semibold cursor-pointer border border-transparent transition duration-200 ease-in-out"
          style={{
            fontSize: '12px',
            padding: '8px 24px',
            letterSpacing: '0.5px',
            marginTop: '10px',
          }}
        >
          {currentStep === steps.length - 1 ? 'Confirmar' : 'Siguiente'}
        </button>
      )}
    </div>
  );
};

export default StepperControl;
