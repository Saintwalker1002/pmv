import Login from './pages/Login';
import Home from './pages/Home';
import Reservas from './pages/Reservas';
import CancelarReserva from './pages/CancelarReserva';
import Register from './pages/Register.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ProtectedRoute from './component/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReservaProvider } from './context/ReservaContext.jsx';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ReservaProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/Reservas" element={<ProtectedRoute><Reservas /></ProtectedRoute>} />
            <Route path="/cancelar" element={<ProtectedRoute><CancelarReserva /></ProtectedRoute>} />
          </Routes>
        </Router>
      </ReservaProvider>
    </AuthProvider>
  );
}

export default App;
