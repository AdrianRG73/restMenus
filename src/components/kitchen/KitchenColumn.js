import { ScrollView, Text, View } from "react-native";

export default function KitchenColumn({ title, tickets, children }) {
  const orderLabel = tickets.length === 1 ? "1 Order" : `${tickets.length} Orders`;

  return (
    <View className="flex-1">
      <View className="mb-5 flex-row items-center justify-between border-b border-[#232c36] pb-3">
        <Text className="text-xl font-black uppercase tracking-tight text-zinc-100">
          {title}
        </Text>

        <View className="bg-[#202832] px-3 py-1">
          <Text className="text-[10px] font-black text-zinc-100">
            {orderLabel}
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 24,
          paddingBottom: 32,
        }}
      >
        {children}
      </ScrollView>
    </View>
  );
}