import "./global.css";

import { Text, View } from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppNavigator from "./src/screens/AppNavigator";

const { FONT_ASSETS } = require("./src/theme/fontAssets");

function AppLoadingScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-950">
      <Text className="font-body text-sm text-zinc-400">
        Loading fonts...
      </Text>
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts(FONT_ASSETS);

  if (!fontsLoaded) {
    return <AppLoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}