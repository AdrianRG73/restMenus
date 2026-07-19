import { useMemo, useState } from "react";

import { Alert, FlatList, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import PriceCategoryPanel from "../components/prices/PriceCategoryPanel";
import PriceDashboardHeader from "../components/prices/PriceDashboardHeader";

import { priceDashboardCategories } from "../data/priceDashboardItems";
import { buildPriceDashboardRows } from "../utils/priceDashboardGrid";

/**
 * Convierte el precio inicial de un producto a texto.
 *
 * Los TextInput trabajan con strings, no con números.
 *
 * Ejemplos:
 * 14     -> "14.00"
 * 16.5   -> "16.50"
 * MP     -> "MP"
 */
function getInitialPriceText(item) {
  if (typeof item.priceLabel === "string") {
    return item.priceLabel.toUpperCase();
  }

  if (typeof item.price === "number" && Number.isFinite(item.price)) {
    return item.price.toFixed(2);
  }

  return "";
}

/**
 * Crea una copia editable de los datos iniciales.
 *
 * No modifica directamente priceDashboardCategories.
 * Cada producto recibe una propiedad priceText para controlar
 * el contenido de su TextInput.
 */
function createEditableCategories(categories) {
  return categories.map((category) => {
    return {
      ...category,

      items: category.items.map((item) => {
        return {
          ...item,
          priceText: getInitialPriceText(item),
        };
      }),
    };
  });
}

/**
 * Filtra los productos por nombre.
 *
 * Las categorías vacías se eliminan del resultado.
 */
function filterCategoriesBySearch(categories, searchText) {
  const normalizedSearchText = searchText.trim().toLowerCase();

  if (!normalizedSearchText) {
    return categories;
  }

  return categories
    .map((category) => {
      const filteredItems = category.items.filter((item) => {
        return item.name.toLowerCase().includes(normalizedSearchText);
      });

      return {
        ...category,
        items: filteredItems,
      };
    })
    .filter((category) => category.items.length > 0);
}

/**
 * Actualiza un producto específico dentro de una categoría.
 *
 * Esta función evita duplicar varias veces la misma estructura:
 *
 * categories.map(...)
 * category.items.map(...)
 *
 * updater recibe el producto encontrado y devuelve su nueva versión.
 */
function updateCategoryItem(categories, categoryId, itemId, updater) {
  return categories.map((category) => {
    if (category.id !== categoryId) {
      return category;
    }

    return {
      ...category,

      items: category.items.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        return updater(item);
      }),
    };
  });
}

/**
 * Valida el texto mientras el usuario escribe.
 *
 * Precios aceptados:
 * - vacío temporalmente;
 * - números enteros;
 * - números con hasta dos decimales;
 * - M o MP para productos de precio de mercado.
 *
 * null significa que el nuevo texto no es válido.
 */
function normalizePriceInput(inputValue, allowsMarketPrice) {
  const normalizedValue = inputValue.replace(",", ".").trim().toUpperCase();

  if (allowsMarketPrice && ["", "M", "MP"].includes(normalizedValue)) {
    return normalizedValue;
  }

  const numericPricePattern = /^\d{0,5}(\.\d{0,2})?$/;

  if (numericPricePattern.test(normalizedValue)) {
    return normalizedValue;
  }

  return null;
}

/**
 * Formatea el precio cuando el usuario termina de editarlo.
 *
 * Ejemplos:
 * "14"    -> "14.00"
 * "16.5"  -> "16.50"
 * "MP"    -> "MP"
 *
 * Devuelve null cuando el precio está incompleto o no es válido.
 */
function formatPriceInput(priceText) {
  const normalizedPrice = priceText.trim().toUpperCase();

  if (normalizedPrice === "MP") {
    return "MP";
  }

  if (!normalizedPrice) {
    return null;
  }

  const numericPrice = Number(normalizedPrice);

  if (!Number.isFinite(numericPrice) || numericPrice < 0) {
    return null;
  }

  return numericPrice.toFixed(2);
}

/**
 * Convierte priceText nuevamente al formato de datos del producto.
 *
 * Un precio normal se guarda como número.
 * MP se conserva mediante priceLabel.
 */
function applyFormattedPrice(item) {
  const formattedPrice = formatPriceInput(item.priceText);

  if (formattedPrice === "MP") {
    return {
      ...item,
      price: null,
      priceLabel: "MP",
      priceText: "MP",
    };
  }

  return {
    ...item,
    price: Number(formattedPrice),
    priceLabel: null,
    priceText: formattedPrice,
  };
}

/**
 * Estado visual mostrado cuando una búsqueda no encuentra productos.
 */
