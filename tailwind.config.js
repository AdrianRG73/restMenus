/** @type {import('tailwindcss').Config} */
// Este archivo de configuración de Tailwind CSS define las rutas de contenido, los presets y la configuración del tema para la aplicación.
module.exports = {
  content: ["./App.{js,jsx}", "./src/**/*.{js,jsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};