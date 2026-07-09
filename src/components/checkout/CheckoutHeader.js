import { Pressable, Text, View } from "react-native";

// Barra superior
export default function CheckoutHeader({ onRefresh }) {
  return (
    <View className="h-16 flex-row items-center justify-between border-b-2 border-[#2b241f] bg-[#111312] px-5">
      <View>
        <Text className="font-title text-2xl uppercase text-[#f2e9d0]">
          Order Closure
        </Text>

        <Text className="mt-[-2px] font-body text-[9px] uppercase tracking-[3px] text-zinc-600">
          Admin · Checkout Terminal
        </Text>
      </View>

      <Pressable
        onPress={onRefresh}
        className="border-2 border-[#4a3c33] px-5 py-2"
      >
        <Text className="font-button text-[10px] uppercase tracking-[1.5px] text-white">
          Refresh
        </Text>
      </Pressable>
    </View>
  );
}