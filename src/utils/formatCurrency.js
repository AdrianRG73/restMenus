// Funcion para convertir el valor del momto en formato de dinero
export function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}