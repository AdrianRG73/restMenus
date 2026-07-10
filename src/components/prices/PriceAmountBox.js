import { Text, View } from "react-native";

import { formatCurrency } from "../../utils/formatCurrency";

export default function PriceAmountBox({ price, priceLabel }) {
  const displayValue = priceLabel ?? formatCurrency(price).replace("$", "");

  return (
    <View className="h-14 w-36 flex-row items-center border-2 border-[#d8d0bd] bg-[#f5f0e6] px-4">
      <Text className="font-body text-xs text-black">$</Text>

      <Text className="flex-1 text-center font-title text-2xl text-black">
        {displayValue}
      </Text>
    </View>
  );
}