import "./global.css"; // Importación del archivo de estilos globales
import { SafeAreaProvider } from "react-native-safe-area-context";
import MenuScreen from "./src/components/menu/MenuScreen";
import KitchenBoardScreen from "./src/screens/KitchenBoardScreen";

const SHOW_KITCHEN_BOARD = true;

// Componente principal de la aplicación que envuelve la pantalla del menú en un proveedor de área segura
export default function App() {
  return (
    <SafeAreaProvider>
      {/* <MenuScreen /> */}
      {SHOW_KITCHEN_BOARD ? <KitchenBoardScreen /> : <MenuScreen />}
    </SafeAreaProvider>
  );
}