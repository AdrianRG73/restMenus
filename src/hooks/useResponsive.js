// src/hooks/useResponsive.js
import { useWindowDimensions } from "react-native";

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;
  const isTablet = width >= 768;
  const isLargeTablet = width >= 1100;

  const sidebarWidth = isTablet && isLandscape ? 72 : 0;

  const cardWidth = isLargeTablet ? 260 : isTablet ? 240 : width - 32;

  const cardHeight = isLandscape ? height - 210 : 440;

  const gap = isTablet ? 24 : 16;

  return {
    width,
    height,
    isLandscape,
    isTablet,
    isLargeTablet,
    sidebarWidth,
    cardWidth,
    cardHeight,
    gap,
  };
}