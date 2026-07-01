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

// Mostrar el menú de productos con categorías, un grid de productos y un botón flotante para ver el pedido.
// Se adapta a diferentes tamaños de pantalla, mostrando una barra lateral en tabletas y pestañas de categorías en dispositivos más pequeños.

export default function MenuScreen() {
  // Estado para la categoría seleccionada y el estado del modal del pedido
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categories[0].id,
  );
  // Estado para controlar la visibilidad del modal del pedido
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

  // Determinar si se debe mostrar la barra lateral en función del tamaño de la pantalla y la orientación
  const showSidebar = isTablet && isLandscape;

  // Filtrar los productos visibles según la categoría seleccionada
  const visibleProducts = useMemo(() => {
    return products.filter(
      (product) => product.categoryId === selectedCategoryId,
    );
  }, [selectedCategoryId]);

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
          />
        )}

        {/* Contenedor principal del contenido del menú */}

        <View className="flex-1 px-6 py-4">
          <MenuHeader />
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
            columns={columns}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            gap={gap}
            onAddToOrder={addProductToOrder}
          />
        </View>

          {/* Mostrar el botón flotante del pedido */}

        <FloatingOrderButton
          totalItems={totalItems}
          // Abrir el modal del pedido al presionar el botón
          onPress={() => setIsOrderOpen(true)}
        />

        {/* Mostrar el modal del pedido con los detalles del pedido */}
        
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
