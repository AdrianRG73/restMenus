import { useWindowDimensions } from "react-native";

const TABLET_MIN_WIDTH = 768;
const SIDEBAR_WIDTH = 72;

const HEADER_HEIGHT = 64;
const CATEGORY_TABS_HEIGHT = 64;
const CONTENT_VERTICAL_PADDING = 32;
const GRID_VERTICAL_PADDING = 48;

const MIN_CARD_HEIGHT = 350;
const MAX_CARD_HEIGHT = 460;

const MIN_TABLET_CARD_WIDTH = 250;
const MAX_TABLET_CARD_WIDTH = 310;

const PHONE_HORIZONTAL_PADDING = 32;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;
  const isTablet = Math.min(width, height) >= 600 || width >= TABLET_MIN_WIDTH;

  const showSidebar = isTablet && isLandscape;
  const sidebarWidth = showSidebar ? SIDEBAR_WIDTH : 0;

  const gap = isTablet ? 24 : 16;

  const reservedVerticalSpace =
    HEADER_HEIGHT +
    CONTENT_VERTICAL_PADDING +
    GRID_VERTICAL_PADDING +
    (showSidebar ? 0 : CATEGORY_TABS_HEIGHT);

  const availableGridHeight = Math.max(0, height - reservedVerticalSpace);

  const cardHeight = isTablet
    ? clamp(availableGridHeight, MIN_CARD_HEIGHT, MAX_CARD_HEIGHT)
    : clamp(availableGridHeight, 420, 560);

  const availableContentWidth =
    width - sidebarWidth - PHONE_HORIZONTAL_PADDING;

  const cardWidth = isTablet
    ? clamp(
        Math.round(cardHeight * 0.66),
        MIN_TABLET_CARD_WIDTH,
        MAX_TABLET_CARD_WIDTH
      )
    : Math.max(260, availableContentWidth);

  return {
    width,
    height,
    isLandscape,
    isTablet,
    showSidebar,
    sidebarWidth,
    cardWidth,
    cardHeight,
    gap,
  };
}