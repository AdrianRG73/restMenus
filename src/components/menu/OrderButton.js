import { Pressable, Text, View } from "react-native";

function getOrderAccessibilityLabel(totalItems) {
  const itemLabel = totalItems === 1 ? "1 item" : `${totalItems} items`;
  return `Open order basket. ${itemLabel}`;
}

export default function OrderButton({ totalItems, onPress }) {
  const hasItems = totalItems > 0;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={getOrderAccessibilityLabel(totalItems)}
      className="h-10 flex-row items-center gap-2 border border-zinc-800 bg-white px-3 active:opacity-80"
    >
      <Text className="text-xs font-black uppercase tracking-widest text-[#D8A808]">
        Order
      </Text>

      <View
        className={`h-6 min-w-6 items-center justify-center rounded-full px-2 ${
          hasItems ? "bg-[#D8A808]" : "bg-zinc-700"
        }`}
      >
        <Text
          className={`text-xs font-black ${
            hasItems ? "text-zinc-950" : "text-zinc-300"
          }`}
        >
          {totalItems}
        </Text>
      </View>
    </Pressable>
  );
}