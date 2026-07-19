import { Text, TextInput, View } from "react-native";

/**
 * Campo controlado para editar el precio de un producto.
 *
 * Un campo controlado recibe su valor desde el componente padre.
 * Cada cambio se comunica mediante onChangeText.
 *
 * Esto garantiza que el valor mostrado y el almacenado en el estado
 * siempre sean el mismo.
 */
export default function PriceAmountBox({
  value,
  onChangeText,
  onBlur,
  allowsTextPrice = false,
}) {
  const currentValue = value ?? "";

  const normalizedValue = currentValue.toUpperCase();

  const showsCurrencySymbol =
    normalizedValue !== "M" && normalizedValue !== "MP";

  return (
    <View className="h-9 w-24 flex-row items-center border border-[#d8d0bd] bg-[#f5f0e6] px-2">
      {showsCurrencySymbol && (
        <Text className="font-body text-[10px] text-black">
          $
        </Text>
      )}

      <TextInput
        value={currentValue}
        onChangeText={onChangeText}
        onBlur={onBlur}
        keyboardType={allowsTextPrice ? "default" : "decimal-pad"}
        autoCapitalize="characters"
        autoCorrect={false}
        selectTextOnFocus
        maxLength={8}
        className="h-full flex-1 p-0 text-center font-title text-[15px] text-black"
      />
    </View>
  );
}