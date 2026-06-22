import { View, Text, Pressable } from "react-native";

export default function FloatingOrderButton({ totalItems }) {
  return (
    <Pressable className="absolute right-6 bottom-6 bg-zinc-950 border-2 border-yellow-400 px-5 py-4 active:scale-95">
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