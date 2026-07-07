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
        button: [FONT_FAMILIES.button], // font-button   -> Oswald-Bold
        body: [FONT_FAMILIES.body], // font-body     -> CourierPrime-Regular
        text: [FONT_FAMILIES.text],
        information: [FONT_FAMILIES.information],
        bodyBold: [FONT_FAMILIES.bodyBold], // font-bodyBold -> CourierPrime-Bold
      },
    },
  },
  plugins: [],
};