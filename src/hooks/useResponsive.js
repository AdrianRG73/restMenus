import { useWindowDimensions } from "react-native";

const TABLET_MIN_WIDTH = 768;
const LARGE_TABLET_MIN_WIDTH = 1100;
const SIDEBAR_WIDTH = 72;

const GRID_ROWS = 1;
const HEADER_HEIGHT = 64;
const CATEGORY_TABS_HEIGHT = 64;
const CONTENT_VERTICAL_PADDING = 32;
const GRID_VERTICAL_PADDING = 48;

const MIN_CARD_HEIGHT = 300;
const MAX_CARD_HEIGHT = 1000;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;
  const isTablet = width >= TABLET_MIN_WIDTH;
  const isLargeTablet = width >= LARGE_TABLET_MIN_WIDTH;

  const showSidebar = isTablet && isLandscape;
  const sidebarWidth = showSidebar ? SIDEBAR_WIDTH : 0;

  const gap = isTablet ? 24 : 16;

  const cardWidth = isLargeTablet ? 260 : isTablet ? 240 : width - 32;

  const reservedVerticalSpace =
    HEADER_HEIGHT +
    CONTENT_VERTICAL_PADDING +
    GRID_VERTICAL_PADDING +
    (showSidebar ? 0 : CATEGORY_TABS_HEIGHT);

  const availableGridHeight = height - reservedVerticalSpace;

  const cardHeight = clamp(
    Math.floor((availableGridHeight - gap) / GRID_ROWS),
    MIN_CARD_HEIGHT,
    MAX_CARD_HEIGHT,
  );

  return {
    width,
    height,
    isLandscape,
    isTablet,
    isLargeTablet,
    showSidebar,
    sidebarWidth,
    cardWidth,
    cardHeight,
    gap,
  };
}