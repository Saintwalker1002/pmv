import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate('/home');
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="bg-white border-4 border-blue-500 p-10 rounded-lg shadow-xl w-full max-w-md grid gap-6">
        <h1 className="text-3xl font-bold text-center text-blue-800">Iniciar Sesión</h1>

        <form onSubmit={handleLogin} className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="username" className="text-blue-700 font-semibold">Nombre de usuario:</label>
            <input
              id="username"
              type="text"
              placeholder="ej: juan123"
              className="p-3 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          {error && <p className="text-red-600 text-sm">{error}</p>}

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

        <p
          className="text-center text-green-600 text-sm mt-2 cursor-pointer hover:underline"
          onClick={() => navigate('/register')}
        >
          ¿No tienes cuenta? Regístrate
        </p>
      </div>
    </div>
  );
};

export default Login;
