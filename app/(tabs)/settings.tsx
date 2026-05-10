import { useUser } from "@/hooks/useAppState";
import { APP_VERSION } from "@/utils/constants";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import {
    Alert,
    Pressable,
    ScrollView,
    Share,
    Switch,
    Text,
    useColorScheme,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SettingItem = ({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  isDark,
}: any) => (
  <Pressable
    onPress={onPress}
    style={{
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#424245" : "#E0E0E0",
      backgroundColor: isDark ? "#1C1C1E" : "#F2F2F7",
      marginBottom: 8,
      borderRadius: 8,
    }}
  >
    <Text style={{ fontSize: 20, marginRight: 12 }}>{icon}</Text>
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: isDark ? "#FFFFFF" : "#000000",
          marginBottom: 2,
        }}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          style={{
            fontSize: 12,
            color: isDark ? "#A0A0A0" : "#999999",
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
    {rightElement && <View>{rightElement}</View>}
  </Pressable>
);

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const { user, setNotifications } = useUser();

  const handleShareApp = async () => {
    try {
      await Share.share({
        message:
          "Check out Humanizer - AI-powered text tools! 🚀 https://example.com/humanizer",
        title: "Share Humanizer",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share");
    }
  };

  const handleRateApp = async () => {
    try {
      // In production, replace with App Store / Google Play store URLs
      await WebBrowser.openBrowserAsync("https://example.com/rate");
    } catch (error) {
      Alert.alert("Error", "Could not open browser");
    }
  };

  const handlePrivacyPolicy = async () => {
    try {
      await WebBrowser.openBrowserAsync("https://example.com/privacy");
    } catch (error) {
      Alert.alert("Error", "Could not open browser");
    }
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
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: isDark ? "#FFFFFF" : "#000000",
            marginBottom: 24,
          }}
        >
          Settings
        </Text>

        {/* Premium Section */}
        <Text
          style={{
            fontSize: 12,
            fontWeight: "700",
            color: isDark ? "#A0A0A0" : "#999999",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Premium
        </Text>
        <SettingItem
          icon="👑"
          title="Upgrade to Premium"
          subtitle={user.isPremium ? "Premium Active" : "Unlock all features"}
          onPress={() => router.push("/modals/premium")}
          isDark={isDark}
        />

        {/* Preferences Section */}
        <Text
          style={{
            fontSize: 12,
            fontWeight: "700",
            color: isDark ? "#A0A0A0" : "#999999",
            textTransform: "uppercase",
            marginBottom: 8,
            marginTop: 16,
          }}
        >
          Preferences
        </Text>

        <SettingItem
          icon="🔔"
          title="Notifications"
          subtitle={user.notificationsEnabled ? "Enabled" : "Disabled"}
          rightElement={
            <Switch
              value={user.notificationsEnabled}
              onValueChange={setNotifications}
            />
          }
          isDark={isDark}
        />

        <SettingItem
          icon="🌐"
          title="Language"
          subtitle={user.language.toUpperCase()}
          onPress={() => router.push("/modals/language")}
          isDark={isDark}
        />

        {/* Support Section */}
        <Text
          style={{
            fontSize: 12,
            fontWeight: "700",
            color: isDark ? "#A0A0A0" : "#999999",
            textTransform: "uppercase",
            marginBottom: 8,
            marginTop: 16,
          }}
        >
          Support
        </Text>

        <SettingItem
          icon="⭐"
          title="Rate Us"
          subtitle="Love our app? Rate us on app store"
          onPress={handleRateApp}
          isDark={isDark}
        />

        <SettingItem
          icon="📤"
          title="Share App"
          subtitle="Tell your friends about Humanizer"
          onPress={handleShareApp}
          isDark={isDark}
        />

        <SettingItem
          icon="💬"
          title="Feedback & Suggestions"
          subtitle="Help us improve"
          onPress={() => router.push("/modals/feedback")}
          isDark={isDark}
        />

        <SettingItem
          icon="🔐"
          title="Privacy Policy"
          subtitle="Read our privacy policy"
          onPress={handlePrivacyPolicy}
          isDark={isDark}
        />

        {/* About Section */}
        <Text
          style={{
            fontSize: 12,
            fontWeight: "700",
            color: isDark ? "#A0A0A0" : "#999999",
            textTransform: "uppercase",
            marginBottom: 8,
            marginTop: 16,
          }}
        >
          About
        </Text>

        <SettingItem
          icon="ℹ️"
          title="Version"
          subtitle={`v${APP_VERSION}`}
          isDark={isDark}
        />

        {/* Info Box */}
        <View
          style={{
            backgroundColor: isDark ? "#1C1C1E" : "#F2F2F7",
            borderRadius: 12,
            padding: 16,
            marginTop: 24,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: isDark ? "#A0A0A0" : "#666666",
              lineHeight: 18,
              textAlign: "center",
            }}
          >
            Made with ❤️ by the Humanizer Team
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
