export function buildPriceDashboardRows(categories) {
  const rows = [];
  let currentHalfRow = [];

  categories.forEach((category) => {
    if (category.layout === "full") {
      if (currentHalfRow.length > 0) {
        rows.push({
          id: `row-${rows.length + 1}`,
          type: "half-row",
          categories: currentHalfRow,
        });

        currentHalfRow = [];
      }

      rows.push({
        id: `row-${rows.length + 1}`,
        type: "full-row",
        categories: [category],
      });

      return;
    }

    currentHalfRow.push(category);

    if (currentHalfRow.length === 2) {
      rows.push({
        id: `row-${rows.length + 1}`,
        type: "half-row",
        categories: currentHalfRow,
      });

      currentHalfRow = [];
    }
  });

  if (currentHalfRow.length > 0) {
    rows.push({
      id: `row-${rows.length + 1}`,
      type: "half-row",
      categories: currentHalfRow,
    });
  }

  return rows;
}