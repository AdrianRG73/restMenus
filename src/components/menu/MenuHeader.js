import { View, Text, Pressable } from "react-native";
import LanguageButton from "./LanguageButton";

// Componente de encabezado del menú que muestra el título y boton de idioma
export default function MenuHeader() {
  return (
    <View className="h-16 flex-row items-center justify-between border-b-2 border-zinc-900">
      <View>
        <Text className="text-3xl font-black text-zinc-950 tracking-tight uppercase">
          Menu
        </Text>
      </View>

      <View className="flex-row items-center gap-4">
        <LanguageButton />
      </View>
    </View>
  );
}