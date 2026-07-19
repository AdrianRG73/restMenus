import { Text, View } from "react-native";

import AvailabilityToggle from "./AvailabilityToggle";
import PriceAmountBox from "./PriceAmountBox";

/**
 * Espacio reservado para la imagen del producto.
 *
 * De momento no recibe source ni renderiza ningún contenido.
 * Su única responsabilidad actual es reservar el área visual.
 *
 * Cuando se implementen imágenes reales, la lógica deberá
 * agregarse exclusivamente dentro de este componente.
 */
function PriceItemImageSlot() {
  return (
    <View className="mr-3 h-9 w-9 shrink-0 overflow-hidden border border-[#4b4540] bg-[#1d1f1e]">
      {/* La imagen del producto se agregará aquí posteriormente. */}
    </View>
  );
}

/**
 * Fila compacta correspondiente a un producto.
 *
 * Responsabilidades:
 * - reservar un espacio para la imagen;
 * - mostrar nombre e inventario;
 * - permitir editar el precio;
 * - permitir modificar la disponibilidad.
 */
export default function PriceItemRow({
  item,
  onToggleAvailability,
  onPriceChange,
  onPriceBlur,
}) {
  const allowsTextPrice =
    Boolean(item.priceLabel) ||
    item.priceText?.toUpperCase().startsWith("M");

  return (
    <View className="h-14 flex-row items-center border-b border-[#2b241f] px-3">
      <PriceItemImageSlot />

      <View className="min-w-0 flex-1 pr-3">
        <Text
          numberOfLines={1}
          className="font-title text-[13px] uppercase text-[#f2e9d0]"
        >
          {item.name}
        </Text>

        <Text
          numberOfLines={1}
          className="mt-[-2px] font-body text-[8px] uppercase tracking-[1.2px] text-zinc-600"
        >
          {item.inventoryLabel}
        </Text>
      </View>

      <PriceAmountBox
        value={item.priceText}
        allowsTextPrice={allowsTextPrice}
        onChangeText={(nextPrice) => {
          onPriceChange(item.id, nextPrice);
        }}
        onBlur={() => {
          onPriceBlur(item.id);
        }}
      />

      <View className="ml-3">
        <AvailabilityToggle
          isActive={item.available}
          onPress={onToggleAvailability}
        />
      </View>
    </View>
  );
}