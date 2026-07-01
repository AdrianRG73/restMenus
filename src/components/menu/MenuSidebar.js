import { View, Text, Pressable } from "react-native";

export default function MenuSidebar({
  width,
  categories,
  selectedCategoryId,
  onSelectCategory,
}) {
  // Renderizar la barra lateral con las categorías y un botón de pedido
  return (
    <View
      style={{ width }}
      className="bg-zinc-950 border-r-2 border-yellow-500 items-center justify-between py-6"
    >
      <View className="gap-8 items-center">
        {categories.map((category) => {
          const isActive = selectedCategoryId === category.id;

          // Renderizar cada categoría como un botón presionable con ícono y nombre
          return (
            <Pressable
              key={category.id}
              onPress={() => onSelectCategory(category.id)}
              className="items-center justify-center active:opacity-70"
            >
              <Text className="text-2xl">{category.icon}</Text>

              {/* Mostrar el nombre de la categoría con estilo condicional según si está activa o no */}
              <Text
                className={`mt-2 text-[9px] font-black tracking-widest uppercase ${
                  isActive ? "text-yellow-400" : "text-zinc-500"
                }`}
              >
                {category.name}
              </Text>
            </Pressable>
          );
        })}
      </View>

        {/* Botón de pedido flotante en la barra lateral */}
      <View className="w-12 h-12 rounded-full bg-yellow-400 items-center justify-center">
        <Text className="text-zinc-950 font-black">🧾</Text>
      </View>
    </View>
  );
}