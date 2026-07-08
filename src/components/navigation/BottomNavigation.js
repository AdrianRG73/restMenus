import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NAVIGATION_TABS } from "../../constants/navigationTabs";

function NavigationTabButton({ tab, isActive, onPress }) {
    
    // Poner borde o no al estar activa
    const activeBorderClass = isActive
    ? "border-[#08a88a]"
    : "border-transparent";

  const symbolClass = isActive ? "text-[#08a88a]" : "text-zinc-600";

  const labelClass = isActive ? "text-[#f2e9d0]" : "text-zinc-500";

  return (
    <Pressable
      onPress={onPress}
      className={`flex-1 items-center justify-center border-t-2 ${activeBorderClass}`}
    >
      <View className="flex-row items-center gap-2">
        <Text className={`font-bodyBold text-sm ${symbolClass}`}>
          {tab.symbol}
        </Text>

        <Text
          className={`font-button text-[10px] uppercase tracking-[2px] ${labelClass}`}
        >
          {tab.label}
        </Text>
      </View>
    </Pressable>
  );
}

//Funcion para cambiar de pantalla y saber cual esta activa
export default function BottomNavigation({ activeScreenId, onScreenChange }) {
  const insets = useSafeAreaInsets(); //Area segura del dispositivo

  return (
    <View
      style={{ paddingBottom: insets.bottom }} // Para que se vea bien
      className="border-t-2 border-zinc-900 bg-black"
    >
      <View className="h-16 flex-row">
        {NAVIGATION_TABS.map((tab) => {
          const isActive = tab.id === activeScreenId;

          return (
            <NavigationTabButton
              key={tab.id}
              tab={tab} // Informacion del boton
              isActive={isActive} // Sber si es seleccionado
              onPress={() => onScreenChange(tab.id)} // Accion al tocarlo
            />
          );
        })}
      </View>
    </View>
  );
}