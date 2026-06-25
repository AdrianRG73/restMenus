import { View, Text, Image, Pressable } from "react-native";

export default function ProductCard({
  product,
  width,
  height,
  onAddToOrder,
}) {
  const imageHeight = height <= 320 ? 95 : 130;

  return (
    <View
      style={{
        width,
        height,
        overflow: "hidden",
      }}
      className={`border-2 border-zinc-900 p-4 ${product.colorClass}`}
    >
      {/* Header */}
      <View className="flex-row justify-between items-start gap-2">
        <Text
          numberOfLines={2}
          adjustsFontSizeToFit
          className={`flex-1 text-2xl font-black uppercase leading-7 ${product.textClass}`}
        >
          {product.name}
        </Text>

        <Text className="bg-zinc-900 text-white text-[8px] font-black px-2 py-1">
          EST. {product.year}
        </Text>
      </View>

      {/* Imagen */}
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
        <View className="h-[2px] bg-zinc-900 mb-3 opacity-80" />

        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1 pr-3">
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

          <Text className={`text-base font-black ${product.textClass}`}>
            ${product.price}
          </Text>
        </View>

        <Pressable
          onPress={() => onAddToOrder(product)}
          className={`h-9 items-center justify-center border border-transparent active:opacity-70 ${product.buttonClass}`}
        >
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