import { useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ToolCard } from "@/components/tools/ToolCard";

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: isDark ? "#000000" : "#FFFFFF",
      }}
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingHorizontal: 16,
        paddingBottom: 32,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View style={{ marginBottom: 32, marginTop: 16 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: isDark ? "#FFFFFF" : "#000000",
            marginBottom: 8,
          }}
        >
          Humanizer
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: isDark ? "#A0A0A0" : "#666666",
          }}
        >
          Choose a tool to get started
        </Text>
      </View>

      {/* Tools Grid */}
      <ToolCard
        icon="✨"
        title="AI Humanizer"
        description="Transform your text to sound more human"
        onPress={() => router.push("/tools/humanizer")}
      />

      <ToolCard
        icon="📝"
        title="AI Summarizer"
        description="Condense long texts into concise summaries"
        onPress={() => router.push("/tools/summarizer")}
      />

      {/* Info Section */}
      <View
        style={{
          backgroundColor: isDark ? "#1C1C1E" : "#F2F2F7",
          borderRadius: 16,
          padding: 16,
          marginTop: 24,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: isDark ? "#A0A0A0" : "#666666",
            lineHeight: 20,
          }}
        >
          💡 <Text style={{ fontWeight: "600" }}>Tip:</Text> Paste your text and
          click the button to generate results. Your usage will be saved in the
          History tab.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
