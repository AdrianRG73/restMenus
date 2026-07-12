import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useResponsive } from "../../hooks/useResponsive";
import { useOrder } from "../../hooks/useOrder";

import { useMenuCatalog } from "../../hooks/useMenuCatalog";

import MenuHeader from "./MenuHeader";
import MenuSidebar from "./MenuSidebar";
import CategoryTabs from "./CategoryTabs";
import MenuGrid from "./MenuGrid";
import OrderBasketModal from "../OrderBasketModal";

// Mostrar el menú de productos con categorías, un grid de productos y un botón flotante para ver el pedido.
// Se adapta a diferentes tamaños de pantalla, mostrando una barra lateral en tabletas y pestañas de categorías en dispositivos más pequeños.

export default function MenuScreen({ onOpenKitchen, onOpenCheckout, onOpenPrices }) {

  const { products, categories } = useMenuCatalog();
  // Estado para la categoría seleccionada y el estado del modal del pedido
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categories[0].id,
  );
  // Estado para controlar la visibilidad del modal del pedido
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const { sidebarWidth, cardWidth, showSidebar, cardHeight, gap } =
    useResponsive();

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

  const openOrderModal = useCallback(() => {
    setIsOrderOpen(true);
  }, []);

  const closeOrderModal = useCallback(() => {
    setIsOrderOpen(false);
  }, []);

  // Filtrar los productos visibles según la categoría seleccionada
  const visibleProducts = useMemo(() => {
  return products.filter((product) => {
    const belongsToSelectedCategory =
      product.categoryId === selectedCategoryId;

    const isAvailable = product.available !== false;

    return belongsToSelectedCategory && isAvailable;
  });
}, [products, selectedCategoryId]);
  // Renderizar la pantalla del menú
  return (
    // Contenedor principal con SafeAreaView para manejar áreas seguras en dispositivos con notch
    <SafeAreaView className="flex-1 bg-[#f5ead7]">
      <View className="flex-1 flex-row">
        {showSidebar && (
          // Mostrar la barra lateral con las categorías
          <MenuSidebar
            width={sidebarWidth}
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
            totalItems={totalItems}
            onOpenOrder={openOrderModal}
          />
        )}

        {/* Contenedor principal del contenido del menú */}

        <View className="flex-1 px-6 py-4">
          <MenuHeader
            totalItems={totalItems}
            onOpenOrder={openOrderModal}
            onOpenKitchen={onOpenKitchen}
            onOpenPrices={onOpenPrices}
            onOpenCheckout={onOpenCheckout}
          />
          {!showSidebar && (
            // Mostrar las pestañas de categorías
            <CategoryTabs
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={setSelectedCategoryId}
            />
          )}

          {/* Mostrar la cuadrícula de productos filtrados por categoría */}

          <MenuGrid
            products={visibleProducts}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            gap={gap}
            onAddToOrder={addProductToOrder}
          />
        </View>

        {/* Mostrar el modal del pedido con los detalles del pedido */}

        <OrderBasketModal
          visible={isOrderOpen}
          onClose={closeOrderModal}
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
