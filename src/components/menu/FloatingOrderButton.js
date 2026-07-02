import { View, Text, Pressable } from "react-native";

// Componente de botón flotante para mostrar el pedido
export default function FloatingOrderButton({ totalItems, onPress }) {
  return (
    // Botón flotante en la esquina inferior derecha de la pantalla
    <Pressable
      onPress={onPress}
      className="absolute bottom-6 right-6 h-30 w-30 items-center bg-zinc-900 active:opacity-80"
    >
      {/* Contenido del botón flotante con ícono y texto */}

      <View className="flex-row items-center gap-3">
        <Text className="text-yellow-400 text-xl">🧾</Text>

        {/* Contenedor para mostrar el número de productos en el pedido */}

        <View>
          <Text className="text-yellow-400 text-[10px] font-black uppercase tracking-widest">
            Orden
          </Text>

          {/* Mostrar el número de productos en el pedido con estilo condicional según la cantidad */}

          <Text className="text-white text-xs font-bold">
            {totalItems} producto{totalItems === 1 ? "" : "s"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
