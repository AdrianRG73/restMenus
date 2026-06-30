import { useCallback, useMemo, useState } from "react";

const TAX_RATE = 0.16;

function createOrderItem(product) {
  return {
    ...product,
    quantity: 1,
  };
}

function updateItemQuantity(orderItem, quantityChange) {
  return {
    ...orderItem,
    quantity: orderItem.quantity + quantityChange,
  };
}

export function useOrder() {
  const [orderItems, setOrderItems] = useState([]);

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

  const increaseProductQuantity = useCallback((productId) => {
    setOrderItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? updateItemQuantity(item, 1) : item
      )
    );
  }, []);

  const decreaseProductQuantity = useCallback((productId) => {
    setOrderItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId ? updateItemQuantity(item, -1) : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeProductFromOrder = useCallback((productId) => {
    setOrderItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }, []);

  const clearOrder = useCallback(() => {
    setOrderItems([]);
  }, []);

  const totalItems = useMemo(() => {
    return orderItems.reduce((total, item) => total + item.quantity, 0);
  }, [orderItems]);

  const orderSubtotal = useMemo(() => {
    return orderItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }, [orderItems]);

  const taxAmount = useMemo(() => {
    return orderSubtotal * TAX_RATE;
  }, [orderSubtotal]);

  const orderTotal = useMemo(() => {
    return orderSubtotal + taxAmount;
  }, [orderSubtotal, taxAmount]);

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