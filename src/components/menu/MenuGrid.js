import { FlatList, View } from "react-native";
import ProductCard from "./ProductCard";

export default function MenuGrid({
  products,
  columns,
  cardWidth,
  cardHeight,
  gap,
  onAddToOrder,
}) {
  return (
    <FlatList
      key={`grid-${columns}`}
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={columns}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 24,
        paddingBottom: 120,
      }}
      renderItem={({ item, index }) => {
        const columnIndex = index % columns;
        const isLastColumn = columnIndex === columns - 1;

        return (
          <View
            style={{
              marginRight: isLastColumn ? 0 : gap,
              marginBottom: gap,
            }}
          >
            <ProductCard
              product={item}
              width={cardWidth}
              height={cardHeight}
              onAddToOrder={onAddToOrder}
            />
          </View>
        );
      }}
    />
  );
}