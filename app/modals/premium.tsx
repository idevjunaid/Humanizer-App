import { Button } from "@/components/common/Button";
import { useAppDispatch } from "@/store";
import { setPremium } from "@/store/slices/userSlice";
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

export default function PremiumModal() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleStartTrial = () => {
    // In production, integrate with real IAP here
    dispatch(setPremium(true));
    Alert.alert("Success", "Premium activated! (Mock)");
    router.back();
  };

  const features = [
    {
      icon: "♾️",
      title: "Unlimited Uses",
      desc: "No limits on text processing",
    },
    {
      icon: "⚡",
      title: "Faster Processing",
      desc: "Priority queue processing",
    },
    { icon: "🚫", title: "Ad-Free", desc: "No interruptions" },
    {
      icon: "🔄",
      title: "Offline Support",
      desc: "Use tools without internet",
    },
    { icon: "📊", title: "Advanced Analytics", desc: "Track your usage stats" },
    { icon: "🎨", title: "Premium Themes", desc: "Beautiful dark modes" },
  ];

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
            Premium
          </Text>
        </View>

        {/* Crown Icon */}
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <Text style={{ fontSize: 64, marginBottom: 12 }}>👑</Text>
          <Text
            style={{
              fontSize: 24,
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
            Unlock unlimited potential
          </Text>
        </View>

        {/* Pricing Card */}
        <View
          style={{
            backgroundColor: isDark ? "#1C1C1E" : "#F2F2F7",
            borderRadius: 16,
            padding: 20,
            alignItems: "center",
            marginBottom: 24,
            borderWidth: 2,
            borderColor: isDark ? "#0A84FF" : "#007AFF",
          }}
        >
          <Text
            style={{
              fontSize: 42,
              fontWeight: "700",
              color: isDark ? "#0A84FF" : "#007AFF",
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
            Per month
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: isDark ? "#A0A0A0" : "#999999",
              marginTop: 8,
              fontStyle: "italic",
            }}
          >
            or $29.99/year (Save 50%!)
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: isDark ? "#34C759" : "#34C759",
              marginTop: 12,
              fontWeight: "600",
            }}
          >
            🎉 Try 3 days free
          </Text>
        </View>

        {/* Features List */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: isDark ? "#FFFFFF" : "#000000",
              marginBottom: 16,
            }}
          >
            What's Included:
          </Text>

          {features.map((feature, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                marginBottom: 16,
                alignItems: "flex-start",
              }}
            >
              <Text style={{ fontSize: 24, marginRight: 12, marginTop: 2 }}>
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

        {/* Disclaimer */}
        <View
          style={{
            backgroundColor: isDark ? "#2C2C2E" : "#F2F2F7",
            borderRadius: 8,
            padding: 12,
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              fontSize: 11,
              color: isDark ? "#A0A0A0" : "#666666",
              lineHeight: 16,
            }}
          >
            • Subscription auto-renews after free trial{"\n"}• Cancel anytime
            {"\n"}• Prices may vary by region
          </Text>
        </View>
      </ScrollView>

      {/* Action Buttons (Fixed at bottom) */}
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
          style={{ marginBottom: 12, width: "100%" }}
          onPress={handleStartTrial}
        >
          Start Free Trial
        </Button>
        <Button
          variant="secondary"
          size="lg"
          style={{ width: "100%" }}
          onPress={() => router.back()}
        >
          Maybe Later
        </Button>
      </View>
    </View>
  );
}
