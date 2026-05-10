import React from "react";
import { useColorScheme } from "react-native";
import { Text, View } from "tamagui";

interface EmptyStateProps {
  icon?: string;
  title: string;
  message?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export const EmptyState = ({
  icon,
  title,
  message,
  action,
}: EmptyStateProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 48,
        paddingHorizontal: 16,
      }}
    >
      {icon && (
        <Text
          style={{
            fontSize: 48,
            marginBottom: 16,
          }}
        >
          {icon}
        </Text>
      )}

      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: isDark ? "#FFFFFF" : "#000000",
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        {title}
      </Text>

      {message && (
        <Text
          style={{
            fontSize: 14,
            color: isDark ? "#A0A0A0" : "#666666",
            marginBottom: action ? 24 : 0,
            textAlign: "center",
          }}
        >
          {message}
        </Text>
      )}

      {action && (
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: isDark ? "#0A84FF" : "#007AFF",
            borderRadius: 8,
          }}
          onTouchEnd={action.onPress}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontWeight: "600",
              fontSize: 14,
            }}
          >
            {action.label}
          </Text>
        </View>
      )}
    </View>
  );
};
