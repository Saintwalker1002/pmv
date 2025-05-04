import Login from './pages/Login';
import Home from './pages/Home';
import Reservas from './pages/Reservas';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReservaProvider } from './context/ReservaContext.jsx';
import CancelarReserva from './pages/CancelarReserva';

function App() {
  return (
    <ReservaProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Reservas" element={<Reservas />} />
          <Route path="/cancelar" element={<CancelarReserva />} />
        </Routes>
      </Router>
    </ReservaProvider>
  );
}

export default App;
