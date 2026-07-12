import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ManagementCategorySidebar from "../components/menuManagement/ManagementCategorySidebar";
import ManagementProductGrid from "../components/menuManagement/ManagementProductGrid";
import ManagementSection from "../components/menuManagement/ManagementSection";
import MenuItemForm from "../components/menuManagement/MenuItemForm";
import MenuManagementHeader from "../components/menuManagement/MenuManagementHeader";
import { useMenuCatalog } from "../hooks/useMenuCatalog";

export default function MenuManagementScreen() {
  const { products, categories } = useMenuCatalog();

  const initialCategoryId = categories[0]?.id ?? null;

  const [selectedCategoryId, setSelectedCategoryId] =
    useState(initialCategoryId);

  const selectedCategory = useMemo(() => {
    return categories.find((category) => {
      return category.id === selectedCategoryId;
    });
  }, [categories, selectedCategoryId]);

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      return product.categoryId === selectedCategoryId;
    });
  }, [products, selectedCategoryId]);

  const productCounts = useMemo(() => {
    return products.reduce((counts, product) => {
      const currentCount = counts[product.categoryId] ?? 0;

      counts[product.categoryId] = currentCount + 1;

      return counts;
    }, {});
  }, [products]);

  const handleSelectCategory = useCallback((categoryId) => {
    setSelectedCategoryId(categoryId);
  }, []);

  const visibleProductCountText =
    visibleProducts.length === 1
      ? "1 producto"
      : `${visibleProducts.length} productos`;

  const sectionTitle = selectedCategory
    ? `Productos de ${selectedCategory.name}`
    : "Productos";

  const handleEditProduct = useCallback((product) => {
    console.log("Editar producto:", product);
  }, []);

  const handleDeleteProduct = useCallback((product) => {
    console.log("Eliminar producto:", product);
  }, []);

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="flex-1 bg-[#111312]"
    >
      <MenuManagementHeader />

      <View className="flex-1 flex-row">
        <ManagementCategorySidebar
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          productCounts={productCounts}
          onSelectCategory={handleSelectCategory}
        />

        <View className="flex-1 p-4">
          <ManagementSection
            title="Nuevo producto"
            description="Captura la información del producto"
            metaText="Formulario"
          >
            <MenuItemForm selectedCategoryName={selectedCategory?.name} />
          </ManagementSection>

          <ManagementSection
            title={sectionTitle}
            description="Catálogo de la categoría seleccionada"
            metaText={visibleProductCountText}
            className="mt-4 flex-1"
            contentClassName="flex-1 p-3"
          >
            <ManagementProductGrid
              products={visibleProducts}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          </ManagementSection>
        </View>
      </View>
    </SafeAreaView>
  );
}
