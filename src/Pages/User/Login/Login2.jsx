import React from 'react';

const Iniciar Sesion2 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-3/4 shadow-lg">
        {/* Left Section */}
        <div className="w-1/2 bg-white p-8">
          <img
            src="https://www.redcross.org/content/dam/redcross/red-cross-assets-by-platform/facebook-profile-image.png" // URL de la imagen de la Cruz Roja
            alt="Cruz Roja"
            className="mb-8 w-full object-cover h-48"
          />
          <h1 className="text-4xl font-bold mb-4">Turn Your Ideas into reality</h1>
          <p className="text-gray-600 mb-8">Start for free and get attractive offers from the community</p>
        </div>
        {/* Right Section */}
        <div className="w-1/2 bg-white p-8">
          <h2 className="text-2xl font-bold mb-4">Iniciar Sesion</h2>
          <p className="mb-4">Welcome Back! Please enter your details.</p>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="johndoe@gmail.com"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
              />
              <p className="text-right text-blue-500 hover:text-blue-800 text-sm">
                <a href="#">Forgot Password?</a>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Log in
              </button>
            </div>
            <div className="flex items-center justify-between mt-4">
              <button
                className="bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border"
                type="button"
              >
                Register
              </button>
              <button
                className="bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border"
                type="button"
              >
                Sign in with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Iniciar Sesion2;
