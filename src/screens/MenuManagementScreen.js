import {
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import {
  useCallback,
  useMemo,
  useState,
} from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import ManagementCategorySidebar from "../components/menuManagement/ManagementCategorySidebar";
import ManagementProductGrid from "../components/menuManagement/ManagementProductGrid";
import ManagementSection from "../components/menuManagement/ManagementSection";
import MenuItemForm from "../components/menuManagement/MenuItemForm";
import MenuManagementHeader from "../components/menuManagement/MenuManagementHeader";

import { useMenuCatalog } from "../hooks/useMenuCatalog";

const FORM_HEIGHT_PERCENTAGE = 0.42;
const MIN_FORM_PANEL_HEIGHT = 250;
const MAX_FORM_PANEL_HEIGHT = 330;

/**
 * Limita un valor para que permanezca dentro de un rango.
 *
 * Ejemplos:
 * clamp(200, 250, 330) -> 250
 * clamp(290, 250, 330) -> 290
 * clamp(400, 250, 330) -> 330
 */
function clamp(value, minimum, maximum) {
  return Math.min(
    Math.max(value, minimum),
    maximum,
  );
}

/**
 * Calcula la altura visible del formulario.
 *
 * Utiliza una proporción de la altura de la pantalla, pero aplica
 * límites para evitar:
 *
 * - un formulario demasiado pequeño;
 * - un formulario que cubra toda la lista de productos.
 */
function getFormPanelHeight(screenHeight) {
  const responsiveHeight =
    screenHeight * FORM_HEIGHT_PERCENTAGE;

  return clamp(
    responsiveHeight,
    MIN_FORM_PANEL_HEIGHT,
    MAX_FORM_PANEL_HEIGHT,
  );
}

/**
 * Genera un objeto con el número de productos por categoría.
 *
 * Resultado de ejemplo:
 *
 * {
 *   breakfast: 4,
 *   drinks: 100,
 *   extras: 7,
 * }
 */
function createProductCountByCategory(products) {
  return products.reduce((counts, product) => {
    const currentCount =
      counts[product.categoryId] ?? 0;

    return {
      ...counts,
      [product.categoryId]: currentCount + 1,
    };
  }, {});
}

export default function MenuManagementScreen() {
  const { height: screenHeight } =
    useWindowDimensions();

  const { products, categories } =
    useMenuCatalog();

  const initialCategoryId =
    categories[0]?.id ?? null;

  /**
   * Categoría seleccionada en la barra lateral.
   */
  const [
    selectedCategoryId,
    setSelectedCategoryId,
  ] = useState(initialCategoryId);

  /**
   * El formulario comienza oculto.
   *
   * Sólo cambia a true cuando el usuario pulsa
   * el botón "Nuevo producto".
   */
  const [
    isNewProductFormVisible,
    setIsNewProductFormVisible,
  ] = useState(false);

  /**
   * Obtiene el objeto completo de la categoría seleccionada.
   *
   * useMemo evita repetir la búsqueda mientras no cambien
   * categories o selectedCategoryId.
   */
  const selectedCategory = useMemo(() => {
    return categories.find((category) => {
      return category.id === selectedCategoryId;
    });
  }, [categories, selectedCategoryId]);

  /**
   * Filtra únicamente los productos pertenecientes
   * a la categoría seleccionada.
   */
  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        product.categoryId === selectedCategoryId
      );
    });
  }, [products, selectedCategoryId]);

  /**
   * Calcula los contadores utilizados en la barra lateral.
   */
  const productCounts = useMemo(() => {
    return createProductCountByCategory(products);
  }, [products]);

  /**
   * Altura máxima que ocupará el formulario.
   *
   * El resto del espacio queda disponible para el catálogo.
   */
  const formPanelHeight = useMemo(() => {
    return getFormPanelHeight(screenHeight);
  }, [screenHeight]);

  /**
   * Cambia la categoría seleccionada.
   */
  const handleSelectCategory = useCallback(
    (categoryId) => {
      setSelectedCategoryId(categoryId);
    },
    [],
  );

  /**
   * Muestra el formulario.
   */
  const handleStartNewProduct = useCallback(() => {
    setIsNewProductFormVisible(true);
  }, []);

  /**
   * Oculta el formulario.
   *
   * Como MenuItemForm se desmonta, sus campos también
   * se reiniciarán al volver a abrirlo.
   */
  const handleCloseNewProductForm =
    useCallback(() => {
      setIsNewProductFormVisible(false);
    }, []);

  /**
   * Función provisional para editar productos.
   */
  const handleEditProduct = useCallback(
    (product) => {
      console.log("Editar producto:", product);
    },
    [],
  );

  /**
   * Función provisional para eliminar productos.
   */
  const handleDeleteProduct = useCallback(
    (product) => {
      console.log("Eliminar producto:", product);
    },
    [],
  );

  const visibleProductCountText =
    visibleProducts.length === 1
      ? "1 producto"
      : `${visibleProducts.length} productos`;

  const productSectionTitle = selectedCategory
    ? `Productos de ${selectedCategory.name}`
    : "Productos";

  /**
   * Mientras el formulario está abierto, el botón superior
   * permanece deshabilitado para evitar intentar abrirlo
   * varias veces.
   */
  const shouldDisableNewProductButton =
    !selectedCategoryId ||
    isNewProductFormVisible;

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="flex-1 bg-[#111312]"
    >
      <MenuManagementHeader
        onStartNewProduct={
          handleStartNewProduct
        }
        isAddButtonDisabled={
          shouldDisableNewProductButton
        }
      />

      <View className="flex-1 flex-row">
        <ManagementCategorySidebar
          categories={categories}
          selectedCategoryId={
            selectedCategoryId
          }
          productCounts={productCounts}
          onSelectCategory={
            handleSelectCategory
          }
        />

        {/* Área derecha */}
        <View className="flex-1 p-4">
          {isNewProductFormVisible ? (
            <View
              style={{
                height: formPanelHeight,
              }}
              className="mb-4"
            >
              <ManagementSection
                title="Nuevo producto"
                description="Captura la información del producto"
                metaText="Formulario"
                className="flex-1"
                contentClassName="flex-1"
              >
                <ScrollView
                  className="flex-1"
                  showsVerticalScrollIndicator
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{
                    padding: 16,
                    paddingBottom: 24,
                  }}
                >
                  <MenuItemForm
                    selectedCategoryName={
                      selectedCategory?.name
                    }
                    onCancel={
                      handleCloseNewProductForm
                    }
                  />
                </ScrollView>
              </ManagementSection>
            </View>
          ) : null}

          {/* Catálogo siempre visible */}
          <ManagementSection
            title={productSectionTitle}
            description="Catálogo de la categoría seleccionada"
            metaText={visibleProductCountText}
            className="flex-1"
            contentClassName="flex-1 p-3"
          >
            <ManagementProductGrid
              products={visibleProducts}
              onEditProduct={
                handleEditProduct
              }
              onDeleteProduct={
                handleDeleteProduct
              }
            />
          </ManagementSection>
        </View>
      </View>
    </SafeAreaView>
  );
}