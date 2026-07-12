import { useContext } from "react";

import { MenuCatalogContext } from "../context/MenuCatalogContext";

export function useMenuCatalog() {
  const menuCatalog = useContext(MenuCatalogContext);

  if (!menuCatalog) {
    throw new Error(
      "useMenuCatalog debe utilizarse dentro de MenuCatalogProvider.",
    );
  }

  return menuCatalog;
}