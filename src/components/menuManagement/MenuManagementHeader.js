import { Pressable, Text, View } from "react-native";

export default function MenuManagementHeader({
  onStartNewProduct,
  isAddButtonDisabled = false,
}) {
  const addButtonClassName = isAddButtonDisabled
    ? "border-zinc-700 bg-zinc-800 opacity-50"
    : "border-[#d8a808] bg-[#d8a808]";

  const addButtonTextClassName = isAddButtonDisabled
    ? "text-zinc-500"
    : "text-[#171311]";

  return (
    <View className="h-16 flex-row items-center justify-between border-b-2 border-[#2b241f] bg-[#111312] px-5">
      <View className="flex-1 pr-6">
        <Text
          numberOfLines={1}
          className="font-title text-2xl uppercase text-[#f2e9d0]"
        >
          Gestión del menú
        </Text>

        <Text
          numberOfLines={1}
          className="mt-[-2px] font-body text-[9px] uppercase tracking-[3px] text-zinc-600"
        >
          Administración · Productos y categorías
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Crear un nuevo producto"
        disabled={isAddButtonDisabled}
        onPress={onStartNewProduct}
        className={`h-10 min-w-[180px] items-center justify-center border-2 px-5 ${addButtonClassName}`}
      >
        <Text
          className={`font-button text-xs uppercase tracking-[2px] ${addButtonTextClassName}`}
        >
          + Nuevo producto
        </Text>
      </Pressable>
    </View>
  );
}