/** @type {import('tailwindcss').Config} */

const { FONT_FAMILIES } = require("./src/theme/fontnames.js");

module.exports = {
  content: ["./App.{js,jsx}", "./src/**/*.{js,jsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      //Se conecta NativeWind con las fuentes
      fontFamily: {
        title: [FONT_FAMILIES.title], // font-title    -> BodoniModa48pt-Black
        button: [FONT_FAMILIES.button], // font-button   -> Oswald-Rrgular
        body: [FONT_FAMILIES.body], // font-body     -> CourierPrime-Regular
        sub: [FONT_FAMILIES.sub], // font-sub       -> Oswald-Bold
        information: [FONT_FAMILIES.information], // font-information       -> BodoniModa9pt-Italix
      },
    },
  },
  plugins: [],
};