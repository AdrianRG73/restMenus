import "./global.css";

import { Text, View } from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";

import MenuScreen from "./src/components/menu/MenuScreen";

const { FONT_ASSETS } = require("./src/theme/fontAssets");

// Cargar fuentes antes de renderizar la pantalla principal
function AppLoadingScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-950">
      <Text className="text-white">Cargando Fuentes...</Text>
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts(FONT_ASSETS); // Cargar todas las fuentes

  // Si no se han cargado regresa la pantalla de carga
  if (!fontsLoaded) {
    return <AppLoadingScreen />;
  }

  // Carga la pantalla cuando esten listas
  return (
    <SafeAreaProvider>
      <MenuScreen />
      {/*SHOW_KITCHEN_BOARD ? <KitchenBoardScreen /> : <MenuScreen />}*/}
    </SafeAreaProvider>
  );
}