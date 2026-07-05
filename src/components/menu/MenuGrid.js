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
    // Renderizar un FlatList para mostrar los productos en un grid con el número de columnas especificado
    <FlatList
      data={products} 
      keyExtractor={(item) => item.id}
      numColumns={columns}
      showsVerticalScrollIndicator={false} 
      initialNumToRender={6} // Renderizar inicialmente 6 elementos
      maxToRenderPerBatch={6} // Renderizar un máximo de 6 elementos por lote
      updateCellsBatchingPeriod={50} // Actualizar las celdas cada 50 ms
      windowSize={5} // Mantener 5 ventanas de elementos renderizados
      removeClippedSubviews={true} // Eliminar sub-vistas recortadas

      // Estilos para el contenedor del FlatList y las columnas del grid
      contentContainerStyle={{
        paddingTop: 24,
        paddingBottom: 24,
      }}
      // Estilos para el contenedor de cada fila del grid, agregando un espacio entre columnas si hay más de una columna
      columnWrapperStyle={
        columns > 1
          ? {
              gap: 16,
            }
          : undefined
      }
      // Renderizar cada producto como un ProductCard dentro de un contenedor con el tamaño especificado
      renderItem={({ item }) => (
        <View
          style={{
            width: cardWidth,
            height: cardHeight,
            marginBottom: 16,
          }}
        >
          {/* Renderizar el ProductCard con el producto, tamaño y función para agregar al pedido */}
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