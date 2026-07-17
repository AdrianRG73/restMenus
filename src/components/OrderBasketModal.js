import {
  Modal,
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  TextInput,
  useWindowDimensions,
} from "react-native";

function formatPrice(value) {
  if (typeof value !== "number") {
    return "$0.00";
  }

  return `$${value.toFixed(2)}`;
}

function LeftColumnHeader({ onClose }) {
  return (
    <View className="relative h-14 items-center justify-center border-b-2 border-zinc-900 bg-[#f2e9d0]">
      <Pressable
        onPress={onClose}
        className="absolute left-0 h-full w-24 items-center justify-center active:opacity-70"
      >
        <Text className="font-button text-[10px] uppercase tracking-widest text-zinc-950">
          Atrás
        </Text>
      </Pressable>

      <Text className="font-title text-2xl uppercase text-zinc-800">
        Productos pendientes
      </Text>
    </View>
  );
}

function RightColumnHeader() {
  return (
    <View className="h-14 items-center justify-center border-b-2 border-zinc-900 bg-[#f2e9d0]">
      <Text className="font-title text-2xl uppercase text-zinc-800">
        Detalle de la orden
      </Text>
    </View>
  );
}

function EmptyOrderMessage() {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <Text className="text-center font-body text-base uppercase tracking-widest text-zinc-700">
        No hay alimentos en el carrito
      </Text>
    </View>
  );
}

function OrderItemImage({ item }) {
  return (
    <View className="h-12 w-12 items-center justify-center border-2 border-zinc-700 bg-[#f2e9d0]">
      {item.image ? (
        <Image source={item.image} className="h-10 w-10" resizeMode="contain" />
      ) : (
        <Text className="font-title text-base uppercase text-zinc-900">
          {item.name.charAt(0)}
        </Text>
      )}
    </View>
  );
}

function QuantityControls({ itemId, quantity, onIncrease, onDecrease }) {
  return (
    <View className="mt-2 flex-row">
      <Pressable
        onPress={() => onDecrease(itemId)}
        className="h-7 w-9 items-center justify-center border border-zinc-800"
      >
        <Text className="font-button text-xs text-zinc-900">−</Text>
      </Pressable>

      <View className="h-7 w-9 items-center justify-center border-y border-zinc-800 bg-white/60">
        <Text className="font-bodyBold text-xs text-zinc-900">{quantity}</Text>
      </View>

      <Pressable
        onPress={() => onIncrease(itemId)}
        className="h-7 w-9 items-center justify-center border border-zinc-800"
      >
        <Text className="font-button text-xs text-zinc-900">+</Text>
      </Pressable>
    </View>
  );
}

