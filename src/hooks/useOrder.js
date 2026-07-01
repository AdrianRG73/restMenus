import { useCallback, useMemo, useState } from "react";

// Definir la tasa de impuestos como una constante
const TAX_RATE = 0.16;

// Función para crear un nuevo elemento de pedido a partir de un producto, inicializando la cantidad en 1
function createOrderItem(product) {
  return {
    ...product,
    quantity: 1,
  };
}
// Función para actualizar la cantidad de un elemento de pedido, sumando el cambio de cantidad a la cantidad actual
function updateItemQuantity(orderItem, quantityChange) {
  return {
    ...orderItem,
    quantity: orderItem.quantity + quantityChange,
  };
}
// Hook personalizado para manejar el estado del pedido y las operaciones relacionadas
export function useOrder() {
  const [orderItems, setOrderItems] = useState([]);
  // Función para agregar un producto al pedido, verificando si ya existe y actualizando la cantidad en consecuencia
  const addProductToOrder = useCallback((product) => {
    setOrderItems((currentItems) => {
      const productAlreadyExists = currentItems.some(
        (item) => item.id === product.id
      );

      if (!productAlreadyExists) {
        return [...currentItems, createOrderItem(product)];
      }

      return currentItems.map((item) =>
        item.id === product.id ? updateItemQuantity(item, 1) : item
      );
    });
  }, []);

  // Función para aumentar la cantidad de un producto en el pedido
  const increaseProductQuantity = useCallback((productId) => {
    setOrderItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? updateItemQuantity(item, 1) : item
      )
    );
  }, []);

  // Función para disminuir la cantidad de un producto en el pedido, eliminándolo si la cantidad llega a cero
  const decreaseProductQuantity = useCallback((productId) => {
    setOrderItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId ? updateItemQuantity(item, -1) : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  // Función para eliminar un producto del pedido
  const removeProductFromOrder = useCallback((productId) => {
    setOrderItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }, []);

  // Función para limpiar todos los productos del pedido
  const clearOrder = useCallback(() => {
    setOrderItems([]);
  }, []);

  // Calcular el total de artículos, subtotal, impuestos y total del pedido utilizando useMemo para optimizar el rendimiento
  const totalItems = useMemo(() => {
    return orderItems.reduce((total, item) => total + item.quantity, 0);
  }, [orderItems]);

  // Calcular el subtotal del pedido sumando el precio de cada producto multiplicado por su cantidad
  const orderSubtotal = useMemo(() => {
    return orderItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }, [orderItems]);

  // Calcular el monto de impuestos basado en el subtotal y la tasa de impuestos
  const taxAmount = useMemo(() => {
    return orderSubtotal * TAX_RATE;
  }, [orderSubtotal]);

  // Calcular el total del pedido sumando el subtotal y los impuestos
  const orderTotal = useMemo(() => {
    return orderSubtotal + taxAmount;
  }, [orderSubtotal, taxAmount]);

  // Determinar si hay elementos en el pedido para mostrar u ocultar la barra lateral del pedido
  const hasOrderItems = orderItems.length > 0;

  return {
    orderItems,
    totalItems,
    orderSubtotal,
    taxAmount,
    orderTotal,
    hasOrderItems,
    addProductToOrder,
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductFromOrder,
    clearOrder,
  };
}