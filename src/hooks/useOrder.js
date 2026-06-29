import { useCallback, useMemo, useState } from "react";

export function useOrder() {
  const [order, setOrder] = useState([]);

  const addToOrder = useCallback((product) => {
    setOrder((currentOrder) => {
      const existingItem = currentOrder.find((item) => item.id === product.id);

      if (existingItem) {
        return currentOrder.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentOrder, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromOrder = useCallback((productId) => {
    setOrder((currentOrder) =>
      currentOrder.filter((item) => item.id !== productId)
    );
  }, []);

  const decreaseQuantity = useCallback((productId) => {
    setOrder((currentOrder) =>
      currentOrder
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clearOrder = useCallback(() => {
    setOrder([]);
  }, []);

  const totalItems = useMemo(() => {
    return order.reduce((total, item) => total + item.quantity, 0);
  }, [order]);

  const totalPrice = useMemo(() => {
    return order.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }, [order]);

  return {
    order,
    addToOrder,
    removeFromOrder,
    decreaseQuantity,
    clearOrder,
    totalItems,
    totalPrice,
  };
}