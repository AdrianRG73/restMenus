import { Pressable, Text, TextInput, View } from "react-native";

export default function PriceDashboardHeader({
  searchText,
  onSearchTextChange,
  onSaveChanges,
}) {
  return (
    <View className="h-16 flex-row items-center border-b-2 border-[#2b241f] bg-[#111312] px-5">
      {/* Lado izquierdo: título + buscador */}
      <View className="flex-1 flex-row items-center">
        <View className="mr-6">
          <Text className="font-title text-2xl uppercase text-[#f2e9d0]">
            Price Dashboard
          </Text>

          <Text className="mt-[-2px] font-body text-[9px] uppercase tracking-[3px] text-zinc-600">
            Admin · Landscape Grid
          </Text>
        </View>

        <View className="h-10 w-[320px] flex-row items-center border-2 border-[#2b241f] bg-[#171311] px-4">
          <Text className="mr-3 font-body text-xs text-zinc-600">⌕</Text>

          <TextInput
            value={searchText}
            onChangeText={onSearchTextChange}
            placeholder="SEARCH MENU..."
            placeholderTextColor="#5f5f5f"
            className="flex-1 font-body text-xs uppercase text-[#f2e9d0]"
          />
        </View>
      </View>

      {/* Lado derecho fijo */}
      <Pressable
        onPress={onSaveChanges}
        className="ml-6 h-10 justify-center border-2 border-[#46556b] bg-[#53677f] px-7"
      >
        <Text className="font-button text-[10px] uppercase tracking-[1.5px] text-white">
          Save Changes
        </Text>
      </Pressable>
    </View>
  );
}