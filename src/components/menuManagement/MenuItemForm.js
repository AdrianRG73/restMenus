import { Pressable, Text, TextInput, View } from "react-native";

function FormLabel({ children, optional = false }) {
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

function FormTextInput({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  multiline,
  disabled = false,
}) {
  const inputHeightClassName = multiline
  ? "h-20 py-2"
  : "h-10 py-2";

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      editable={!disabled}
      multiline={multiline}
      keyboardType={keyboardType}
      textAlignVertical={multiline ? "top" : "center"}
      placeholder={placeholder}
      placeholderTextColor="#52525b"
      className={`border-2 border-[#2b241f] bg-[#111312] px-3 font-body text-sm text-[#f2e9d0] ${inputHeightClassName}`}
    />
  );
}

export default function MenuItemForm({ selectedCategoryName, onCancel }) {
  return (
    <View>
      <View className="py-2 flex-row gap-4">
        <View className="flex-1">
          <FormLabel>Nombre</FormLabel>

          <FormTextInput placeholder="Nombre del producto" />
        </View>

        <View className="flex-1">
          <FormLabel optional>Nombre en inglés</FormLabel>

          <FormTextInput placeholder="English product name" />
        </View>
      </View>

      <View className="mt-3 flex-row gap-4">
        <View className="w-[150px]">
          <FormLabel>Precio</FormLabel>

          <FormTextInput placeholder="0.00" keyboardType="decimal-pad" />
        </View>

        <View className="flex-1">
          <FormLabel>Categoría</FormLabel>

          <View className="h-10 justify-center border-2 border-[#2b241f] bg-[#111312] px-3">
            <Text numberOfLines={1} className="font-body text-sm text-zinc-500">
              {selectedCategoryName || "Sin categoría"}
            </Text>
          </View>
        </View>

        <View className="w-[190px]">
          <FormLabel>Imagen</FormLabel>

          <Pressable
            disabled
            accessibilityRole="button"
            className="h-10 items-center justify-center border-2 border-zinc-700 bg-zinc-800 opacity-50"
          >
            <Text className="font-button text-[10px] uppercase tracking-[1px] text-zinc-500">
              Seleccionar imagen
            </Text>
          </Pressable>
        </View>
      </View>

      <View className="mt-3">
        <FormLabel optional>Descripción</FormLabel>

        <FormTextInput multiline placeholder="Descripción del producto" />
      </View>

      <View className="mt-4 flex-row justify-end gap-3">
        <Pressable
          onPress={onCancel}
          className="h-9 min-w-[120px] items-center justify-center border-2 border-[#3b3024] bg-transparent"
        >
          <Text className="font-button text-[10px] uppercase tracking-[2px] text-[#f2e9d0]">
            Cancelar
          </Text>
        </Pressable>

        <Pressable
          disabled
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