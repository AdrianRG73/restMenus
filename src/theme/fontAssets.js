const { FONT_FAMILIES } = require("./fontnames");

// Cargar los archivos fisicos de fuentes, Si se quieren cambiar este archivo se modifica junto con fontnames.js
// Con React Native fontFamily: "Nombre de la fuente"
// Con NativeWind className="Nombre de la fuente"
const FONT_ASSETS = {
  [FONT_FAMILIES.title]: require("../assets/fonts/BodoniModa28pt-Black.ttf"),
  [FONT_FAMILIES.button]: require("../assets/fonts/Oswald-Regular.ttf"),
  [FONT_FAMILIES.body]: require("../assets/fonts/CourierPrime-Regular.ttf"),
  [FONT_FAMILIES.information]: require("../assets/fonts/BodoniModa9pt-Italic.ttf"),
  [FONT_FAMILIES.sub]: require("../assets/fonts/Oswald-Bold.ttf"),
};

module.exports = {
  FONT_ASSETS,
};