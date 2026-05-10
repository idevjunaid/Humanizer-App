import { useAppDispatch, useAppSelector } from "@/store";
import { setLanguage } from "@/store/slices/userSlice";
import { Language } from "@/types";
import { useRouter } from "expo-router";
import React from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    Text,
    useColorScheme,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "de", label: "German", flag: "🇩🇪" },
];

export default function LanguageModal() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector((state) => state.user.language);

  const handleSelectLanguage = (lang: Language) => {
    dispatch(setLanguage(lang));
    Alert.alert(
      "Success",
      `Language changed to ${languages.find((l) => l.code === lang)?.label}`,
    );
    router.back();
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
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              color: isDark ? "#FFFFFF" : "#000000",
              flex: 1,
              marginLeft: 12,
            }}
          >
            Language
          </Text>
        </View>

        {/* Description */}
        <Text
          style={{
            fontSize: 14,
            color: isDark ? "#A0A0A0" : "#666666",
            marginBottom: 24,
          }}
        >
          Choose your preferred language for the app interface
        </Text>

        {/* Language Options */}
        {languages.map((lang) => (
          <Pressable
            key={lang.code}
            onPress={() => handleSelectLanguage(lang.code)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 16,
              marginBottom: 12,
              backgroundColor: isDark ? "#1C1C1E" : "#F2F2F7",
              borderRadius: 12,
              borderWidth: currentLanguage === lang.code ? 2 : 1,
              borderColor:
                currentLanguage === lang.code
                  ? isDark
                    ? "#0A84FF"
                    : "#007AFF"
                  : isDark
                    ? "#424245"
                    : "#E0E0E0",
            }}
          >
            <Text style={{ fontSize: 28, marginRight: 16 }}>{lang.flag}</Text>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: isDark ? "#FFFFFF" : "#000000",
                }}
              >
                {lang.label}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: isDark ? "#A0A0A0" : "#999999",
                  marginTop: 2,
                }}
              >
                {lang.code.toUpperCase()}
              </Text>
            </View>

            {/* Checkmark */}
            {currentLanguage === lang.code && (
              <Text style={{ fontSize: 20 }}>✅</Text>
            )}
          </Pressable>
        ))}

        {/* Info Box */}
        <View
          style={{
            backgroundColor: isDark ? "#1C1C1E" : "#F2F2F7",
            borderRadius: 12,
            padding: 12,
            marginTop: 24,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: isDark ? "#A0A0A0" : "#666666",
              lineHeight: 18,
            }}
          >
            💡 Language changes are applied immediately. More languages coming
            soon!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
