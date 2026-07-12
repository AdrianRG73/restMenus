import {
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

import { categories as initialCategories } from "../data/categories";
import { products as initialProducts } from "../data/products";

export const MenuCatalogContext = createContext(null);

// Completa las propiedades que todavía no existen en los productos simulados originales

function normalizeProduct(product) {
  return {
    ...product,
    englishName: product.englishName ?? "",
    imageUri: product.imageUri ?? null,
    available: product.available ?? true,
  };
}

// Genera un identificador suficientemente único para los productos creados durante la sesión

function createProductId() {
  const timestamp = Date.now();
  const randomValue = Math.random().toString(36).slice(2, 8);

  return `product-${timestamp}-${randomValue}`;
}

// Normaliza todos los productos iniciales una sola vez

function createInitialCatalog() {
  return initialProducts.map(normalizeProduct);
}

export function MenuCatalogProvider({ children }) {
  const [products, setProducts] = useState(createInitialCatalog);

  // Agrega un producto nuevo al final del catálogo.

  const addProduct = useCallback((productData) => {
    const newProduct = normalizeProduct({
      ...productData,
      id: createProductId(),
    });

    setProducts((currentProducts) => {
      return [...currentProducts, newProduct];
    });

    return newProduct;
  }, []);

  // Actualiza únicamente el producto cuyo ID coincide

  const updateProduct = useCallback((productId, productChanges) => {
    setProducts((currentProducts) => {
      return currentProducts.map((product) => {
        if (product.id !== productId) {
          return product;
        }

        return normalizeProduct({
          ...product,
          ...productChanges,

          // Evita que una edición cambie accidentalmente el ID
          id: product.id,
        });
      });
    });
  }, []);

  // Elimina del catálogo el producto indicado 

  const deleteProduct = useCallback((productId) => {
    setProducts((currentProducts) => {
      return currentProducts.filter((product) => {
        return product.id !== productId;
      });
    });
  }, []);

  // Cambia la disponibilidad de un producto

  const toggleProductAvailability = useCallback((productId) => {
    setProducts((currentProducts) => {
      return currentProducts.map((product) => {
        if (product.id !== productId) {
          return product;
        }

        return {
          ...product,
          available: !product.available,
        };
      });
    });
  }, []);

  // Agrupa el estado y las operaciones que estarán disponibles para las pantallas consumidoras
  
  const contextValue = useMemo(() => {
    return {
      products,
      categories: initialCategories,
      addProduct,
      updateProduct,
      deleteProduct,
      toggleProductAvailability,
    };
  }, [
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductAvailability,
  ]);

  return (
    <MenuCatalogContext.Provider value={contextValue}>
      {children}
    </MenuCatalogContext.Provider>
  );
}