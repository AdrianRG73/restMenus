import { View } from "react-native";
import { useCallback, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import ManagementCategorySidebar from "../components/menuManagement/ManagementCategorySidebar";
import ManagementProductGrid from "../components/menuManagement/ManagementProductGrid";
import ManagementSection from "../components/menuManagement/ManagementSection";
import MenuItemForm from "../components/menuManagement/MenuItemForm";
import MenuManagementHeader from "../components/menuManagement/MenuManagementHeader";
import { useMenuCatalog } from "../hooks/useMenuCatalog";

/**
 * Construye un objeto que contiene la cantidad de productos
 * registrados en cada categoría.
 *
 * Ejemplo:
 *
 * {
 *   breakfast: 4,
 *   drinks: 100,
 *   extras: 7,
 * }
 */
function createProductCountByCategory(products) {
  return products.reduce((counts, product) => {
    const categoryId = product.categoryId;

    counts[categoryId] = (counts[categoryId] ?? 0) + 1;

    return counts;
  }, {});
}

export default function MenuManagementScreen() {
  const { products, categories } = useMenuCatalog();

  const initialCategoryId = categories[0]?.id ?? null;

  /**
   * Identificador de la categoría seleccionada en la barra lateral.
   */
  const [selectedCategoryId, setSelectedCategoryId] =
    useState(initialCategoryId);

  /**
   * Controla qué contenido ocupa el panel derecho:
   *
   * false:
   * Se muestra el catálogo de productos.
   *
   * true:
   * Se muestra únicamente el formulario de nuevo producto.
   */
  const [isNewProductFormVisible, setIsNewProductFormVisible] =
    useState(false);

  /**
   * Obtiene la información completa de la categoría seleccionada.
   */
  const selectedCategory = useMemo(() => {
    return categories.find((category) => {
      return category.id === selectedCategoryId;
    });
  }, [categories, selectedCategoryId]);

  /**
   * Filtra los productos para mostrar solamente los pertenecientes
   * a la categoría seleccionada.
   */
  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      return product.categoryId === selectedCategoryId;
    });
  }, [products, selectedCategoryId]);

  /**
   * Calcula los contadores mostrados dentro de la barra lateral.
   */
  const productCounts = useMemo(() => {
    return createProductCountByCategory(products);
  }, [products]);

  /**
   * Cambia la categoría activa.
   */
  const handleSelectCategory = useCallback((categoryId) => {
    setSelectedCategoryId(categoryId);
  }, []);

  /**
   * Abre el formulario de nuevo producto.
   */
  const handleStartNewProduct = useCallback(() => {
    setIsNewProductFormVisible(true);
  }, []);

  /**
   * Cierra el formulario y vuelve a mostrar el catálogo.
   *
   * MenuItemForm se desmonta al cerrarse, por lo que cualquier
   * información no guardada en sus campos se elimina.
   */
  const handleCloseNewProductForm = useCallback(() => {
    setIsNewProductFormVisible(false);
  }, []);

  /**
   * Función temporal para comenzar posteriormente la edición.
   */
  const handleEditProduct = useCallback((product) => {
    console.log("Editar producto:", product);
  }, []);

  /**
   * Función temporal para comenzar posteriormente la eliminación.
   */
  const handleDeleteProduct = useCallback((product) => {
    console.log("Eliminar producto:", product);
  }, []);

  const visibleProductCountText =
    visibleProducts.length === 1
      ? "1 producto"
      : `${visibleProducts.length} productos`;

  const productSectionTitle = selectedCategory
    ? `Productos de ${selectedCategory.name}`
    : "Productos";

  /**
   * El botón queda deshabilitado cuando:
   *
   * - no existe una categoría seleccionada;
   * - el formulario ya está abierto.
   */
  const shouldDisableNewProductButton =
    !selectedCategoryId || isNewProductFormVisible;

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="flex-1 bg-[#111312]"
    >
      <MenuManagementHeader
        onStartNewProduct={handleStartNewProduct}
        isAddButtonDisabled={shouldDisableNewProductButton}
      />

      <View className="flex-1 flex-row">
        <ManagementCategorySidebar
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          productCounts={productCounts}
          onSelectCategory={handleSelectCategory}
        />

        {/* Panel derecho principal */}
        <View className="flex-1 p-4">
          {isNewProductFormVisible ? (
  <ManagementSection
    title="Nuevo producto"
    description="Captura la información del producto"
    metaText="Formulario"
    className="flex-1"
    contentClassName="flex-1"
  >
    <View className="flex-1 p-4">
      <MenuItemForm
        selectedCategoryName={selectedCategory?.name}
        onCancel={handleCloseNewProductForm}
      />
    </View>
  </ManagementSection>
) : (
  <ManagementSection
    title={productSectionTitle}
    description="Catálogo de la categoría seleccionada"
    metaText={visibleProductCountText}
    className="flex-1"
    contentClassName="flex-1 p-3"
  >
    <ManagementProductGrid
      products={visibleProducts}
      onEditProduct={handleEditProduct}
      onDeleteProduct={handleDeleteProduct}
    />
  </ManagementSection>
)}
        </View>
      </View>
    </SafeAreaView>
  );
}