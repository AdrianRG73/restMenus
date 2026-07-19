import { Pressable, View } from "react-native";

/**
 * Interruptor visual que activa o desactiva un producto.
 *
 * El componente no almacena estado propio.
 * Recibe isActive desde PriceDashboardScreen y comunica
 * la pulsación mediante onPress.
 */
export default function AvailabilityToggle({
  isActive,
  onPress,
}) {
  const trackClassName = isActive
    ? "border-[#70843c] bg-[#70843c]"
    : "border-[#3d4654] bg-[#3d4654]";

  const knobClassName = isActive
    ? "self-end bg-[#d8d0bd]"
    : "self-start bg-[#8d98a6]";

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: isActive }}
      accessibilityLabel={
        isActive
          ? "Producto disponible"
          : "Producto no disponible"
      }
      onPress={onPress}
      hitSlop={8}
      className={`h-6 w-10 justify-center border-2 px-[2px] ${trackClassName}`}
    >
      <View className={`h-4 w-4 ${knobClassName}`} />
    </Pressable>
  );
}