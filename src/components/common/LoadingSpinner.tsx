import React from "react";
import { ActivityIndicator, useColorScheme } from "react-native";
import { Text, View } from "tamagui";

interface LoadingSpinnerProps {
  size?: "small" | "large";
  color?: string;
  message?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner = ({
  size = "large",
  color,
  message,
  fullScreen = false,
}: LoadingSpinnerProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const spinnerColor = color || (isDark ? "#0A84FF" : "#007AFF");

  const content = (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 32,
      }}
    >
      <ActivityIndicator size={size} color={spinnerColor} />
      {message && (
        <Text
          style={{
            marginTop: 16,
            fontSize: 14,
            color: isDark ? "#A0A0A0" : "#666666",
            textAlign: "center",
          }}
        >
          {message}
        </Text>
      )}
    </View>
  );

  if (fullScreen) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isDark ? "#000000" : "#FFFFFF",
        }}
      >
        {content}
      </View>
    );
  }

  return content;
};
