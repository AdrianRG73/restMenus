// Identificadores internos de las pantallas.
export const SCREEN_IDS = Object.freeze({
  menu: "menu",
  kitchen: "kitchen",
  checkout: "checkout",
  prices: "prices",
  menuManagement: "menuManagement",
});

// Botones visibles en la barra de navegación inferior.
export const NAVIGATION_TABS = Object.freeze([
  {
    id: SCREEN_IDS.checkout,
    label: "COBRO",
    symbol: "▣",
  },
  {
    id: SCREEN_IDS.prices,
    label: "PRECIOS",
    symbol: "$",
  },
  {
    id: SCREEN_IDS.menuManagement,
    label: "GESTIÓN",
    symbol: "▤",
  },
]);