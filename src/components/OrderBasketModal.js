import {
  Modal,
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  TextInput,
} from "react-native";

function formatPrice(value) {
  return `$${value.toFixed(2)}`; // Formato de precio con dos decimales y símbolo
}

// Componente para mostrar el encabezado de la columna izquierda
function LeftColumnHeader({ onClose }) {
  return (
    //se usa h-16 para mantener la altura consistente con el encabezado de la columna derecha
    <View className="relative h-16 items-center justify-center border-b-2 border-zinc-900 bg-[#f2e9d0]">
      <Pressable
        onPress={onClose}
        className="absolute left-0 h-full w-24 items-center justify-center active:opacity-70" // Ajusta el ancho del botón a la izquierda sin afectar el centrado del título
      >
        <Text className="text-xs font-black uppercase tracking-widest text-zinc-950">
          Atrás
        </Text>
      </Pressable>

      <Text className="text-xl uppercase tracking-widest text-zinc-800">
        Productos pendientes
      </Text>
    </View>
  );
}

// Componente para mostrar el encabezado de la columna derecha
function RightColumnHeader() {
  return (
    //se usa h-16 para mantener la altura consistente con el encabezado de la columna izquierda
    <View className="h-16 items-center justify-center border-b-2 border-zinc-900 bg-[#f2e9d0]">
      <Text className="text-xl uppercase tracking-widest text-zinc-800">
        Detalle de la orden
      </Text>
    </View>
  );
}

// Componente para mostrar un mensaje cuando no hay productos en el carrito
function EmptyOrderMessage() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg uppercase tracking-widest text-zinc-700">
        No hay alimentos en el carrito
      </Text>
    </View>
  );
}

// Componente para mostrar la imagen del producto en el carrito
function OrderItemImage({ item }) {
  return (
    <View className="h-16 w-16 items-center justify-center border-2 border-zinc-700 bg-[#f2e9d0]">
      {item.image ? (
        <Image
          source={item.image}
          className="h-12 w-12"
          resizeMode="contain"
        />
      ) : (
        <Text className="text-lg font-black">{item.name.charAt(0)}</Text>
      )}
    </View>
  );
}

//Controla la cantidad de cada producto en el carrito y permite aumentar o disminuir la cantidad
function QuantityControls({ itemId, quantity, onIncrease, onDecrease }) {
  return (
    <View className="mt-3 flex-row">
      <Pressable
        onPress={() => onDecrease(itemId)} // Llama a la función onDecrease con el ID del producto cuando se presiona el botón de disminuir
        className="h-8 w-10 items-center justify-center border border-zinc-800"
      >
        <Text className="font-black">−</Text>
      </Pressable>

      <View className="h-8 w-10 items-center justify-center border-y border-zinc-800">
        <Text className="font-black">{quantity}</Text>
      </View>

      <Pressable
        onPress={() => onIncrease(itemId)} // Llama a la función onIncrease con el ID del producto cuando se presiona el botón de aumentar
        className="h-8 w-10 items-center justify-center border border-zinc-800"
      >
        <Text className="font-black">+</Text>
      </Pressable>
    </View>
  );
}

// Cada componeente de la lista de productos en el carrito
function OrderItemCard({ item, onIncrease, onDecrease, onRemove }) {
  const itemTotal = item.price * item.quantity; // Calcular el total del producto (precio * cantidad)

  return (
    <View className="min-h-24 flex-row items-center border-2 border-zinc-800 bg-white/70 p-4">
      <OrderItemImage item={item} />

      <View className="ml-4 flex-1">
        <Text numberOfLines={1} className="text-lg uppercase tracking-widest">
          {item.name}
        </Text>

        <Text className="mt-1 text-[10px] uppercase tracking-widest text-zinc-500">
          Etapa: En carrito
        </Text>

        <QuantityControls
          itemId={item.id}
          quantity={item.quantity}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      </View>

      <View className="items-end">
        <Text className="text-base font-black">{formatPrice(itemTotal)}</Text>

        <Pressable onPress={() => onRemove(item.id)} className="mt-8">
          <Text className="text-[10px] font-black uppercase text-red-700 underline">
            Eliminar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// Componente para mostrar la lista de productos en el carrito
function OrderItemList({ orderItems, onIncrease, onDecrease, onRemove }) {
  if (orderItems.length === 0) {
    return <EmptyOrderMessage />; // Mostrar mensaje cuando no hay productos en el carrito
  }

  return ( // Renderizar la lista de productos en el carrito
    <FlatList
      data={orderItems}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        paddingBottom: 24,
        gap: 16,
      }}
      renderItem={({ item }) => (
        <OrderItemCard
          item={item}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onRemove={onRemove}
        />
      )}
    />
  );
}

