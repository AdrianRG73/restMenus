import { memo, useCallback } from "react";
import { Image, Pressable, Text, View } from "react-native";

function formatPrice(value) {
  if (typeof value !== "number") {
    return "$0.00";
  }

  return `$${value.toFixed(2)}`;
}

function ProductImage({ image, imageHeight }) {
  return (
    <View
      style={{ height: imageHeight }}
      className="w-full items-center justify-center overflow-hidden"
    >
      {image ? (
        <Image
          source={image}
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="contain"
        />
      ) : (
        <View className="h-full w-full items-center justify-center bg-black/10">
          <Text className="font-body text-xs uppercase text-zinc-700">
            Sin imagen
          </Text>
        </View>
      )}
    </View>
  );
}

function ProductCard({ product, width, height, onAddToOrder }) {
  const isCompactCard = height <= 390 || width <= 270;

  const textClass = product.textClass ?? "text-zinc-900";
  const colorClass = product.colorClass ?? "bg-yellow-500";
  const buttonClass = product.buttonClass ?? "bg-zinc-900";
  const buttonTextClass = product.buttonTextClass ?? "text-white";

  const titleClass = isCompactCard
    ? "text-2xl leading-7"
    : "text-3xl leading-8";

  const imageHeight = isCompactCard
    ? Math.round(height * 0.36)
    : Math.round(height * 0.4);

  const descriptionLines = isCompactCard ? 1 : 2;

  const handleAddToOrder = useCallback(() => {
    onAddToOrder(product);
  }, [onAddToOrder, product]);

  return (
    <View
      style={{
        width,
        height,
        overflow: "hidden",
      }}
      className={`border-2 border-zinc-900 ${colorClass}`}
    >
      <View className="flex-1 p-4">
        <View className="min-h-[62px]">
          <Text
            numberOfLines={2}
            adjustsFontSizeToFit
            minimumFontScale={0.72}
            className={`font-title uppercase ${titleClass} ${textClass}`}
          >
            {product.name}
          </Text>
        </View>

        <ProductImage image={product.image} imageHeight={imageHeight} />

        <View className="flex-1 justify-end">
          <View className="border-t border-zinc-900 pt-3">
            <View className="flex-row items-center justify-between gap-3">
              <Text
                numberOfLines={1}
                className={`flex-1 font-body text-xs uppercase ${textClass}`}
              >
                {product.ingredients || "Ingredientes básicos"}
              </Text>

              <Text className={`font-title text-lg ${textClass}`}>
                {formatPrice(product.price)}
              </Text>
            </View>

            <Text
              numberOfLines={descriptionLines}
              className={`mt-2 font-body text-xs ${textClass}`}
            >
              {product.description ||
                "Producto de prueba para validar el menú."}
            </Text>

            <Pressable
              onPress={handleAddToOrder}
              className={`mt-3 h-10 items-center justify-center ${buttonClass}`}
            >
              <Text
                className={`font-button text-xs uppercase tracking-[1.5px] ${buttonTextClass}`}
              >
                Agregar
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

export default memo(ProductCard);