function EmptyPricesState() {
  return (
    <View className="flex-1 items-center justify-center py-20">
      <Text className="font-title text-4xl uppercase text-[#f2e9d0]">
        No Items Found
      </Text>

      <Text className="mt-2 font-body text-xs uppercase tracking-[2px] text-zinc-600">
        Try another search term.
      </Text>
    </View>
  );
}

export default function PriceDashboardScreen() {
  /**
   * El callback de useState se ejecuta solamente al montar la pantalla.
   *
   * Evita volver a crear toda la estructura editable durante
   * cada renderizado.
   */
  const [categories, setCategories] = useState(() => {
    return createEditableCategories(priceDashboardCategories);
  });

  const [searchText, setSearchText] = useState("");

  /**
   * Recalcula las categorías visibles solamente cuando cambia:
   * - categories;
   * - searchText.
   */
  const visibleCategories = useMemo(() => {
    return filterCategoriesBySearch(categories, searchText);
  }, [categories, searchText]);

  /**
   * Organiza las categorías en filas completas o medias.
   */
  const dashboardRows = useMemo(() => {
    return buildPriceDashboardRows(visibleCategories);
  }, [visibleCategories]);

  /**
   * Invierte la disponibilidad de un producto.
   */
  function handleToggleItemAvailability(categoryId, itemId) {
    setCategories((currentCategories) => {
      return updateCategoryItem(
        currentCategories,
        categoryId,
        itemId,
        (item) => {
          return {
            ...item,
            available: !item.available,
          };
        },
      );
    });
  }

  /**
   * Actualiza el texto del precio mientras el usuario escribe.
   *
   * No permite insertar letras o más de dos decimales
   * en los productos con precios numéricos.
   */
  function handleChangeItemPrice(categoryId, itemId, nextPrice) {
    setCategories((currentCategories) => {
      return updateCategoryItem(
        currentCategories,
        categoryId,
        itemId,
        (item) => {
          const allowsMarketPrice =
            Boolean(item.priceLabel) ||
            item.priceText?.toUpperCase().startsWith("M");

          const normalizedPrice = normalizePriceInput(
            nextPrice,
            allowsMarketPrice,
          );

          if (normalizedPrice === null) {
            return item;
          }

          return {
            ...item,
            priceText: normalizedPrice,
          };
        },
      );
    });
  }

  /**
   * Formatea el precio cuando el campo pierde el foco.
   *
   * Por ejemplo, 14 se convierte en 14.00.
   */
  function handleBlurItemPrice(categoryId, itemId) {
    setCategories((currentCategories) => {
      return updateCategoryItem(
        currentCategories,
        categoryId,
        itemId,
        (item) => {
          const formattedPrice = formatPriceInput(item.priceText);

          if (formattedPrice === null) {
            return item;
          }

          return {
            ...item,
            priceText: formattedPrice,
          };
        },
      );
    });
  }

  /**
   * Valida todos los precios y los convierte a datos definitivos.
   *
   * Por ahora solamente se guardan en el estado local.
   * Al cerrar y volver a iniciar la aplicación se restaurarán
   * los datos originales.
   */
  function handleSaveChanges() {
    const containsInvalidPrice = categories.some((category) => {
      return category.items.some((item) => {
        return formatPriceInput(item.priceText) === null;
      });
    });

    if (containsInvalidPrice) {
      Alert.alert("Invalid price", "Complete every price before saving.");

      return;
    }

    const updatedCategories = categories.map((category) => {
      return {
        ...category,
        items: category.items.map(applyFormattedPrice),
      };
    });

    setCategories(updatedCategories);

    Alert.alert("Save Changes", "Price dashboard changes saved locally.");
  }

  return (
    <SafeAreaView className="flex-1 bg-[#111312]">
      <PriceDashboardHeader
        searchText={searchText}
        onSearchTextChange={setSearchText}
        onSaveChanges={handleSaveChanges}
      />

      <FlatList
        data={dashboardRows}
        keyExtractor={(row) => row.id}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={<EmptyPricesState />}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 12,
          paddingBottom: 20,
        }}
        renderItem={({ item: row }) => {
          const hasTwoColumns = row.type === "half-row";

          return (
            <View
              className={`mb-3 flex-row items-start ${
                hasTwoColumns ? "gap-3" : ""
              }`}
            >
              {row.categories.map((category) => (
                <PriceCategoryPanel
                  key={category.id}
                  category={category}
                  onToggleItemAvailability={handleToggleItemAvailability}
                  onChangeItemPrice={handleChangeItemPrice}
                  onBlurItemPrice={handleBlurItemPrice}
                />
              ))}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
