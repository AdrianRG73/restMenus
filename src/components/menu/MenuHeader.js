import { View, Text } from "react-native";

import LanguageButton from "./LanguageButton";
import OrderButton from "./OrderButton";

export default function MenuHeader({ totalItems, onOpenOrder }) {
  return (
    <View className="h-16 flex-row items-center justify-between border-b-2 border-zinc-900 px-4">
      <View className="justify-center">
        <Text className="font-title text-3xl uppercase">
          Nombre Restaurante
        </Text>

        <Text className="font-text text-base uppercase text-orange-400">
          Mesa 1
        </Text>
      </View>

      <View className="flex-row items-center gap-3">
        <LanguageButton />
        <OrderButton totalItems={totalItems} onPress={onOpenOrder} />
      </View>
    </View>
  );
}
