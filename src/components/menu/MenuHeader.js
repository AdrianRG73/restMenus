import { View, Text, Pressable } from "react-native";

import LanguageButton from "./LanguageButton";
import OrderButton from "./OrderButton";

function HeaderShortcutButton({ label, onPress }) {
  if (!onPress) {
    return null;
  }

  return (
    <Pressable
      onPress={onPress}
      className="h-10 justify-center border-2 border-zinc-900 bg-[#f2e9d0] px-4"
    >
      <Text className="font-button text-[10px] uppercase tracking-[1.5px] text-zinc-900">
        {label}
      </Text>
    </Pressable>
  );
}

export default function MenuHeader({
  totalItems,
  onOpenOrder,
  onOpenKitchen,
  onOpenPrices,
  onOpenCheckout,
}) {
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

      <View className="flex-row items-center gap-3">
        <HeaderShortcutButton label="Dash" onPress={onOpenKitchen} />
        <HeaderShortcutButton label="Checkout" onPress={onOpenCheckout} />
        <HeaderShortcutButton label="Prices" onPress={onOpenPrices} />
      </View>
    </View>
  );
}
