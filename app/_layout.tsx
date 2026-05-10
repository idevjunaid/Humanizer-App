import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { TamaguiProvider } from "tamagui";

import { queryClient } from "@/api/client";
import { AppContent } from "@/components/AppContent";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { store } from "@/store";
import tamaguiConfig from "@/styles/theme";

export const unstable_settings = {
  anchor: "(tabs)",
};

function RootLayoutContent() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AppContent />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={tamaguiConfig}>
          <RootLayoutContent />
        </TamaguiProvider>
      </QueryClientProvider>
    </Provider>
  );
}
