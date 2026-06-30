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
import OrderBasketModal from "../OrderBasketModal";

export default function MenuScreen() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categories[0].id,
  );
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const {
    isLandscape,
    isTablet,
    sidebarWidth,
    cardWidth,
    cardHeight,
    columns,
    gap,
  } = useResponsive();

  const {
    orderItems,
    totalItems,
    orderSubtotal,
    taxAmount,
    orderTotal,
    addProductToOrder,
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductFromOrder,
    clearOrder,
  } = useOrder();

  const showSidebar = isTablet && isLandscape;

  const visibleProducts = useMemo(() => {
    return products.filter(
      (product) => product.categoryId === selectedCategoryId,
    );
  }, [selectedCategoryId]);

  return (
    <SafeAreaView className="flex-1 bg-[#f5ead7]">
      <View className="flex-1 flex-row">
        {showSidebar && (
          <MenuSidebar
            width={sidebarWidth}
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
          />
        )}

        <View className="flex-1 px-6 py-4">
          <MenuHeader />

          {!showSidebar && (
            <CategoryTabs
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={setSelectedCategoryId}
            />
          )}

          <MenuGrid
            products={visibleProducts}
            columns={columns}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            gap={gap}
            onAddToOrder={addProductToOrder}
          />
        </View>

        <FloatingOrderButton
          totalItems={totalItems}
          onPress={() => setIsOrderOpen(true)}
        />
        <OrderBasketModal
          visible={isOrderOpen}
          onClose={() => setIsOrderOpen(false)}
          orderItems={orderItems}
          totalItems={totalItems}
          orderSubtotal={orderSubtotal}
          taxAmount={taxAmount}
          orderTotal={orderTotal}
          onIncrease={increaseProductQuantity}
          onDecrease={decreaseProductQuantity}
          onRemove={removeProductFromOrder}
          onClear={clearOrder}
        />
      </View>
    </SafeAreaView>
  );
}
