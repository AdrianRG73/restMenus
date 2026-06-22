import { useMemo, useState } from "react";
import { SafeAreaView, View } from "react-native";

import { products } from "../components/Data/products";
import { categories } from "../components/Data/categories";

import MenuHeader from "../components/menu/MenuHeader";
import MenuSidebar from "../components/menu/MenuSidebar";
import CategoryTabs from "../components/menu/CategoryTabs";
import MenuGrid from "../components/menu/MenuGrid";
import FloatingOrderButton from "../components/menu/FloatingOrderButton";
import LanguageButton from "../components/menu/LanguageButton";
import { ScrollView } from "react-native-web";

export default function MenuScreen() {
  const [selectedCategory, setSelectedCategory] = useState("cocktails");
  const [order, setOrder] = useState([]);

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
      <View className="flex-1 flex-row">
        <MenuSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <View className="flex-1 px-6 py-4">
          <MenuHeader />
          <MenuGrid products={filteredProducts} onAddToOrder={addToOrder} />
        </View>

        <FloatingOrderButton totalItems={totalItems} />
      </View>
  );
}