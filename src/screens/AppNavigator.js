import { useState } from "react";
import { View } from "react-native";

import MenuScreen from "../components/menu/MenuScreen";
import BottomNavigation from "../components/navigation/BottomNavigation";
import { SCREEN_IDS } from "../constants/navigationTabs";

import CheckoutScreen from "./CheckoutScreen";
import KitchenBoardScreen from "./KitchenBoardScreen";
import PriceDashboardScreen from "./PriceDashboardScreen";

export default function AppNavigator() {
  const [activeScreenId, setActiveScreenId] = useState(SCREEN_IDS.menu);

  const shouldShowBottomNavigation = activeScreenId !== SCREEN_IDS.menu;

  const goToMenu = () => {
    setActiveScreenId(SCREEN_IDS.menu);
  };

  const goToKitchen = () => {
    setActiveScreenId(SCREEN_IDS.kitchen);
  };

  const goToPrices = () => {
    setActiveScreenId(SCREEN_IDS.prices);
  };

  const goToCheckout = () => {
    setActiveScreenId(SCREEN_IDS.checkout);
  };

  return (
    <View className="flex-1 bg-[#111312]">
      <View className="flex-1">
        {activeScreenId === SCREEN_IDS.menu && (
          <MenuScreen
            onOpenKitchen={goToKitchen}
            onOpenPrices={goToPrices}
            onOpenCheckout={goToCheckout}
          />
        )}

        {activeScreenId === SCREEN_IDS.kitchen && (
          <KitchenBoardScreen onBackToMenu={goToMenu} />
        )}

        {activeScreenId === SCREEN_IDS.prices && (
          <PriceDashboardScreen onBackToMenu={goToMenu} />
        )}

        {activeScreenId === SCREEN_IDS.checkout && (
          <CheckoutScreen onBackToMenu={goToMenu} />
        )}
      </View>

      {shouldShowBottomNavigation && (
        <BottomNavigation
          activeScreenId={activeScreenId}
          onScreenChange={setActiveScreenId}
        />
      )}
    </View>
  );
}