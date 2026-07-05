import { memo, useCallback } from "react";
import { View, Text, Image, Pressable } from "react-native";

// Componente de tarjeta de producto para mostrar la información del producto y permitir agregarlo al pedido
function ProductCard({ product, width, height, onAddToOrder }) { // Calcular la altura de la imagen según la altura de la tarjeta
  const imageHeight = height <= 320 ? 95 : 130;

  // Función para manejar el evento de agregar el producto al pedido, utilizando useCallback para memorizar la función y evitar re-renderizados innecesarios
  const handleAddToOrder = useCallback(() => {
    onAddToOrder(product);
  }, [onAddToOrder, product]);

  return (
    // Contenedor principal de la tarjeta de producto con estilo condicional según el color de la categoría del producto
    <View
      style={{
        width,
        height,
        overflow: "hidden",
      }}
      // Aplicar clases de estilo condicional según el color de la categoría del producto
      className={`border-2 border-zinc-900 p-4 ${product.colorClass}`}
    >
      {/* Header */}
      <View className="flex-row justify-between items-start gap-2">
        {/* Mostrar el nombre del producto con estilo condicional según el color de la categoría del producto */}
        <Text
          numberOfLines={2}
          adjustsFontSizeToFit
          className={`flex-1 text-center  text-2xl font-black uppercase leading-7 ${product.textClass}`}
        >
          {product.name}
        </Text>
      </View>

      {/* Imagen del producto */}
      <View className="flex-1 items-center justify-center">
        {product.image && (
          <Image
            source={product.image}
            style={{
              width: "80%",
              height: imageHeight,
            }}
            resizeMode="contain"
          />
        )}
      </View>

      {/* Footer */}
      <View>
        <View className={`h-[2px] ${product.lineClass} mb-3 opacity-80`} />

        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1 pr-3">
            {/* Mostrar los ingredientes y la descripción del producto con estilo condicional según el color de la categoría del producto */}
            <Text
              numberOfLines={1}
              className={`text-[8px] font-black uppercase tracking-widest ${product.textClass}`}
            >
              {product.ingredients}
            </Text>

            <Text
              numberOfLines={2}
              className={`text-[10px] italic mt-1 leading-3 ${product.textClass}`}
            >
              {product.description}
            </Text>
          </View>

          {/* Mostrar el precio del producto con estilo condicional según el color de la categoría del producto */}
          <Text className={`text-base font-black ${product.textClass}`}>
            ${product.price}
          </Text>
        </View>

        {/* Botón para agregar el producto al pedido con estilo condicional según el color de la categoría del producto */}
        <Pressable
          onPress={handleAddToOrder}
          className={`h-9 items-center justify-center border border-transparent active:opacity-70 ${product.buttonClass}`}
        >
          {/* Mostrar el texto del botón con estilo condicional según el color de la categoría del producto */}
          <Text
            className={`text-[9px] font-black tracking-widest uppercase ${product.buttonTextClass}`}
          >
            Agregar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
// Exportar el componente ProductCard utilizando memo para evitar re-renderizados innecesarios cuando las props no cambian
export default memo(ProductCard);