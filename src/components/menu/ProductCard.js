import { View, Text, Image, Pressable } from "react-native";

export default function ProductCard({
  product,
  width,
  height,
  onAddToOrder,
}) {
  const imageHeight = height > 430 ? 170 : 130;

  return (
    <View
      style={{ width, height }}
      className={`border-2 border-zinc-900 p-4 justify-between ${product.colorClass}`}
    >
      <View>
        <View className="flex-row justify-between items-start gap-2">
          <Text
            numberOfLines={2}
            adjustsFontSizeToFit
            className={`flex-1 text-2xl font-black uppercase ${product.textClass}`}
          >
            {product.name}
          </Text>

          <Text className="bg-zinc-900 text-white text-[8px] font-black px-2 py-1">
            EST. {product.year}
          </Text>
        </View>

        <Image
          source={product.image}
          style={{
            width: "100%",
            height: imageHeight,
          }}
          className="mt-8"
          resizeMode="contain"
        />
      </View>

      <View>
        <View className="h-[2px] bg-zinc-900 mb-4 opacity-80" />

        <View className="flex-row justify-between items-start">
          <View className="flex-1 pr-3">
            <Text
              numberOfLines={1}
              className={`text-[9px] font-black uppercase tracking-widest ${product.textClass}`}
            >
              {product.ingredients}
            </Text>

            <Text
              numberOfLines={2}
              className={`text-[11px] italic mt-2 leading-4 ${product.textClass}`}
            >
              {product.description}
            </Text>
          </View>

          <Text className={`text-lg font-black ${product.textClass}`}>
            ${product.price}
          </Text>
        </View>

        <Pressable
          onPress={() => onAddToOrder(product)}
          className={`mt-4 py-3 items-center active:scale-95 ${product.buttonClass}`}
        >
          <Text
            className={`text-[10px] font-black tracking-widest uppercase ${product.buttonTextClass}`}
          >
            Agregar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}