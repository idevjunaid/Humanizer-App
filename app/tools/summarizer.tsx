import { useSummarizeMutation } from "@/api/services/summarizer";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { EmptyState } from "@/components/common/EmptyState";
import { useAppDispatch, useAppSelector } from "@/store";
import { addToHistory } from "@/store/slices/historySlice";
import {
    clearToolState,
    setCurrentInput,
    setCurrentOutput,
    setError,
    setIsLoading,
} from "@/store/slices/toolsSlice";
import { getUniqueId, wordCount } from "@/utils/formatters";
import { validateTextInput } from "@/utils/validators";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    useColorScheme,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SummarizerScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { currentInput, currentOutput, isLoading, error } = useAppSelector(
    (state) => state.tools,
  );
  const { mutateAsync: summarize } = useSummarizeMutation();

  // Clear tool state on mount
  useEffect(() => {
    return () => {
      dispatch(clearToolState());
    };
  }, [dispatch]);

  const handleSummarize = async () => {
    const validation = validateTextInput(currentInput);
    if (!validation.isValid) {
      dispatch(setError(validation.error));
      Alert.alert("Error", validation.error);
      return;
    }

    try {
      dispatch(setIsLoading(true));
      dispatch(setError(undefined));

      const response = await summarize(currentInput);

      dispatch(setCurrentOutput(response.output));

      dispatch(
        addToHistory({
          id: getUniqueId(),
          type: "summarizer",
          input: currentInput,
          output: response.output,
          createdAt: Date.now(),
          source: "api",
        }),
      );

      dispatch(setIsLoading(false));
    } catch (err: any) {
      dispatch(setIsLoading(false));
      const errorMsg = err?.message || "Failed to summarize text";
      dispatch(setError(errorMsg));
      Alert.alert("Error", errorMsg);
    }
  };

  const handleCopyOutput = async () => {
    if (!currentOutput) return;
    try {
      await Clipboard.setStringAsync(currentOutput);
      Alert.alert("Copied", "Output copied to clipboard");
    } catch (err) {
      Alert.alert("Error", "Failed to copy");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? "#000000" : "#FFFFFF",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 16,
          paddingBottom: 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Pressable onPress={() => router.back()}>
            <Text style={{ fontSize: 24 }}>←</Text>
          </Pressable>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "700",
                color: isDark ? "#FFFFFF" : "#000000",
              }}
            >
              AI Summarizer
            </Text>
            <Text
              style={{ fontSize: 13, color: isDark ? "#A0A0A0" : "#666666" }}
            >
              Condense long texts into concise summaries
            </Text>
          </View>
        </View>

        {/* Input Section */}
        <Card variant="outlined" padding="$0" style={{ marginBottom: 16 }}>
          <View
            style={{
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: isDark ? "#424245" : "#E0E0E0",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: isDark ? "#FFFFFF" : "#000000",
                marginBottom: 8,
              }}
            >
              Paste Your Text
            </Text>
            <TextInput
              multiline
              placeholder="Enter text here (minimum 10 characters)..."
              value={currentInput}
              onChangeText={(text) => dispatch(setCurrentInput(text))}
              placeholderTextColor={isDark ? "#666666" : "#999999"}
              style={{
                backgroundColor: isDark ? "#2C2C2E" : "#F2F2F7",
                borderRadius: 8,
                padding: 12,
                fontSize: 14,
                color: isDark ? "#FFFFFF" : "#000000",
                minHeight: 120,
                maxHeight: 200,
                textAlignVertical: "top",
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: isDark ? "#A0A0A0" : "#999999",
                }}
              >
                {currentInput.length} / 5000 characters
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: isDark ? "#A0A0A0" : "#999999",
                }}
              >
                {wordCount(currentInput)} words
              </Text>
            </View>
          </View>

          {/* Error Message */}
          {error && (
            <View
              style={{ padding: 12, backgroundColor: "rgba(255, 59, 48, 0.1)" }}
            >
              <Text style={{ fontSize: 12, color: "#FF3B30" }}>⚠️ {error}</Text>
            </View>
          )}
        </Card>

        {/* Generate Button */}
        <Button
          variant="primary"
          size="lg"
          isLoading={isLoading}
          disabled={isLoading || currentInput.trim().length === 0}
          onPress={handleSummarize}
          style={{ marginBottom: 20, width: "100%" }}
        >
          {isLoading ? "Processing..." : "Summarize"}
        </Button>

        {/* Output Section */}
        {currentOutput ? (
          <Card variant="elevated" padding="$0">
            <View style={{ padding: 16, gap: 10 }}>
              <Text
                style={{ fontSize: 12, color: isDark ? "#A0A0A0" : "#6B7280" }}
              >
                Summary
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 22,
                  color: isDark ? "#FFFFFF" : "#081220",
                }}
              >
                {currentOutput}
              </Text>

              <View style={{ flexDirection: "row", marginTop: 12 }}>
                <Button
                  variant="primary"
                  size="md"
                  style={{ flex: 1, marginRight: 8 }}
                  onPress={handleCopyOutput}
                >
                  📋 Copy
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  style={{ flex: 1 }}
                  onPress={() => dispatch(setCurrentOutput(""))}
                >
                  Clear
                </Button>
              </View>
            </View>
          </Card>
        ) : (
          currentInput.length > 0 &&
          !isLoading && (
            <EmptyState
              icon="✨"
              title="Ready"
              message="Tap Summarize to generate a summary"
            />
          )
        )}
      </ScrollView>
    </View>
  );
}
