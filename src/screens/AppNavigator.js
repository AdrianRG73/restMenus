import { useState } from "react";
import { View } from "react-native";

import MenuScreen from "../components/menu/MenuScreen";
import BottomNavigation from "../components/navigation/BottomNavigation";
import { SCREEN_IDS } from "../constants/navigationTabs";

import CheckoutScreen from "./CheckoutScreen";
import KitchenBoardScreen from "./KitchenBoardScreen";

const SCREEN_COMPONENTS = Object.freeze({
  [SCREEN_IDS.menu]: MenuScreen,
  [SCREEN_IDS.kitchen]: KitchenBoardScreen,
  [SCREEN_IDS.checkout]: CheckoutScreen,
});

export default function AppNavigator() {
  const [activeScreenId, setActiveScreenId] = useState(SCREEN_IDS.menu);

  const ActiveScreen = SCREEN_COMPONENTS[activeScreenId] ?? MenuScreen;

  const shouldShowBottomNavigation = activeScreenId; // !== SCREEN_IDS.menu;

  return (
    <View className="flex-1 bg-[#111312]">
      <View className="flex-1">
        <ActiveScreen />
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