import { useMemo, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useResponsive } from "../../hooks/useResponsive";
import { useOrder } from "../../hooks/useOrder";

import { products } from "../../data/products";
import { categories } from "../../data/categories";

import MenuHeader from "./MenuHeader";
import MenuSidebar from "./MenuSidebar";
import CategoryTabs from "./CategoryTabs";
import MenuGrid from "./MenuGrid";
import FloatingOrderButton from "./FloatingOrderButton";

export default function MenuScreen() {
  const [selectedCategory, setSelectedCategory] = useState("cocktails");

  const {
    isLandscape,
    isTablet,
    sidebarWidth,
    cardWidth,
    cardHeight,
    columns,
    gap,
  } = useResponsive();

  const showSidebar = isTablet && isLandscape;

  const filteredProducts = useMemo(() => {
    return products.filter((item) => item.categoryId === selectedCategory);
  }, [selectedCategory]);

  const { addToOrder, totalItems } = useOrder();

  return (
    <SafeAreaView className="flex-1 bg-[#f5ead7]">
      <View className="flex-1 flex-row">
        {showSidebar && (
          <MenuSidebar
            width={sidebarWidth}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        )}

        <View className="flex-1 px-6 py-4">
          <MenuHeader />

          {!showSidebar && (
            <CategoryTabs
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          )}

          <MenuGrid
            products={filteredProducts}
            columns={columns}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            gap={gap}
            onAddToOrder={addToOrder}
          />
        </View>

        <FloatingOrderButton totalItems={totalItems} />
      </View>
    </SafeAreaView>
  );
}
