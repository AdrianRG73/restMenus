const CATEGORIES_PER_ROW = 2;

/**
 * Organiza las categorías del dashboard en filas.
 *
 * Reglas:
 * - Cada fila contiene como máximo dos categorías.
 * - Las categorías se procesan de dos en dos.
 * - Cuando la cantidad es impar, la última categoría ocupa
 *   una fila completa.
 *
 * Ejemplos:
 *
 * 4 categorías:
 * [categoría 1, categoría 2]
 * [categoría 3, categoría 4]
 *
 * 5 categorías:
 * [categoría 1, categoría 2]
 * [categoría 3, categoría 4]
 * [categoría 5]
 */
export function buildPriceDashboardRows(categories = []) {
  const rows = [];

  for (
    let categoryIndex = 0;
    categoryIndex < categories.length;
    categoryIndex += CATEGORIES_PER_ROW
  ) {
    const categoriesInRow = categories.slice(
      categoryIndex,
      categoryIndex + CATEGORIES_PER_ROW,
    );

    const hasTwoCategories =
      categoriesInRow.length === CATEGORIES_PER_ROW;

    const categoryIds = categoriesInRow
      .map((category) => category.id)
      .join("-");

    rows.push({
      id: `price-row-${categoryIds}`,
      type: hasTwoCategories ? "half-row" : "full-row",
      categories: categoriesInRow,
    });
  }

  return rows;
}