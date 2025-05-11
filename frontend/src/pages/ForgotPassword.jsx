import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState('');
  const { forgotPassword } = useContext(AuthContext);

  const handleRecovery = (e) => {
    e.preventDefault();
    const pwd = forgotPassword(email);
    if (pwd) {
      setResponse(`Tu contraseña es: ${pwd}`);
    } else {
      setResponse('Correo no encontrado');
    }
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Recuperar contraseña</h2>
        {response && <p className="text-center text-sm mb-4">{response}</p>}
        <form onSubmit={handleRecovery} className="grid gap-4">
          <input type="email" placeholder="Tu correo registrado" value={email} onChange={e => setEmail(e.target.value)} required />
          <button className="bg-yellow-500 text-white py-2 rounded-md" type="submit">Recuperar</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
