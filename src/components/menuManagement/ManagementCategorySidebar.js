import { Pressable, ScrollView, Text, View } from "react-native";

function CategoryButton({
  category,
  productCount,
  isSelected,
  onPress,
}) {
  const containerClassName = isSelected
    ? "border-[#d8a808] bg-[#d8a808]"
    : "border-[#2b241f] bg-[#171311]";

  const categoryNameClassName = isSelected
    ? "text-[#171311]"
    : "text-[#f2e9d0]";

  const countContainerClassName = isSelected
    ? "border-[#171311] bg-[#171311]"
    : "border-zinc-700 bg-[#111312]";

  const countTextClassName = isSelected
    ? "text-[#d8a808]"
    : "text-zinc-500";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Mostrar productos de ${category.name}`}
      accessibilityState={{ selected: isSelected }}
      onPress={() => onPress(category.id)}
      className={`mb-3 min-h-14 flex-row items-center justify-between border-2 px-4 ${containerClassName}`}
    >
      <Text
        numberOfLines={1}
        className={`flex-1 font-button text-xs uppercase tracking-[1px] ${categoryNameClassName}`}
      >
        {category.name}
      </Text>

      <View
        className={`ml-3 min-w-8 items-center justify-center border px-2 py-1 ${countContainerClassName}`}
      >
        <Text
          className={`font-body text-[10px] ${countTextClassName}`}
        >
          {productCount}
        </Text>
      </View>
    </Pressable>
  );
}

export default function ManagementCategorySidebar({
  categories,
  selectedCategoryId,
  productCounts,
  onSelectCategory,
}) {
  return (
    <View className="w-[210px] border-r-2 border-[#2b241f] bg-[#0d0f0e]">
      <View className="border-b-2 border-[#2b241f] px-4 py-4">
        <Text className="font-title text-xl uppercase text-[#f2e9d0]">
          Categorías
        </Text>

        <Text className="mt-1 font-body text-[9px] uppercase tracking-[2px] text-zinc-600">
          Filtrar productos
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 24,
        }}
      >
        {categories.map((category) => {
          const productCount = productCounts[category.id] ?? 0;
          const isSelected = category.id === selectedCategoryId;

          return (
            <CategoryButton
              key={category.id}
              category={category}
              productCount={productCount}
              isSelected={isSelected}
              onPress={onSelectCategory}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}