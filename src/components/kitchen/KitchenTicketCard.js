import { Pressable, Text, View } from "react-native";
import { KITCHEN_STATUS } from "../../data/kitchenTickets";
import KitchenTicketItem from "./KitchenTicketItem";

// Definir los colores de fondo para cada estado del ticket
const cardColorByStatus = {
  pending: "bg-[#f3b5ca]",
  preparing: "bg-[#f7df8f]",
  ready: "bg-[#c7dde1]",
};

export default function KitchenTicketCard({
  ticket,
  onBeginPrep,
  onCompleteTicket,
  onRecallTicket,
  onServeAndClear,
  onToggleItemCompleted,
}) {
  const cardColorClass = cardColorByStatus[ticket.status]; // Obtener el color de fondo correspondiente al estado del ticket

  // Determinar el estado del ticket
  const isPending = ticket.status === KITCHEN_STATUS.PENDING;
  const isPreparing = ticket.status === KITCHEN_STATUS.PREPARING;
  const isReady = ticket.status === KITCHEN_STATUS.READY;

  return (
    <View
      className={`border-2 border-zinc-950 p-5 shadow-lg ${cardColorClass}`}
    >
      <View className="mb-2 flex-row items-start justify-between">
        <View>
            {/* Mostrar el ID del ticket */}
          <Text className="text-[10px] font-black uppercase tracking-wider text-zinc-950">
            TICKET #{ticket.id}
          </Text>

            {/* Mostrar el título del ticket */}
          <Text
            className="mt-1 text-2xl font-black uppercase text-zinc-950"
            numberOfLines={1}
          >
            {ticket.title}
          </Text>
        </View>

        {/* Mostrar el tiempo del ticket con color según el estado */}
        <Text
          className={`text-xl font-black ${
            isPreparing ? "text-red-700" : "text-zinc-950"
          }`}
        >
          {ticket.time} 
        </Text>
      </View>

      <View className="mb-3 h-[2px] bg-zinc-950/15" />

          {/* Renderizar los elementos del ticket utilizando el componente KitchenTicketItem */}
      <View>
        {ticket.items.map((item) => (
            // Renderizar cada elemento del ticket con el componente KitchenTicketItem
          <KitchenTicketItem
            key={item.id}
            item={item}
            ticketStatus={ticket.status}
            onToggleCompleted={() =>
              onToggleItemCompleted(ticket.id, item.id)
            }
          />
        ))}
      </View>

        {/* Mostrar la nota del ticket si existe */}
      {!!ticket.note && (
        <View className="mt-4 bg-black/10 px-3 py-2">
          <Text className="text-[10px] font-black uppercase italic tracking-wider text-zinc-950">
            * {ticket.note}
          </Text>
        </View>
      )}

      {/* Renderizar botones de acción según el estado del ticket */}
      {isPending && (
        <Pressable
          onPress={() => onBeginPrep(ticket.id)}
          className="mt-5 h-12 items-center justify-center bg-black"
        >
          <Text className="text-sm font-black uppercase tracking-wide text-white">
            EN PREPARACION
          </Text>
        </Pressable>
      )}

      {isPreparing && (
        <Pressable
          onPress={() => onCompleteTicket(ticket.id)}
          className="mt-5 h-12 items-center justify-center bg-black"
        >
          <Text className="text-sm font-black uppercase tracking-wide text-white">
            LISTO PARA SERVIR
          </Text>
        </Pressable>
      )}

      {isReady && (
        <View className="mt-5 flex-row gap-3">
          <Pressable
            onPress={() => onRecallTicket(ticket.id)}
            className="h-12 flex-1 items-center justify-center border-2 border-zinc-950"
          >
            <Text className="text-xs font-black uppercase text-zinc-950">
              REGRESAR A COCINA
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onServeAndClear(ticket.id)}
            className="h-12 flex-[2] items-center justify-center bg-black"
          >
            <Text className="text-xs font-black uppercase tracking-wide text-white">
                SERVIR
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}