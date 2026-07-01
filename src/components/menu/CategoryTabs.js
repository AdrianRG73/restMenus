import { ScrollView, Pressable, Text } from "react-native";

// Componente de pestañas de categorías para el menú de productos
export default function CategoryTabs({
  categories,
  selectedCategoryId,
  onSelectCategory,
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="max-h-16"
      contentContainerClassName="gap-3 py-4"
    >
      {/* Renderizar cada categoría como un botón presionable */}

      {categories.map((category) => {
        const isActive = selectedCategoryId === category.id;

        return (
          // Botón presionable para seleccionar la categoría
          <Pressable
            key={category.id}
            onPress={() => onSelectCategory(category.id)}
            className={`px-5 py-3 border-2 active:opacity-70 ${
              isActive
                ? "bg-zinc-950 border-zinc-950"
                : "bg-transparent border-zinc-900"
            }`}
          >

            {/* Mostrar el nombre de la categoría con estilo condicional según si está activa o no */}

            <Text
              className={`text-xs font-black uppercase tracking-widest ${
                isActive ? "text-yellow-400" : "text-zinc-950"
              }`}
            >
              {category.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}