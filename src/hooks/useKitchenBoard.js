import { useCallback, useMemo, useState } from "react";
import {initialKitchenTickets, KITCHEN_STATUS} from "../data/kitchenTickets";

export function useKitchenBoard() {
  const [tickets, setTickets] = useState(initialKitchenTickets); // Estado local para almacenar los tickets de cocina

  // Función para obtener los tickets por estado
  const getTicketsByStatus = useCallback(
    (status) => {
      return tickets.filter((ticket) => ticket.status === status);
    },
    [tickets]
  );

  // Función para mover un ticket a un estado específico
  const moveTicketToStatus = useCallback((ticketId, nextStatus) => {
    setTickets((currentTickets) => 
      currentTickets.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              status: nextStatus, 
            }
          : ticket
      )
    );
  }, []);

  // Función para iniciar la preparación de un ticket
  const beginPrep = useCallback(
    (ticketId) => {
      moveTicketToStatus(ticketId, KITCHEN_STATUS.PREPARING);
    },
    [moveTicketToStatus]
  );

  // Función para completar un ticket y marcar todos sus elementos como completados
  const completeTicket = useCallback(
    (ticketId) => {
      setTickets((currentTickets) =>
        currentTickets.map((ticket) =>
          ticket.id === ticketId
            ? {
                ...ticket,
                status: KITCHEN_STATUS.READY,
                time: "DONE",
                items: ticket.items.map((item) => ({
                  ...item,
                  completed: true,
                })),
              }
            : ticket
        )
      );
    },
    []
  );

  // Función para recordar un ticket y moverlo de nuevo al estado de preparación
  const recallTicket = useCallback(
    (ticketId) => {
      moveTicketToStatus(ticketId, KITCHEN_STATUS.PREPARING);
    },
    [moveTicketToStatus]
  );

  // Función para servir y limpiar un ticket, moviéndolo al estado completado
  const serveAndClear = useCallback(
    (ticketId) => {
      moveTicketToStatus(ticketId, KITCHEN_STATUS.COMPLETED);
    },
    [moveTicketToStatus]
  );

  // Función para alternar el estado de completado de un elemento del ticket
  const toggleItemCompleted = useCallback((ticketId, itemId) => {
    setTickets((currentTickets) =>
      currentTickets.map((ticket) => {
        if (ticket.id !== ticketId) return ticket; // Si el ticket no coincide, devolverlo sin cambios

        // Alternar el estado de completado del elemento específico

        return {
          ...ticket,
          items: ticket.items.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  completed: !item.completed,
                }
              : item
          ),
        };
      })
    );
  }, []);

  // Filtrar los tickets visibles, excluyendo los completados
  const visibleTickets = useMemo(() => {
    return tickets.filter(
      (ticket) => ticket.status !== KITCHEN_STATUS.COMPLETED
    );
  }, [tickets]);

  // Calcular las estadísticas de los tickets incluyendo pendientes, activos y listos
  const stats = useMemo(() => {
    const pendingCount = getTicketsByStatus(KITCHEN_STATUS.PENDING).length;
    const preparingCount = getTicketsByStatus(KITCHEN_STATUS.PREPARING).length;
    const readyCount = getTicketsByStatus(KITCHEN_STATUS.READY).length;

    return {
      pending: pendingCount,
      active: preparingCount,
      ready: readyCount,
    };
  }, [getTicketsByStatus, visibleTickets.length]);

  return {
    tickets,
    stats,
    getTicketsByStatus,
    beginPrep,
    completeTicket,
    recallTicket,
    serveAndClear,
    toggleItemCompleted,
  };
}