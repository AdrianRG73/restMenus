import { View, Text } from "react-native";

import LanguageButton from "./LanguageButton";
import OrderButton from "./OrderButton";

export default function MenuHeader({ totalItems, onOpenOrder }) {
  return (
    <View className="h-16 flex-row items-center justify-between border-b-2 border-zinc-900">
      <View>
        <Text className="text-3xl font-black text-zinc-950 tracking-tight uppercase">
          Menu
        </Text>
      </View>

      <View className="flex-row items-center gap-3">
        <LanguageButton />
        <OrderButton totalItems={totalItems} onPress={onOpenOrder} />
      </View>
    </View>
  );
}