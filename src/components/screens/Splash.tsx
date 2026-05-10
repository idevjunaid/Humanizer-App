import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { SPLASH_DURATION } from "@/utils/constants";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { Text, View } from "tamagui";

interface SplashScreenProps {
  onComplete: () => void;
  appName?: string;
}

export const SplashScreen = ({
  onComplete,
  appName = "Humanizer",
}: SplashScreenProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    const timer = setTimeout(onComplete, SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isDark ? "#000000" : "#FFFFFF",
      }}
    >
      {/* Logo Section */}
      <View
        style={{
          marginBottom: 32,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 48,
            marginBottom: 16,
          }}
        >
          ✨
        </Text>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "700",
            color: isDark ? "#FFFFFF" : "#000000",
            marginBottom: 8,
          }}
        >
          {appName}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: isDark ? "#A0A0A0" : "#666666",
          }}
        >
          AI-Powered Text Tools
        </Text>
      </View>

      {/* Loading Spinner */}
      <LoadingSpinner message="Loading..." />
    </View>
  );
};
