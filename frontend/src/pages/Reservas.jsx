import React, { useState } from 'react';
import HeaderLog from '../component/NavLog';
import { useReserva } from '../context/ReservaContext';

const restaurantesEjemplo = [
  { id: 1, nombre: 'Oregon', descripcion: 'Restaurante especializado en carnes a la parrilla y comida casera.' },
  { id: 2, nombre: 'Las Tinajas', descripcion: 'Comida chilena tradicional, en un ambiente familiar y acogedor.' },
  { id: 3, nombre: 'El Gaucho y la Nona', descripcion: 'Fusión de cocina argentina e italiana, con platos únicos.' },
];

const mesasIniciales = {
  1: ['A', 'B', 'C'],
  2: ['D', 'E', 'F'],
  3: ['G', 'H', 'I'],
};

const Reservas = () => {
  const { reservas, agregarReserva } = useReserva();
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState(1);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  const handleRestauranteChange = (e) => {
    setRestauranteSeleccionado(Number(e.target.value));
  };

  const abrirModal = (mesa) => {
    setMesaSeleccionada(mesa);
    setHora('');
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setMesaSeleccionada(null);
    setHora('');
  };

  const reservarMesa = () => {
    if (!fecha || !hora) {
      alert('Por favor selecciona fecha y hora');
      return;
    }

    // Validar regla de 3 horas
    const reservasExistentes = reservas.filter(
      (r) =>
        r.restauranteId === restauranteSeleccionado &&
        r.mesa === mesaSeleccionada &&
        r.fecha === fecha
    );

    const nuevaHora = parseInt(hora.replace(':', ''));

    const hayConflicto = reservasExistentes.some((r) => {
      const horaExistente = parseInt(r.hora.replace(':', ''));
      return Math.abs(horaExistente - nuevaHora) < 300;
    });

    if (hayConflicto) {
      alert('Debe haber al menos 3 horas entre reservas.');
      return;
    }

    const nuevaReserva = {
      restauranteId: restauranteSeleccionado,
      restaurante: restauranteActual?.nombre || '', // <--- este campo se había omitido
      mesa: mesaSeleccionada,
      fecha,
      hora,
    };
    
    const fueAgregada = agregarReserva(nuevaReserva);
    if (fueAgregada) cerrarModal();
  };

  const restauranteActual = restaurantesEjemplo.find((r) => r.id === restauranteSeleccionado);

  const obtenerHorasReservadas = () =>
    reservas
      .filter(
        (r) =>
          r.restauranteId === restauranteSeleccionado &&
          r.mesa === mesaSeleccionada &&
          r.fecha === fecha
      )
      .map((r) => r.hora);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="relative z-20">
        <HeaderLog />
      </header>

      <div className="p-6 flex flex-col gap-6">
        <div className="w-full flex flex-col md:flex-row md:items-center gap-4">
          <select
            onChange={handleRestauranteChange}
            value={restauranteSeleccionado}
            className="p-3 rounded-md border-2 border-blue-600 text-blue-600 font-bold bg-white shadow-md"
          >
            {restaurantesEjemplo.map((restaurante) => (
              <option key={restaurante.id} value={restaurante.id}>
                {restaurante.nombre}
              </option>
            ))}
          </select>

          <div>
            <label className="text-blue-700 font-semibold mr-2">Selecciona una fecha:</label>
            <input
              type="date"
              className="border border-blue-300 rounded-md p-2"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-4">
          <div className="col-span-1 bg-white border-2 border-blue-600 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">{restauranteActual.nombre}</h2>
            <p className="text-gray-700">{restauranteActual.descripcion}</p>
          </div>

          <div className="col-span-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mesasIniciales[restauranteSeleccionado].map((letra, index) => {
              const estaReservada = reservas.some(
                (r) =>
                  r.restauranteId === restauranteSeleccionado &&
                  r.mesa === letra &&
                  r.fecha === fecha
              );
              return (
                <button
                  key={index}
                  onClick={() => abrirModal(letra)}
                  disabled={!fecha}
                  className={`flex items-center justify-center p-6 rounded-lg shadow-lg text-2xl font-bold transition duration-300
                    ${estaReservada ? 'bg-yellow-500 text-white cursor-pointer' : 'bg-blue-600 text-white hover:bg-blue-700'}
                  `}
                >
                  {letra}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-80 space-y-4 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={cerrarModal}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-center">Reservar Mesa {mesaSeleccionada}</h2>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Hora:</label>
              <input
                type="time"
                className="border border-gray-300 rounded-md p-2"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
              />
            </div>

            {fecha && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Horas ya reservadas:</p>
                <ul className="text-sm text-red-600 list-disc list-inside">
                  {obtenerHorasReservadas().length === 0 ? (
                    <li>No hay reservas aún.</li>
                  ) : (
                    obtenerHorasReservadas().map((h, idx) => <li key={idx}>{h}</li>)
                  )}
                </ul>
              </div>
            )}

            <button
              onClick={reservarMesa}
              className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition"
            >
              Reservar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservas;
