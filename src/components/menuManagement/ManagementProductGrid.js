import {
  FlatList,
  Image,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useCallback, useState } from "react";

const GRID_GAP = 12;

function getColumnCount(screenWidth) {
  if (screenWidth >= 1180) {
    return 4;
  }

  if (screenWidth >= 900) {
    return 3;
  }

  return 2;
}

function getProductImageSource(product) {
  if (product.imageUri) {
    return {
      uri: product.imageUri,
    };
  }

  return product.image ?? null;
}

function formatPrice(price) {
  const numericPrice = Number(price);

  if (!Number.isFinite(numericPrice)) {
    return "$0.00";
  }

  return `$${numericPrice.toFixed(2)}`;
}

function ManagementProductCard({ product }) {
  const imageSource = getProductImageSource(product);
  const isUnavailable = product.available === false;

  return (
    <View className="h-44 overflow-hidden border-2 border-[#2b241f] bg-[#111312]">
      <View className="h-24 border-b-2 border-[#2b241f] bg-[#0d0f0e]">
        {imageSource ? (
          <Image
            source={imageSource}
            resizeMode="contain"
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
          {formatPrice(product.price)}
        </Text>
      </View>
    </View>
  );
}

function EmptyProductList() {
  return (
    <View className="flex-1 items-center justify-center border-2 border-dashed border-[#2b241f] bg-[#111312] px-6">
      <Text className="font-title text-xl uppercase text-[#f2e9d0]">
        Sin productos
      </Text>

      <Text className="mt-2 max-w-[420px] text-center font-body text-xs leading-5 text-zinc-600">
        No existen productos registrados dentro de esta categoría.
      </Text>
    </View>
  );
}

function RowSeparator() {
  return <View style={{ height: GRID_GAP }} />;
}

export default function ManagementProductGrid({ products }) {
  const { width: screenWidth } = useWindowDimensions();
  const [listWidth, setListWidth] = useState(0);

  const columnCount = getColumnCount(screenWidth);

  const availableGapsWidth = GRID_GAP * (columnCount - 1);

  const cardWidth =
    listWidth > 0
      ? (listWidth - availableGapsWidth) / columnCount
      : undefined;

  const handleListLayout = useCallback((event) => {
    const measuredWidth = event.nativeEvent.layout.width;

    setListWidth(measuredWidth);
  }, []);

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
          <ManagementProductCard product={item} />
        </View>
      );
    },
    [cardWidth],
  );

  const isEmpty = products.length === 0;

  return (
    <FlatList
      key={`management-product-grid-${columnCount}`}
      data={products}
      numColumns={columnCount}
      keyExtractor={(product) => product.id}
      renderItem={renderProduct}
      onLayout={handleListLayout}
      showsVerticalScrollIndicator
      ItemSeparatorComponent={RowSeparator}
      ListEmptyComponent={EmptyProductList}
      columnWrapperStyle={
        columnCount > 1
          ? {
              gap: GRID_GAP,
            }
          : undefined
      }
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