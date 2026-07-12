import { memo, useCallback } from "react";
import { View, Text, Image, Pressable } from "react-native";

// Componente de tarjeta de producto para mostrar la información del producto y permitir agregarlo al pedido
function ProductCard({ product, width, height, onAddToOrder }) {
  // Calcular la altura de la imagen según la altura de la tarjeta
  const imageHeight = Math.round(height * 0.5);
  const headerHeight = 68;

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
  className={`border-2 border-zinc-900 p-4 ${product.colorClass}`}
>
  {/* Encabezado con altura fija */}
<View
  style={{ height: headerHeight }}
  className="flex-row items-start justify-between gap-2"
>
  <Text
    numberOfLines={2}
    className={`flex-1 font-title text-3xl uppercase leading-8 ${product.textClass}`}
  >
    {product.name}
  </Text>

</View>

{/* Imagen con dimensiones iguales */}
<View
  style={{
    height: imageHeight,
  }}
  className="w-full items-center justify-center overflow-hidden"
>
  {product.image && (
    <Image
      source={product.image}
      style={{
        width: "100%",
        height: "100%",
      }}
      resizeMode="cover"
    />
  )}
</View>

  {/* Contenido inferior */}
<View className="flex-1 justify-end">
  {/* Línea, información y descripción */}
  <View className="border-t border-zinc-900 pt-3">
    <View className="flex-row items-center justify-between">
      <Text
        className={`font-text text-base uppercase ${product.textClass}`}
      >
        Ingredientes básicos
      </Text>

      <Text
        className={`font-title text-base ${product.textClass}`}
      >
        ${product.price}
      </Text>
    </View>

    <Text
      numberOfLines={2}
      className={`font-information text-base ${product.textClass}`}
    >
      {product.description}
    </Text>
  </View>

  {/* Botón */}
  <Pressable
    onPress={() => onAddToOrder(product)}
    className={`mt-4 h-10 items-center justify-center ${product.buttonClass}`}
  >
    <Text
      className={`font-button text-lg uppercase ${product.buttonTextClass}`}
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