// Componente para ingresar notas adicionales para la orden fuera de la FlatList para que este fijo
function OrderNotesInput() {
  return (
    <View className="border-t-2 border-zinc-900 bg-[#f2e9d0] p-4">
      <Text className="mb-2 text-[10px] font-black uppercase tracking-widest text-zinc-700">
        Notas de la orden
      </Text>

      <TextInput
        multiline
        placeholder="Escribe indicaciones para cocina..."
        placeholderTextColor="#71717a"
        textAlignVertical="top"
        className="min-h-20 border-2 border-zinc-900 bg-white/60 px-4 py-3 text-sm text-zinc-900"
      />
    </View>
  );
}

function OrderSummaryHeader({ totalItems }) {
  return (
    <View className="mb-8">
      <View className="mb-4 flex-row items-center gap-4">
        <Text className="bg-yellow-600 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white">
          En preparación
        </Text>

        <View className="h-[1px] flex-1 bg-zinc-800/30" />
      </View>

      <View className="border-2 border-zinc-800 bg-white/50 p-4">
        <Text className="text-sm uppercase tracking-widest">
          Alimentos en preparación
        </Text>

        <Text className="mt-1 text-[10px] uppercase text-zinc-500">
          {totalItems} producto(s) en el carrito
        </Text>
      </View>
    </View>
  );
}

// Este componente evita repetir tres veces la misma estructura
function PriceRow({ label, value, isTotal = false }) {
  return (
    <View className="mb-4 flex-row justify-between">
      <Text
        className={
          isTotal
            ? "text-xl uppercase tracking-widest"
            : "text-[10px] uppercase tracking-widest text-zinc-700"
        }
      >
        {label}
      </Text>

      <Text className={isTotal ? "text-2xl font-black" : "font-black"}>
        {formatPrice(value)}
      </Text>
    </View>
  );
}

// Boton Vaciar y confirmar
function OrderActions({ hasItems, onClear }) {
  return (
    <View className="flex-row gap-3">
      <Pressable
        onPress={onClear}
        disabled={!hasItems} // Para no confirmar o vaciar una orden vacia
        className={`h-12 flex-1 items-center justify-center border-2 border-zinc-900 ${
          hasItems ? "opacity-100" : "opacity-40" // Si no hay productos se desactivan
        }`}
      >
        <Text className="text-xs font-black uppercase tracking-widest">
          Vaciar
        </Text>
      </Pressable>

      <Pressable
        disabled={!hasItems}
        className={`h-12 flex-1 items-center justify-center bg-zinc-900 ${
          hasItems ? "opacity-100" : "opacity-40"
        }`}
      >
        <Text className="text-xs font-black uppercase tracking-widest text-white">
          Confirmar
        </Text>
      </Pressable>
    </View>
  );
}

// Muestra el detalle del pedido a la derecha
function OrderSummary({
  totalItems,
  orderSubtotal,
  taxAmount,
  orderTotal,
  onClear,
}) {
  const hasItems = totalItems > 0;

  return (
    // Columna principal
    <View className="flex-1 p-6"> 
      <OrderSummaryHeader totalItems={totalItems} />

      <View className="mt-auto">
        <PriceRow label="Subtotal" value={orderSubtotal} />
        <PriceRow label="IVA" value={taxAmount} />

        <View className="mb-4">
          <PriceRow label="Total" value={orderTotal} isTotal />
        </View>

        <OrderActions hasItems={hasItems} onClear={onClear} />
      </View>
    </View>
  );
}

// Organiza la pantalla
export default function OrderBasketModal({
  visible,
  onClose,
  orderItems,
  totalItems,
  orderSubtotal,
  taxAmount,
  orderTotal,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
}) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center bg-black/60 p-6">
        <View className="h-full max-h-[700px] w-full max-w-[1100px] overflow-hidden rounded-xl border-2 border-zinc-900 bg-[#f2e9d0]">
          <View className="flex-1 flex-row">
            <View className="flex-1 border-r-2 border-zinc-900 bg-[#f2e9d0]">
              <LeftColumnHeader onClose={onClose} />

              <View className="flex-1 p-6">
                <OrderItemList
                  orderItems={orderItems}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                  onRemove={onRemove}
                />
              </View>

              <OrderNotesInput />
            </View>

            <View className="flex-1 bg-orange-400/80">
              <RightColumnHeader />

              <OrderSummary
                totalItems={totalItems}
                orderSubtotal={orderSubtotal}
                taxAmount={taxAmount}
                orderTotal={orderTotal}
                onClear={onClear}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}