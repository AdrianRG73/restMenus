import { View, Text, Pressable } from "react-native";

import SidebarOrderButton from "./SidebarOrderButton";

export default function MenuSidebar({
  width,
  categories,
  selectedCategoryId,
  onSelectCategory,
  totalItems,
  onOpenOrder,
}) {
  return (
    <View
      style={{ width }}
      className="items-center justify-between border-r-2 border-yellow-500 bg-zinc-950 py-6"
    >
      <Text className="text-xl font-black text-yellow-400">☰</Text>

      <View className="items-center gap-8">
        {categories.map((category) => {
          const isActive = selectedCategoryId === category.id;

          return (
            <Pressable
              key={category.id}
              onPress={() => onSelectCategory(category.id)}
              className="items-center justify-center active:opacity-70"
            >
              <Text
                className={`mt-5 text-[10px] -rotate-90 font-black uppercase tracking-widest ${
                  isActive ? "text-yellow-400" : "text-zinc-500"
                }`}
              >
                {category.name}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <SidebarOrderButton totalItems={totalItems} onPress={onOpenOrder} />
    </View>
  );
}