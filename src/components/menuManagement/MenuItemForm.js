import {
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

/**
 * Muestra el título de un campo del formulario.
 *
 * `optional` agrega la indicación "Opcional" sin repetir
 * esa estructura en cada campo.
 */
function FormLabel({
  children,
  optional = false,
}) {
  return (
    <View className="mb-1 flex-row items-center">
      <Text className="font-button text-[10px] uppercase tracking-[1px] text-zinc-400">
        {children}
      </Text>

      {optional ? (
        <Text className="ml-2 font-body text-[9px] text-zinc-600">
          Opcional
        </Text>
      ) : null}
    </View>
  );
}

/**
 * Campo reutilizable del formulario.
 *
 * `multiline` cambia su altura y alinea el texto en la parte
 * superior cuando se utiliza como descripción.
 */
function FormTextInput({
  placeholder,
  keyboardType,
  multiline = false,
  disabled = false,
}) {
  const heightClassName = multiline
    ? "h-14"
    : "h-9";

  return (
    <TextInput
      editable={!disabled}
      multiline={multiline}
      keyboardType={keyboardType}
      textAlignVertical={multiline ? "top" : "center"}
      placeholder={placeholder}
      placeholderTextColor="#52525b"
      className={`${heightClassName} border-2 border-[#2b241f] bg-[#111312] px-3 py-1 font-body text-sm text-[#f2e9d0]`}
    />
  );
}

/**
 * Formulario visual para crear un nuevo producto.
 *
 * La parte superior contiene los campos.
 * La parte inferior contiene acciones que nunca deben comprimirse.
 */
export default function MenuItemForm({
  selectedCategoryName,
  onCancel,
}) {
  return (
    <View className="flex-1 justify-between">
      {/*
       * flexShrink permite que este bloque reduzca su espacio
       * antes de expulsar los botones fuera del panel.
       */}
      <View style={{ flexShrink: 1 }}>
        {/* Primera fila */}
        <View className="flex-row gap-3">
          <View className="flex-1">
            <FormLabel>Nombre</FormLabel>

            <FormTextInput placeholder="Nombre del producto" />
          </View>

          <View className="flex-1">
            <FormLabel optional>
              Nombre en inglés
            </FormLabel>

            <FormTextInput placeholder="English product name" />
          </View>
        </View>

        {/* Segunda fila */}
        <View className="mt-2 flex-row gap-3">
          <View className="w-[140px]">
            <FormLabel>Precio</FormLabel>

            <FormTextInput
              placeholder="0.00"
              keyboardType="decimal-pad"
            />
          </View>

          <View className="flex-1">
            <FormLabel>Categoría</FormLabel>

            <View className="h-9 justify-center border-2 border-[#2b241f] bg-[#111312] px-3">
              <Text
                numberOfLines={1}
                className="font-body text-sm text-zinc-500"
              >
                {selectedCategoryName || "Sin categoría"}
              </Text>
            </View>
          </View>

          <View className="w-[180px]">
            <FormLabel>Imagen</FormLabel>

            <Pressable
              disabled
              accessibilityRole="button"
              accessibilityState={{ disabled: true }}
              className="h-9 items-center justify-center border-2 border-zinc-700 bg-zinc-800 opacity-50"
            >
              <Text className="font-button text-[10px] uppercase tracking-[1px] text-zinc-500">
                Seleccionar imagen
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Descripción */}
        <View className="mt-2">
          <FormLabel optional>
            Descripción
          </FormLabel>

          <FormTextInput
            multiline
            placeholder="Descripción del producto"
          />
        </View>
      </View>

      {/*
       * flexShrink: 0 impide que los botones sean comprimidos
       * o expulsados por los campos superiores.
       */}
      <View
        style={{ flexShrink: 0 }}
        className="mt-3 flex-row justify-end gap-3 border-t-2 border-[#2b241f] pt-3"
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Cancelar nuevo producto"
          onPress={onCancel}
          className="h-9 min-w-[120px] items-center justify-center border-2 border-[#3b3024] active:opacity-70"
        >
          <Text className="font-button text-[10px] uppercase tracking-[2px] text-[#f2e9d0]">
            Cancelar
          </Text>
        </Pressable>

        <Pressable
          disabled
          accessibilityRole="button"
          accessibilityState={{ disabled: true }}
          className="h-9 min-w-[170px] items-center justify-center border-2 border-[#d8a808] bg-[#d8a808] opacity-50"
        >
          <Text className="font-button text-[10px] uppercase tracking-[2px] text-[#171311]">
            Guardar producto
          </Text>
        </Pressable>
      </View>
    </View>
  );
}