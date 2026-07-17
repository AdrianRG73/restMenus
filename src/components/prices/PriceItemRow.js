import { Text, View } from "react-native";

import AvailabilityToggle from "./AvailabilityToggle";
import PriceAmountBox from "./PriceAmountBox";

export default function PriceItemRow({ item, onToggleAvailability }) {
  return (
    <View className="min-h-[82px] flex-row items-center border-b border-[#2b241f] px-5 py-4">
      <View className="mr-5 h-10 w-10 items-center justify-center border-2 border-[#2b241f] bg-[#171311]">
        <Text className="text-xl">{item.icon}</Text>
      </View>

      <View className="flex-1">
        <Text
          numberOfLines={2}
          className="font-title text-[16px] uppercase text-[#f2e9d0]"
        >
          {item.name}
        </Text>

        <Text
          numberOfLines={1}
          className="mt-[-2px] font-body text-[9px] uppercase tracking-[1.5px] text-zinc-600"
        >
          {item.inventoryLabel}
        </Text>
      </View>

      <View className="mx-5">
        <PriceAmountBox price={item.price} priceLabel={item.priceLabel} />
      </View>

      <AvailabilityToggle
        isActive={item.available}
        onPress={onToggleAvailability}
      />
    </View>
  );
}