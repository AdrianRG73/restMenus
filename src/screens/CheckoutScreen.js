import { Alert, // Funcion temporal al presionar botones
  FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CheckoutHeader from "../components/checkout/CheckoutHeader";
import CheckoutTableCard from "../components/checkout/CheckoutTableCard";

import { checkoutOrders } from "../data/checkoutOrders";
import { calculateOrderTotal } from "../utils/checkoutTotals";
import { formatCurrency } from "../utils/formatCurrency";

const CHECKOUT_COLUMN_COUNT = 2; // 2 columnas

// Funcion para que no se rompa cuando haya una cantidad impar de mesas
function createTwoColumnGridData(items) {
  const hasIncompleteLastRow = items.length % CHECKOUT_COLUMN_COUNT !== 0; // usando % 

  // para pares
  if (!hasIncompleteLastRow) {
    return items;
  }

  // para impares
  return [
    ...items,
    {
      id: "checkout-placeholder",
      isPlaceholder: true,
    },
  ];
}

// alerta temporal al presionar un boton
function showCheckoutActionAlert(actionLabel, order) {
  const total = calculateOrderTotal(order.items);

  Alert.alert(
    actionLabel,
    `${order.tableName}\nTotal: ${formatCurrency(total)}`
  );
}

// Renderiza la pantalla
export default function CheckoutScreen() {
  const gridData = createTwoColumnGridData(checkoutOrders); // Toma de ordenes

  // Logica de boton refresh
  const handleRefresh = () => {
    Alert.alert("Refresh", "Refresh");
  };

  // proceso de pago
  const handleProcessPayment = (order) => {
    showCheckoutActionAlert("Process Payment", order);
  };

  // Ticket
  const handlePrintTicket = (order) => {
    showCheckoutActionAlert("Print Ticket", order);
  };

  // Render principal
  return (
    <SafeAreaView className="flex-1 bg-[#111312]">
      <CheckoutHeader onRefresh={handleRefresh} />

      <FlatList
        key={CHECKOUT_COLUMN_COUNT} // se reconstruye si cambian las columnas
        data={gridData} // datos apra dibujar
        numColumns={CHECKOUT_COLUMN_COUNT} // 2 columnas
        keyExtractor={(item) => item.id} //identificares 
        showsVerticalScrollIndicator={false} // oculta barra de scroll 
        contentContainerStyle={{ // espaciados entre tarjetas
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 28,
        }}
        columnWrapperStyle={{
          gap: 20,
          marginBottom: 20,
        }}
        // Funcion para dibujar las tarjetas
        renderItem={({ item }) => {
          if (item.isPlaceholder) {
            return <View className="flex-1" />; // Deja espacio en blanco si hay numero impar de tarjetas
          }

          return (
            <View className="flex-1"> {/* Usar el mismo ancho */}
              <CheckoutTableCard
                order={item}
                onProcessPayment={() => handleProcessPayment(item)} // Mesa especifica para las acciones de los botones, es necesario pasar el id
                onPrintTicket={() => handlePrintTicket(item)}
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}