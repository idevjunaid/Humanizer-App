import { Button } from "@/components/common/Button";
import { validateFeedback } from "@/utils/validators";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    useColorScheme,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FeedbackModal() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const validation = validateFeedback(name, email, message);
    if (!validation.isValid) {
      Alert.alert("Error", validation.error);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Alert.alert(
        "Thank You!",
        "Your feedback has been submitted successfully.",
      );
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
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
            <Text
              style={{
                fontSize: 28,
                fontWeight: "700",
                color: isDark ? "#FFFFFF" : "#000000",
                flex: 1,
                marginLeft: 12,
              }}
            >
              Feedback
            </Text>
          </View>

          {/* Description */}
          <Text
            style={{
              fontSize: 14,
              color: isDark ? "#A0A0A0" : "#666666",
              marginBottom: 24,
              lineHeight: 20,
            }}
          >
            We'd love to hear your thoughts! Your feedback helps us improve
            Humanizer.
          </Text>

          {/* Form */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: isDark ? "#FFFFFF" : "#000000",
                marginBottom: 8,
              }}
            >
              Name
            </Text>
            <TextInput
              placeholder="Your name"
              value={name}
              onChangeText={setName}
              placeholderTextColor={isDark ? "#666666" : "#999999"}
              style={{
                backgroundColor: isDark ? "#1C1C1E" : "#F2F2F7",
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 10,
                fontSize: 14,
                color: isDark ? "#FFFFFF" : "#000000",
                borderWidth: 1,
                borderColor: isDark ? "#424245" : "#E0E0E0",
              }}
            />
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: isDark ? "#FFFFFF" : "#000000",
                marginBottom: 8,
              }}
            >
              Email
            </Text>
            <TextInput
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor={isDark ? "#666666" : "#999999"}
              style={{
                backgroundColor: isDark ? "#1C1C1E" : "#F2F2F7",
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 10,
                fontSize: 14,
                color: isDark ? "#FFFFFF" : "#000000",
                borderWidth: 1,
                borderColor: isDark ? "#424245" : "#E0E0E0",
              }}
            />
          </View>

          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: isDark ? "#FFFFFF" : "#000000",
                marginBottom: 8,
              }}
            >
              Message
            </Text>
            <TextInput
              placeholder="Tell us what you think..."
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={5}
              placeholderTextColor={isDark ? "#666666" : "#999999"}
              style={{
                backgroundColor: isDark ? "#1C1C1E" : "#F2F2F7",
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 10,
                fontSize: 14,
                color: isDark ? "#FFFFFF" : "#000000",
                textAlignVertical: "top",
                borderWidth: 1,
                borderColor: isDark ? "#424245" : "#E0E0E0",
              }}
            />
          </View>

          {/* Info Box */}
          <View
            style={{
              backgroundColor: isDark ? "#1C1C1E" : "#F2F2F7",
              borderRadius: 12,
              padding: 12,
              marginBottom: 24,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: isDark ? "#A0A0A0" : "#666666",
              }}
            >
              💌 We read every piece of feedback and use it to make
              improvements.
            </Text>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: 24 + insets.bottom,
            borderTopWidth: 1,
            borderTopColor: isDark ? "#424245" : "#E0E0E0",
            paddingTop: 12,
            backgroundColor: isDark ? "#1C1C1E" : "#F9F9F9",
          }}
        >
          <Button
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            disabled={isSubmitting || !name || !email || !message}
            style={{ marginBottom: 12, width: "100%" }}
            onPress={handleSubmit}
          >
            Submit Feedback
          </Button>
          <Button
            variant="secondary"
            size="lg"
            style={{ width: "100%" }}
            onPress={() => router.back()}
          >
            Cancel
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
