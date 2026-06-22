import { View, Text, Pressable } from "react-native";
import LanguageButton from "./LanguageButton";

export default function MenuHeader() {
  return (
    <View className="h-16 flex-row items-center justify-between border-b-2 border-zinc-900">
      <View>
        <Text className="text-3xl font-black text-zinc-950 tracking-tight uppercase">
          Rest Menus
        </Text>

        <Text className="text-[10px] text-orange-700 font-bold tracking-[4px] uppercase">
          Digital restaurant menu
        </Text>
      </View>

      <View className="flex-row items-center gap-4">
        <LanguageButton />

        <Pressable className="w-10 h-10 items-center justify-center active:opacity-60">
          <Text className="text-2xl text-zinc-950">☰</Text>
        </Pressable>
      </View>
    </View>
  );
}