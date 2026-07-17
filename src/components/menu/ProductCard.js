import { memo, useCallback } from "react";
import { Image, Pressable, Text, View } from "react-native";

function formatPrice(value) {
  if (typeof value !== "number") {
    return "$0.00";
  }

  return `$${value.toFixed(2)}`;
}

function ProductImage({ image, imageWidth, imageHeight }) {
  return (
    <View
      style={{
        width: imageWidth,
        height: imageHeight,
      }}
      className="self-center overflow-hidden border border-zinc-900 bg-black/10"
    >
      {image ? (
        <Image
          source={image}
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
        />
      ) : (
        <View className="h-full w-full items-center justify-center">
          <Text className="font-body text-[9px] uppercase text-zinc-700">
            Sin imagen
          </Text>
        </View>
      )}
    </View>
  );
}

function ProductCard({ product, width, height, onAddToOrder }) {
  const textClass = product.textClass ?? "text-zinc-900";
  const colorClass = product.colorClass ?? "bg-yellow-500";
  const buttonClass = product.buttonClass ?? "bg-zinc-900";
  const buttonTextClass = product.buttonTextClass ?? "text-white";

  const cardPadding = 10;

  const imageWidth = Math.round(width - cardPadding * 2 - 8);
  const imageHeight = Math.round(imageWidth * 0.92);

  const bottomSectionMinHeight = Math.round(height * 0.32);

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
      <View
        style={{
          padding: cardPadding,
        }}
        className="flex-1"
      >
        {/* Título en una sola línea */}
        <View className="h-[38px] justify-center">
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.48}
            className={`font-title text-[25px] uppercase leading-[28px] ${textClass}`}
          >
            {product.name}
          </Text>
        </View>

        {/* Imagen */}
        <ProductImage
          image={product.image}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
        />

        {/* Información inferior */}
        <View
          style={{
            minHeight: bottomSectionMinHeight,
          }}
          className="mt-3 justify-between border-t border-zinc-900 pt-3"
        >
          <View>
            <View className="flex-row items-start justify-between gap-2">
              <Text
                numberOfLines={2}
                className={`flex-1 font-bodyBold text-[10px] uppercase leading-4 ${textClass}`}
              >
                {product.ingredients || "Ingredientes básicos"}
              </Text>

              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
                className={`font-title text-[22px] leading-[24px] ${textClass}`}
              >
                {formatPrice(product.price)}
              </Text>
            </View>

            <Text
              numberOfLines={2}
              className={`mt-2 font-information text-[10px] leading-4 ${textClass}`}
            >
              {product.description ||
                "Producto de prueba para validar el rendimiento del menú."}
            </Text>
          </View>

          <Pressable
            onPress={handleAddToOrder}
            className={`mt-3 h-10 items-center justify-center ${buttonClass}`}
          >
            <Text
              className={`font-button text-[10px] uppercase tracking-[1.5px] ${buttonTextClass}`}
            >
              Agregar
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default memo(ProductCard);