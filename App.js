import "./global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MenuScreen from "./src/components/menu/MenuScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <MenuScreen />
    </SafeAreaProvider>
  );
}