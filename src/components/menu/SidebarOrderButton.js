import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@react-native-vector-icons/material-icons";

export default function SidebarOrderButton({ totalItems = 0, onPress }) {
  const hasItems = totalItems > 0;
  const accessibilityItemText =
    totalItems === 1 ? "1 item" : `${totalItems} items`;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Open order basket. ${accessibilityItemText}`}
      className="h-12 w-12 items-center justify-center rounded-full bg-yellow-400 active:opacity-80"
    >
      <MaterialIcons
        name="room-service"
        size={30}
        color="#000000"
      />

      {hasItems && (
        <View
          style={{ minWidth: 20 }}
          className="absolute -right-1 -top-1 h-5 items-center justify-center rounded-full bg-zinc-950 px-1"
        >
          <Text className="text-[10px] font-black text-yellow-400">
            {totalItems}
          </Text>
        </View>
      )}
    </Pressable>
  );
}