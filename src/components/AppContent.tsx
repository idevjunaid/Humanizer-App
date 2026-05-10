import { Stack } from "expo-router";
import { View } from "react-native";

import {
    useAppInitialization,
    useHistoryPersistence,
    useUIPersistence,
    useUserPersistence,
} from "@/hooks/useAppState";
import { useAppDispatch, useAppSelector } from "@/store";
import {
    setAdShown,
    setSplashShown,
    setUpgradeModalOpen,
} from "@/store/slices/uiSlice";

import { AdModal } from "@/components/screens/AdModal";
import { SplashScreen } from "@/components/screens/Splash";
import { UpgradePlanModal } from "@/components/screens/UpgradePlan";

export function AppContent() {
  const dispatch = useAppDispatch();

  // Initialize app state from AsyncStorage
  const { isInitializing } = useAppInitialization();

  // Setup persistence hooks
  useUserPersistence();
  useHistoryPersistence();
  useUIPersistence();

  // Get UI state
  const { splashShown, adShown, upgradeModalOpen } = useAppSelector(
    (state) => state.ui,
  );
  const { isPremium } = useAppSelector((state) => state.user);

  // Handle splash completion
  const handleSplashComplete = () => {
    dispatch(setSplashShown(true));
  };

  // Handle ad dismiss
  const handleAdDismiss = () => {
    dispatch(setAdShown(true));
  };

  // Handle upgrade modal close
  const handleUpgradeClose = () => {
    dispatch(setUpgradeModalOpen(false));
  };

  // Handle upgrade press
  const handleUpgradePress = () => {
    // For now, just close the modal
    // In production, this would trigger IAP or navigation to premium page
    dispatch(setUpgradeModalOpen(false));
  };

  // Show splash screen first
  if (isInitializing || !splashShown) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Main Stack Navigation */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      {/* Ad Modal - Show after splash, before upgrade modal */}
      {splashShown && !adShown && (
        <AdModal visible={!adShown} onDismiss={handleAdDismiss} />
      )}

      {/* Upgrade Plan Modal - Show after ad if user is not premium and upgradeModalOpen is true */}
      {splashShown && adShown && !isPremium && upgradeModalOpen && (
        <UpgradePlanModal
          visible={upgradeModalOpen}
          onUpgrade={handleUpgradePress}
          onCancel={handleUpgradeClose}
        />
      )}
    </View>
  );
}
