import React, { useState, useEffect } from 'react';
import HeaderLog from '../component/NavLog';

const mesasPorRestaurante = {
  Oregon: [
    { letra: 'A', sillas: 4 },
    { letra: 'B', sillas: 2 },
    { letra: 'C', sillas: 6 },
  ],
  'Las Tinajas': [
    { letra: 'D', sillas: 3 },
    { letra: 'E', sillas: 5 },
    { letra: 'F', sillas: 2 },
  ],
  'El Gaucho y la Nona': [
    { letra: 'G', sillas: 4 },
    { letra: 'H', sillas: 6 },
    { letra: 'I', sillas: 2 },
  ],
};

const imagenesRestaurantes = [
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
  'https://images.unsplash.com/photo-1525610553991-2bede1a236e2',
  'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
];

const Home = () => {
  const [imagenActual, setImagenActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setImagenActual((prev) => (prev + 1) % imagenesRestaurantes.length);
    }, 3000); // Cambia imagen cada 3 segundos
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="relative z-20">
        <HeaderLog />
      </header>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contenedor de Mesas */}
        <div className="bg-white border-2 border-blue-600 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Mesas Disponibles</h2>

          {Object.entries(mesasPorRestaurante).map(([restaurante, mesas]) => (
            <div key={restaurante} className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{restaurante}</h3>
              <ul className="grid grid-cols-2 gap-2">
                {mesas.map((mesa, index) => (
                  <li
                    key={index}
                    className="bg-blue-500 text-white font-bold p-3 rounded-lg text-center"
                  >
                    {mesa.letra}/{mesa.sillas}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contenedor de Carrusel de Imágenes */}
        <div className="bg-white border-2 border-blue-600 p-6 rounded-lg shadow-md flex items-center justify-center">
          <img
            src={`${imagenesRestaurantes[imagenActual]}?auto=format&fit=crop&w=600&q=80`}
            alt="Restaurante"
            className="rounded-lg shadow-lg w-full h-72 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;