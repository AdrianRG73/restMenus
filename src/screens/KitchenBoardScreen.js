import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { kitchenColumns } from "../data/kitchenTickets";
import { useKitchenBoard } from "../hooks/useKitchenBoard";

import KitchenHeader from "../components/kitchen/KitchenHeader";
import KitchenColumn from "../components/kitchen/KitchenColumn";
import KitchenTicketCard from "../components/kitchen/KitchenTicketCard";

// Componente principal de la pantalla del tablero de cocina
export default function KitchenBoardScreen() {
  const {
    stats,
    getTicketsByStatus,
    beginPrep,
    completeTicket,
    recallTicket,
    serveAndClear,
    toggleItemCompleted,
  } = useKitchenBoard();

  // Renderizar la pantalla del tablero de cocina
  return (
    <SafeAreaView className="flex-1 bg-[#0b1118]">
      <View className="flex-1 border border-[#1f2833] bg-[#0f151c]">
        {/* Renderizar el encabezado de la cocina con las estadísticas */}
        <KitchenHeader stats={stats} />

        {/* Renderizar las columnas de la cocina con los tickets correspondientes */}
        <View className="flex-1 flex-row gap-8 px-6 py-6">
          {kitchenColumns.map((column) => {
            const columnTickets = getTicketsByStatus(column.id);

            return (
              <KitchenColumn
                key={column.id}
                title={column.title}
                tickets={columnTickets}
              >
                {columnTickets.map((ticket) => (
                  <KitchenTicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onBeginPrep={beginPrep}
                    onCompleteTicket={completeTicket}
                    onRecallTicket={recallTicket}
                    onServeAndClear={serveAndClear}
                    onToggleItemCompleted={toggleItemCompleted}
                  />
                ))}
              </KitchenColumn>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}