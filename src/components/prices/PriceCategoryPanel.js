import { Text, View } from "react-native";

import PriceItemRow from "./PriceItemRow";

export default function PriceCategoryPanel({
  category,
  onToggleItemAvailability,
}) {
  return (
    <View className="flex-1 border-2 border-[#2b241f] bg-[#151716]">
      <View
        className={`h-11 flex-row items-center justify-between px-5 ${category.headerColorClass}`}
      >
        <Text className="font-title text-base uppercase text-white">
          {category.title}
        </Text>

        <Text className="font-button text-[9px] uppercase tracking-[1.5px] text-white">
          {category.itemCountLabel}
        </Text>
      </View>

      <View>
        {category.items.map((item) => (
          <PriceItemRow
            key={item.id}
            item={item}
            onToggleAvailability={() =>
              onToggleItemAvailability(category.id, item.id)
            }
          />
        ))}
      </View>
    </View>
  );
}