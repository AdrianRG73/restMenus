import { View, Text } from "react-native";

// Componente para mostrar estadísticas de la cocina
export default function KitchenStats({ label, value }) {
  return (
    <View className="min-w-[72px] items-center">
      <Text className="text-[10px] font-black uppercase tracking-widest text-[#c9931a]">
        {label}
      </Text>
        {/* Mostrar el valor de la estadística */}
      <Text className="text-2xl font-black text-zinc-100">{value}</Text>
    </View>
  );
}