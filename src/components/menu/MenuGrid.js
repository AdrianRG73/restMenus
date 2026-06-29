import { FlatList, View } from "react-native";
import ProductCard from "./ProductCard";

export default function MenuGrid({
  products,
  columns,
  cardWidth,
  cardHeight,
  onAddToOrder,
}) {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={columns}
      showsVerticalScrollIndicator={false}
      initialNumToRender={6}
      maxToRenderPerBatch={6}
      updateCellsBatchingPeriod={50}
      windowSize={5}
      removeClippedSubviews={true}
      contentContainerStyle={{
        paddingTop: 24,
        paddingBottom: 120,
      }}
      columnWrapperStyle={
        columns > 1
          ? {
              gap: 16,
            }
          : undefined
      }
      renderItem={({ item }) => (
        <View
          style={{
            width: cardWidth,
            height: cardHeight,
            marginBottom: 16,
          }}
        >
          <ProductCard
            product={item}
            width={cardWidth}
            height={cardHeight}
            onAddToOrder={onAddToOrder}
          />
        </View>
      )}
    />
  );
}