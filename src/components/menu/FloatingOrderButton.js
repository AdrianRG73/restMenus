import { View, Text, Pressable } from "react-native";

export default function FloatingOrderButton({ totalItems, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full bg-zinc-900 active:opacity-80"
    >
      <View className="flex-row items-center gap-3">
        <Text className="text-yellow-400 text-xl">🧾</Text>

        <View>
          <Text className="text-yellow-400 text-[10px] font-black uppercase tracking-widest">
            Orden
          </Text>

          <Text className="text-white text-xs font-bold">
            {totalItems} producto{totalItems === 1 ? "" : "s"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
