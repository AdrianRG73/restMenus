import { Alert, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMemo, useState } from "react";

import PriceDashboardHeader from "../components/prices/PriceDashboardHeader";
import PriceCategoryPanel from "../components/prices/PriceCategoryPanel";

import { priceDashboardCategories } from "../data/priceDashboardItems";
import { buildPriceDashboardRows } from "../utils/priceDashboardGrid";

function filterCategoriesBySearch(categories, searchText) {
  const normalizedSearchText = searchText.trim().toLowerCase();

  if (!normalizedSearchText) {
    return categories;
  }

  return categories
    .map((category) => {
      const filteredItems = category.items.filter((item) => {
        return item.name.toLowerCase().includes(normalizedSearchText);
      });

      return {
        ...category,
        items: filteredItems,
        itemCountLabel: `${filteredItems.length} ${
          filteredItems.length === 1 ? "ITEM" : "ITEMS"
        }`,
      };
    })
    .filter((category) => category.items.length > 0);
}

function EmptyPricesState() {
  return (
    <View className="flex-1 items-center justify-center py-20">
      <Text className="font-title text-4xl uppercase text-[#f2e9d0]">
        No Items Found
      </Text>

      <Text className="mt-2 font-body text-xs uppercase tracking-[2px] text-zinc-600">
        Try another search term.
      </Text>
    </View>
  );
}

export default function PriceDashboardScreen() {
  const [categories, setCategories] = useState(priceDashboardCategories);
  const [searchText, setSearchText] = useState("");

  const visibleCategories = useMemo(() => {
    return filterCategoriesBySearch(categories, searchText);
  }, [categories, searchText]);

  const dashboardRows = useMemo(() => {
    return buildPriceDashboardRows(visibleCategories);
  }, [visibleCategories]);

  const handleToggleItemAvailability = (categoryId, itemId) => {
    setCategories((currentCategories) => {
      return currentCategories.map((category) => {
        if (category.id !== categoryId) {
          return category;
        }

        return {
          ...category,
          items: category.items.map((item) => {
            if (item.id !== itemId) {
              return item;
            }

            return {
              ...item,
              available: !item.available,
            };
          }),
        };
      });
    });
  };

  const handleSaveChanges = () => {
    Alert.alert("Save Changes", "Price dashboard changes saved locally.");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#111312]">
      <PriceDashboardHeader
        searchText={searchText}
        onSearchTextChange={setSearchText}
        onSaveChanges={handleSaveChanges}
      />

      <FlatList
        data={dashboardRows}
        keyExtractor={(row) => row.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyPricesState />}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          paddingBottom: 28,
        }}
        renderItem={({ item: row }) => {
          return (
            <View
              className={`mb-5 flex-row ${
                row.type === "half-row" ? "gap-5" : ""
              }`}
            >
              {row.categories.map((category) => (
                <PriceCategoryPanel
                  key={category.id}
                  category={category}
                  onToggleItemAvailability={handleToggleItemAvailability}
                />
              ))}

              {row.type === "half-row" && row.categories.length === 1 && (
                <View className="flex-1" />
              )}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}