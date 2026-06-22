import { Pressable, Text } from "react-native";

export default function LanguageButton() {
  return (
    <Pressable className="border border-zinc-800 px-3 py-2 bg-white active:opacity-70">
      <Text className="text-xs font-black text-zinc-950">EN / ES</Text>
    </Pressable>
  );
}