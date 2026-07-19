import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import PriceItemRow from "./PriceItemRow";

/**
 * Indicador visual del estado del panel.
 *
 * Muestra:
 * - "−" cuando el contenido está visible.
 * - "+" cuando el contenido está contraído.
 *
 * Se mantiene como componente separado para evitar llenar
 * el encabezado principal con detalles visuales.
 */
function CollapseIndicator({ isExpanded }) {
  return (
    <View className="ml-2 h-5 w-5 items-center justify-center border border-white/70 bg-black/15">
      <Text className="font-button text-[11px] leading-none text-white">
        {isExpanded ? "−" : "+"}
      </Text>
    </View>
  );
}

/**
 * Panel correspondiente a una categoría.
 *
 * Responsabilidades:
 * - mostrar el nombre de la categoría;
 * - calcular el número de productos;
 * - permitir contraer o expandir sus productos;
 * - renderizar cada PriceItemRow;
 * - reenviar las acciones de precio y disponibilidad.
 */
export default function PriceCategoryPanel({
  category,
  onToggleItemAvailability,
  onChangeItemPrice,
  onBlurItemPrice,
}) {
  /**
   * Estado exclusivamente visual del panel.
   *
   * No pertenece al producto ni necesita guardarse en los datos.
   * Cada instancia de PriceCategoryPanel controla su propio estado.
   */
  const [isExpanded, setIsExpanded] = useState(true);

  const itemCount = category.items.length;

  const itemCountLabel = `${itemCount} ${
    itemCount === 1 ? "ITEM" : "ITEMS"
  }`;

  /**
   * Invierte el estado actual:
   *
   * true  -> false
   * false -> true
   */
  function handleTogglePanel() {
    setIsExpanded((currentValue) => !currentValue);
  }

  return (
    <View className="flex-1 overflow-hidden border-2 border-[#2b241f] bg-[#151716]">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${
          isExpanded ? "Contraer" : "Expandir"
        } categoría ${category.title}`}
        accessibilityState={{ expanded: isExpanded }}
        onPress={handleTogglePanel}
        style={({ pressed }) => ({
          opacity: pressed ? 0.82 : 1,
        })}
        className={`h-9 flex-row items-center justify-between px-3 ${category.headerColorClass}`}
      >
        <Text
          numberOfLines={1}
          className="min-w-0 flex-1 font-title text-[13px] uppercase text-white"
        >
          {category.title}
        </Text>

        <View className="ml-3 flex-row items-center">
          <Text className="font-button text-[8px] uppercase tracking-[1.2px] text-white">
            {itemCountLabel}
          </Text>

          <CollapseIndicator isExpanded={isExpanded} />
        </View>
      </Pressable>

      {isExpanded ? (
        <View>
          {category.items.map((item) => (
            <PriceItemRow
              key={item.id}
              item={item}
              onToggleAvailability={() => {
                onToggleItemAvailability(category.id, item.id);
              }}
              onPriceChange={(itemId, nextPrice) => {
                onChangeItemPrice(
                  category.id,
                  itemId,
                  nextPrice,
                );
              }}
              onPriceBlur={(itemId) => {
                onBlurItemPrice(category.id, itemId);
              }}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}