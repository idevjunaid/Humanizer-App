import React from "react";
import {
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
    useColorScheme,
} from "react-native";
import { View } from "tamagui";

interface InputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  containerStyle?: any;
}

export const Input = React.forwardRef<RNTextInput, InputProps>(
  ({ label, error, containerStyle, ...props }, ref) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    const inputStyle = {
      padding: 14,
      borderRadius: 16,
      borderWidth: 1,
      fontSize: 16,
      backgroundColor: isDark ? "#1B1B1D" : "#FFFFFF",
      borderColor: error ? "#FF3B30" : isDark ? "#2C2C2E" : "#E6E9F2",
      color: isDark ? "#FFFFFF" : "#0B1220",
    };

    return (
      <View style={containerStyle}>
        {label && (
          <View style={{ marginBottom: 8 }}>
            <RNTextInput
              style={{
                fontSize: 14,
                fontWeight: "700",
                color: isDark ? "#FFFFFF" : "#0B1220",
                marginBottom: 6,
              }}
              editable={false}
              value={label}
            />
          </View>
        )}
        <RNTextInput
          ref={ref}
          style={inputStyle}
          placeholderTextColor={isDark ? "#9AA0A6" : "#9AA0A6"}
          {...props}
        />
        {error && (
          <RNTextInput
            style={{
              fontSize: 12,
              color: "#FF3B30",
              marginTop: 8,
            }}
            editable={false}
            value={error}
          />
        )}
      </View>
    );
  },
);

Input.displayName = "Input";
