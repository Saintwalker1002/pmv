import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function NavLog() {

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           // Elimina usuario
    navigate('/');      // Redirige al login
  };

  return (
    <nav className="bg-blue-900 p-4 flex items-center justify-between">
      <div className="text-white font-bold text-xl">Logo</div>
      <div className="flex space-x-4">
        <button onClick={handleLogout} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition">
          Logout
        </button>
        <Link to="/home" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition">
          Home
        </Link>
        <Link to="/Reservas" className="bg-red-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition">Reservas</Link>
        <Link to="/cancelar" className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition">
          Cancelar Reserva 
        </Link>
      </div>
    </nav>
  );
}

export default NavLog;
