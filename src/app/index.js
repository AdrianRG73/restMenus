import { useMemo, useState } from "react";
import { View } from "react-native";

import { useResponsive } from "../hooks/useResponsive";

import { products } from "../components/Data/products";
import { categories } from "../components/Data/categories";

import MenuHeader from "../components/menu/MenuHeader";
import MenuSidebar from "../components/menu/MenuSidebar";
import MenuGrid from "../components/menu/MenuGrid";
import FloatingOrderButton from "../components/menu/FloatingOrderButton";

export default function MenuScreen() {
  const [selectedCategory, setSelectedCategory] = useState("cocktails");
  const [order, setOrder] = useState([]);

  const {
    isLandscape,
    isTablet,
    cardWidth,
    cardHeight,
    columns,
    gap,
  } = useResponsive();

  const filteredProducts = useMemo(() => {
    return products.filter((item) => item.categoryId === selectedCategory);
  }, [selectedCategory]);

  const addToOrder = (product) => {
    setOrder((currentOrder) => {
      const existingItem = currentOrder.find((item) => item.id === product.id);

      if (existingItem) {
        return currentOrder.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentOrder, { ...product, quantity: 1 }];
    });
  };

  const totalItems = order.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View className="flex-1 flex-row bg-[#f5ead7]">
      <MenuSidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <View className="flex-1 px-6 py-4">
        <MenuHeader />

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
  );
}