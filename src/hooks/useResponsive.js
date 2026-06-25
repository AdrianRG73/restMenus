import { useWindowDimensions } from "react-native";

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;
  const isTablet = width >= 768;

  const sidebarWidth = isTablet && isLandscape ? 72 : 0;

  const contentPaddingX = isTablet ? 48 : 32;
  const gap = 16;

  const cardWidth = isTablet ? 260 : width - contentPaddingX;
  const cardHeight = isLandscape ? 300 : 440;

  const availableWidth = width - sidebarWidth - contentPaddingX;

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