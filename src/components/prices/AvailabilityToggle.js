import { Pressable, View } from "react-native";

export default function AvailabilityToggle({ isActive, onPress }) {
  const trackClass = isActive
    ? "border-[#70843c] bg-[#70843c]"
    : "border-[#3d4654] bg-[#3d4654]";

  const knobClass = isActive ? "bg-[#c8c0ad]" : "bg-[#8d98a6]";

  const knobPositionClass = isActive ? "self-end" : "self-start";

  return (
    <Pressable
      onPress={onPress}
      className={`h-5 w-10 justify-center border-2 px-1 ${trackClass}`}
    >
      <View className={`h-3 w-3 ${knobClass} ${knobPositionClass}`} />
    </Pressable>
  );
}