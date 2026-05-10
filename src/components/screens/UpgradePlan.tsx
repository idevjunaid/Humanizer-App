import { Button } from "@/components/common/Button";
import React from "react";
import { Modal, ScrollView, Text, useColorScheme, View } from "react-native";

interface UpgradePlanModalProps {
  visible: boolean;
  onUpgrade: () => void;
  onCancel: () => void;
}

const features = [
  { icon: "♾️", title: "Unlimited Uses", desc: "No limits on text processing" },
  { icon: "⚡", title: "Faster Processing", desc: "Priority queue processing" },
  { icon: "🚫", title: "Ad-Free", desc: "No interruptions" },
  { icon: "🔄", title: "Offline Support", desc: "Use tools without internet" },
  { icon: "📊", title: "Advanced Analytics", desc: "Track your usage stats" },
  { icon: "🎨", title: "Premium Themes", desc: "Beautiful dark modes" },
];

export const UpgradePlanModal = ({
  visible,
  onUpgrade,
  onCancel,
}: UpgradePlanModalProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: isDark ? "#000000" : "#FFFFFF",
            marginTop: 60,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            overflow: "hidden",
          }}
        >
          <ScrollView
            style={{
              flex: 1,
              padding: 20,
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={{ marginBottom: 24, alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 32,
                  marginBottom: 12,
                }}
              >
                👑
              </Text>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "700",
                  color: isDark ? "#FFFFFF" : "#000000",
                  marginBottom: 8,
                  textAlign: "center",
                }}
              >
                Go Premium
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: isDark ? "#A0A0A0" : "#666666",
                  textAlign: "center",
                }}
              >
                Unlock all features and maximize your productivity
              </Text>
            </View>

            {/* Pricing */}
            <View
              style={{
                backgroundColor: isDark ? "#1C1C1E" : "#F2F2F7",
                borderRadius: 12,
                padding: 16,
                marginBottom: 24,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 36,
                  fontWeight: "700",
                  color: isDark ? "#FFFFFF" : "#000000",
                }}
              >
                $4.99
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: isDark ? "#A0A0A0" : "#666666",
                  marginTop: 4,
                }}
              >
                / month (or $29.99/year)
              </Text>
            </View>

            {/* Features Grid */}
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: isDark ? "#FFFFFF" : "#000000",
                  marginBottom: 12,
                }}
              >
                Premium Features:
              </Text>

              {features.map((feature, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    marginBottom: 12,
                    paddingBottom: 12,
                    borderBottomWidth: index < features.length - 1 ? 1 : 0,
                    borderBottomColor: isDark ? "#424245" : "#E0E0E0",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      marginRight: 12,
                      marginTop: 2,
                    }}
                  >
                    {feature.icon}
                  </Text>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: isDark ? "#FFFFFF" : "#000000",
                        marginBottom: 2,
                      }}
                    >
                      {feature.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: isDark ? "#A0A0A0" : "#666666",
                      }}
                    >
                      {feature.desc}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Free Trial Note */}
            <View
              style={{
                backgroundColor: isDark ? "#1C1C1E" : "#F2F2F7",
                borderRadius: 8,
                padding: 12,
                marginBottom: 24,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: isDark ? "#A0A0A0" : "#666666",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                🎉 Try 3 days free, then just $4.99/month
              </Text>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View
            style={{
              paddingHorizontal: 16,
              paddingBottom: 24,
              borderTopWidth: 1,
              borderTopColor: isDark ? "#424245" : "#E0E0E0",
              paddingTop: 12,
            }}
          >
            <Button
              variant="primary"
              size="lg"
              style={{ marginBottom: 12, width: "100%" }}
              onPress={onUpgrade}
            >
              Start Free Trial
            </Button>
            <Button
              variant="secondary"
              size="lg"
              style={{ width: "100%" }}
              onPress={onCancel}
            >
              Continue Free
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
