import { Text, View } from "react-native";

import { calculateOrderTotal } from "../../utils/checkoutTotals";
import { formatCurrency } from "../../utils/formatCurrency";

import CheckoutActions from "./CheckoutActions";
import CheckoutItemRow from "./CheckoutItemRow";

// Componente completo de la mesa

export default function CheckoutTableCard({
  order, // datos de la mesa
  onProcessPayment, // accion de pago
  onPrintTicket, // accion de ticket
}) {
  const total = calculateOrderTotal(order.items); // calcular total

  return (
    <View className="h-[250px] border-2 border-[#2b241f] bg-[#151716]">
      {/* Altura, centrada, padding, color dinamico */}
      <View
        className={`h-12 justify-center px-5 ${order.headerColorClass}`} 
      >
        {/* Nombre de la mesa */}
        <Text className="font-title text-xl uppercase text-white">
          {order.tableName} 
        </Text>
      </View>

      {/* Espacio restante bajo el headder, empuja contenido, padding H y V */}
      <View className="flex-1 justify-between px-5 py-4"> 
        {/* Se recorren los productos de la mesa */}
        <View> 
          {order.items.map((item) => (
            <CheckoutItemRow key={item.id} item={item} />
          ))}

          {/* Linea separadora */}
          <View className="mt-2 h-[1px] bg-[#2b241f]" />
        </View>

        <View className="flex-row gap-4">
          {/* Altura fija, Parte del ancho, borde, fondo, padding */}
          <View className="h-[76px] flex-[0.95] border-2 border-[#d8d0bd] bg-[#f5f0e6] px-4 py-3"> 
            <Text className="font-body text-[9px] uppercase text-zinc-700">
              Total Amount
            </Text>

            <Text className="mt-1 font-title text-3xl text-black">
              {formatCurrency(total)}
            </Text>
          </View>

          {/* Botones */}
          <CheckoutActions
            onProcessPayment={onProcessPayment}
            onPrintTicket={onPrintTicket}
          />
        </View>
      </View>
    </View>
  );
}