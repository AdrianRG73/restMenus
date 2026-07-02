export const KITCHEN_STATUS = {
  PENDING: "pending",
  PREPARING: "preparing",
  READY: "ready",
  COMPLETED: "completed",
};

// Definir las columnas del tablero de cocina
export const kitchenColumns = [
  {
    id: KITCHEN_STATUS.PENDING,
    title: "PENDIENTE",
  },
  {
    id: KITCHEN_STATUS.PREPARING,
    title: "PREPARANDO",
  },
  {
    id: KITCHEN_STATUS.READY,
    title: "LISTO",
  },
];

// TIKETS PARA PRUEBA DE LA APP
export const initialKitchenTickets = [
  {
    id: "001",
    status: KITCHEN_STATUS.PENDING,
    title: "MESA 01",
    time: "12:10",
    note: "SIN CEBOLLA EN UNA DE LAS HAMBURGUESAS",
    // Lista de elementos del ticket
    items: [
      {
        id: "item-001-1",
        quantity: 2,
        name: "HAMBURGUESA DOBLE CON QUESO",
        completed: false,
      },
      {
        id: "item-001-2",
        quantity: 1,
        name: "PAPAS FRITAS",
        completed: false,
      },
    ],
  },
  {
    id: "002",
    status: KITCHEN_STATUS.PENDING,
    title: "MESA 02",
    time: "05:40",
    note: "",
    items: [
      {
        id: "item-002-1",
        quantity: 1,
        name: "PIZZA HAWAIIANA",
        completed: false,
      },
      {
        id: "item-002-2",
        quantity: 1,
        name: "AGUACATE FRITO",
        completed: false,
      },
    ],
  },
  {
    id: "003",
    status: KITCHEN_STATUS.PREPARING,
    title: "MESA 03",
    time: "18:45",
    note: "",
    items: [
      {
        id: "item-003-1",
        quantity: 2,
        name: "CERVEZA ARTESANAL",
        completed: true,
      },
      {
        id: "item-003-2",
        quantity: 1,
        name: "FILETE DE SALMÓN A LA PLANCHA",
        completed: false,
      },
      {
        id: "item-003-3",
        quantity: 1,
        name: "SOPA DE MARISCOS",
        completed: false,
      },
    ],
  },
  {
    id: "004",
    status: KITCHEN_STATUS.PREPARING,
    title: "MESA 04",
    time: "10:22",
    note: "",
    items: [
      {
        id: "item-004-1",
        quantity: 4,
        name: "TACOS DE POLLO",
        completed: false,
      },
    ],
  },
  {
    id: "005",
    status: KITCHEN_STATUS.READY,
    title: "MESA 05",
    time: "DONE",
    note: "",
    items: [
      {
        id: "item-005-1",
        quantity: 1,
        name: "ENSALADA CESAR",
        completed: true,
      },
      {
        id: "item-005-2",
        quantity: 1,
        name: "TE VERDE FRIO",
        completed: true,
      },
    ],
  },
];