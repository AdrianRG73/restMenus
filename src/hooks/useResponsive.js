import { useWindowDimensions } from "react-native";

// Obtener dimensiones de la ventana y calcular propiedades de diseño responsivo
export function useResponsive() {
  const { width, height } = useWindowDimensions();

  // Determinar si el dispositivo está en modo horizontal y si es una tablet
  const isLandscape = width > height;
  const isTablet = width >= 768;

  // Calcular el ancho de la barra lateral basado en si es una tablet y está en modo horizontal
  const sidebarWidth = isTablet && isLandscape ? 72 : 0;

  // Calcular el padding horizontal del contenido basado en si es una tablet
  const contentPaddingX = isTablet ? 48 : 32;
  const gap = 16;

  // Calcular el ancho y alto de las tarjetas basados en si es una tablet y el modo de orientación
  const cardWidth = isTablet ? 260 : width - contentPaddingX;
  const cardHeight = isLandscape ? 300 : 440;

  // Calcular el ancho disponible para las tarjetas después de restar la barra lateral y el padding
  const availableWidth = width - sidebarWidth - contentPaddingX;

  // Calcular el número de columnas basado en el ancho disponible y el ancho de la tarjeta
  const columns = isTablet
    ? Math.max(1, Math.floor((availableWidth + gap) / (cardWidth + gap)))
    : 1;

  return {
    width,
    height,
    isLandscape,
    isTablet,
    sidebarWidth,
    cardWidth,
    cardHeight,
    columns,
    gap,
  };
}