import { Pressable, Text, View } from "react-native";
import KitchenStats from "./KitchenStats";

// Componente de encabezado para la pantalla de cocina
export default function KitchenHeader({ stats }) {
  return (
    <View className="h-[72px] flex-row items-center justify-between border-b border-[#202833] bg-[#0d1218] px-5">
      <View className="flex-row items-center gap-8">
        <View className="border-r border-[#27313d] pr-8">
          <Text className="text-2xl font-black uppercase tracking-tight text-[#d19a21]">
            ORDENES PENDIENTES
          </Text>
        </View>

        <View className="flex-row gap-5">
          <KitchenStats label="Pendientes" value={stats.pending} />
          <KitchenStats label="EN PROCESO" value={stats.active} />
          <KitchenStats label="LISTAS" value={stats.ready} />
        </View>
      </View>

        {/* Contenedor para los botones de búsqueda y menú en la esquina superior derecha */}
      <View className="flex-row gap-3">
        <Pressable className="h-11 w-11 items-center justify-center border border-[#202833] bg-[#101821]">
          <Text className="text-2xl font-black text-[#d19a21]">⌕</Text>
        </Pressable>

        <Pressable className="h-11 w-11 items-center justify-center border border-[#202833] bg-[#101821]">
          <Text className="text-2xl font-black text-[#d19a21]">≡</Text>
        </Pressable>
      </View>
    </View>
  );
}