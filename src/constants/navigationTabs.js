// Identificadores para cada pantalla
export const SCREEN_IDS = Object.freeze({
  menu: "menu",
  kitchen: "kitchen",
  prices: "prices",
  checkout: "checkout",
});

//Define los botones de la barra de navegacion
export const NAVIGATION_TABS = Object.freeze([
  {
    id: SCREEN_IDS.kitchen,
    label: "DASH",
    symbol: "▦",
  },
  {
    id: SCREEN_IDS.checkout,
    label: "CHECKOUT",
    symbol: "▣",
  },
  {
    id: SCREEN_IDS.prices,
    label: "PRICES",
    symbol: "▣",
  },
]);