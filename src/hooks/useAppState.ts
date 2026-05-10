import { useAppDispatch, useAppSelector } from "@/store";
import { setHistory } from "@/store/slices/historySlice";
import {
    setAdShown,
    setSplashShown,
    setUpgradeModalOpen,
} from "@/store/slices/uiSlice";
import {
    setLanguage,
    setNotifications,
    setPremium,
    setUser,
} from "@/store/slices/userSlice";
import * as storage from "@/utils/storage";
import { useEffect, useState } from "react";

/**
 * Hook to initialize app state from AsyncStorage
 */
export const useAppInitialization = () => {
  const dispatch = useAppDispatch();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Load user settings
        const savedUser = await storage.getUserSettings();
        if (savedUser) {
          dispatch(setUser(savedUser));
        }

        // Load history
        const savedHistory = await storage.getHistory();
        if (savedHistory && savedHistory.length > 0) {
          dispatch(setHistory(savedHistory));
        }

        // Load UI state
        const savedUIState = await storage.getUIState();
        if (savedUIState) {
          dispatch(setSplashShown(savedUIState.splashShown));
          dispatch(setAdShown(savedUIState.adShown));
          dispatch(setUpgradeModalOpen(savedUIState.upgradeModalOpen));
        }
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeApp();
  }, [dispatch]);

  return { isInitializing };
};

/**
 * Hook to save user settings to AsyncStorage when they change
 */
export const useUserPersistence = () => {
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    storage.saveUserSettings(user);
  }, [user]);
};

/**
 * Hook to save history to AsyncStorage when it changes
 */
export const useHistoryPersistence = () => {
  const history = useAppSelector((state) => state.history.items);

  useEffect(() => {
    storage.saveHistory(history);
  }, [history]);
};

/**
 * Hook to save UI state to AsyncStorage when it changes
 */
export const useUIPersistence = () => {
  const ui = useAppSelector((state) => state.ui);

  useEffect(() => {
    storage.saveUIState(ui);
  }, [ui]);
};

/**
 * Hook for easy access to user data
 */
export const useUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  return {
    user,
    setLanguage: (lang: string) => {
      dispatch(setLanguage(lang as any));
    },
    setNotifications: (enabled: boolean) => {
      dispatch(setNotifications(enabled));
    },
    setPremium: (isPremium: boolean) => {
      dispatch(setPremium(isPremium));
    },
  };
};

/**
 * Hook for easy access to UI state
 */
export const useUIState = () => {
  const dispatch = useAppDispatch();
  const ui = useAppSelector((state) => state.ui);

  return {
    ui,
    setSplashShown: (shown: boolean) => dispatch(setSplashShown(shown)),
    setAdShown: (shown: boolean) => dispatch(setAdShown(shown)),
    setUpgradeModalOpen: (open: boolean) => dispatch(setUpgradeModalOpen(open)),
  };
};
