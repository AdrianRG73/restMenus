import { Text, View } from "react-native";

export default function ManagementSection({
  title,
  description,
  metaText,
  children,
  className = "",
  contentClassName = "p-4",
}) {
  return (
    <View
      className={`overflow-hidden border-2 border-[#2b241f] bg-[#171311] ${className}`}
    >
      <View className="min-h-14 flex-row items-center justify-between border-b-2 border-[#2b241f] bg-[#111312] px-4 py-3">
        <View className="flex-1 pr-4">
          <Text
            numberOfLines={1}
            className="font-title text-lg uppercase text-[#f2e9d0]"
          >
            {title}
          </Text>

          {description ? (
            <Text
              numberOfLines={1}
              className="mt-1 font-body text-[9px] uppercase tracking-[1px] text-zinc-600"
            >
              {description}
            </Text>
          ) : null}
        </View>

        {metaText ? (
          <Text className="font-button text-[10px] uppercase tracking-[1px] text-[#d8a808]">
            {metaText}
          </Text>
        ) : null}
      </View>

      <View className={contentClassName}>{children}</View>
    </View>
  );
}