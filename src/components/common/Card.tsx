import React from "react";
import { useColorScheme } from "react-native";
import { View, ViewProps } from "tamagui";

interface CardProps extends ViewProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: "default" | "elevated" | "outlined";
  padding?: number | string;
}

export const Card = React.forwardRef<any, CardProps>(
  ({ children, variant = "default", padding = "$4", style, ...props }, ref) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    const variants = {
      default: {
        backgroundColor: isDark ? "$bgSecondary" : "#FFFFFF",
        borderWidth: 0,
        shadowColor: isDark ? "$shadowColor" : "$shadowColor",
      },
      elevated: {
        backgroundColor: isDark ? "$bgSecondary" : "#FFFFFF",
        borderWidth: 0,
        shadowColor: isDark ? "$shadowColor" : "$shadowColor",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      },
      outlined: {
        backgroundColor: isDark ? "$bgSecondary" : "#FFFFFF",
        borderWidth: 1,
        borderColor: isDark ? "$borderColor" : "$borderColor",
        shadowColor: "transparent",
      },
    };

    return (
      <View
        ref={ref}
        borderRadius="$md"
        padding={padding}
        {...variants[variant]}
        style={style}
        {...props}
      >
        {children}
      </View>
    );
  },
);

Card.displayName = "Card";
