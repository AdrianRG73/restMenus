import { Pressable, Text, View } from "react-native";

export default function KitchenTicketItem({
  item,
  ticketStatus,
  onToggleCompleted,
}) {
  const canToggle = ticketStatus !== "ready";

  return (
    // Contenedor principal del elemento del ticket
    <Pressable
      disabled={!canToggle} // Deshabilitar la interacción si el ticket está listo
      onPress={onToggleCompleted} // Llamar a la función onToggleCompleted al presionar el elemento
      className="flex-row items-center justify-between border-b border-black/5 py-2"
    >
      <View className="flex-1 flex-row items-center gap-2">
        {/* Mostrar la cantidad y el nombre del producto según si está completado o no */}
        <Text
          className={`text-sm font-black uppercase text-zinc-950 ${
            item.completed ? "line-through opacity-40" : ""
          }`}
        >
          {item.quantity}X
        </Text>

        <Text
          className={`flex-1 text-sm font-black uppercase text-zinc-950 ${
            item.completed ? "line-through opacity-40" : ""
          }`}
          numberOfLines={1}
        >
          {item.name}
        </Text>
      </View>

          {/* Mostrar un indicador de completado si el elemento está marcado como completado */}
      <View className="h-4 w-4 items-center justify-center border border-zinc-800">
        {item.completed && (
          <Text className="text-[10px] font-black text-zinc-900">✓</Text>
        )}
      </View>
    </Pressable>
  );
}