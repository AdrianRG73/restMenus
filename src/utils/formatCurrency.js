export function formatCurrency(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "$0.00";
  }

  return `$${numericValue.toFixed(2)}`;
}