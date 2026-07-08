import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CheckoutScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#111312]">
      <View className="flex-1 items-center justify-center px-8">
        <Text className="font-title text-5xl uppercase text-[#f2e9d0]">
          Order Closure
        </Text>

        <Text className="mt-3 font-body text-sm text-zinc-500">
          Checkout interface will be created in the next block.
        </Text>

        <Text className="mt-6 font-button text-xs uppercase tracking-[2px] text-[#08a88a]">
          Ready for payment grid
        </Text>
      </View>
    </SafeAreaView>
  );
}