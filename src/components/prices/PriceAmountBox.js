import { Text, View, TextInput } from "react-native";

import { formatCurrency } from "../../utils/formatCurrency";

export default function PriceAmountBox({ price, priceLabel }) {
  const displayValue = priceLabel ?? formatCurrency(price).replace("$", "");

  return (
    <View className="h-12 w-32 flex-row items-center border-1 border-[#d8d0bd] bg-[#f5f0e6] px-4">
      <Text className="font-body text-xs text-black">$</Text>

      <TextInput className="flex-1 text-[18px] text-center font-title text-black">
        {displayValue}
      </TextInput>
    </View>
  );
}