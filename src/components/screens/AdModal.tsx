import { Button } from "@/components/common/Button";
import React from "react";
import { Modal, Pressable, Text, useColorScheme, View } from "react-native";

interface AdModalProps {
  visible: boolean;
  onDismiss: () => void;
  autoCloseDuration?: number;
}

export const AdModal = ({
  visible,
  onDismiss,
  autoCloseDuration = 10000,
}: AdModalProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  React.useEffect(() => {
    if (visible && autoCloseDuration > 0) {
      const timer = setTimeout(onDismiss, autoCloseDuration);
      return () => clearTimeout(timer);
    }
  }, [visible, autoCloseDuration, onDismiss]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
        onPress={onDismiss}
      >
        <View
          style={{
            backgroundColor: isDark ? "#1C1C1E" : "#FFFFFF",
            borderRadius: 16,
            padding: 24,
            alignItems: "center",
            width: "100%",
            maxWidth: 300,
          }}
        >
          {/* Ad Placeholder Icon */}
          <Text
            style={{
              fontSize: 64,
              marginBottom: 16,
            }}
          >
            📢
          </Text>

          {/* Ad Title */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: isDark ? "#FFFFFF" : "#000000",
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Advertisement
          </Text>

          {/* Ad Description */}
          <Text
            style={{
              fontSize: 14,
              color: isDark ? "#A0A0A0" : "#666666",
              marginBottom: 20,
              textAlign: "center",
              lineHeight: 20,
            }}
          >
            Experience the premium version with unlimited uses and no ads!
          </Text>

          {/* CTA Button */}
          <Button
            variant="primary"
            size="md"
            style={{ marginBottom: 12, width: "100%" }}
            onPress={onDismiss}
          >
            Upgrade Now
          </Button>

          {/* Close Button */}
          <Button
            variant="secondary"
            size="md"
            style={{ width: "100%" }}
            onPress={onDismiss}
          >
            Maybe Later
          </Button>
        </View>
      </Pressable>
    </Modal>
  );
};
