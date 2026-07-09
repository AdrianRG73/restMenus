import { Text, View } from "react-native";

import { formatCurrency } from "../../utils/formatCurrency";

// Calcula los totales por linea de cada productos
export default function CheckoutItemRow({ item }) {
  const lineTotal = item.quantity * item.price;

  return (
    <View className="mb-3 flex-row items-center justify-between">
      <Text
        numberOfLines={1} // Evita que se muestre un nombre muy largo
        className="flex-1 pr-4 font-body text-[11px] uppercase text-[#c8c0ad]" // Ocupa todo el espacio antes del precio
      >
        {item.quantity}X {item.name}
      </Text>

      <Text className="font-bodyBold text-[11px] text-white"> 
        {formatCurrency(lineTotal)}
      </Text>
    </View>
  );
}