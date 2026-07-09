// Funcion para calcular el monto total
export function calculateOrderTotal(items) { // Recibe arreglo de productos
  return items.reduce((total, item) => { // Recorre y acumula valores
    return total + item.quantity * item.price; 
  }, 0); // Valor inicial
}