function OrderItemCard({ item, onIncrease, onDecrease, onRemove }) {
  const itemTotal = item.price * item.quantity;

  return (
    <View className="min-h-[76px] flex-row items-center border-2 border-zinc-800 bg-white/70 p-2">
      <OrderItemImage item={item} />

      <View className="ml-3 flex-1">
        <Text
          numberOfLines={1}
          className="font-bodyBold text-xs uppercase tracking-widest text-zinc-900"
        >
          {item.name}
        </Text>

        <Text className="mt-1 font-button text-[8px] uppercase tracking-widest text-zinc-500">
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
        <Text className="font-title text-xl text-zinc-900">
          {formatPrice(itemTotal)}
        </Text>

        <Pressable onPress={() => onRemove(item.id)} className="mt-3">
          <Text className="font-bodyBold text-[9px] uppercase text-red-700 underline">
            Eliminar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function OrderItemList({ orderItems, onIncrease, onDecrease, onRemove }) {
  if (orderItems.length === 0) {
    return <EmptyOrderMessage />;
  }

  return (
    <FlatList
      data={orderItems}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        paddingBottom: 12,
        gap: 8,
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

function OrderNotesInput() {
  return (
    <View className="h-24 border-t-2 border-zinc-900 bg-[#f2e9d0] p-3">
      <Text className="mb-1 font-button text-[9px] uppercase tracking-widest text-zinc-700">
        Notas de la orden
      </Text>

      <TextInput
        multiline
        placeholder="Escribe indicaciones para cocina..."
        placeholderTextColor="#71717a"
        textAlignVertical="top"
        className="flex-1 border-2 border-zinc-900 bg-white/60 px-3 py-2 font-body text-sm text-zinc-900"
      />
    </View>
  );
}

function StatusBlock({ label, title, description, variant = "warning" }) {
  const badgeClass =
    variant === "success"
      ? "bg-[#4f6f52] text-white"
      : "bg-yellow-600 text-white";

  return (
    <View className="mb-3">
      <View className="mb-2 flex-row items-center gap-2">
        <Text
          className={`px-3 py-1 font-button text-[8px] uppercase tracking-widest ${badgeClass}`}
        >
          {label}
        </Text>

        <View className="h-[1px] flex-1 bg-zinc-800/30" />
      </View>

      <View className="border-2 border-zinc-800 bg-white/50 px-3 py-2">
        <Text className="font-bodyBold text-xs uppercase tracking-widest text-zinc-900">
          {title}
        </Text>

        {description ? (
          <Text className="mt-1 font-body text-[9px] uppercase text-zinc-500">
            {description}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

function OrderSummaryHeader({ totalItems }) {
  return (
    <View>
      <StatusBlock
        label="En preparación"
        title="Alimentos en preparación"
        description={`${totalItems} producto(s) en el carrito`}
        variant="warning"
      />

      <StatusBlock
        label="Servidos"
        title="Alimentos servidos"
        description="Sin productos servidos"
        variant="success"
      />
    </View>
  );
}

function PriceRow({ label, value, isTotal = false }) {
  return (
    <View className="mb-2 flex-row items-center justify-between">
      <Text
        className={
          isTotal
            ? "font-bodyBold text-sm uppercase tracking-widest text-zinc-900"
            : "font-body text-[9px] uppercase tracking-widest text-zinc-700"
        }
      >
        {label}
      </Text>

      <Text
        className={
          isTotal
            ? "font-title text-2xl text-zinc-900"
            : "font-title text-xl text-zinc-900"
        }
      >
        {formatPrice(value)}
      </Text>
    </View>
  );
}

function OrderActions({ hasItems, onClear, onConfirm }) {
  return (
    <View className="flex-row gap-3">
      <Pressable
        onPress={onClear}
        disabled={!hasItems}
        className={`h-10 flex-1 items-center justify-center border-2 border-zinc-900 bg-[#f2e9d0] ${
          hasItems ? "opacity-100" : "opacity-40"
        }`}
      >
        <Text className="font-button text-[10px] uppercase tracking-widest text-zinc-900">
          Vaciar
        </Text>
      </Pressable>

      <Pressable
        onPress={onConfirm}
        disabled={!hasItems}
        className={`h-10 flex-1 items-center justify-center border-2 border-zinc-900 bg-zinc-900 ${
          hasItems ? "opacity-100" : "opacity-40"
        }`}
      >
        <Text className="font-button text-[10px] uppercase tracking-widest text-white">
          Confirmar
        </Text>
      </Pressable>
    </View>
  );
}

function OrderSummary({
  totalItems,
  orderSubtotal,
  taxAmount,
  orderTotal,
  onClear,
  onConfirm,
}) {
  const hasItems = totalItems > 0;

  return (
    <View className="flex-1 p-3">
      <OrderSummaryHeader totalItems={totalItems} />

      <View className="mt-auto border-t-2 border-zinc-900 pt-3">
        <PriceRow label="Subtotal" value={orderSubtotal} />
        <PriceRow label="IVA" value={taxAmount} />

        <View className="mb-2">
          <PriceRow label="Total" value={orderTotal} isTotal />
        </View>

        <OrderActions
          hasItems={hasItems}
          onClear={onClear}
          onConfirm={onConfirm}
        />
      </View>
    </View>
  );
}

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
  onConfirm,
}) {
  const { width, height } = useWindowDimensions();

  const modalWidth = Math.min(width * 0.86, 940);
  const modalHeight = Math.min(height * 0.78, 560);
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center bg-black/60 px-4 py-3">
        <View
          style={{
            width: modalWidth,
            height: modalHeight,
          }}
          className="overflow-hidden rounded-xl border-2 border-zinc-900 bg-[#f2e9d0]"
        >
          <View className="flex-1 flex-row">
            <View className="flex-[1.12] border-r-2 border-zinc-900 bg-[#f2e9d0]">
              <LeftColumnHeader onClose={onClose} />

              <View className="flex-1 p-3">
                <OrderItemList
                  orderItems={orderItems}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                  onRemove={onRemove}
                />
              </View>

              <OrderNotesInput />
            </View>

            <View className="flex-[0.88] bg-orange-400/80">
              <RightColumnHeader />

              <OrderSummary
                totalItems={totalItems}
                orderSubtotal={orderSubtotal}
                taxAmount={taxAmount}
                orderTotal={orderTotal}
                onClear={onClear}
                onConfirm={onConfirm}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
