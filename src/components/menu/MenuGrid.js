import { useMemo } from "react";
import { FlatList, View } from "react-native";

import ProductCard from "./ProductCard";

const PRODUCTS_PER_COLUMN = 1;

function groupProductsByColumn(products, itemsPerColumn) {
  const groupedProducts = [];

  for (let index = 0; index < products.length; index += itemsPerColumn) {
    groupedProducts.push(products.slice(index, index + itemsPerColumn));
  }

  return groupedProducts;
}

export default function MenuGrid({
  products,
  cardWidth,
  cardHeight,
  gap,
  onAddToOrder,
}) {
  const productColumns = useMemo(() => {
    return groupProductsByColumn(products, PRODUCTS_PER_COLUMN);
  }, [products]);

  return (
    <FlatList
      horizontal
      data={productColumns}
      keyExtractor={(productColumn) =>
        productColumn.map((product) => product.id).join("-")
      }
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      className="flex-1"
      snapToInterval={cardWidth + gap}
      decelerationRate="fast"
      contentContainerStyle={{
        paddingTop: 24,
        paddingBottom: 24,
        paddingRight: 32,
      }}
      ItemSeparatorComponent={() => <View style={{ width: gap }} />}
      renderItem={({ item: productColumn }) => (
        <View style={{ width: cardWidth }}>
          {productColumn.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              width={cardWidth}
              height={cardHeight}
              onAddToOrder={onAddToOrder}
            />
          ))}
        </View>
      )}
    />
  );
}