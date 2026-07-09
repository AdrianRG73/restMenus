import { Pressable, Text, View } from "react-native";

// Boton individual, con dos estilos para 2 botones diferentes verde y gris
function CheckoutButton({ label, variant = "primary", onPress }) {
  const buttonClass =
    variant === "primary"
      ? "bg-[#007c5c] border-[#00684e]"
      : "bg-[#43536a] border-[#344255]";

  return (
    <Pressable
      onPress={onPress}
      className={`h-[38px] items-center justify-center border ${buttonClass}`} // Altura fija, centrada, bordes, color variable
    >
      <Text className="font-button text-[9px] uppercase tracking-[1.5px] text-white">
        {label}
      </Text>
    </Pressable>
  );
}

// Funciones de los botones
export default function CheckoutActions({ onProcessPayment, onPrintTicket }) {
  return (
    <View className="flex-1 gap-2">
      <CheckoutButton
        label="PROCESS PAYMENT"
        variant="primary"
        onPress={onProcessPayment}
      />

      <CheckoutButton
        label="PRINT TICKET"
        variant="secondary"
        onPress={onPrintTicket}
      />
    </View>
  );
}