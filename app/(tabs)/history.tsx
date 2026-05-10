import { EmptyState } from "@/components/common/EmptyState";
import { useAppDispatch, useAppSelector } from "@/store";
import { removeFromHistory, toggleFavorite } from "@/store/slices/historySlice";
import { formatDate, getTextPreview } from "@/utils/formatters";
import React, { useState } from "react";
import {
    FlatList,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    useColorScheme,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const dispatch = useAppDispatch();

  const historyItems = useAppSelector((state) => state.history.items);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "humanizer" | "summarizer"
  >("all");

  // Filter and search
  const filteredItems = historyItems.filter((item) => {
    const matchesFilter =
      selectedFilter === "all" || item.type === selectedFilter;
    const matchesSearch =
      item.input.toLowerCase().includes(searchText.toLowerCase()) ||
      item.output.toLowerCase().includes(searchText.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDelete = (id: string) => {
    dispatch(removeFromHistory(id));
  };

  const handleToggleFavorite = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  const renderHistoryItem = ({ item }: any) => (
    <Pressable
      onPress={() => {}}
      style={{
        backgroundColor: isDark ? "#1C1C1E" : "#F2F2F7",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1, marginRight: 12 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: item.type === "humanizer" ? "#007AFF" : "#5E5CE6",
              paddingHorizontal: 8,
              paddingVertical: 4,
              backgroundColor:
                item.type === "humanizer"
                  ? isDark
                    ? "rgba(10, 132, 255, 0.2)"
                    : "rgba(0, 122, 255, 0.1)"
                  : isDark
                    ? "rgba(94, 92, 230, 0.2)"
                    : "rgba(94, 92, 230, 0.1)",
              borderRadius: 4,
              marginRight: 8,
            }}
          >
            {item.type === "humanizer" ? "Humanizer" : "Summarizer"}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: isDark ? "#A0A0A0" : "#999999",
            }}
          >
            {formatDate(item.createdAt)}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 13,
            color: isDark ? "#FFFFFF" : "#000000",
            marginBottom: 4,
          }}
          numberOfLines={1}
        >
          {getTextPreview(item.input, 50)}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: isDark ? "#A0A0A0" : "#666666",
          }}
          numberOfLines={1}
        >
          → {getTextPreview(item.output, 50)}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Pressable
          onPress={() => handleToggleFavorite(item.id)}
          style={{ padding: 8 }}
        >
          <Text style={{ fontSize: 18 }}>{item.isFavorite ? "❤️" : "🤍"}</Text>
        </Pressable>
        <Pressable onPress={() => handleDelete(item.id)} style={{ padding: 8 }}>
          <Text style={{ fontSize: 18 }}>🗑️</Text>
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? "#000000" : "#FFFFFF",
      }}
    >
      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 16,
          paddingBottom: 12,
          backgroundColor: isDark ? "#000000" : "#FFFFFF",
          borderBottomWidth: 1,
          borderBottomColor: isDark ? "#424245" : "#E0E0E0",
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: isDark ? "#FFFFFF" : "#000000",
            marginBottom: 12,
          }}
        >
          History
        </Text>

        {/* Search Bar */}
        <TextInput
          placeholder="Search history..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor={isDark ? "#666666" : "#999999"}
          style={{
            backgroundColor: isDark ? "#1C1C1E" : "#F2F2F7",
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontSize: 14,
            color: isDark ? "#FFFFFF" : "#000000",
            marginBottom: 12,
          }}
        />

        {/* Filter Tabs */}
        <View style={{ flexDirection: "row", gap: 8 }}>
          {["all", "humanizer", "summarizer"].map((filter) => (
            <Pressable
              key={filter}
              onPress={() => setSelectedFilter(filter as any)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                backgroundColor:
                  selectedFilter === filter
                    ? isDark
                      ? "#0A84FF"
                      : "#007AFF"
                    : isDark
                      ? "#1C1C1E"
                      : "#F2F2F7",
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color:
                    selectedFilter === filter
                      ? "#FFFFFF"
                      : isDark
                        ? "#A0A0A0"
                        : "#666666",
                }}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* History List or Empty State */}
      {filteredItems.length === 0 ? (
        <ScrollView
          contentContainerStyle={{ flex: 1, justifyContent: "center" }}
        >
          <EmptyState
            icon="📭"
            title="No History Yet"
            message={
              historyItems.length === 0
                ? "Use a tool to start building your history"
                : "No results match your search"
            }
          />
        </ScrollView>
      ) : (
        <FlatList
          data={filteredItems}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 16,
            paddingBottom: 32,
          }}
          scrollEnabled
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
