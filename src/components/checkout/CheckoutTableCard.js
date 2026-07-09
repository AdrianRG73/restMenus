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
    <View className="h-[250px] border-2 border-[#2b241f] bg-[#151716]"> {/* Altura fija, borde grueso, colores de fondo y borde */}
      {/* Header de color */}
      <View
        className={`h-12 justify-center px-5 ${order.headerColorClass}`} // Altura, centrada, padding, color dinamico
      >
        <Text className="font-title text-xl uppercase text-white">
          {order.tableName} {/* Nombre de la mesa */}
        </Text>
      </View>

      {/* Contenido */}
      <View className="flex-1 justify-between px-5 py-4"> {/* Espacio restante bajo el headder, empuja contenido, padding H y V */}
        <View> 
          {order.items.map((item) => ( // Se recorren los productos de la mesa
            <CheckoutItemRow key={item.id} item={item} />
          ))}

          <View className="mt-2 h-[1px] bg-[#2b241f]" /> {/* Linea separadora */}
        </View>

        <View className="flex-row gap-4">
          {/* Caja blanca del total */}
          <View className="h-[76px] flex-[0.95] border-2 border-[#d8d0bd] bg-[#f5f0e6] px-4 py-3"> {/* Altura fija, Parte del ancho, borde, fondo, padding */}
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