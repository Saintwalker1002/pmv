import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí podrías hacer fetch a tu API de login
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="bg-white border-4 border-blue-500 p-10 rounded-lg shadow-xl w-full max-w-md grid gap-6">
        <h1 className="text-3xl font-bold text-center text-blue-800">Iniciar Sesión</h1>

        <form onSubmit={handleLogin} className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="email" className="text-blue-700 font-semibold">Correo electrónico:</label>
            <input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              className="p-3 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="password" className="text-blue-700 font-semibold">Contraseña:</label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className="p-3 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition"
          >
            Ingresar
          </button>
        </form>

        <p className="text-center text-blue-600 text-sm mt-4 cursor-pointer hover:underline">
          ¿Olvidaste tu contraseña?
        </p>
      </div>
    </div>
  );
};

export default Login;
