// src/components/menu/MenuGrid.js
import { ScrollView } from "react-native";
import ProductCard from "./ProductCard";

export default function MenuGrid({
  products,
  cardWidth,
  cardHeight,
  gap,
  onAddToOrder,
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-1"
      contentContainerStyle={{
        paddingTop: 24,
        paddingBottom: 96,
        paddingRight: 32,
        gap,
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          width={cardWidth}
          height={cardHeight}
          onAddToOrder={onAddToOrder}
        />
      ))}
    </ScrollView>
  );
}