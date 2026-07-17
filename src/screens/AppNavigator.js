import { useCallback, useState } from "react";
import { View } from "react-native";

import MenuScreen from "../components/menu/MenuScreen";
import BottomNavigation from "../components/navigation/BottomNavigation";
import { SCREEN_IDS } from "../constants/navigationTabs";

import CheckoutScreen from "./CheckoutScreen";
import KitchenBoardScreen from "./KitchenBoardScreen";
import MenuManagementScreen from "./MenuManagementScreen";
import PriceDashboardScreen from "./PriceDashboardScreen";

export default function AppNavigator() {
  const [activeScreenId, setActiveScreenId] = useState(SCREEN_IDS.menu);

  const SCREENS_WITHOUT_BOTTOM_NAVIGATION = [];
    SCREEN_IDS.menu,
    SCREEN_IDS.kitchen

  // Para pruebas poner !SCREENS_WITHOUT_BOTTOM_NAVIGATION
  const shouldShowBottomNavigation =
  SCREENS_WITHOUT_BOTTOM_NAVIGATION.includes(activeScreenId);

  const handleScreenChange = useCallback((screenId) => {
    const validScreenIds = Object.values(SCREEN_IDS);
    const isValidScreen = validScreenIds.includes(screenId);

    if (!isValidScreen) {
      console.warn(`Pantalla desconocida: ${screenId}`);
      return;
    }

    setActiveScreenId(screenId);
  }, []);

  return (
    <View className="flex-1 bg-[#111312]">
      <View className="flex-1">
        {activeScreenId === SCREEN_IDS.menu && (
          <MenuScreen
            onOpenKitchen={() => handleScreenChange(SCREEN_IDS.kitchen)}
            onOpenPrices={() => handleScreenChange(SCREEN_IDS.prices)}
            onOpenCheckout={() => handleScreenChange(SCREEN_IDS.checkout)}
          />
        )}

        {activeScreenId === SCREEN_IDS.kitchen && (
          <KitchenBoardScreen
            onBackToMenu={() => handleScreenChange(SCREEN_IDS.menu)}
          />
        )}

        {activeScreenId === SCREEN_IDS.prices && (
          <PriceDashboardScreen
            onBackToMenu={() => handleScreenChange(SCREEN_IDS.menu)}
          />
        )}

        {activeScreenId === SCREEN_IDS.checkout && (
          <CheckoutScreen
            onBackToMenu={() => handleScreenChange(SCREEN_IDS.menu)}
          />
        )}

        {activeScreenId === SCREEN_IDS.menuManagement && (
          <MenuManagementScreen />
        )}
      </View>

      {shouldShowBottomNavigation && (
        <BottomNavigation
          activeScreenId={activeScreenId}
          onScreenChange={handleScreenChange}
        />
      )}
    </View>
  );
}
