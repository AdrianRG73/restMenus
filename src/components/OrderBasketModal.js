import { Modal, View, Text, Pressable, FlatList, Image } from "react-native";

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

export default function OrderBasketModal({
  visible,
  onClose,
  order,
  totalItems,
  totalPrice,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
}) {
  const tax = totalPrice * 0.16;
  const finalTotal = totalPrice + tax;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/60 items-center justify-center p-6">
        <View className="w-full h-full max-w-[1100px] max-h-[700px] overflow-hidden rounded-xl border-2 border-zinc-900 bg-[#c8eed9]">
          {/* Header */}
          <View className="h-16 flex-row border-b-2 border-zinc-900">
            <View className="flex-1 flex-row items-center px-6">
              <Pressable onPress={onClose} className="px-3 py-2">
                <Text className="text-xs font-black uppercase tracking-widest">
                    Atrás
                </Text>
              </Pressable>

              <Text className="ml-12 text-xl uppercase tracking-widest">
                Productos pendientes
              </Text>
            </View>

            <View className="flex-1 items-center justify-center border-l-2 border-zinc-900">
              <Text className="text-xl uppercase tracking-widest">
                Detalle de la orden
              </Text>
            </View>
          </View>

          {/* Body */}
          <View className="flex-1 flex-row">
            {/* Left side */}
            <View className="flex-1 p-6">
              {order.length === 0 ? (
                <View className="flex-1 items-center justify-center">
                  <Text className="text-zinc-700 text-lg uppercase tracking-widest">
                    No hay alimentos en el carrito
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={order}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingBottom: 24,
                    gap: 16,
                  }}
                  renderItem={({ item }) => (
                    <View className="min-h-24 flex-row items-center border-2 border-zinc-800 bg-white/70 p-4">
                      <View className="h-16 w-16 items-center justify-center border-2 border-zinc-700 bg-[#eee5c8]">
                        {item.image ? (
                          <Image
                            source={item.image}
                            className="h-12 w-12"
                            resizeMode="contain"
                          />
                        ) : (
                          <Text className="text-lg font-black">
                            {item.name.charAt(0)}
                          </Text>
                        )}
                      </View>

                      <View className="ml-4 flex-1">
                        <Text
                          numberOfLines={1}
                          className="text-lg uppercase tracking-widest"
                        >
                          {item.name}
                        </Text>

                        <Text className="mt-1 text-[10px] uppercase tracking-widest text-zinc-500">
                          Etapa: En carrito
                        </Text>

                        <View className="mt-3 flex-row">
                          <Pressable
                            onPress={() => onDecrease(item.id)}
                            className="h-8 w-10 items-center justify-center border border-zinc-800"
                          >
                            <Text className="font-black">−</Text>
                          </Pressable>

                          <View className="h-8 w-10 items-center justify-center border-y border-zinc-800">
                            <Text className="font-black">{item.quantity}</Text>
                          </View>

                          <Pressable
                            onPress={() => onIncrease(item.id)}
                            className="h-8 w-10 items-center justify-center border border-zinc-800"
                          >
                            <Text className="font-black">+</Text>
                          </Pressable>
                        </View>
                      </View>

                      <View className="items-end">
                        <Text className="text-base font-black">
                          {formatPrice(item.price * item.quantity)}
                        </Text>

                        <Pressable
                          onPress={() => onRemove(item.id)}
                          className="mt-8"
                        >
                          <Text className="text-[10px] font-black uppercase text-red-700 underline">
                            Eliminar
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  )}
                />
              )}
            </View>

            {/* Right side */}
            <View className="flex-1 border-l-2 border-zinc-900 bg-orange-400/80 p-6">
              <View className="mb-8">
                <View className="mb-4 flex-row items-center gap-4">
                  <Text className="bg-yellow-600 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white">
                    En preparacion
                  </Text>
                  <View className="h-[1px] flex-1 bg-zinc-800/30" />
                </View>

                <View className="border-2 border-zinc-800 bg-white/50 p-4">
                  <Text className="text-sm uppercase tracking-widest">
                    Alimentos en preparación
                  </Text>
                  <Text className="mt-1 text-[10px] uppercase text-zinc-500">
                    {totalItems} Producto(s) en el carrito
                  </Text>
                </View>
              </View>

              <View className="mt-auto">
                <View className="mb-4 flex-row justify-between">
                  <Text className="text-[10px] tracking-widest text-zinc-700">
                    SUBTOTAL
                  </Text>
                  <Text className="font-black">{formatPrice(totalPrice)}</Text>
                </View>

                <View className="mb-8 flex-row justify-between">
                  <Text className="text-[10px] tracking-widest text-zinc-700">
                    IVA
                  </Text>
                  <Text className="font-black">{formatPrice(tax)}</Text>
                </View>

                <View className="mb-8 flex-row justify-between">
                  <Text className="text-xl tracking-widest">
                    TOTAL
                  </Text>
                  <Text className="text-2xl font-black">
                    {formatPrice(finalTotal)}
                  </Text>
                </View>

                <View className="flex-row gap-3">
                  <Pressable
                    onPress={onClear}
                    className="h-12 flex-1 items-center justify-center border-2 border-zinc-900"
                  >
                    <Text className="text-xs font-black uppercase tracking-widest">
                      Vaciar
                    </Text>
                  </Pressable>

                  <Pressable className="h-12 flex-1 items-center justify-center bg-zinc-900">
                    <Text className="text-xs font-black uppercase tracking-widest text-white">
                      Confirmar
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
