import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NAVIGATION_TABS } from "../../constants/navigationTabs";

function BottomNavigationButton({ tab, isActive, onPress }) {
  const symbolClass = isActive ? "text-[#08a88a]" : "text-zinc-600";
  const labelClass = isActive ? "text-[#f2e9d0]" : "text-zinc-600";
  const underlineClass = isActive ? "bg-[#08a88a]" : "bg-transparent";

  return (
    <Pressable onPress={onPress} className="flex-1 items-center justify-center">
      <View className="items-center">
        <View className="flex-row items-center gap-2">
          <Text className={`font-bodyBold text-xs ${symbolClass}`}>
            {tab.symbol}
          </Text>

          <Text
            className={`font-button text-[9px] uppercase tracking-[2px] ${labelClass}`}
          >
            {tab.label}
          </Text>
        </View>

        <View className={`mt-1 h-[2px] w-10 ${underlineClass}`} />
      </View>
    </Pressable>
  );
}

export default function BottomNavigation({ activeScreenId, onScreenChange }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingBottom: insets.bottom }}
      className="border-t-2 border-[#1d1915] bg-black"
    >
      <View className="h-14 flex-row">
        {NAVIGATION_TABS.map((tab) => {
          const isActive = tab.id === activeScreenId;

          return (
            <BottomNavigationButton
              key={tab.id}
              tab={tab}
              isActive={isActive}
              onPress={() => onScreenChange(tab.id)}
            />
          );
        })}
      </View>
    </View>
  );
}