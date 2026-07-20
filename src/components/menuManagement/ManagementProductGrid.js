import {
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { useCallback, useState } from "react";

import { formatCurrency } from "../../utils/formatCurrency";

const PRODUCT_GRID_COLUMNS = 3;
const GRID_GAP = 12;

/**
 * Obtiene una fuente válida para el componente Image.
 *
 * Admite:
 *
 * 1. Una URI generada por el selector de imágenes:
 *    product.imageUri
 *
 * 2. Una imagen local importada con require:
 *    product.image
 */
function getProductImageSource(product) {
  if (product.imageUri) {
    return {
      uri: product.imageUri,
    };
  }

  return product.image ?? null;
}

/**
 * Representa visualmente un solo producto del catálogo.
 */
function ManagementProductCard({
  product,
  onEditProduct,
  onDeleteProduct,
}) {
  const imageSource = getProductImageSource(product);
  const isUnavailable = product.available === false;

  /**
   * Envía el producto completo a la pantalla principal.
   */
  const handleEditPress = () => {
    onEditProduct?.(product);
  };

  /**
   * Envía el producto completo a la pantalla principal.
   */
  const handleDeletePress = () => {
    onDeleteProduct?.(product);
  };

  return (
    <View className="h-44 overflow-hidden border-2 border-[#2b241f] bg-[#111312]">
      {/* Área de imagen */}
      <View className="relative h-24 border-b-2 border-[#2b241f] bg-[#0d0f0e]">
        {/* Acciones superpuestas */}
        <View
          className="absolute right-2 top-2 z-10 flex-row gap-2"
          style={{ elevation: 5 }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Editar ${product.name}`}
            hitSlop={6}
            onPress={handleEditPress}
            className="h-8 w-8 items-center justify-center border border-[#8094ab] bg-[#496783] active:opacity-70"
          >
            <Text className="text-base font-bold text-white">✎</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Eliminar ${product.name}`}
            hitSlop={6}
            onPress={handleDeletePress}
            className="h-8 w-8 items-center justify-center border border-red-800 bg-red-700 active:opacity-70"
          >
            <Text className="text-lg font-bold text-white">×</Text>
          </Pressable>
        </View>

        {imageSource ? (
          <Image
            source={imageSource}
            resizeMode="cover"
            className="h-full w-full"
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="font-body text-[10px] uppercase tracking-[2px] text-zinc-700">
              Sin imagen
            </Text>
          </View>
        )}

        {isUnavailable ? (
          <View className="absolute inset-0 items-center justify-center bg-black/70">
            <Text className="font-button text-xs uppercase tracking-[2px] text-[#d8a808]">
              No disponible
            </Text>
          </View>
        ) : null}
      </View>

      {/* Información del producto */}
      <View className="flex-1 justify-between px-3 py-2">
        <View>
          <Text
            numberOfLines={1}
            className="font-button text-sm uppercase text-[#f2e9d0]"
          >
            {product.name}
          </Text>

          {product.englishName ? (
            <Text
              numberOfLines={1}
              className="mt-1 font-body text-[10px] text-zinc-600"
            >
              {product.englishName}
            </Text>
          ) : null}
        </View>

        <Text className="font-title text-lg text-[#d8a808]">
          {formatCurrency(product.price)}
        </Text>
      </View>
    </View>
  );
}

/**
 * Contenido mostrado cuando la categoría seleccionada
 * no tiene productos registrados.
 */
function EmptyProductList() {
  return (
    <View className="flex-1 items-center justify-center border-2 border-dashed border-[#2b241f] bg-[#111312] px-6 py-3">
      <Text className="font-title text-xl uppercase text-[#f2e9d0]">
        Sin productos
      </Text>

      <Text className="mt-2 max-w-[420px] text-center font-body text-xs leading-5 text-zinc-600">
        No existen productos registrados dentro de esta categoría.
      </Text>
    </View>
  );
}

/**
 * Agrega separación vertical entre las filas de productos.
 */
function RowSeparator() {
  return <View style={{ height: GRID_GAP }} />;
}

export default function ManagementProductGrid({
  products,
  onEditProduct,
  onDeleteProduct,
}) {
  /**
   * Ancho interior real de FlatList.
   *
   * No usamos el ancho completo de la pantalla porque la interfaz
   * también contiene:
   *
   * - la barra lateral;
   * - los bordes;
   * - el padding del panel;
   * - el padding de ManagementSection.
   */
  const [listWidth, setListWidth] = useState(0);

  /**
   * Espacio total ocupado por las separaciones de tres columnas.
   *
   * Tres columnas tienen solamente dos espacios:
   *
   * [tarjeta] espacio [tarjeta] espacio [tarjeta]
   */
  const totalHorizontalGap =
    GRID_GAP * (PRODUCT_GRID_COLUMNS - 1);

  /**
   * Divide el ancho utilizable exactamente entre tres tarjetas.
   */
  const cardWidth =
    listWidth > 0
      ? (listWidth - totalHorizontalGap) /
        PRODUCT_GRID_COLUMNS
      : undefined;

  /**
   * Obtiene el ancho real disponible cuando FlatList termina
   * de calcular su layout.
   */
  const handleListLayout = useCallback((event) => {
    const measuredWidth = event.nativeEvent.layout.width;

    setListWidth((currentWidth) => {
      if (currentWidth === measuredWidth) {
        return currentWidth;
      }

      return measuredWidth;
    });
  }, []);

  /**
   * Renderiza una tarjeta con el ancho calculado.
   *
   * useCallback evita crear una función renderItem diferente
   * en cada renderizado de la pantalla.
   */
  const renderProduct = useCallback(
    ({ item }) => {
      const itemStyle = cardWidth
        ? {
            width: cardWidth,
          }
        : {
            flex: 1,
          };

      return (
        <View style={itemStyle}>
          <ManagementProductCard
            product={item}
            onEditProduct={onEditProduct}
            onDeleteProduct={onDeleteProduct}
          />
        </View>
      );
    },
    [
      cardWidth,
      onEditProduct,
      onDeleteProduct,
    ],
  );

  const isEmpty = products.length === 0;

  return (
    <FlatList
      style={{ flex: 1 }}
      data={products}
      numColumns={PRODUCT_GRID_COLUMNS}
      keyExtractor={(product) => product.id}
      renderItem={renderProduct}
      onLayout={handleListLayout}
      showsVerticalScrollIndicator
      ItemSeparatorComponent={RowSeparator}
      ListEmptyComponent={EmptyProductList}
      columnWrapperStyle={{
        gap: GRID_GAP,
      }}
      contentContainerStyle={
        isEmpty
          ? {
              flexGrow: 1,
            }
          : {
              paddingBottom: GRID_GAP,
            }
      }
    />
  );
}