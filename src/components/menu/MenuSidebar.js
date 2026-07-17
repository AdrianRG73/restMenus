import { Image, View, Text, Pressable } from "react-native";

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
      <View className="justify-center">
        <Image
          source={require("../../assets/Logo_cybar.png")}
          className="w-12 h-12"
          resizeMode="contain"
        />
      </View>

      <View className="items-center gap-8">
        {categories.map((category) => {
          const isActive = selectedCategoryId === category.id;

          return (
            <Pressable
              key={category.id}
              onPress={() => onSelectCategory(category.id)}
              className="items-center justify-center active:opacity-70"
            >
              <View className="mt-5 -rotate-90 items-center">
                <Text
                  className={`text-[10px] font-black uppercase tracking-widest ${
                    isActive ? "text-yellow-400" : "text-zinc-500"
                  }`}
                >
                  {category.name}
                </Text>

                <View
                  className={`mt-1 h-[2px] w-12 ${
                    isActive ? "bg-yellow-400" : "bg-transparent"
                  }`}
                />
              </View>
            </Pressable>
          );
        })}
      </View>

      <SidebarOrderButton totalItems={totalItems} onPress={onOpenOrder} />
    </View>
  );
}
