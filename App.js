import "./global.css"; // Importación del archivo de estilos globales
import { SafeAreaProvider } from "react-native-safe-area-context";
import MenuScreen from "./src/components/menu/MenuScreen";

// Componente principal de la aplicación que envuelve la pantalla del menú en un proveedor de área segura
export default function App() {
  return (
    <SafeAreaProvider>
      <MenuScreen />
    </SafeAreaProvider>
  );
}