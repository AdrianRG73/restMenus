import { ScrollView } from "react-native";
import ProductCard from "./ProductCard";

export default function MenuGrid({ products, onAddToOrder }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-1"
      contentContainerClassName="gap-6 py-6 pr-8"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToOrder={onAddToOrder}
        />
      ))}
    </ScrollView>
  );
}