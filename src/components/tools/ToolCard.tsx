import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Text, useColorScheme, View } from "react-native";

interface ToolCardProps {
  icon: string;
  title: string;
  description: string;
  onPress: () => void;
}

export const ToolCard = ({
  icon,
  title,
  description,
  onPress,
}: ToolCardProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Card
      variant="elevated"
      padding="$5"
      onPress={onPress}
      style={{ marginBottom: 16 }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
      >
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            backgroundColor: isDark ? "#111216" : "#F6F8FF",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          <Text style={{ fontSize: 28 }}>{icon}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "800",
              color: isDark ? "#FFFFFF" : "#081220",
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: isDark ? "#A0A0A0" : "#6B7280",
              marginTop: 6,
            }}
          >
            {description}
          </Text>
        </View>
      </View>

      <Button
        variant="primary"
        size="md"
        onPress={onPress}
        style={{ width: "100%" }}
      >
        Try
      </Button>
    </Card>
  );
};
