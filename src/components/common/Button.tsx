import React from "react";
import { Pressable, PressableProps, Text, useColorScheme } from "react-native";

interface ButtonProps extends PressableProps {
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<any, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled = false,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    const variants: Record<string, any> = {
      primary: {
        backgroundColor: isDark ? "#0A84FF" : "#0066FF",
        color: "#FFFFFF",
      },
      secondary: {
        backgroundColor: isDark ? "#1F1F1F" : "#F6F7FB",
        borderWidth: 1,
        borderColor: isDark ? "#2C2C2E" : "#E6E9F2",
        color: isDark ? "#FFFFFF" : "#0B1220",
      },
      tertiary: {
        backgroundColor: "transparent",
        color: isDark ? "#0A84FF" : "#0066FF",
      },
      danger: {
        backgroundColor: "#FF3B30",
        color: "#FFFFFF",
      },
    };

    const sizes: Record<string, any> = {
      sm: { paddingHorizontal: 12, paddingVertical: 8, fontSize: 13 },
      md: { paddingHorizontal: 16, paddingVertical: 12, fontSize: 15 },
      lg: { paddingHorizontal: 20, paddingVertical: 14, fontSize: 17 },
    };

    const buttonStyle = {
      ...variants[variant],
      ...sizes[size],
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      opacity: disabled ? 0.6 : 1,
      shadowColor: isDark ? "#000000" : "#000000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 3,
    };

    return (
      <Pressable
        ref={ref}
        disabled={disabled || isLoading}
        style={[buttonStyle, style]}
        {...props}
      >
        <Text
          style={{
            color: variants[variant].color,
            fontSize: sizes[size].fontSize,
            fontWeight: "700",
            letterSpacing: 0.2,
          }}
        >
          {isLoading ? "Processing..." : children}
        </Text>
      </Pressable>
    );
  },
);

Button.displayName = "Button";
