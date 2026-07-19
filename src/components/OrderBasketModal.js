import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const MODAL_MAX_WIDTH = 1080;
const MODAL_MAX_HEIGHT = 680;

const MODAL_WIDTH_PERCENTAGE = 0.94;
const MODAL_HEIGHT_PERCENTAGE = 0.9;

const LEFT_COLUMN_FLEX = 1.15;
const RIGHT_COLUMN_FLEX = 0.85;

// Convierte un valor numérico a un precio con dos decimales.

function formatPrice(value) {
  const safeValue =
    typeof value === "number" && Number.isFinite(value) ? value : 0;

  return `$${safeValue.toFixed(2)}`;
}

// Encabezado reutilizable para las dos columnas.
function ModalColumnHeader({ title, onBack }) {
  const hasBackButton = typeof onBack === "function";

  return (
    <View className="h-16 flex-row items-center border-b-2 border-zinc-900 bg-[#f2e9d0]">
      {hasBackButton && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Cerrar detalle de la orden"
          onPress={onBack}
          className="h-full w-20 items-center justify-center border-r border-zinc-900/20 active:bg-zinc-900/10"
        >
          <Text className="font-button text-[10px] uppercase tracking-widest text-zinc-900">
            Atrás
          </Text>
        </Pressable>
      )}

      <View className="flex-1 items-center justify-center px-2">
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
          className="text-center font-title text-[20px] uppercase text-zinc-900"
        >
          {title}
        </Text>
      </View>

      {hasBackButton && <View className="w-20" />}
    </View>
  );
}

// Estado vacío de la lista.
function EmptyOrderMessage() {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <Text className="text-center font-body text-sm uppercase tracking-widest text-zinc-600">
        No hay alimentos en el carrito
      </Text>
    </View>
  );
}

// Imagen individual de un producto.
 
function OrderItemImage({ item }) {
  const productInitial = item.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <View className="h-14 w-14 items-center justify-center overflow-hidden border-2 border-zinc-800 bg-[#f2e9d0]">
      {item.image ? (
        <Image
          source={item.image}
          className="h-12 w-12"
          resizeMode="contain"
        />
      ) : (
        <Text className="font-title text-xl text-zinc-900">
          {productInitial}
        </Text>
      )}
    </View>
  );
}

// Botón reutilizable de los controles de cantidad.
 
function QuantityButton({ label, accessibilityLabel, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      className="h-8 w-10 items-center justify-center border border-zinc-800 active:bg-zinc-900/10"
    >
      <Text className="font-button text-sm text-zinc-900">{label}</Text>
    </Pressable>
  );
}

// Controles para modificar la cantidad de un producto.
function QuantityControls({
  itemId,
  quantity,
  onIncrease,
  onDecrease,
}) {
  return (
    <View className="mt-2 flex-row">
      <QuantityButton
        label="−"
        accessibilityLabel="Disminuir cantidad"
        onPress={() => onDecrease(itemId)}
      />

      <View className="h-8 w-10 items-center justify-center border-y border-zinc-800 bg-white/60">
        <Text className="font-sub text-xs text-zinc-900">
          {quantity}
        </Text>
      </View>

      <QuantityButton
        label="+"
        accessibilityLabel="Aumentar cantidad"
        onPress={() => onIncrease(itemId)}
      />
    </View>
  );
}

// Representa un producto dentro del carrito.

function OrderItemCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const validPrice =
    typeof item.price === "number" && Number.isFinite(item.price)
      ? item.price
      : 0;

  const validQuantity =
    typeof item.quantity === "number" ? item.quantity : 0;

  const itemTotal = validPrice * validQuantity;

  return (
    <View className="min-h-[88px] flex-row items-center border-2 border-zinc-800 bg-white/70 p-3">
      <OrderItemImage item={item} />

      <View className="ml-3 flex-1">
        <Text
          numberOfLines={1}
          className="font-sub text-xs uppercase tracking-widest text-zinc-900"
        >
          {item.name}
        </Text>

        <Text className="mt-1 font-button text-[8px] uppercase tracking-widest text-zinc-500">
          Etapa: En carrito
        </Text>

        <QuantityControls
          itemId={item.id}
          quantity={validQuantity}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      </View>

      <View className="ml-3 items-end self-stretch justify-between">
        <Text className="font-title text-xl text-zinc-900">
          {formatPrice(itemTotal)}
        </Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Eliminar ${item.name}`}
          onPress={() => onRemove(item.id)}
          className="px-1 py-1 active:opacity-60"
        >
          <Text className="font-sub text-[9px] uppercase text-red-700 underline">
            Eliminar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// Lista virtualizada de productos.

function OrderItemList({
  orderItems,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <FlatList
      style={{ flex: 1 }}
      data={orderItems}
      keyExtractor={(item) => String(item.id)}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      overScrollMode="never"
      ListEmptyComponent={EmptyOrderMessage}
      contentContainerStyle={{
        flexGrow: 1,
        gap: 10,
        paddingBottom: 12,
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

// Campo fijo para notas de cocina.

function OrderNotesInput() {
  return (
    <View className="h-28 border-t-2 border-zinc-900 bg-[#f2e9d0] px-4 py-3">
      <Text className="mb-2 font-body text-[9px] uppercase tracking-widest text-zinc-700">
        Notas de la orden
      </Text>

      <TextInput
        multiline
        maxLength={240}
        placeholder="Escribe indicaciones para cocina..."
        placeholderTextColor="#71717a"
        textAlignVertical="top"
        className="flex-1 border-2 border-zinc-900 bg-white/60 px-3 py-2 font-information text-sm text-zinc-900"
      />
    </View>
  );
}

// Bloque de estado reutilizable.

function StatusBlock({
  label,
  title,
  description,
  variant = "warning",
}) {
const badgeClassName =
  variant === "success"
    ? "bg-[#4f6f52] text-white"
    : "bg-[#e5b80b] text-zinc-950";

  return (
    <View className="mb-4">
      <View className="mb-2 flex-row items-center gap-2">
        <Text
          className={`px-3 py-1 font-button text-[8px] uppercase tracking-widest ${badgeClassName}`}
        >
          {label}
        </Text>

        <View className="h-[1px] flex-1 bg-zinc-800/30" />
      </View>

      <View className="border-2 border-zinc-800 bg-white/60 px-4 py-3">
        <Text className="font-sub text-xs uppercase tracking-widest text-zinc-900">
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

// Agrupa los estados de la orden.

function OrderStatusSection({ totalItems }) {
  const preparationDescription =
    totalItems === 1
      ? "1 producto en el carrito"
      : `${totalItems} productos en el carrito`;

  return (
    <>
      <StatusBlock
        label="En preparación"
        title="Alimentos en preparación"
        description={preparationDescription}
      />

      <StatusBlock
        label="Servidos"
        title="Alimentos servidos"
        description="Sin productos servidos"
        variant="success"
      />
    </>
  );
}

// Fila reutilizable del resumen de precios.

function PriceRow({ label, value, isTotal = false }) {
  const labelClassName = isTotal
    ? "font-sub text-sm uppercase tracking-widest text-zinc-900"
    : "font-body text-[10px] uppercase tracking-widest text-zinc-700";

  const valueClassName = isTotal
    ? "font-title text-3xl text-zinc-900"
    : "font-title text-xl text-zinc-900";

  return (
    <View className="mb-2 flex-row items-center justify-between">
      <Text className={labelClassName}>{label}</Text>

      <Text className={valueClassName}>
        {formatPrice(value)}
      </Text>
    </View>
  );
}

// Botón reutilizable para las acciones inferiores.

function OrderActionButton({
  label,
  onPress,
  disabled,
  variant = "secondary",
}) {
  const isPrimary = variant === "primary";

  const containerClassName = isPrimary
    ? "bg-zinc-900"
    : "bg-[#f2e9d0]";

  const textClassName = isPrimary
    ? "text-white"
    : "text-zinc-900";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      onPress={onPress}
      disabled={disabled}
      className={`h-11 flex-1 items-center justify-center border-2 border-zinc-900 ${containerClassName} ${
        disabled ? "opacity-40" : "active:opacity-70"
      }`}
    >
      <Text
        className={`font-button text-[10px] uppercase tracking-widest ${textClassName}`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

// Acciones principales de la orden.

function OrderActions({ hasItems, onClear, onConfirm }) {
  const canClear =
    hasItems && typeof onClear === "function";

  const canConfirm =
    hasItems && typeof onConfirm === "function";

  return (
    <View className="mt-2 flex-row gap-3">
      <OrderActionButton
        label="Vaciar"
        onPress={onClear}
        disabled={!canClear}
      />

      <OrderActionButton
        label="Confirmar"
        onPress={onConfirm}
        disabled={!canConfirm}
        variant="primary"
      />
    </View>
  );
}

// Pie fijo del resumen.

function OrderTotals({
  hasItems,
  orderSubtotal,
  taxAmount,
  orderTotal,
  onClear,
  onConfirm,
}) {
  return (
    <View className=" bg-[#d8a808] px-4 pb-4 pt-3">
      <PriceRow label="Subtotal" value={orderSubtotal} />

      <PriceRow label="IVA" value={taxAmount} />

      <View className="mt-1">
        <PriceRow
          label="Total"
          value={orderTotal}
          isTotal
        />
      </View>

      <OrderActions
        hasItems={hasItems}
        onClear={onClear}
        onConfirm={onConfirm}
      />
    </View>
  );
}

// Columna derecha completa.

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
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 12,
        }}
      >
        <OrderStatusSection totalItems={totalItems} />
      </ScrollView>

      <OrderTotals
        hasItems={hasItems}
        orderSubtotal={orderSubtotal}
        taxAmount={taxAmount}
        orderTotal={orderTotal}
        onClear={onClear}
        onConfirm={onConfirm}
      />
    </View>
  );
}

// Componente principal del modal.
 
export default function OrderBasketModal({
  visible,
  onClose,
  orderItems = [],
  totalItems = 0,
  orderSubtotal = 0,
  taxAmount = 0,
  orderTotal = 0,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
  onConfirm,
}) {
  const { width, height } = useWindowDimensions();

  const modalWidth = Math.min(
    width * MODAL_WIDTH_PERCENTAGE,
    MODAL_MAX_WIDTH,
  );

  const modalHeight = Math.min(
    height * MODAL_HEIGHT_PERCENTAGE,
    MODAL_MAX_HEIGHT,
  );

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      presentationStyle="overFullScreen"
      hardwareAccelerated
      onRequestClose={onClose}
    >
      <SafeAreaView
        edges={["top", "bottom", "left", "right"]}
        className="flex-1 bg-black/60"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1 items-center justify-center px-4 py-4"
        >
          <View
            style={{
              width: modalWidth,
              height: modalHeight,
            }}
            className="overflow-hidden rounded-xl border-2 border-zinc-900 bg-[#f2e9d0]"
          >
            <View className="flex-1 flex-row">
              <View
                style={{ flex: LEFT_COLUMN_FLEX }}
                className="border-r-2 border-zinc-900 bg-[#f2e9d0]"
              >
                <ModalColumnHeader
                  title="Productos pendientes"
                  onBack={onClose}
                />

                <View className="flex-1 px-4 py-3">
                  <OrderItemList
                    orderItems={orderItems}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                    onRemove={onRemove}
                  />
                </View>

                <OrderNotesInput />
              </View>

              <View
                style={{ flex: RIGHT_COLUMN_FLEX }}
                className="bg-[#d8a808]"
              >
                <ModalColumnHeader title="Detalle de la orden" />

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
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}