import React, { createContext, useContext, useState } from 'react';

// Crear contexto
const ReservaContext = createContext();

// Hook personalizado para usar el contexto
export const useReserva = () => useContext(ReservaContext);

// Proveedor del contexto
export const ReservaProvider = ({ children }) => {
    const [reservas, setReservas] = useState([]);
  
    const agregarReserva = (nueva) => {
      if (
        !nueva ||
        !nueva.restauranteId ||
        !nueva.mesa ||
        !nueva.fecha ||
        !nueva.hora
      ) {
        console.warn('Reserva inválida al agregar:', nueva);
        return false;
      }
  
      const mismoDia = reservas.filter((r) =>
        r &&
        r.restauranteId === nueva.restauranteId &&
        r.mesa === nueva.mesa &&
        r.fecha === nueva.fecha
      );
  
      const horaNueva = parseInt(nueva.hora.split(':')[0]);
      const hayConflicto = mismoDia.some((r) => {
        const horaExistente = parseInt(r.hora.split(':')[0]);
        return Math.abs(horaExistente - horaNueva) < 3;
      });
  
      if (hayConflicto) {
        alert('Debe haber al menos 3 horas de diferencia entre reservas.');
        return false;
      }
  
      setReservas((prev) => [...prev.filter(Boolean), nueva]); // filtra undefined
      return true;
    };
  
    const cancelarReserva = (reserva) => {
      if (
        !reserva ||
        !reserva.restauranteId ||
        !reserva.mesa ||
        !reserva.fecha ||
        !reserva.hora
      ) {
        console.warn('Reserva inválida al cancelar:', reserva);
        return;
      }
  
      setReservas((prev) =>
        prev.filter(
          (r) =>
            r &&
            !(
              r.restauranteId === reserva.restauranteId &&
              r.mesa === reserva.mesa &&
              r.fecha === reserva.fecha &&
              r.hora === reserva.hora
            )
        )
      );
    };

    return (
      <ReservaContext.Provider value={{ reservas, agregarReserva, cancelarReserva }}>
        {children}
      </ReservaContext.Provider>
    );
  };
  