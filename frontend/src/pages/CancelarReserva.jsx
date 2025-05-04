import { useReserva } from '../context/ReservaContext';
import HeaderLog from '../component/NavLog';

const CancelarReserva = () => {
    const { reservas, cancelarReserva } = useReserva();

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderLog />

      <div className="max-w-4xl mx-auto mt-10 bg-white border-2 border-red-500 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Mis Reservas</h2>

        {reservas.length === 0 ? (
          <p className="text-gray-700">No tienes reservas activas.</p>
        ) : (
          <ul className="space-y-4">
            {reservas.map((reserva, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded-lg border border-gray-300 flex justify-between items-center">
                <div>
                  <p className="font-semibold">Restaurante: {reserva.restaurante}</p>
                  <p>Mesa: {reserva.mesa}</p>
                  <p>Fecha: {reserva.fecha}</p>
                  <p>Hora: {reserva.hora}</p>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-md"
                  onClick={() =>
                    cancelarReserva(reserva)
                  }
                >
                  Cancelar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CancelarReserva;
